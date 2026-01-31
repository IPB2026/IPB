import { MetadataRoute } from 'next';
import { villeSlugs } from '@/app/data/villes';
import { problemSlugs } from '@/app/data/problems';
import { quartierSlugs } from '@/app/data/quartiers';
import { blogPostsSlugs } from '@/app/data/blog';

// 🎯 Articles de blog - Import automatique depuis source unique
// Plus besoin de liste hardcodée, les slugs sont synchronisés automatiquement !

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

  return [...staticPages, ...departementPages, ...villesPages, ...servicePages, ...blogPages, ...problemPages, ...quartierPages];
}

