'use server';

import { revalidatePath } from 'next/cache';
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
  revalidatePath(`/admin/clients/${contactId}`);
  redirect(`/admin/factures/${facture.id}`);
}

export async function updateFactureStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get('factureId') ?? '');
  const status = String(formData.get('status') ?? '');
  if (!id || !(status in FactureStatus)) return;
  await prisma.facture.update({
    where: { id },
    data: { status: status as FactureStatus },
  });
  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
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
    select: { id: true },
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

  revalidatePath(`/admin/factures/${id}`);
  revalidatePath('/admin/factures');
  revalidatePath('/admin');
}
