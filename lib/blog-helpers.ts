/**
 * Helpers pour le blog - SEO et structure
 */

import { generatePersonSchema } from '@/lib/authors';

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
 * Image de couverture par défaut selon la catégorie de l'article.
 * Utilisée comme fallback quand `coverImage` n'est pas défini.
 *
 * Bonne pratique SEO : Google Discover, rich snippets et partages sociaux
 * exigent une image pertinente au contenu (pas le logo générique).
 */
export function getCategoryFallbackImage(category: string, keywords: string[] = []): string {
  const kw = keywords.join(' ').toLowerCase();
  if (kw.includes('mur porteur') || kw.includes('baie vitree') || kw.includes('baie vitrée')) {
    return '/images/ouverture-mur-porteur.webp';
  }
  if (category === 'fissures') return '/images/fissures-avant-apres.webp';
  if (category === 'humidite') return '/images/humidite-avant-apres.webp';
  if (category === 'expertise') return '/images/ludovic-expert-ipb.webp';
  return '/images/fissures-avant-apres.webp'; // catégorie 'conseils' et autres
}

/**
 * Génère le JSON-LD Article pour SEO (version enrichie)
 */
export function generateArticleJsonLd(article: {
  title: string;
  excerpt: string;
  date: string;
  dateModified?: string;
  author: string;
  slug: string;
  keywords: string[];
  category: string;
  readTime?: string;
  coverImage?: string;
}) {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

  const readTimeMinutes = article.readTime ? parseInt(article.readTime) : 8;
  const wordCount = readTimeMinutes * 200;

  const imagePath = article.coverImage || getCategoryFallbackImage(article.category, article.keywords);
  const imageUrl = imagePath.startsWith('http') ? imagePath : `${baseUrl}${imagePath}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${baseUrl}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    author: generatePersonSchema(article.author),
    publisher: {
      '@type': 'Organization',
      '@id': `${baseUrl}#organization`,
      name: 'IPB - Institut de Pathologie du Bâtiment',
      url: baseUrl,
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
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');

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

/**
 * Calcule le temps de lecture estimé en minutes à partir du contenu HTML.
 *
 * Vitesse de lecture moyenne en français : 220 mots/minute (contre 250-300 en
 * anglais). Plus prudent pour un contenu technique avec tableaux et listes.
 *
 * Arrondit à la minute supérieure et formate en "X min".
 */
export function computeReadTime(htmlContent: string): string {
  // Strip HTML tags pour ne compter que le contenu textuel
  const text = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} min`;
}

/**
 * Retourne l'article précédent et suivant pour la navigation en fin
 * d'article. Logique : tri par date desc, puis prev = plus ancien,
 * next = plus récent (chronologique inversé pour la lecture).
 *
 * Préfère la même catégorie quand possible (boost engagement +
 * pertinence Google).
 */
export function getPrevNextArticles(
  currentSlug: string,
  allArticles: { slug: string; title: string; date: string; category: string }[]
): {
  prev: { slug: string; title: string; category: string } | null;
  next: { slug: string; title: string; category: string } | null;
} {
  const sorted = [...allArticles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const idx = sorted.findIndex(a => a.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };

  // Tenter d'abord la navigation dans la même catégorie
  const currentCat = sorted[idx].category;
  const sameCat = sorted.filter(a => a.category === currentCat);
  const catIdx = sameCat.findIndex(a => a.slug === currentSlug);

  const prevSameCat = catIdx >= 0 && catIdx < sameCat.length - 1 ? sameCat[catIdx + 1] : null;
  const nextSameCat = catIdx > 0 ? sameCat[catIdx - 1] : null;

  // Fallback global si pas d'article dans la même catégorie
  const prevGlobal = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const nextGlobal = idx > 0 ? sorted[idx - 1] : null;

  return {
    prev: prevSameCat ?? prevGlobal,
    next: nextSameCat ?? nextGlobal,
  };
}

/**
 * Extrait les "key takeaways" d'un article pour générer un bloc TL;DR
 * en début d'article (boost AI Overviews + lisibilité).
 *
 * Stratégie :
 *   1. Cherche un <h2> du type "Ce qu'il faut retenir" / "À retenir" / "L'essentiel"
 *   2. Extrait les <li> de l'<ul> qui suit
 *   3. Nettoie le HTML interne (garde <strong> mais retire ✅/❌ emojis)
 *
 * Retourne null si aucune section "à retenir" trouvée — la page n'affiche
 * alors pas le bloc TL;DR.
 */
export function extractKeyTakeaways(htmlContent: string): string[] | null {
  // Cherche <h2>Pattern "à retenir"</h2><ul>...</ul>
  const pattern = /<h2[^>]*>\s*(?:Ce qu'il faut retenir|À retenir|A retenir|L['']essentiel|En bref|Récap|Résumé)[\s\S]*?<\/h2>\s*<ul[^>]*>([\s\S]*?)<\/ul>/i;
  const match = htmlContent.match(pattern);
  if (!match) return null;

  const ulContent = match[1];
  const liPattern = /<li[^>]*>([\s\S]*?)<\/li>/g;
  const items: string[] = [];
  let liMatch;
  while ((liMatch = liPattern.exec(ulContent)) !== null) {
    let item = liMatch[1].trim();
    // Retirer les emojis ✅/❌/💡/⚠️ en début (le bloc TL;DR a son propre style)
    item = item.replace(/^(?:✅|❌|💡|⚠️|⭐|🔴|🟠|🟡|🟢)\s*/, '');
    // Garder les <strong> mais retirer les autres tags
    item = item.replace(/<(?!\/?strong\b)[^>]+>/g, '').trim();
    if (item) items.push(item);
  }

  return items.length >= 2 ? items : null;
}

/**
 * Génère un schema HowTo pour les articles structurés en étapes.
 * Détecte la présence d'au moins 3 <h3> commençant par "Étape", "1.", "01"
 * ou similaire pour confirmer la structure step-by-step.
 *
 * Retourne null si l'article n'est pas structuré comme un how-to.
 */
export function generateHowToSchema(article: {
  title: string;
  metaDescription: string;
  slug: string;
  date: string;
  content: string;
}): object | null {
  // Détection : on cherche des <h3> qui ressemblent à des étapes
  const stepPattern = /<h3[^>]*>\s*(?:Étape\s+\d+|\d+\.|0?\d\s*[—–-]?\s*)([^<]+?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  const steps: { name: string; text: string }[] = [];
  let match;
  while ((match = stepPattern.exec(article.content)) !== null) {
    const name = match[1].replace(/<[^>]+>/g, '').trim();
    const text = match[2].replace(/<[^>]+>/g, '').trim();
    if (name && text) steps.push({ name, text });
  }

  // Need at least 3 steps to qualify as HowTo
  if (steps.length < 3) return null;

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ipb-expertise.fr').replace(/\/+$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: article.title,
    description: article.metaDescription,
    url: `${baseUrl}/blog/${article.slug}`,
    datePublished: article.date,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
