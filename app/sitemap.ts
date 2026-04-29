import { MetadataRoute } from 'next';
import { blogPostsList } from '@/app/data/blog';
import { villeSlugs } from '@/app/data/villes';
import { problemPages } from '@/app/data/problems';
import { quartierSlugs } from '@/app/data/quartiers';

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
  'remontee-capillaire-solution',
  'salpetre-mur-traitement',
  'condensation-ou-infiltration',
  'merule-champignon-traitement',
  'moisissures-maison-sante',
  'cave-humide-solutions',
  'ponts-thermiques-condensation',
  'remontees-capillaires-traitement',
  'vmi-ventilation-insufflation',
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
      url: `${baseUrl}/expertise/mur-porteur`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/rdv-cabinet`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/calcul-prix-mur-porteur`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/carte-secheresse-occitanie`,
      lastModified: contentDate,
      changeFrequency: 'monthly',
      priority: 0.72,
    },
    {
      url: `${baseUrl}/bureau-etude-structure-toulouse`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/partenaires`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/partenaires/architectes-interieur`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partenaires/marchands-de-biens`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partenaires/agences-immobilieres`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.8,
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
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/quartiers`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly',
      priority: 0.68,
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
    priority: 0.7,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGE ZONES D'INTERVENTION (mapping complet)
  // ════════════════════════════════════════════════════════════
  const zonesPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/zones-intervention`,
      lastModified: recentUpdate,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
  ];

  // ════════════════════════════════════════════════════════════
  // TOUTES LES VILLES — expert-fissures + expert-humidite
  // Chaque page ville a du contenu unique (géologie, stats, FAQ)
  // ════════════════════════════════════════════════════════════
  const priorityVillesSlugs = ['toulouse', 'colomiers', 'muret', 'montauban', 'auch', 'albi'];

  const expertFissuresPages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/expert-fissures/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: priorityVillesSlugs.includes(ville) ? 0.8 : 0.68,
  }));

  const expertHumiditePages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/expert-humidite/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: priorityVillesSlugs.includes(ville) ? 0.78 : 0.65,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES MUR PORTEUR PAR VILLE (Toulouse, Montauban, Auch, Albi)
  // Forte priorité — pivot stratégique
  // ════════════════════════════════════════════════════════════
  const expertMurPorteurPages: MetadataRoute.Sitemap = ['toulouse', 'montauban', 'auch', 'albi'].map((ville) => ({
    url: `${baseUrl}/expert-mur-porteur/${ville}`,
    lastModified: recentUpdate,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  // ════════════════════════════════════════════════════════════
  // ARTICLES DE BLOG
  // ════════════════════════════════════════════════════════════
  const blogPages: MetadataRoute.Sitemap = blogPostsList.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES AGRAFAGE-FISSURES + TRAITEMENT-HUMIDITE PAR VILLE
  // ════════════════════════════════════════════════════════════
  const agrafageFissuresPages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/agrafage-fissures/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  const traitementHumiditePages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/traitement-humidite/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES VILLES GÉNÉRIQUES
  // ════════════════════════════════════════════════════════════
  const villesPages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/villes/${ville}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES PROBLÈMES (Topic Cluster)
  // ════════════════════════════════════════════════════════════
  const problemesPages: MetadataRoute.Sitemap = problemPages.map((p) => ({
    url: `${baseUrl}/problemes/${p.slug}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // ════════════════════════════════════════════════════════════
  // PAGES QUARTIERS TOULOUSE
  // ════════════════════════════════════════════════════════════
  const quartiersPages: MetadataRoute.Sitemap = quartierSlugs.map((q) => ({
    url: `${baseUrl}/quartiers/${q}`,
    lastModified: contentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // ════════════════════════════════════════════════════════════
  // ASSEMBLAGE FINAL DU SITEMAP
  // ════════════════════════════════════════════════════════════
  return [
    ...staticPages, 
    ...pillarPages, 
    ...zonesPage,
    ...eeatPagesMap,
    ...triggerEventsPagesMap,
    ...spokeFissPages,
    ...spokeHumPages,
    ...departementPages, 
    ...expertFissuresPages,
    ...expertHumiditePages,
    ...expertMurPorteurPages,
    ...agrafageFissuresPages,
    ...traitementHumiditePages,
    ...villesPages,
    ...problemesPages,
    ...quartiersPages,
    ...blogPages,
  ];
}
