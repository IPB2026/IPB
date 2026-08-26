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
 * Dossier PERDU côté base : la phase manuelle prime sur l'étape déduite (même
 * ordre de priorité que `computeDossier`), donc un lead est perdu si
 *  - `manualPhase = PERDU` (marqué à la main), ou
 *  - aucune phase manuelle et `stage = PERDU` (cron, relances épuisées…).
 */
export const LEAD_PERDU_WHERE: Prisma.LeadWhereInput = {
  OR: [{ manualPhase: 'PERDU' }, { AND: [{ manualPhase: null }, { stage: 'PERDU' }] }],
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
    { NOT: { leads: { some: { NOT: LEAD_PERDU_WHERE } } } },
  ],
};

/** Contact ACTIF : ni à la corbeille (géré à part) ni archivé comme perdu. */
export const NOT_LOST_CONTACT_WHERE: Prisma.ContactWhereInput = {
  NOT: LOST_CONTACT_WHERE,
};
