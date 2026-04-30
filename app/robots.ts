import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      // Stances explicites pour les crawlers IA (recommandation GEO 2026).
      // On autorise GPTBot, ClaudeBot, PerplexityBot, Google-Extended et OAI-SearchBot
      // pour maximiser la citabilité dans AI Overviews / ChatGPT Search / Perplexity.
      // Voir public/llms.txt pour la politique éditoriale détaillée.
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin', '/api/', '/preview/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

