export type ProblemCategory = 'fissures' | 'humidite';

export interface ProblemPage {
  slug: string;
  title: string;
  excerpt: string;
  category: ProblemCategory;
  keywords: string[];
  primaryServiceUrl: string;
}

export const problemPages: ProblemPage[] = [
  {
    slug: 'fissure-verticale-mur-porteur',
    title: 'Fissure verticale sur mur porteur : danger ou simple défaut ?',
    excerpt:
      'Comment reconnaître une fissure structurelle, les signes d’alerte et la bonne réaction pour protéger votre maison.',
    category: 'fissures',
    keywords: ['fissure verticale', 'mur porteur', 'danger fissure', 'diagnostic fissure'],
    primaryServiceUrl: '/expertise/fissures',
  },
  {
    slug: 'fissure-escalier-que-faire',
    title: 'Fissure en escalier : que faire et quand s’inquiéter ?',
    excerpt:
      'Les fissures en escalier suivent les joints : pourquoi elles sont plus inquiétantes et comment réagir.',
    category: 'fissures',
    keywords: ['fissure en escalier', 'fissure mur', 'tassement différentiel'],
    primaryServiceUrl: '/expertise/fissures',
  },
  {
    slug: 'portes-qui-coincent-fissures',
    title: 'Portes qui coincent + fissures : un signe de mouvement ?',
    excerpt:
      'Quand la menuiserie se déforme, c’est souvent le signe que la structure bouge. Voici les bons réflexes.',
    category: 'fissures',
    keywords: ['portes qui coincent', 'fissures maison', 'structure bouge'],
    primaryServiceUrl: '/expertise/fissures',
  },
  {
    slug: 'fissure-apres-secheresse',
    title: 'Fissures après sécheresse : comment agir rapidement ?',
    excerpt:
      'Le sol argileux se rétracte, la maison bouge. Que faire dès les premières fissures ?',
    category: 'fissures',
    keywords: ['fissure sécheresse', 'sol argileux', 'fissure façade'],
    primaryServiceUrl: '/expertise/fissures',
  },
  {
    slug: 'revente-maison-fissuree',
    title: 'Revente d’une maison fissurée : comment éviter la décote ?',
    excerpt:
      'Une expertise sérieuse et des travaux garantis permettent de sécuriser une vente. Voici la stratégie.',
    category: 'fissures',
    keywords: ['maison fissurée revente', 'décote fissures', 'expertise fissures'],
    primaryServiceUrl: '/expertise/fissures',
  },
  {
    slug: 'humidite-murs-peinture-qui-cloque',
    title: 'Peinture qui cloque : quelle humidité se cache derrière ?',
    excerpt:
      'La peinture n’est qu’un symptôme. Apprenez à identifier la cause (remontées, infiltration, condensation).',
    category: 'humidite',
    keywords: ['peinture qui cloque', 'humidite murs', 'remontees capillaires'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'salpetre-mur',
    title: 'Salpêtre sur les murs : causes, risques et solution durable',
    excerpt:
      'Le salpêtre indique des remontées capillaires. Voici pourquoi et comment traiter durablement.',
    category: 'humidite',
    keywords: ['salpetre', 'remontees capillaires', 'humidite maison'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'moisissures-sante',
    title: 'Moisissures et santé : quand faut-il intervenir ?',
    excerpt:
      'Les moisissures impactent l’air intérieur. Diagnostic, ventilation et traitement : les étapes clés.',
    category: 'humidite',
    keywords: ['moisissures santé', 'air intérieur', 'condensation'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'condensation-ou-remontees-capillaires',
    title: 'Condensation ou remontées capillaires : comment faire la différence ?',
    excerpt:
      'Les signes ne sont pas les mêmes. Voici un guide simple pour éviter un mauvais traitement.',
    category: 'humidite',
    keywords: ['condensation', 'remontees capillaires', 'humidite mur'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'humidite-cave',
    title: 'Humidité dans la cave : que faire pour assainir durablement ?',
    excerpt:
      'Ventilation, drainage ou barrière chimique : quelle solution selon votre cas ?',
    category: 'humidite',
    keywords: ['humidite cave', 'assainissement', 'injection résine'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'odeur-humidite-maison',
    title: "Odeur d'humidité persistante : d'où vient le problème ?",
    excerpt:
      'Une odeur persistante cache souvent une cause structurelle. Voici comment la localiser.',
    category: 'humidite',
    keywords: ['odeur humidite', 'moisissures', 'air vicié'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'merule-champignon-bois-maison',
    title: 'Mérule : comment reconnaître ce champignon destructeur ?',
    excerpt:
      'La mérule est le champignon le plus dangereux pour votre maison. Apprenez à l\'identifier avant qu\'il ne soit trop tard.',
    category: 'humidite',
    keywords: ['mérule', 'champignon maison', 'champignon bois', 'pourriture bois', 'mérule pleureuse'],
    primaryServiceUrl: '/expertise/humidite',
  },
  {
    slug: 'salpetre-poudre-blanche-mur',
    title: 'Salpêtre : cette poudre blanche sur vos murs est un signal d\'alarme',
    excerpt:
      'Le salpêtre révèle un problème d\'humidité ascendante. Découvrez pourquoi il apparaît et comment l\'éliminer définitivement.',
    category: 'humidite',
    keywords: ['salpêtre', 'poudre blanche mur', 'remontée capillaire', 'nitrate potassium'],
    primaryServiceUrl: '/expertise/humidite',
  },
];

export const problemSlugs = problemPages.map((problem) => problem.slug);

export const problemBySlug = (slug: string) =>
  problemPages.find((problem) => problem.slug === slug);
