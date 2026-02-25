import { MetadataRoute } from 'next';
import { villeSlugs } from '@/app/data/villes';
import { problemSlugs } from '@/app/data/problems';
import { quartierSlugs } from '@/app/data/quartiers';
import { blogPostsSlugs } from '@/app/data/blog';

// ═══════════════════════════════════════════════════════════════
// SITEMAP SEO OPTIMISÉ - IPB EXPERTISE
// ═══════════════════════════════════════════════════════════════
//
// Structure hiérarchique des priorités :
// 1.0 : Page d'accueil
// 0.9 : Pages de conversion (diagnostic, hubs principaux)
// 0.8 : Spokes (topic clusters), pages expertise
// 0.78 : Pages locales transactionnelles (expert-fissures/[ville])
// 0.7-0.75 : Blog, départements
// 0.6-0.68 : Pages secondaires (villes, quartiers, problèmes)
// 0.3-0.5 : Pages légales, plan du site
//
// ═══════════════════════════════════════════════════════════════

// 🎯 Pages SPOKE Fissures (Topic Clusters - Hub & Spoke)
const spokeFissuresPages = [
  'fissure-en-escalier-causes',
  'fissure-horizontale-danger',
  'microfissure-quand-sinquieter',
  'fissure-secheresse-indemnisation',
  'fissure-fondation-maison',
];

// 🎯 Pages SPOKE Humidité (Topic Clusters - Hub & Spoke)
const spokeHumiditePages = [
  'salpetre-mur-traitement',
  'remontee-capillaire-solution',
  'remontees-capillaires-traitement',
  'condensation-ou-infiltration',
  'merule-champignon-traitement',
  'vmi-ventilation-insufflation',
  'moisissures-maison-sante',
  'cave-humide-solutions',
  'ponts-thermiques-condensation',
];

// 📋 Pages E-E-A-T (Expertise, Experience, Authoritativeness, Trustworthiness)
const eeatPages = [
  'notre-expert',
  'avis-clients',
];

// 🎯 Pages Trigger Events (Actualités)
const triggerEventsPages = [
  'actualites/arrete-secheresse-2026',
  'actualites/canicule-proteger-maison',
  'actualites/infiltrations-automne-hiver',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');
  const currentDate = new Date();

  // ════════════════════════════════════════════════════════════
  // PAGES STATIQUES PRINCIPALES
  // ════════════════════════════════════════════════════════════
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/diagnostic`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise/fissures`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/expertise/humidite`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/plan-site`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/mentions-legales`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cgv`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/confidentialite`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ════════════════════════════════════════════════════════════
  // PAGES PILIERS GÉOGRAPHIQUES (SEO haute priorité)
  // ════════════════════════════════════════════════════════════
  const pillarPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/expert-fissures-toulouse-31`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expert-fissures-montauban-82`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/expert-humidite-toulouse-31`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise-avant-achat-immobilier-toulouse`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // ════════════════════════════════════════════════════════════
  // PAGES DÉPARTEMENTS (SEO régional)
  // ════════════════════════════════════════════════════════════
  const departementPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/departements/haute-garonne`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/departements/tarn-et-garonne`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/gers`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/ariege`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/aude`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/departements/tarn`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ════════════════════════════════════════════════════════════
  // PAGES SPOKE - TOPIC CLUSTERS FISSURES
  // Priorité haute car ces pages constituent le cluster thématique
  // ════════════════════════════════════════════════════════════
  const spokeFissPages: MetadataRoute.Sitemap = spokeFissuresPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES SPOKE - TOPIC CLUSTERS HUMIDITÉ
  // ════════════════════════════════════════════════════════════
  const spokeHumPages: MetadataRoute.Sitemap = spokeHumiditePages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES E-E-A-T
  // ════════════════════════════════════════════════════════════
  const eeatPagesMap: MetadataRoute.Sitemap = eeatPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES TRIGGER EVENTS (Actualités)
  // ════════════════════════════════════════════════════════════
  const triggerEventsPagesMap: MetadataRoute.Sitemap = triggerEventsPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // ════════════════════════════════════════════════════════════
  // VILLES PRIORITAIRES POUR LE SITEMAP
  // Seules les villes stratégiques sont dans le sitemap.
  // Les autres restent accessibles via le maillage interne
  // et seront indexées progressivement par Google.
  // ════════════════════════════════════════════════════════════
  const priorityVilles = [
    'toulouse', 'colomiers', 'muret', 'blagnac', 'balma',
    'tournefeuille', 'montauban', 'auch', 'albi', 'castres',
    'cugnaux', 'plaisance-du-touch', 'saint-orens-de-gameville',
    'ramonville-saint-agne',
  ];

  const expertFissuresPages: MetadataRoute.Sitemap = priorityVilles.map((ville) => ({
    url: `${baseUrl}/expert-fissures/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.78,
  }));

  const expertHumiditePages: MetadataRoute.Sitemap = priorityVilles.map((ville) => ({
    url: `${baseUrl}/expert-humidite/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.78,
  }));

  // /villes/ et /agrafage-fissures/ /traitement-humidite/ par ville
  // retirées du sitemap — trop de pages similaires dilue le crawl budget.
  // Google les découvrira via le maillage interne.

  // ════════════════════════════════════════════════════════════
  // ARTICLES DE BLOG
  // ════════════════════════════════════════════════════════════
  const blogPages: MetadataRoute.Sitemap = blogPostsSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES PROBLÈMES
  // ════════════════════════════════════════════════════════════
  const problemPages: MetadataRoute.Sitemap = problemSlugs.map((slug) => ({
    url: `${baseUrl}/problemes/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES QUARTIERS (SEO hyper-local Toulouse)
  // ════════════════════════════════════════════════════════════
  const quartierPages: MetadataRoute.Sitemap = quartierSlugs.map((quartier) => ({
    url: `${baseUrl}/quartiers/${quartier}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.68,
  }));

  // ════════════════════════════════════════════════════════════
  // ASSEMBLAGE FINAL DU SITEMAP
  // Ordre de priorité décroissante pour une meilleure lisibilité
  // ════════════════════════════════════════════════════════════
  return [
    ...staticPages, 
    ...pillarPages, 
    ...eeatPagesMap,
    ...triggerEventsPagesMap,
    ...spokeFissPages,
    ...spokeHumPages,
    ...departementPages, 
    ...expertFissuresPages,
    ...expertHumiditePages,
    ...blogPages, 
    ...quartierPages,
    ...problemPages,
  ];
}
