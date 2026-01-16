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
    priority: 0.6, // Priorité moyenne pour le SEO local
  }));

  return [...staticPages, ...villesPages];
}

