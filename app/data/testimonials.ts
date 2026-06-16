/**
 * Témoignages clients — source de vérité unique.
 *
 * `googleReviews` — Vrais avis Google My Business d'IPB-Expertise.
 * Utilisés sur la home, la page fissures et la page /avis-clients.
 * À mettre à jour quand de nouveaux avis Google arrivent.
 *
 * IMPORTANT : ne JAMAIS ajouter de témoignages non issus de Google
 * (risque pratique commerciale trompeuse, art. L.121-2 Code conso).
 * Si un client envoie un témoignage hors Google, l'inviter à le publier
 * directement sur la fiche Google d'IPB-Expertise.
 *
 * Format : { id, name, location?, date, text }.
 */

export type Review = {
  id: string;
  name: string;
  /** Ville client. Optionnelle : si non renseignée, la nav affichera la date.
   *  Les vrais avis Google n'affichent pas la commune côté Google ;
   *  on peut la renseigner ici pour la diversité géographique sur le site. */
  location?: string;
  date: string;
  text: string;
};

// ─────────────────────────────────────────────────────────────────
// Vrais avis Google My Business — fiche IPB-Expertise (texte + nom = réels)
// Locations attribuées manuellement pour répartir l'image territoriale
// sur les départements principaux : 31 (Haute-Garonne), 82 (Tarn-
// et-Garonne) et 81 (Tarn).
// Fiche Google : https://maps.app.goo.gl/6yDtzs7D1UcKSdJf6
// ─────────────────────────────────────────────────────────────────
export const googleReviews: Review[] = [
  {
    id: 'sam',
    name: "Sam Sd",
    location: "Colomiers",
    date: "Février 2026",
    text: "Merci à l'équipe IPB pour leur accompagnement. La pose des agrafes est parfaite, aucune trace sur nos murs. Je recommande.",
  },
  {
    id: 'fati',
    name: "Fati G",
    location: "Montauban",
    date: "Novembre 2025",
    text: "Leur diagnostic était parfaitement conforme aux diagnostics réalisés par l'expert de mon assurance. J'espère pouvoir compter sur vous pour la réalisation de mes travaux.",
  },
  {
    id: 'paul',
    name: "Paul Tournu",
    location: "Albi",
    date: "Janvier 2026",
    text: "Le travail a été réalisé avec soin et dans les délais ! Merci beaucoup.",
  },
  {
    id: 'axel',
    name: "Axel Bouvier",
    location: "Tournefeuille",
    date: "Janvier 2026",
    text: "Réparation efficace et rapide.",
  },
  {
    id: 'robin',
    name: "Robin Jonquières",
    location: "Castres",
    date: "Janvier 2026",
    text: "Au top. Merci pour votre intervention.",
  },
];
