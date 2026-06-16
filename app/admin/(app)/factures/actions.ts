'use server';

import { revalidatePath } from 'next/cache';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { nextFactureNumber } from '@/lib/crm/numbering';
import { notifyClientPayment } from '@/lib/crm/notify';
import { FactureStatus } from '@prisma/client';

/** Crée une facture (forfait) à partir d'un client, sans passer par un devis. */
export async function createFacture(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireAdmin();
  const contactId = String(formData.get('contactId') ?? '');
  const object = String(formData.get('object') ?? '').trim();
  const montant = Math.round(
    Number(String(formData.get('montant') ?? '').replace(',', '.')) || 0
  );
  if (!contactId) return 'Client obligatoire.';
  if (!object) return 'Objet de la facture obligatoire.';
  if (!montant || montant < 1 || montant > 1000000) return 'Montant invalide (€ HT).';

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const dueRaw = String(formData.get('dueDate') ?? '');
  let due: Date;
  if (dueRaw) {
    due = new Date(dueRaw);
  } else {
    due = new Date();
    due.setDate(due.getDate() + 30);
  }

  const number = await nextFactureNumber(contact.name);
  const facture = await prisma.facture.create({
    data: {
      number,
      contactId,
      object,
      dueDate: due,
      totalHT: montant,
      lines: {
        create: [
          {
            designation: object,
            unit: 'Forfait',
            qty: 1,
            unitPrice: montant,
            total: montant,
            position: 0,
          },
        ],
      },
    },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId,
      content: `Facture ${number} créée`,
    },
  });

  revalidatePath('/admin/factures');
  revalidateCrm(contactId);
  redirect(`/admin/factures/${facture.id}`);
}

/**
 * Modifie une facture existante (objet, échéance, montant) sans la recréer.
 * Préserve le format « diagnostic » (ligne « — » + coordination) si la facture
 * en venait ; sinon ligne forfait unique. Re-générer le PDF reflète le tout.
 */
export async function updateFacture(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  if (!id) return 'Facture introuvable.';
  const object = String(formData.get('object') ?? '').trim();
  const montant = Math.round(
    Number(String(formData.get('montant') ?? '').replace(',', '.')) || 0
  );
  if (!object) return 'Objet de la facture obligatoire.';
  if (!montant || montant < 1 || montant > 1000000) return 'Montant invalide (€ HT).';

  const existing = await prisma.facture.findUnique({
    where: { id },
    include: { lines: true },
  });
  if (!existing) return 'Facture introuvable.';

  const dueRaw = String(formData.get('dueDate') ?? '');
  // Facture diagnostic = présence d'une ligne « — » (prix 0) + une ligne payante.
  const isDiagnostic =
    existing.lines.length >= 2 && existing.lines.some((l) => Number(l.unitPrice) === 0);

  const lines = isDiagnostic
    ? [
        {
          designation: 'Diagnostic sur site, analyse et production du rapport',
          detail: 'Réalisé par le diagnostiqueur indépendant mandaté, sous sa responsabilité',
          unit: 'Forfait',
          qty: 1,
          unitPrice: 0,
          total: 0,
          position: 0,
        },
        {
          designation: 'Coordination de la mission et mise en forme du rapport',
          detail: 'Planification, suivi du dossier et production éditoriale du rapport — IPB',
          unit: 'Forfait',
          qty: 1,
          unitPrice: montant,
          total: montant,
          position: 1,
        },
      ]
    : [
        {
          designation: object,
          unit: 'Forfait',
          qty: 1,
          unitPrice: montant,
          total: montant,
          position: 0,
        },
      ];

  await prisma.factureLine.deleteMany({ where: { factureId: id } });
  await prisma.facture.update({
    where: { id },
    data: {
      object,
      dueDate: dueRaw ? new Date(dueRaw) : undefined,
      totalHT: montant,
      lines: { create: lines },
    },
  });

  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidateCrm(existing.contactId);
  return undefined;
}

export async function updateFactureStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !(status in FactureStatus)) return;
  const updated = await prisma.facture.update({
    where: { id },
    data: { status: status as FactureStatus },
    select: { contactId: true },
  });
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidateCrm(updated.contactId);
}

/**
 * Supprime une facture (quel que soit son statut — confirmation forte côté UI).
 * Détache un éventuel RDV lié ; les lignes partent en cascade.
 */
export async function deleteFacture(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  if (!id) return;
  const f = await prisma.facture.findUnique({
    where: { id },
    select: { id: true, contactId: true },
  });
  if (!f) return;
  // Détache un éventuel RDV lié ; les lignes partent en cascade.
  await prisma.appointment.updateMany({
    where: { factureId: id },
    data: { factureId: null },
  });
  await prisma.facture.delete({ where: { id } });
  revalidatePath('/admin/factures');
  revalidatePath('/admin');
  revalidateCrm(f.contactId);
  redirect('/admin/factures');
}

/**
 * Enregistre un encaissement (total ou partiel) sur une facture, via le champ
 * `acompte` (cumul des règlements). La facture passe en PAYEE une fois soldée ;
 * sinon elle reste « partiellement réglée » (acompte > 0, dérivé à l'affichage).
 */
export async function recordFacturePayment(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  const montant =
    Math.round(
      (Number(String(formData.get('montant') ?? '').replace(',', '.')) || 0) * 100
    ) / 100;
  if (!id || montant <= 0) return;

  const f = await prisma.facture.findUnique({
    where: { id },
    select: { number: true, totalHT: true, acompte: true, contactId: true },
  });
  if (!f) return;

  const total = Number(f.totalHT);
  const dejaPaye = Number(f.acompte ?? 0);
  const nouveau = Math.min(total, dejaPaye + montant);
  const solde = Math.round((total - nouveau) * 100) / 100;
  const soldee = solde <= 0;

  await prisma.facture.update({
    where: { id },
    data: { acompte: nouveau, status: soldee ? 'PAYEE' : undefined },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: f.contactId,
      content: soldee
        ? `Facture ${f.number} soldée (encaissement de ${montant.toLocaleString('fr-FR')} €)`
        : `Encaissement de ${montant.toLocaleString('fr-FR')} € sur la facture ${f.number} — reste dû ${solde.toLocaleString('fr-FR')} €`,
    },
  });

  // Confirmation client à la facture soldée (non bloquant).
  if (soldee) await notifyClientPayment(id);

  // RÈGLE MÉTIER : le paiement DÉCLENCHE la rédaction du rapport. On fait remonter
  // l'action « Rapport à rédiger » dans les relances dues (sauf si rapport déjà
  // parti). Idempotent.
  if (soldee) {
    const dejaEnvoye = await prisma.rapport.findFirst({
      where: { contactId: f.contactId, status: 'ENVOYE' },
      select: { id: true },
    });
    const dejaRelance = await prisma.activity.findFirst({
      where: {
        contactId: f.contactId,
        content: { contains: `Rapport à rédiger (facture ${f.number}` },
      },
      select: { id: true },
    });
    if (!dejaEnvoye && !dejaRelance) {
      await prisma.activity.create({
        data: {
          type: 'RELANCE',
          contactId: f.contactId,
          content: `Rapport à rédiger (facture ${f.number} payée) — livraison promise sous 3 à 5 jours ouvrés.`,
          dueAt: new Date(),
        },
      });
    }
  }

  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidatePath('/admin');
  revalidateCrm(f.contactId);
}
