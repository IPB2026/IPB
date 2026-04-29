/**
 * Helper SEO — génération de FAQPage JSON-LD géolocalisé
 *
 * Objectif : produire des rich snippets « accordéon » dans les SERPs locales
 * pour les routes dynamiques (/villes/[ville], /quartiers/[quartier],
 * /expert-fissures/[ville]).
 *
 * 5 questions par défaut, avec variantes locales si on connaît la ville
 * (RGA, arrêtés CAT-NAT, type de construction).
 *
 * Voir AUDIT_SEO_LOCAL_2026.md — Levier #2.
 */

export type LocalFAQEntry = {
  question: string;
  answer: string;
};

export type LocalFAQContext = {
  /** Nom affichable (ex : "Colomiers", "Toulouse Saint-Cyprien") */
  villeNom: string;
  /** Code postal (ex : "31770") — optionnel */
  codePostal?: string;
  /** Département (ex : "Haute-Garonne") — optionnel */
  departement?: string;
  /** Niveau de risque RGA si connu */
  risqueRGA?: 'faible' | 'moyen' | 'fort' | 'tres-fort';
  /** Quartiers à risque si connus */
  quartiersRisque?: string[];
  /** Type de construction prédominante */
  typesConstruction?: string;
};

/**
 * Génère une liste de Q/R adaptées à la ville.
 * Les questions sont les mêmes partout (cohérence SEO), les réponses
 * intègrent {ville} et les données géolocalisées disponibles.
 */
export function generateLocalFAQ(ctx: LocalFAQContext): LocalFAQEntry[] {
  const v = ctx.villeNom;
  const cp = ctx.codePostal ? ` (${ctx.codePostal})` : '';
  const dep = ctx.departement || 'Haute-Garonne';

  const rgaIntro = (() => {
    switch (ctx.risqueRGA) {
      case 'tres-fort':
        return `${v} est classée en zone de risque très fort de retrait-gonflement des argiles (RGA).`;
      case 'fort':
        return `${v} est exposée à un risque fort de retrait-gonflement des argiles (RGA).`;
      case 'moyen':
        return `${v} présente un risque moyen de retrait-gonflement des argiles (RGA).`;
      case 'faible':
        return `${v} est en zone de risque faible de retrait-gonflement des argiles, mais des sinistres restent possibles.`;
      default:
        return `${v} se situe en Occitanie, région exposée au retrait-gonflement des argiles (RGA), première cause de fissures structurelles.`;
    }
  })();

  const quartiersTxt = ctx.quartiersRisque && ctx.quartiersRisque.length > 0
    ? ` Les quartiers les plus exposés à ${v} sont notamment ${ctx.quartiersRisque.slice(0, 3).join(', ')}.`
    : '';

  const constructionTxt = ctx.typesConstruction
    ? ` Le bâti dominant à ${v} (${ctx.typesConstruction}) influence la nature des désordres : nous adaptons le diagnostic au type de construction.`
    : '';

  return [
    {
      question: `Pourquoi y a-t-il autant de fissures à ${v} ?`,
      answer: `${rgaIntro} Les sécheresses de 2003, 2018, 2022 et 2023 ont multiplié les sinistres dans le ${dep}.${quartiersTxt}${constructionTxt} Notre ingénieur structure réalise un diagnostic in situ pour distinguer les fissures cosmétiques des fissures structurelles à ${v}.`,
    },
    {
      question: `Quels sont les délais d'intervention d'IPB à ${v}${cp} ?`,
      answer: `IPB intervient à ${v} sous 48 à 72 heures pour le diagnostic, depuis Toulouse. Le rapport d'expertise vous est remis sous 7 jours. Pour les chantiers (agrafage, injection, reprise en sous-œuvre), les travaux sont planifiés sous 3 à 6 semaines selon la disponibilité des matériaux et l'urgence.`,
    },
    {
      question: `Combien coûte une expertise fissures ou humidité à ${v} ?`,
      answer: `Le diagnostic préalable téléphonique est gratuit. L'expertise sur site à ${v} démarre à 350 € TTC pour un diagnostic visuel avec rapport. Pour une expertise approfondie (instruments de mesure, suivi de l'évolution des fissures, contre-expertise assurance) le devis est établi sous 24 h après le premier échange.`,
    },
    {
      question: `Mon assurance prend-elle en charge l'expertise à ${v} ?`,
      answer: `Si votre commune (${v}) a fait l'objet d'un arrêté de catastrophe naturelle « sécheresse-réhydratation des sols », votre assurance habitation peut prendre en charge tout ou partie des frais d'expertise et des travaux. IPB vous accompagne dans le montage du dossier CAT-NAT, la déclaration de sinistre et la contre-expertise si nécessaire.`,
    },
    {
      question: `Intervenez-vous aussi sur les problèmes d'humidité à ${v} ?`,
      answer: `Oui. À ${v}, IPB traite l'ensemble des pathologies humidité : remontées capillaires, salpêtre, condensation, infiltrations, mérule. Notre méthode commence par un diagnostic mesure d'humidité (sondes capacitives) avant tout traitement. Nous ne vendons pas de matériel, ce qui garantit la neutralité du diagnostic.`,
    },
  ];
}

/**
 * Sérialise une liste Q/R au format JSON-LD FAQPage attendu par Google.
 */
export function buildFAQPageJsonLd(faq: LocalFAQEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.answer,
      },
    })),
  };
}

/**
 * Bloc aggregateRating réutilisable, cohérent avec les pages Toulouse statiques.
 * À insérer dans les JSON-LD LocalBusiness des routes dynamiques.
 *
 * Les valeurs reflètent la moyenne actuelle des avis Google IPB.
 * À mettre à jour ponctuellement si l'agrégat évolue significativement.
 */
export const IPB_AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: '4.9',
  reviewCount: '15',
  bestRating: '5',
  worstRating: '1',
} as const;
