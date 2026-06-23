/**
 * Moteur de règles — CONFIG UNIQUE des seuils, délais et cadences du CRM (T6).
 *
 * Toutes les valeurs métier « magiques » (jours de relance, délais de suivi, SLA,
 * rétention corbeille…) vivent ICI. Modifier une règle = un seul endroit, versionné,
 * testable. Les modules importent ces constantes au lieu de coder des nombres en dur.
 *
 * Module PUR (aucun accès base/serveur) → importable partout et testable.
 */

export const RULES = {
  /** Jours pendant lesquels un dossier reste en « Suivi » après le rapport. */
  suiviDays: 14,

  /** Cadence des relances commerciales d'un devis sans réponse (jours après envoi). */
  relanceDevisDays: [3, 7, 14] as const,
  /** Cadence des relances d'une facture impayée (jours après échéance). */
  relanceFactureDays: [3, 7, 14] as const,

  /** Délai avant la demande d'avis Google (jours après envoi du rapport). */
  reviewDelayDays: 7,

  /** Rétention en corbeille avant purge définitive (jours). */
  trashRetentionDays: 30,

  /** Prospect « dormant » : aucun échange depuis N jours (→ à requalifier). */
  dormantDays: 30,
  /** Dossier terminé de longue date : suggestion d'archivage après N jours. */
  archiveSuggestDays: 182,

  /** Pause des relances auto si le gérant a été en contact dans les N derniers jours. */
  relancePauseDays: 3,

  /** Échéance par défaut d'une facture (jours). */
  factureDueDays: 30,

  /** SLA de rappel d'un lead chaud (heures) — pour alertes futures. */
  slaHotHours: 4,
} as const;

export const DAY_MS = 86_400_000;

/** Helper : date il y a N jours. */
export function daysAgo(n: number, from: number = Date.now()): Date {
  return new Date(from - n * DAY_MS);
}
