// ═══════════════════════════════════════════════════════════════
// VILLES PRIORITAIRES — Pilotage de l'indexation SEO local
// ═══════════════════════════════════════════════════════════════
//
// Contexte (audit 23/06/2026) :
//   GSC remontait ~72 pages villes "Explorée/Détectée, actuellement non indexée".
//   Le domaine n'a pas (encore) assez d'autorité pour faire ranker 67 villes × 2
//   services. On CONCENTRE l'autorité et le budget de crawl sur un cœur de villes
//   à réel potentiel, et on DÉSINDEXE (noindex + hors sitemap) le reste.
//
// Critère retenu :
//   - Zone cœur 31 / 82 / 32 (Haute-Garonne, Tarn-et-Garonne, Gers)
//   - Population ≥ ~12 000 hab. OU chef-lieu desservi (Toulouse, Montauban, Auch)
//   Les communes plus petites et les départements secondaires (81 Tarn, 09 Ariège)
//   restent ACCESSIBLES (et utilisables en landing Google Ads) mais en `noindex` :
//   ils ne diluent plus le signal de qualité du domaine.
//
// 👉 Pour réindexer / désindexer une ville : ajouter / retirer son slug ici.
//    Une fois le cœur en page 1, on pourra réélargir progressivement.
// ═══════════════════════════════════════════════════════════════

export const VILLES_PRIORITAIRES: ReadonlySet<string> = new Set<string>([
  // — Haute-Garonne (31) : Toulouse + agglomération —
  'toulouse',
  'colomiers',
  'tournefeuille',
  'muret',
  'blagnac',
  'plaisance-du-touch',
  'cugnaux',
  'balma',
  'castanet-tolosan',
  'ramonville-saint-agne',
  'saint-orens-de-gameville',
  'fonsorbes',
  'lunion',
  // — Tarn-et-Garonne (82) —
  'montauban',
  'castelsarrasin',
  'moissac',
  // — Gers (32) —
  'auch',
]);

/** True si la page ville doit être indexée (robots index + présence sitemap). */
export function isVillePrioritaire(slug: string): boolean {
  return VILLES_PRIORITAIRES.has(slug);
}
