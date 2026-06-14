'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { nextDevisNumber, nextFactureNumber } from '@/lib/crm/numbering';
import { devisTemplate } from '@/lib/crm/devis-templates';
import { DevisStatus, ServiceType } from '@prisma/client';

async function requireUser() {
  const session = await auth();
  if (!session?.user) throw new Error('Non authentifié');
  return session.user;
}

const lineSchema = z.object({
  designation: z.string().trim().min(1),
  detail: z.string().trim().optional().default(''),
  unit: z.string().trim().default('Forfait'),
  qty: z.coerce.number().min(0).default(1),
  unitPrice: z.coerce.number().min(0).default(0),
});

const num = (v: FormDataEntryValue | null) => String(v ?? '');

export async function createDevis(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();

  const contactId = num(formData.get('contactId'));
  const serviceRaw = num(formData.get('serviceType')).trim();
  if (!contactId) return 'Client obligatoire.';
  const serviceType = (serviceRaw in ServiceType ? serviceRaw : 'FISSURES') as ServiceType;

  // Tarif du dossier (coordination + mise en forme IPB), borné 399–499 €.
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 199 || prix > 999) {
    return 'Indiquez un montant valide (entre 399 et 499 € en principe).';
  }

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const validRaw = num(formData.get('validUntil'));
  const validUntil = validRaw ? new Date(validRaw) : defaultValidUntil();
  const number = await nextDevisNumber();
  const tpl = devisTemplate(serviceType);

  // Deux lignes : diagnostic sur site (porté par le diagnostiqueur, « — »)
  // + coordination/mise en forme IPB (le prix).
  const lines = [
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
      unitPrice: prix,
      total: prix,
      position: 1,
    },
  ];

  const devis = await prisma.devis.create({
    data: {
      number,
      contactId,
      leadId: num(formData.get('leadId')) || null,
      object: tpl.objet,
      serviceType,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil,
      totalHT: prix,
      lines: { create: lines },
    },
  });

  revalidatePath('/admin/devis');
  redirect(`/admin/devis/${devis.id}`);
}

function defaultValidUntil(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d;
}

// Ligne unique du devis travaux (coordination IPB ; travaux exécutés par le réseau).
const TRAVAUX_LINE = {
  designation: 'Accompagnement et coordination des travaux de reprise',
  detail:
    'Programmation, sélection et pilotage des équipes de réalisation du réseau IPB, suivi de chantier et assistance à réception',
  unit: 'Forfait',
  qty: 1,
  position: 0,
} as const;

/**
 * 2ᵉ devis « accompagnement travaux » — émis APRÈS le rapport, distinct du devis
 * diagnostic. Repéré par serviceType = AUTRE. Montant libre (≠ forfait diagnostic
 * 399–499 €). Son acceptation déclenche le lancement des travaux (cf. page devis).
 */
export async function createDevisTravaux(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();

  const contactId = num(formData.get('contactId'));
  if (!contactId) return 'Client obligatoire.';
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 1 || prix > 100000) {
    return 'Indiquez un montant valide (€ HT).';
  }

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const validRaw = num(formData.get('validUntil'));
  const validUntil = validRaw ? new Date(validRaw) : defaultValidUntil();
  const number = await nextDevisNumber();
  const tpl = devisTemplate('AUTRE');
  const leadId = num(formData.get('leadId')) || null;

  const devis = await prisma.devis.create({
    data: {
      number,
      contactId,
      leadId,
      object: tpl.objet,
      serviceType: 'AUTRE',
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil,
      totalHT: prix,
      lines: { create: [{ ...TRAVAUX_LINE, unitPrice: prix, total: prix }] },
    },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId,
      leadId,
      content: `Devis d'accompagnement travaux ${number} créé`,
    },
  });

  revalidatePath('/admin/devis');
  revalidatePath(`/admin/clients/${contactId}`);
  redirect(`/admin/devis/${devis.id}`);
}

/** Modifie un devis travaux (montant libre, bien, validité). */
export async function updateDevisTravaux(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return 'Devis introuvable.';
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 1 || prix > 100000) return 'Montant invalide (€ HT).';

  const existing = await prisma.devis.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!existing) return 'Devis introuvable.';

  const tpl = devisTemplate('AUTRE');
  const validRaw = num(formData.get('validUntil'));

  await prisma.devisLine.deleteMany({ where: { devisId: id } });
  await prisma.devis.update({
    where: { id },
    data: {
      serviceType: 'AUTRE',
      object: tpl.objet,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil: validRaw ? new Date(validRaw) : undefined,
      totalHT: prix,
      lines: { create: [{ ...TRAVAUX_LINE, unitPrice: prix, total: prix }] },
    },
  });

  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  return undefined;
}

