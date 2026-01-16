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
 * Génère le JSON-LD Article pour SEO
 */
export function generateArticleJsonLd(article: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
  keywords: string[];
  category: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: `${baseUrl}/images/IPB_Logo_HD.png`,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: 'IPB - Institut de Pathologie du Bâtiment',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'IPB',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/IPB_Logo_HD.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${article.slug}`,
    },
    keywords: article.keywords.join(', '),
    articleSection: article.category,
    inLanguage: 'fr-FR',
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
