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