export async function updateDevisStatus(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  const status = num(formData.get('status'));
  if (!id || !(status in DevisStatus)) return;
  await prisma.devis.update({
    where: { id },
    data: { status: status as DevisStatus },
  });
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
}

/**
 * Marque un devis comme ACCEPTÉ — vrai événement métier (≠ simple statut).
 * Horodate l'acceptation (déclenche le bloc « lancement travaux » du dashboard)
 * et fait gagner le lead lié. N'envoie rien au client.
 */
export async function acceptDevis(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;

  const devis = await prisma.devis.findUnique({
    where: { id },
    select: { contactId: true, leadId: true, number: true, acceptedAt: true },
  });
  if (!devis) return;

  await prisma.devis.update({
    where: { id },
    data: { status: 'ACCEPTE', acceptedAt: devis.acceptedAt ?? new Date() },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: devis.contactId,
      leadId: devis.leadId,
      content: `Devis ${devis.number} accepté — lancement des travaux à planifier`,
    },
  });
  if (devis.leadId) {
    await prisma.lead.updateMany({
      where: { id: devis.leadId, stage: { notIn: ['PERDU', 'GAGNE'] } },
      data: { stage: 'GAGNE' },
    });
  }

  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidatePath('/admin');
}

/** Modifie un devis (type, montant, bien, validité) et recalcule les lignes. */
export async function updateDevis(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return 'Devis introuvable.';

  const serviceRaw = num(formData.get('serviceType')).trim();
  const serviceType = (serviceRaw in ServiceType ? serviceRaw : 'FISSURES') as ServiceType;
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 199 || prix > 999) {
    return 'Montant invalide (entre 399 et 499 € en principe).';
  }

  const existing = await prisma.devis.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return 'Devis introuvable.';

  const tpl = devisTemplate(serviceType);
  const validRaw = num(formData.get('validUntil'));

  // Remplace les lignes par les 2 lignes recalculées.
  await prisma.devisLine.deleteMany({ where: { devisId: id } });
  await prisma.devis.update({
    where: { id },
    data: {
      serviceType,
      object: tpl.objet,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil: validRaw ? new Date(validRaw) : undefined,
      totalHT: prix,
      lines: {
        create: [
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
            unitPrice: prix,
            total: prix,
            position: 1,
          },
        ],
      },
    },
  });

  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  return undefined;
}

/** Supprime un devis (refusé s'il a déjà été facturé). */
export async function deleteDevis(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;
  const factures = await prisma.facture.count({ where: { devisId: id } });
  if (factures > 0) return; // un devis facturé ne se supprime pas
  await prisma.devis.delete({ where: { id } });
  revalidatePath('/admin/devis');
  redirect('/admin/devis');
}

export async function convertDevisToFacture(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;

  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { contact: true, lines: { orderBy: { position: 'asc' } } },
  });
  if (!devis) return;

  const number = await nextFactureNumber(devis.contact.name);
  const due = new Date();
  due.setDate(due.getDate() + 30);

  const facture = await prisma.facture.create({
    data: {
      number,
      contactId: devis.contactId,
      devisId: devis.id,
      object: devis.object,
      dueDate: due,
      totalHT: devis.totalHT,
      lines: {
        create: devis.lines.map((l, i) => ({
          designation: l.designation,
          detail: l.detail,
          unit: l.unit,
          qty: l.qty,
          unitPrice: l.unitPrice,
          total: l.total,
          position: i,
        })),
      },
    },
  });

  await prisma.devis.update({
    where: { id },
    data: { status: 'ACCEPTE', acceptedAt: devis.acceptedAt ?? new Date() },
  });
  // La conversion vaut acceptation : on fait gagner le lead lié.
  if (devis.leadId) {
    await prisma.lead.updateMany({
      where: { id: devis.leadId, stage: { notIn: ['PERDU', 'GAGNE'] } },
      data: { stage: 'GAGNE' },
    });
  }

  revalidatePath('/admin/factures');
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin');
  redirect(`/admin/factures/${facture.id}`);
}
