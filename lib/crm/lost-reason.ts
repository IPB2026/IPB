/**
 * Déduit un MOTIF DE PERTE structuré (T2) à partir du texte libre saisi par le
 * gérant. Codes : PRIX / DELAI / CONCURRENT / ABANDON / AUTRE (ou null si vide).
 * Module pur → testable.
 */
export function lostReasonCodeFromText(reason: string): string | null {
  const r = (reason || '').toLowerCase();
  if (!r) return null;
  if (/prix|cher|budget|co[ûu]t|tarif/.test(r)) return 'PRIX';
  if (/d[ée]lai|trop long|attente|temps/.test(r)) return 'DELAI';
  if (/concurr|autre (cabinet|expert|entreprise)|d[ée]j[àa] (vu|fait)/.test(r)) return 'CONCURRENT';
  if (/abandon|plus de nouvelle|injoignable|silence|ne r[ée]pond/.test(r)) return 'ABANDON';
  return 'AUTRE';
}

/**
 * Motifs de perte RÉCUPÉRABLES : le client voulait le service, quelque chose de
 * conjoncturel l'a empêché. Un prix jugé trop élevé au printemps se retente à
 * l'automne ; un délai trop long se retente quand le planning respire. À
 * l'inverse, CONCURRENT (les travaux ont été faits ailleurs) et ABANDON (le
 * besoin a disparu) ne se recyclent pas — relancer y serait du harcèlement.
 */
export const MOTIFS_RECYCLABLES = ['PRIX', 'DELAI'] as const;

/** Le dossier mérite-t-il une tâche de reprise ? */
export function estRecyclable(lostReasonCode: string | null | undefined): boolean {
  return MOTIFS_RECYCLABLES.includes(
    (lostReasonCode ?? '') as (typeof MOTIFS_RECYCLABLES)[number]
  );
}
