'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { revalidateCrm } from '@/lib/crm/revalidate';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth-helpers';
import { nextDevisNumber, nextFactureNumber } from '@/lib/crm/numbering';
import { devisTemplate, serializeDevisContent } from '@/lib/crm/devis-templates';
import { generateDevisContent } from '@/lib/ai/devis';
import { recordPhaseEvent } from '@/lib/crm/phase-events';
import { DevisStatus, ServiceType } from '@prisma/client';

// Écritures commerciales (devis/factures) : réservées à l'ADMIN. Les EXPERT
// (diagnostiqueurs) sont redirigés hors du back-office par guardAdminPage.
const requireUser = requireAdmin;

/** Option « frais de déplacement » : forfait HT ajouté au devis si coché. */
const FRAIS_DEPLACEMENT = 50;

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
  // AUTRE est réservé au 2ᵉ devis « travaux » (createDevisTravaux) : un devis
  // diagnostic ne peut pas être AUTRE, sinon il serait compté comme devis travaux.
  const serviceType = (
    serviceRaw in ServiceType && serviceRaw !== 'AUTRE' ? serviceRaw : 'FISSURES'
  ) as ServiceType;

  // Tarif du dossier (coordination + mise en forme IPB) — montant libre.
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 1 || prix > 100000) {
    return 'Indiquez un montant valide (€ HT).';
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

  // Option « frais de déplacement » (50 € HT) — ajoutée si cochée sur le devis.
  const avecFrais = Boolean(num(formData.get('fraisDeplacement')).trim());
  if (avecFrais) {
    lines.push({
      designation: 'Frais de déplacement',
      detail: 'Déplacement aller-retour sur le lieu de l’intervention',
      unit: 'Forfait',
      qty: 1,
      unitPrice: FRAIS_DEPLACEMENT,
      total: FRAIS_DEPLACEMENT,
      position: lines.length,
    });
  }
  const totalHT = prix + (avecFrais ? FRAIS_DEPLACEMENT : 0);

  const devis = await prisma.devis.create({
    data: {
      number,
      contactId,
      leadId: num(formData.get('leadId')) || null,
      object: tpl.objet,
      serviceType,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil,
      totalHT,
      lines: { create: lines },
    },
  });

  revalidatePath('/admin/devis');
  revalidateCrm(contactId);
  redirect(`/admin/devis/${devis.id}`);
}

/**
 * « Devis express » depuis la fiche client : même création que `createDevis`, mais
 * appelable directement comme action de formulaire (signature `(formData)`), sans
 * passer par la page `/devis/nouveau`. Redirige vers le devis créé (BROUILLON) pour
 * relecture/envoi en 1 clic. Réduit la création de devis de 5 clics à 2.
 */
export async function quickCreateDevis(formData: FormData): Promise<void> {
  await createDevis(undefined, formData);
}

/** Génère (sans persister) le contenu d'un devis sur-mesure depuis un besoin libre. */
export async function suggestDevisContent(
  besoin: string,
  bien?: string
): Promise<{ objet: string; intervention: string[]; livrable: string[] } | { error: string }> {
  await requireUser();
  return generateDevisContent(besoin, bien);
}

/**
 * Devis SUR-MESURE : contenu (objet/déroulé/livrable) rédigé par l'IA puis relu,
 * PRIX saisi par l'admin. serviceType = NULL → jamais confondu avec un devis
 * travaux (sentinelle AUTRE). Contenu stocké en JSON dans `notes` (zéro migration).
 */
export async function createDevisSurMesure(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();

  const contactId = num(formData.get('contactId'));
  if (!contactId) return 'Client obligatoire.';

  const objet = num(formData.get('objet')).trim();
  if (!objet) return 'Objet de la mission obligatoire (générez ou saisissez le contenu).';

  const intervention = num(formData.get('intervention'))
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const livrable = num(formData.get('livrable'))
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  if (intervention.length === 0 || livrable.length === 0) {
    return "Renseignez le déroulé de l'intervention et le livrable (une ligne par point).";
  }

  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 1 || prix > 100000) return 'Indiquez un montant valide (€ HT).';

  const contact = await prisma.contact.findUnique({ where: { id: contactId } });
  if (!contact) return 'Client introuvable.';

  const number = await nextDevisNumber();

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
  const avecFrais = Boolean(num(formData.get('fraisDeplacement')).trim());
  if (avecFrais) {
    lines.push({
      designation: 'Frais de déplacement',
      detail: 'Déplacement aller-retour sur le lieu de l’intervention',
      unit: 'Forfait',
      qty: 1,
      unitPrice: FRAIS_DEPLACEMENT,
      total: FRAIS_DEPLACEMENT,
      position: lines.length,
    });
  }
  const totalHT = prix + (avecFrais ? FRAIS_DEPLACEMENT : 0);

  const devis = await prisma.devis.create({
    data: {
      number,
      contactId,
      leadId: num(formData.get('leadId')) || null,
      object: objet,
      serviceType: null,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      notes: serializeDevisContent({ intervention, livrable }),
      validUntil: defaultValidUntil(),
      totalHT,
      lines: { create: lines },
    },
  });

  revalidatePath('/admin/devis');
  revalidateCrm(contactId);
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
  revalidateCrm(contactId);
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
  revalidateCrm();
  return undefined;
}

