/**
 * Helpers pour le blog - SEO et structure
 */

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * Extrait les headings HTML et génère un sommaire
 */
export function extractTocFromContent(htmlContent: string): TocItem[] {
  const headingRegex = /<h([23])>(.*?)<\/h[23]>/gi;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1]);
    const title = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
    const id = slugify(title);
    
    toc.push({ id, title, level });
  }

  return toc;
}

/**
 * Convertit un titre en slug (id pour ancre)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Ajoute des IDs aux headings pour les ancres
 */
export function addIdsToHeadings(htmlContent: string): string {
  return htmlContent.replace(/<h([23])>(.*?)<\/h[23]>/gi, (match, level, title) => {
    const cleanTitle = title.replace(/<[^>]*>/g, '');
    const id = slugify(cleanTitle);
    return `<h${level} id="${id}">${title}</h${level}>`;
  });
}

/**
 * Génère le JSON-LD Article pour SEO (version enrichie)
 */
export function generateArticleJsonLd(article: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  keywords: string[];
  category: string;
  readTime?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  
  // Calcul du wordCount approximatif basé sur readTime (200 mots/min)
  const readTimeMinutes = article.readTime ? parseInt(article.readTime) : 8;
  const wordCount = readTimeMinutes * 200;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/IPB_Logo_HD.png`,
      width: 1200,
      height: 630,
    },
    datePublished: article.date,
    dateModified: new Date().toISOString().split('T')[0], // Date actuelle pour freshness
    author: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'IPB - Institut de Pathologie du Bâtiment',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/IPB_Logo_HD.png`,
      },
      sameAs: [
        'https://www.google.com/maps?cid=YOUR_GOOGLE_CID', // À remplacer par votre CID Google
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'IPB - Institut de Pathologie du Bâtiment',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/IPB_Logo_HD.png`,
        width: 600,
        height: 60,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
    keywords: article.keywords.join(', '),
    articleSection: article.category,
    inLanguage: 'fr-FR',
    wordCount: wordCount,
    isAccessibleForFree: true,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.article-title', '.article-body p:first-of-type'],
    },
    about: {
      '@type': 'Thing',
      name: article.category === 'fissures' ? 'Fissures structurelles' : 
            article.category === 'humidite' ? 'Problèmes d\'humidité' :
            'Pathologie du bâtiment',
    },
  };
}

/**
 * Génère le JSON-LD BreadcrumbList pour SEO
 */
export function generateBreadcrumbJsonLd(breadcrumbs: { name: string; url: string }[]) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${baseUrl}${crumb.url}`,
    })),
  };
}
