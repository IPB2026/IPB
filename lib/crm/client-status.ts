import type { Prisma } from '@prisma/client';
import { DIAGNOSTIC_VISIT_TYPES } from '@/lib/crm/dossier';

/**
 * Critère Prisma équivalent au statut CLIENT de `computeDossier` (phase ≥ « Devis
 * validé »), pour les COMPTAGES côté base (dashboard, conversion KPI, filtres de
 * liste) où l'on ne peut pas dérouler `computeDossier` par contact.
 *
 * Un contact est CLIENT dès qu'il a engagé le cycle au-delà du simple devis envoyé :
 *  - un devis ACCEPTÉ, ou
 *  - une facture, ou
 *  - un rendez-vous de diagnostic (planifié/réalisé), ou
 *  - un rapport.
 *
 * SOURCE UNIQUE partagée avec le badge Prospect/Client (lui dérivé de la phase) →
 * les écrans ne se contredisent plus jamais.
 */
export const CLIENT_CONTACT_OR: Prisma.ContactWhereInput[] = [
  { devis: { some: { status: 'ACCEPTE' } } },
  { factures: { some: {} } },
  { appointments: { some: { type: { in: DIAGNOSTIC_VISIT_TYPES } } } },
  { rapports: { some: {} } },
];

/** Contact CLIENT (au moins un critère ci-dessus). */
export const CLIENT_CONTACT_WHERE: Prisma.ContactWhereInput = { OR: CLIENT_CONTACT_OR };

/** Contact PROSPECT (aucun critère client). */
export const PROSPECT_CONTACT_WHERE: Prisma.ContactWhereInput = {
  NOT: { OR: CLIENT_CONTACT_OR },
};

/**
 * Dossier PERDU côté base.
 *
 * Depuis la vague 1 de l'audit, la phase du dossier est MATÉRIALISÉE dans
 * `Lead.phase` (copie du calcul de `computeDossier`) : c'est elle qui fait foi,
 * et elle est enfin filtrable en SQL. Tant qu'un dossier n'a pas été
 * synchronisé — colonne encore `null`, juste après la migration — on retombe
 * sur l'ancienne approximation par étape, pour qu'aucun écran ne change de
 * comportement entre la migration et le premier passage de synchronisation.
 */
const LEAD_PERDU_LEGACY: Prisma.LeadWhereInput = {
  OR: [{ manualPhase: 'PERDU' }, { AND: [{ manualPhase: null }, { stage: 'PERDU' }] }],
};

export const LEAD_PERDU_WHERE: Prisma.LeadWhereInput = {
  OR: [
    { phase: 'PERDU' },
    { AND: [{ phase: null }, LEAD_PERDU_LEGACY] },
  ],
};

/** Dossier NON perdu — négation explicite, même repli. */
const LEAD_OUVERT_WHERE: Prisma.LeadWhereInput = {
  OR: [
    { AND: [{ phase: { not: null } }, { phase: { not: 'PERDU' } }] },
    { AND: [{ phase: null }, { NOT: LEAD_PERDU_LEGACY }] },
  ],
};

/**
 * Contact ARCHIVÉ (« perdu ») : au moins un dossier perdu et plus AUCUN dossier
 * ouvert. Il quitte la liste des clients actifs pour l'onglet Archives — sans
 * rien supprimer (shadow) : la fiche, l'historique et les documents restent
 * intacts, et rouvrir un dossier le ramène automatiquement dans la liste.
 */
export const LOST_CONTACT_WHERE: Prisma.ContactWhereInput = {
  AND: [
    { leads: { some: LEAD_PERDU_WHERE } },
    { leads: { none: LEAD_OUVERT_WHERE } },
  ],
};

/**
 * Contact ACTIF : ni à la corbeille (géré à part) ni archivé comme perdu.
 * Négation ÉCRITE À LA MAIN plutôt qu'un `NOT: LOST_CONTACT_WHERE` : un NOT
 * portant sur un AND de filtres de relation produit un SQL nettement moins
 * lisible/optimisable, alors que la forme développée dit exactement la même
 * chose — aucun dossier perdu, OU au moins un dossier encore ouvert. Un contact
 * sans aucun dossier tombe dans le premier cas et reste donc actif.
 */
export const NOT_LOST_CONTACT_WHERE: Prisma.ContactWhereInput = {
  OR: [
    { leads: { none: LEAD_PERDU_WHERE } },
    { leads: { some: LEAD_OUVERT_WHERE } },
  ],
};