const DEVIS_STATUS_FR: Record<string, string> = {
  BROUILLON: 'brouillon',
  ENVOYE: 'envoyé',
  ACCEPTE: 'accepté',
  REFUSE: 'refusé',
  EXPIRE: 'expiré',
};

export async function updateDevisStatus(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  const status = num(formData.get('status'));
  if (!id || !(status in DevisStatus)) return;
  const before = await prisma.devis.findUnique({
    where: { id },
    select: { status: true, contactId: true, leadId: true, number: true },
  });
  if (!before) return;
  await prisma.devis.update({ where: { id }, data: { status: status as DevisStatus } });
  // Trace le changement dans la timeline du dossier (sauf statut inchangé).
  if (before.status !== status) {
    await prisma.activity.create({
      data: {
        type: 'SYSTEME',
        contactId: before.contactId,
        leadId: before.leadId,
        content: `Devis ${before.number} : statut → ${DEVIS_STATUS_FR[status] ?? status}`,
      },
    });
  }
  // Cohérence pipeline : un devis refusé/expiré sort le lead du « gagné ».
  if (before.leadId && (status === 'REFUSE' || status === 'EXPIRE')) {
    await prisma.lead.updateMany({
      where: { id: before.leadId, stage: 'GAGNE' },
      data: { stage: 'PERDU' },
    });
  }
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidateCrm(before.contactId);
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
  await recordPhaseEvent(devis.contactId, devis.leadId, 'DEVIS_VALIDE'); // T1
  // COHÉRENCE : le devis est accepté → la tâche « Décision devis » (créée après 3
  // relances sans réponse) n'a plus d'objet. On la referme automatiquement.
  await prisma.activity.updateMany({
    where: {
      contactId: devis.contactId,
      type: 'RELANCE',
      done: false,
      content: { contains: `Décision devis ${devis.number}` },
    },
    data: { done: true, doneAt: new Date() },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: devis.contactId,
      leadId: devis.leadId,
      content: `Devis ${devis.number} accepté — planifier la date d'intervention (visite)`,
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
  revalidateCrm(devis.contactId);
}

/**
 * Duplique un devis (nouveau brouillon, nouveau numéro) — pratique pour un 2ᵉ
 * bien ou un devis « accompagnement travaux ». Copie objet, type, bien, lignes,
 * montant et lettre d'intro ; le client/dossier reste le même. Redirige vers la copie.
 */
export async function duplicateDevis(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;
  const src = await prisma.devis.findUnique({
    where: { id },
    include: { lines: { orderBy: { position: 'asc' } } },
  });
  if (!src) return;

  const number = await nextDevisNumber();
  const dup = await prisma.devis.create({
    data: {
      number,
      contactId: src.contactId,
      leadId: src.leadId,
      object: src.object,
      serviceType: src.serviceType,
      bienConcerne: src.bienConcerne,
      introLetter: src.introLetter,
      notes: src.notes,
      validUntil: src.validUntil,
      totalHT: src.totalHT,
      status: 'BROUILLON',
      lines: {
        create: src.lines.map((l) => ({
          designation: l.designation,
          detail: l.detail,
          unit: l.unit,
          qty: l.qty,
          unitPrice: l.unitPrice,
          total: l.total,
          position: l.position,
        })),
      },
    },
  });
  await prisma.activity.create({
    data: {
      type: 'SYSTEME',
      contactId: src.contactId,
      leadId: src.leadId,
      content: `Devis ${number} créé par duplication de ${src.number}.`,
    },
  });
  revalidatePath('/admin/devis');
  revalidateCrm(src.contactId);
  redirect(`/admin/devis/${dup.id}`);
}

/** Modifie un devis (type, montant, bien, validité) et recalcule les lignes. */
export async function updateDevis(
  _prev: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return 'Devis introuvable.';

  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!prix || prix < 1 || prix > 100000) {
    return 'Montant invalide (€ HT).';
  }

  const existing = await prisma.devis.findUnique({
    where: { id },
    select: { serviceType: true, object: true },
  });
  if (!existing) return 'Devis introuvable.';

  // Devis SUR-MESURE (serviceType null) : on PRÉSERVE le type, l'objet et le
  // contenu (notes restent intactes) — on ne recalcule que le prix/les lignes.
  const isSurMesure = existing.serviceType === null;
  const serviceRaw = num(formData.get('serviceType')).trim();
  const serviceType: ServiceType | null = isSurMesure
    ? null
    : ((serviceRaw in ServiceType && serviceRaw !== 'AUTRE'
        ? serviceRaw
        : 'FISSURES') as ServiceType);

  const tpl = devisTemplate(serviceType);
  const validRaw = num(formData.get('validUntil'));

  // Lignes recalculées (diagnostic « — » + coordination/prix), + frais si coché.
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
  // Frais de déplacement : conservés si la case est cochée (l'édition ne les perd
  // plus). EditDevisForm pré-coche selon l'état du devis.
  const avecFrais = Boolean(num(formData.get('fraisDeplacement')).trim());
  if (avecFrais) {
    lines.push({
      designation: 'Frais de déplacement',
      detail: 'Déplacement aller-retour sur le lieu de l’intervention',
      unit: 'Forfait',
      qty: 1,
      unitPrice: FRAIS_DEPLACEMENT,
      total: FRAIS_DEPLACEMENT,
      position: lines.length,
    });
  }
  const totalHT = prix + (avecFrais ? FRAIS_DEPLACEMENT : 0);

  // Remplace les lignes par les lignes recalculées.
  await prisma.devisLine.deleteMany({ where: { devisId: id } });
  await prisma.devis.update({
    where: { id },
    data: {
      serviceType,
      object: isSurMesure ? existing.object : tpl.objet,
      bienConcerne: num(formData.get('bienConcerne')).trim() || null,
      validUntil: validRaw ? new Date(validRaw) : undefined,
      totalHT,
      lines: { create: lines },
    },
  });

  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidateCrm();
  return undefined;
}

/**
 * Modifie le MONTANT d'un devis directement depuis la fiche client (sans ouvrir la
 * page devis). Le montant porte sur la ligne COORDINATION (règle métier : le
 * diagnostic reste à 0). Pratique quand un devis a été établi hors CRM et qu'on
 * veut juste caler le bon montant dans le suivi.
 */
export async function setDevisMontant(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  const prix = Math.round(Number(num(formData.get('prix')).replace(',', '.')) || 0);
  if (!id || prix < 0 || prix > 1_000_000) return;

  const devis = await prisma.devis.findUnique({
    where: { id },
    include: { lines: { orderBy: { position: 'asc' } } },
  });
  if (!devis) return;

  // Cible = la ligne « coordination » (celle qui porte le prix). Repli : la ligne
  // la plus chère, sinon création d'une ligne coordination.
  const target =
    devis.lines.find((l) => /coordination/i.test(l.designation)) ??
    [...devis.lines].sort((a, b) => Number(b.unitPrice) - Number(a.unitPrice))[0];

  if (target) {
    await prisma.devisLine.update({
      where: { id: target.id },
      data: { unitPrice: prix, total: prix },
    });
  } else {
    await prisma.devisLine.create({
      data: {
        devisId: id,
        designation: 'Coordination de la mission et mise en forme du rapport',
        detail: 'Planification, suivi du dossier et production éditoriale du rapport — IPB',
        unit: 'Forfait',
        qty: 1,
        unitPrice: prix,
        total: prix,
        position: devis.lines.length,
      },
    });
  }

  // Total = somme des lignes (le diagnostic à 0 + coordination + frais éventuels).
  const fresh = await prisma.devisLine.findMany({ where: { devisId: id } });
  const totalHT = fresh.reduce((s, l) => s + Number(l.total), 0);
  await prisma.devis.update({ where: { id }, data: { totalHT } });

  revalidatePath(`/admin/devis/${id}`);
  revalidatePath('/admin/devis');
  revalidateCrm(devis.contactId);
}

/** Supprime un devis (refusé s'il a déjà été facturé). */
export async function deleteDevis(formData: FormData) {
  await requireUser();
  const id = num(formData.get('devisId'));
  if (!id) return;
  const existing = await prisma.devis.findUnique({
    where: { id },
    select: { contactId: true },
  });
  // Détache d'éventuelles factures liées (elles restent), puis supprime le devis.
  await prisma.facture.updateMany({ where: { devisId: id }, data: { devisId: null } });
  await prisma.devis.delete({ where: { id } });
  revalidatePath('/admin/devis');
  revalidatePath('/admin');
  revalidateCrm(existing?.contactId);
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
  revalidateCrm(devis.contactId);
  redirect(`/admin/factures/${facture.id}`);
}
