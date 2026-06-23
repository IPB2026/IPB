/**
 * Normalisation des numéros de téléphone FR pour le CRM.
 *
 * Objectif : stocker un format CANONIQUE (E.164, ex. +33612345678) afin que
 * « 06 12 34 56 78 », « 0612345678 » et « +33 6 12 34 56 78 » désignent UNE SEULE
 * fiche, et que la déduplication à la capture du lead fonctionne réellement.
 *
 * Module pur (pas d'accès base/serveur) → testable et réutilisable côté client.
 */

/**
 * Normalise un numéro FR en E.164 (+33XXXXXXXXX) quand c'est possible. Si le
 * format est inattendu, renvoie les chiffres nettoyés (best effort), ou null.
 */
export function normalizePhoneFR(raw?: string | null): string | null {
  if (raw == null) return null;
  const trimmed = String(raw).trim();
  if (!trimmed) return null;

  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return null;

  // 0033XXXXXXXXX → +33XXXXXXXXX
  if (digits.startsWith('0033')) return '+' + digits.slice(2);
  // Déjà international avec « + » en tête (+33…, +32…, +44…) : on garde tel quel.
  if (hasPlus) return '+' + digits;
  // 33XXXXXXXXX (sans +) → +33XXXXXXXXX
  if (digits.length === 11 && digits.startsWith('33')) return '+' + digits;
  // 0XXXXXXXXX (national, 10 chiffres) → +33XXXXXXXXX
  if (digits.length === 10 && digits.startsWith('0')) return '+33' + digits.slice(1);
  // 9 chiffres sans le 0 initial → +33XXXXXXXXX
  if (digits.length === 9) return '+33' + digits;

  // Format non reconnu : on conserve les chiffres (mieux que de perdre la donnée).
  return digits;
}

/**
 * Affichage lisible d'un numéro E.164 FR : +33612345678 → « 06 12 34 56 78 ».
 * Repli : renvoie l'entrée si le format n'est pas un E.164 FR connu.
 */
export function formatPhoneFR(raw?: string | null): string {
  const e164 = normalizePhoneFR(raw);
  if (!e164) return '';
  if (e164.startsWith('+33') && e164.length === 12) {
    const national = '0' + e164.slice(3);
    return national.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
  }
  return e164;
}

/**
 * Variantes équivalentes d'un numéro, pour matcher les fiches existantes stockées
 * sous un autre format (national « 0X », E.164 « +33X », chiffres bruts). Utilisé
 * par la déduplication à la capture du lead.
 */
export function phoneVariants(raw?: string | null): string[] {
  const set = new Set<string>();
  const trimmed = raw == null ? '' : String(raw).trim();
  if (trimmed) set.add(trimmed);

  const e164 = normalizePhoneFR(raw);
  if (e164) {
    set.add(e164);
    set.add(e164.replace(/\D/g, '')); // chiffres bruts (33XXXXXXXXX)
    if (e164.startsWith('+33') && e164.length === 12) {
      set.add('0' + e164.slice(3)); // forme nationale 0XXXXXXXXX
    }
  }
  return [...set].filter(Boolean);
}
