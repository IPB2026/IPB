/**
 * Qualification structurée des prospects « téléphone » (Phase 5.1).
 *
 * 80 % des prospects arrivent par appel, sans réponses de formulaire : on les
 * qualifie à la main sur 4 axes (budget, délai, décisionnaire, type de bien),
 * et on en déduit automatiquement un score + un tier HOT/WARM/COLD.
 *
 * Distinct du scoring web (`lib/leadScoring.ts`) : le résultat est rangé dans
 * `Lead.payload.qualification` (aucune migration) et met à jour `Lead.tier`
 * pour piloter la priorité de rappel et les relances.
 */

import type { LeadTier } from '@prisma/client';

export type QualDelai =
  | 'INCONNU'
  | 'IMMEDIAT'
  | 'COURT'
  | 'MOYEN'
  | 'LONG'
  | 'LOINTAIN';
export type QualDecision = 'INCONNU' | 'OUI' | 'PARTAGE' | 'NON';
export type QualBien =
  | 'INCONNU'
  | 'MAISON'
  | 'APPARTEMENT'
  | 'IMMEUBLE'
  | 'LOCAL_PRO';

export interface QualificationInput {
  delai: QualDelai;
  decision: QualDecision;
  bien: QualBien;
  note?: string;
}

export interface QualificationResult {
  score: number;
  maxScore: number;
  tier: LeadTier;
  reasons: string[];
}

export interface QualificationRecord extends QualificationInput, QualificationResult {
  at: string; // ISO
}

/** Options + libellés + points, centralisés (UI et scoring partagent la source). */
export const QUAL_OPTIONS = {
  delai: [
    { value: 'INCONNU', label: 'À préciser', points: 0 },
    { value: 'IMMEDIAT', label: 'Immédiat / urgent', points: 12 },
    { value: 'COURT', label: 'Moins de 3 mois', points: 10 },
    { value: 'MOYEN', label: '3 à 6 mois', points: 6 },
    { value: 'LONG', label: '6 à 12 mois', points: 3 },
    { value: 'LOINTAIN', label: 'Plus de 12 mois', points: 1 },
  ],
  decision: [
    { value: 'INCONNU', label: 'À préciser', points: 0 },
    { value: 'OUI', label: 'Oui, interlocuteur décideur', points: 8 },
    { value: 'PARTAGE', label: 'Décision partagée', points: 4 },
    { value: 'NON', label: 'Non décisionnaire', points: 1 },
  ],
  bien: [
    { value: 'INCONNU', label: 'À préciser', points: 0 },
    { value: 'MAISON', label: 'Maison individuelle', points: 6 },
    { value: 'LOCAL_PRO', label: 'Local professionnel', points: 5 },
    { value: 'APPARTEMENT', label: 'Appartement', points: 3 },
    { value: 'IMMEUBLE', label: 'Immeuble / copropriété', points: 2 },
  ],
} as const;

// Le score maximum = somme des meilleures options de chaque axe.
const axisMax = (axis: readonly { points: number }[]) =>
  Math.max(...axis.map((o) => o.points));
export const QUAL_MAX_SCORE =
  axisMax(QUAL_OPTIONS.delai) +
  axisMax(QUAL_OPTIONS.decision) +
  axisMax(QUAL_OPTIONS.bien); // 12 + 8 + 6 = 26

const REASON_LABEL: Record<keyof typeof QUAL_OPTIONS, string> = {
  delai: 'Délai',
  decision: 'Décisionnaire',
  bien: 'Type de bien',
};

function pointsFor<K extends keyof typeof QUAL_OPTIONS>(
  axis: K,
  value: string
): { points: number; label: string } {
  const opt =
    (QUAL_OPTIONS[axis] as readonly { value: string; label: string; points: number }[]).find(
      (o) => o.value === value
    ) ?? QUAL_OPTIONS[axis][0];
  return { points: opt.points, label: opt.label };
}

/** Calcule score + tier à partir des 3 axes. HOT ≥ 18, WARM ≥ 9, sinon COLD.
 * (Le budget travaux n'entre PAS dans la qualif d'appel : il vient après le diagnostic.) */
export function scoreQualification(input: QualificationInput): QualificationResult {
  const reasons: string[] = [];
  let score = 0;
  for (const axis of ['delai', 'decision', 'bien'] as const) {
    const { points, label } = pointsFor(axis, input[axis]);
    score += points;
    if (points > 0) reasons.push(`${REASON_LABEL[axis]} : ${label}`);
  }
  const tier: LeadTier = score >= 18 ? 'HOT' : score >= 9 ? 'WARM' : 'COLD';
  return { score, maxScore: QUAL_MAX_SCORE, tier, reasons };
}
