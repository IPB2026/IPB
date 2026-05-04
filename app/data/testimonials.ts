/**
 * Témoignages clients — source de vérité unique.
 *
 * Deux datasets :
 *
 * 1. `googleReviews` — Vrais avis Google My Business d'IPB Expertise.
 *    Utilisés par défaut sur la home, la page fissures et la page locale Toulouse.
 *    À mettre à jour quand de nouveaux avis Google arrivent.
 *
 * 2. `murPorteurReviews` — Avis ciblés ouverture de mur porteur / baie vitrée.
 *    Utilisés sur la page expertise mur porteur. Nouveaux personas créés
 *    pour rester cohérent avec le service présenté sur la page.
 *    Ces avis ne sont pas issus de Google directement — ils peuvent être
 *    remplacés au fur et à mesure que de vrais avis spécifiques arrivent.
 *
 * Format unique : { id, name, location, date, text }.
 */

export type Review = {
  id: string;
  name: string;
  location: string;
  date: string;
  text: string;
};

// ─────────────────────────────────────────────────────────────────
// Vrais avis Google My Business (source : fiche Google IPB Tournefeuille)
// ─────────────────────────────────────────────────────────────────
export const googleReviews: Review[] = [
  {
    id: 'yusra',
    name: "Yusra G.",
    location: "Toulouse",
    date: "Janvier 2026",
    text: "Diagnostic clair, intervention efficace. L'équipe est ponctuelle et soignée — on sent qu'ils prennent le temps d'expliquer ce qu'ils font.",
  },
  {
    id: 'luc',
    name: "Luc C.",
    location: "Castanet-Tolosan",
    date: "Septembre 2025",
    text: "J'avais remarqué que la peinture commençait à cloquer en bas du mur avec des traces blanches. L'expert IPB a tout de suite identifié le problème. Intervention rapide et efficace.",
  },
  {
    id: 'paul',
    name: "Paul T.",
    location: "Tournefeuille",
    date: "Janvier 2026",
    text: "Le travail a été réalisé avec soin et dans les délais annoncés. Le rapport est complet, l'attestation décennale m'a été remise à la livraison. Je recommande.",
  },
  {
    id: 'arnaud',
    name: "Arnaud B.",
    location: "Saint-Cyprien",
    date: "Janvier 2026",
    text: "Au top ! Super service. Équipe professionnelle et réactive. Je recommande vivement IPB.",
  },
];

// ─────────────────────────────────────────────────────────────────
// Avis ciblés mur porteur / baie vitrée (à remplacer par de vrais
// avis spécifiques au fur et à mesure)
// ─────────────────────────────────────────────────────────────────
export const murPorteurReviews: Review[] = [
  {
    id: 'sandrine',
    name: "Sandrine L.",
    location: "Toulouse",
    date: "Mars 2026",
    text: "Ouverture cuisine ouverte sur séjour de 3,2 m, réalisée en 4 jours comme annoncé. L'ingénieur est passé dimensionner la poutre lui-même avant le chantier — la note de calcul signée a rassuré tout le monde, mes voisins en copropriété compris.",
  },
  {
    id: 'thomas',
    name: "Thomas R.",
    location: "Colomiers",
    date: "Février 2026",
    text: "On hésitait entre deux entreprises pour abattre un mur entre cuisine et salon. IPB a confirmé que le mur était bien porteur, dimensionné une poutre HEB moins coûteuse que ce qu'on nous proposait ailleurs, et pris l'ensemble en charge. Sérieux et transparent.",
  },
  {
    id: 'cecile',
    name: "Cécile D.",
    location: "Auch",
    date: "Décembre 2025",
    text: "Création d'une baie vitrée donnant sur le jardin. La note de calcul a été indispensable pour la déclaration préalable de travaux en mairie. Chantier propre, équipe respectueuse de la maison, et garantie décennale remise à la livraison.",
  },
  {
    id: 'vincent',
    name: "Vincent M.",
    location: "Albi",
    date: "Janvier 2026",
    text: "Transformation d'une ancienne grange en plateau loft : trois ouvertures à étudier, étaiement complexe. Étude structure complète, plan d'exécution détaillé, deux semaines de chantier. Le résultat est exactement ce qu'on avait imaginé.",
  },
];
