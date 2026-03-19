import { MetadataRoute } from 'next';
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
// Réduit aux 5 pages les plus fortes ; les 4 retirées restent accessibles via maillage interne
const spokeHumiditePages = [
  'remontee-capillaire-solution',
  'salpetre-mur-traitement',
  'condensation-ou-infiltration',
  'merule-champignon-traitement',
  'moisissures-maison-sante',
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
  
  // Dates réalistes — Google pénalise les sitemaps où tout est marqué "modifié aujourd'hui"
  const recentUpdate = new Date('2026-02-10');
  const contentDate = new Date('2026-01-15');
  const stableDate = new Date('2025-11-01');

  // ════════════════════════════════════════════════════════════
  // PAGES STATIQUES PRINCIPALES
  // ════════════════════════════════════════════════════════════
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/diagnostic`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise/fissures`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/expertise/humidite`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: stableDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/plan-site`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/legal/mentions-legales`,
      lastModified: stableDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cgv`,
      lastModified: stableDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/confidentialite`,
      lastModified: stableDate,
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
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expert-fissures-montauban-82`,
      lastModified: contentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/expert-humidite-toulouse-31`,
      lastModified: recentUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/expertise-avant-achat-immobilier-toulouse`,
      lastModified: contentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // ════════════════════════════════════════════════════════════
  // PAGES DÉPARTEMENTS (SEO régional)
  // ════════════════════════════════════════════════════════════
  const departementPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/departements`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/departements/haute-garonne`,
      lastModified: contentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/departements/tarn-et-garonne`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/gers`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/ariege`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/departements/aude`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/departements/tarn`,
      lastModified: contentDate,
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
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES SPOKE - TOPIC CLUSTERS HUMIDITÉ
  // ════════════════════════════════════════════════════════════
  const spokeHumPages: MetadataRoute.Sitemap = spokeHumiditePages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES E-E-A-T
  // ════════════════════════════════════════════════════════════
  const eeatPagesMap: MetadataRoute.Sitemap = eeatPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES TRIGGER EVENTS (Actualités)
  // ════════════════════════════════════════════════════════════
  const triggerEventsPagesMap: MetadataRoute.Sitemap = triggerEventsPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: recentUpdate,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // ════════════════════════════════════════════════════════════
  // VILLES PRIORITAIRES POUR LE SITEMAP
  // Réduit à 6 villes stratégiques pour concentrer le crawl budget.
  // Les autres restent accessibles via le maillage interne.
  // ════════════════════════════════════════════════════════════
  const priorityVilles = [
    'toulouse', 'colomiers', 'muret',
    'montauban', 'auch', 'albi',
  ];

  const expertFissuresPages: MetadataRoute.Sitemap = priorityVilles.map((ville) => ({
    url: `${baseUrl}/expert-fissures/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.78,
  }));

  const expertHumiditePages: MetadataRoute.Sitemap = priorityVilles.map((ville) => ({
    url: `${baseUrl}/expert-humidite/${ville}`,
    lastModified: contentDate,
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
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Quartiers et problèmes retirés du sitemap pour concentrer le crawl budget.
  // Google les découvrira via le maillage interne quand l'autorité du site aura grandi.

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
  ];
}
