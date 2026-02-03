import { MetadataRoute } from 'next';
import { villeSlugs } from '@/app/data/villes';
import { problemSlugs } from '@/app/data/problems';
import { quartierSlugs } from '@/app/data/quartiers';
import { blogPostsSlugs } from '@/app/data/blog';

// 🎯 Pages SPOKE (Topic Clusters) - Hub & Spoke Strategy
const spokeFissuresPages = [
  'fissure-en-escalier-causes',
  'fissure-horizontale-danger',
  'microfissure-quand-sinquieter',
  'fissure-secheresse-indemnisation',
  'fissure-fondation-maison',
];

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

// 📋 Pages E-E-A-T
const eeatPages = [
  'notre-expert',
];

// 🎯 Pages Trigger Events (Actualités)
const triggerEventsPages = [
  'actualites/arrete-secheresse-2026',
  'actualites/canicule-proteger-maison',
  'actualites/infiltrations-automne-hiver',
];

// 🏘️ SEO Local Hyper-Maillé - Pages expert par ville
const expertFissuresVilles = [
  'toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'muret',
  'cugnaux', 'balma', 'ramonville-saint-agne', 'montauban', 'castelsarrasin',
  'auch', 'condom', 'saint-gaudens', 'plaisance-du-touch', 'l-union',
  'castanet-tolosan', 'saint-orens-de-gameville', 'fonsorbes', 'portet-sur-garonne', 'labege'
];

const expertHumiditeVilles = [
  'toulouse', 'colomiers', 'tournefeuille', 'blagnac', 'muret',
  'montauban', 'auch', 'cugnaux', 'balma', 'ramonville-saint-agne',
  'saint-gaudens', 'plaisance-du-touch', 'l-union', 'castanet-tolosan'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  const currentDate = new Date();

  // Pages principales
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
      priority: 0.8,
    },
    {
      url: `${baseUrl}/expertise/humidite`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
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

  // Pages piliers géographiques (SEO haute priorité)
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

  // Pages départements (SEO régional)
  const departementPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/departements/haute-garonne`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85, // Priorité haute car zone principale
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

  // Pages villes (SEO local)
  const villesPages: MetadataRoute.Sitemap = villeSlugs.map((ville) => ({
    url: `${baseUrl}/villes/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const serviceSlugs = ['agrafage-fissures', 'traitement-humidite'];
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.flatMap((service) =>
    villeSlugs.map((ville) => ({
      url: `${baseUrl}/${service}/${ville}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.55,
    }))
  );

  // Articles de blog (import automatique depuis blog.ts)
  const blogPages: MetadataRoute.Sitemap = blogPostsSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Haute priorité pour le contenu SEO
  }));

  const problemPages: MetadataRoute.Sitemap = problemSlugs.map((slug) => ({
    url: `${baseUrl}/problemes/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  // Pages quartiers (SEO hyper-local Toulouse)
  const quartierPages: MetadataRoute.Sitemap = quartierSlugs.map((quartier) => ({
    url: `${baseUrl}/quartiers/${quartier}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.68,
  }));

  // Pages SPOKE Fissures (Topic Clusters - Hub & Spoke)
  // Priorité haute car ces pages constituent le cluster thématique principal
  const spokeFissPages: MetadataRoute.Sitemap = spokeFissuresPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Priorité augmentée pour les spokes
  }));

  // Pages SPOKE Humidité (Topic Clusters - Hub & Spoke)
  // Priorité haute car ces pages constituent le cluster thématique humidité
  const spokeHumPages: MetadataRoute.Sitemap = spokeHumiditePages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8, // Priorité augmentée pour les spokes
  }));

  // Pages E-E-A-T
  const eeatPagesMap: MetadataRoute.Sitemap = eeatPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Pages Trigger Events (Actualités)
  const triggerEventsPagesMap: MetadataRoute.Sitemap = triggerEventsPages.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const, // Actualités = mises à jour fréquentes
    priority: 0.85,
  }));

  // Pages expert-fissures par ville (SEO Local Hyper-Maillé)
  // Priorité haute - Stratégie "Bottom of Funnel First" (intention d'achat forte)
  const expertFissuresPages: MetadataRoute.Sitemap = expertFissuresVilles.map((ville) => ({
    url: `${baseUrl}/expert-fissures/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.78, // Priorité augmentée pour SEO local transactionnel
  }));

  // Pages expert-humidite par ville (SEO Local Hyper-Maillé)
  // Priorité haute - Stratégie "Bottom of Funnel First" (intention d'achat forte)
  const expertHumiditePages: MetadataRoute.Sitemap = expertHumiditeVilles.map((ville) => ({
    url: `${baseUrl}/expert-humidite/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.78, // Priorité augmentée pour SEO local transactionnel
  }));

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
    ...villesPages, 
    ...servicePages, 
    ...blogPages, 
    ...problemPages, 
    ...quartierPages
  ];
}

