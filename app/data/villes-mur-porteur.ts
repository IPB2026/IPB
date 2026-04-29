/**
 * Villes couvertes par la route /expert-mur-porteur/[ville].
 *
 * Critère de sélection : marché immobilier dense (rénovations,
 * ouvertures cuisine sur séjour, lofts urbains, pavillons à
 * agrandir). Centres urbains principaux + périphérie résidentielle
 * aisée de Toulouse + sous-préfectures.
 *
 * Étendre cette liste demande aussi de :
 * - vérifier que le slug existe dans `villesData`
 * - s'assurer que la ville a une description riche pour SEO
 *
 * Toutes les routes qui dépendent de cette liste l'importent depuis
 * ici (page dynamique, sitemap, maillage interne fissures →
 * mur porteur). Source unique de vérité.
 */

export const VILLES_MUR_PORTEUR = [
  // Haute-Garonne — Toulouse + périphérie aisée (marché rénovation dense)
  'toulouse',
  'colomiers',
  'tournefeuille',
  'blagnac',
  'muret',
  'castanet-tolosan',
  'ramonville-saint-agne',
  'plaisance-du-touch',
  'saint-orens-de-gameville',
  'cugnaux',
  'balma',
  'lunion',

  // Tarn — Albi capitale + Castres
  'albi',
  'castres',
  'gaillac',

  // Tarn-et-Garonne
  'montauban',
  'castelsarrasin',

  // Gers
  'auch',

  // Ariège
  'pamiers',
  'foix',
] as const;

export type VilleMurPorteur = typeof VILLES_MUR_PORTEUR[number];

/**
 * Helper : pour le maillage interne fissures → mur porteur,
 * trouve la ville mur porteur la plus pertinente à proposer.
 * Retourne `villeSlug` s'il est dans la liste, sinon 'toulouse'
 * (fallback vers la ville d'autorité).
 */
export function getVilleMurPorteurFallback(villeSlug: string): VilleMurPorteur {
  return (VILLES_MUR_PORTEUR as readonly string[]).includes(villeSlug)
    ? (villeSlug as VilleMurPorteur)
    : 'toulouse';
}
