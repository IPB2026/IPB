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
