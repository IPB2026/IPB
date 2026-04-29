/**
 * Validation téléphone française — helper partagé client + serveur.
 *
 * Utilisé par tous les formulaires du site (diagnostic, callback,
 * contact, calculateur, quick callback) pour éviter les divergences
 * de validation et garantir que tout numéro accepté par le frontend
 * passe le backend.
 *
 * Formats acceptés (après nettoyage des espaces, points, tirets,
 * parenthèses) :
 *   - 0[1-9]XXXXXXXX        (10 chiffres, format France standard)
 *   - +33[1-9]XXXXXXXX      (12 caractères, international)
 *   - 0033[1-9]XXXXXXXX     (13 caractères, international avec 00)
 */

export const PHONE_FR_REGEX = /^(\+33|0033|0)[1-9]\d{8}$/;

export const PHONE_INVALID_MESSAGE =
  'Numéro de téléphone invalide. Format attendu : 06 12 34 56 78 ou +33 6 12 34 56 78.';

/**
 * Nettoie un numéro saisi : retire espaces (y compris insécables),
 * points, tirets, parenthèses. À utiliser avant validation regex
 * et avant envoi au backend.
 */
export function cleanPhone(input: string): string {
  return input.replace(/[\s .\-()]/g, '');
}

/**
 * Vérifie qu'un numéro (brut, peut contenir séparateurs) est un
 * téléphone français valide. Retourne true/false.
 */
export function isValidFrenchPhone(input: string): boolean {
  const cleaned = cleanPhone(input);
  return PHONE_FR_REGEX.test(cleaned);
}

/**
 * Retourne null si le numéro est valide, sinon le message d'erreur
 * standard. Utile pour les useState d'erreur côté formulaire.
 */
export function validatePhoneOrError(input: string): string | null {
  if (!input || !input.trim()) return null; // vide = pas d'erreur (champ optionnel)
  return isValidFrenchPhone(input) ? null : PHONE_INVALID_MESSAGE;
}
