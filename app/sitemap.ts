import { MetadataRoute } from 'next';

// Liste des villes pour le sitemap (pages SEO locales)
const villes = [
  'colomiers',
  'muret',
  'blagnac',
  'balma',
  'tournefeuille',
  'ramonville-saint-agne',
  'lunion',
  'cugnaux',
  'plaisance-du-touch',
  'saint-oren-de-gameville',
  'auzeville-tolosane',
  'castanet-tolosan',
  'fonsorbes',
  'portet-sur-garonne',
  'pibrac',
  'saint-jean',
  'fenouillet',
  'launaguet',
  'aucamville',
  'castelginest',
  'labege',
  'escalquens',
  'quint-fonsegrives',
  'villeneuve-tolosane',
  'seysses',
  'leguevin',
  'cornebarrieu',
  'rouffiac-tolosan',
  'saint-alban',
  'bruguières',
  'pechbonnieu',
  'castelmaurou',
  'montgiscard',
  'eaunes',
  'pins-justaret',
  'roques',
  'frouzins',
  'seilh',
  'mondonville',
  'lherm',
  'saint-lys',
  'labege-village',
  'mons',
  'saint-jeory',
  'gragnague',
  'baziège',
  'villate',
];

// Articles de blog
const blogSlugs = [
  'fissures-maison-toulouse-que-faire',
  'humidite-remontee-capillaire-solution',
  'agrafage-vs-micropieux-choix',
  'fissures-escalier-tassement-differentiel',
  'garantie-decennale-travaux-structure',
  'ventilation-humidite-condensation',
  'secheresse-argile-fondations-toulouse',
  'cout-reparation-fissures-2025',
  'moisissures-sante-traitement',
  'diagnostic-fissures-gratuit-toulouse',
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

  // Pages villes (SEO local)
  const villesPages: MetadataRoute.Sitemap = villes.map((ville) => ({
    url: `${baseUrl}/villes/${ville}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Articles de blog
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7, // Haute priorité pour le contenu SEO
  }));

  return [...staticPages, ...villesPages, ...blogPages];
}

