/**
 * Helpers SEO avancés pour maximiser le trafic organique
 */

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Génère le JSON-LD FAQPage pour les Rich Snippets Google
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Extrait automatiquement les FAQs d'un article (détecte les patterns H3 question + paragraphe réponse)
 */
export function extractFAQsFromContent(content: string): FAQItem[] {
  const faqs: FAQItem[] = [];
  
  // Pattern : <h3>Question ?</h3> suivi de <p>Réponse</p>
  const h3Regex = /<h3[^>]*>(.*?\?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gs;
  let match;
  
  while ((match = h3Regex.exec(content)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim(); // Enlever les balises HTML
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    
    if (question && answer) {
      faqs.push({ question, answer });
    }
  }
  
  return faqs;
}

/**
 * Génère le JSON-LD HowTo pour les articles techniques
 */
export function generateHowToSchema(title: string, steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Étape ${index + 1}`,
      text: step
    }))
  };
}

/**
 * Génère des liens internes contextuels basés sur les keywords
 */
export function getContextualLinks(currentSlug: string, keywords: string[]): Array<{ text: string; url: string; }> {
  const linkMap: Record<string, Array<{ text: string; url: string; }>> = {
    'fissures': [
      { text: 'diagnostic fissures gratuit', url: '/diagnostic' },
      { text: 'agrafage de fissures', url: '/expertise/fissures' },
      { text: 'expertise fissures Toulouse', url: '/villes/toulouse' }
    ],
    'humidite': [
      { text: 'traitement humidité', url: '/expertise/humidite' },
      { text: 'injection résine', url: '/blog/traitement-humidite-injection-resine' },
      { text: 'diagnostic humidité', url: '/diagnostic' }
    ],
    'agrafage': [
      { text: 'agrafage vs micropieux', url: '/blog/agrafage-vs-micropieux-choix' },
      { text: 'prix agrafage 2025', url: '/blog/cout-reparation-fissures-2025' },
      { text: 'agrafage Toulouse', url: '/expertise/fissures' }
    ],
    'salpetre': [
      { text: 'traitement salpêtre', url: '/blog/humidite-salpetre-traitement' },
      { text: 'remontées capillaires', url: '/blog/humidite-remontee-capillaire-solution' },
      { text: 'injection résine', url: '/blog/traitement-humidite-injection-resine' }
    ],
    'diagnostic': [
      { text: 'diagnostic structurel', url: '/blog/diagnostic-structurel-maison' },
      { text: 'diagnostic gratuit', url: '/diagnostic' },
      { text: 'expert fissures', url: '/expertise/fissures' }
    ],
    'toulouse': [
      { text: 'expert Toulouse', url: '/villes/toulouse' },
      { text: 'sol argileux Haute-Garonne', url: '/blog/secheresse-argile-haute-garonne' },
      { text: 'zones d\'intervention', url: '/contact' }
    ]
  };

  const links: Array<{ text: string; url: string; }> = [];
  
  // Parcourir les keywords et trouver les liens correspondants
  keywords.forEach(keyword => {
    const key = keyword.toLowerCase();
    Object.keys(linkMap).forEach(mapKey => {
      if (key.includes(mapKey)) {
        const relevantLinks = linkMap[mapKey].filter(link => 
          !link.url.includes(currentSlug) // Ne pas lier vers soi-même
        );
        links.push(...relevantLinks);
      }
    });
  });

  // Dédupliquer et limiter à 5 liens max
  const uniqueLinks = Array.from(new Map(links.map(link => [link.url, link])).values());
  return uniqueLinks.slice(0, 5);
}

/**
 * Génère les "related posts" intelligents basés sur les keywords communs
 */
export function getRelatedPosts(
  currentSlug: string, 
  currentKeywords: string[], 
  allPosts: Array<{ slug: string; title: string; keywords: string[]; category: string; }>
): Array<{ slug: string; title: string; score: number; }> {
  
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      // Calculer le score de pertinence
      const commonKeywords = post.keywords.filter(kw => 
        currentKeywords.some(currentKw => 
          kw.toLowerCase().includes(currentKw.toLowerCase()) || 
          currentKw.toLowerCase().includes(kw.toLowerCase())
        )
      );
      
      const score = commonKeywords.length;
      
      return {
        slug: post.slug,
        title: post.title,
        score
      };
    })
    .filter(post => post.score > 0) // Garder seulement ceux avec au moins 1 keyword commun
    .sort((a, b) => b.score - a.score) // Trier par pertinence
    .slice(0, 3); // Top 3
  
  return relatedPosts;
}

/**
 * Optimise les meta descriptions pour le CTR
 * Ajoute des power words et des emojis si pertinent
 */
export function optimizeMetaDescription(description: string, category: string): string {
  const powerWords: Record<string, string[]> = {
    'fissures': ['URGENT', 'DANGER', 'Solution définitive', 'Expert', 'Garanti 10 ans'],
    'humidite': ['Stop', 'Traitement définitif', 'Garantie 30 ans', 'Expert', 'Résultats prouvés'],
    'conseils': ['Guide complet', 'Méthode éprouvée', 'Économisez', 'Expert révèle', 'Sans risque'],
    'expertise': ['Certifié', 'Expert reconnu', 'Garantie décennale', 'Diagnostic gratuit', 'Intervention rapide']
  };

  // Ajouter un power word si la description est courte
  if (description.length < 140 && powerWords[category]) {
    const randomPowerWord = powerWords[category][0];
    return `${randomPowerWord} : ${description}`;
  }

  return description;
}

/**
 * Génère des suggestions de recherches associées (pour internal linking)
 */
export function generateSearchSuggestions(keywords: string[]): string[] {
  const templates = [
    'Comment [ACTION] [KEYWORD] ?',
    'Prix [KEYWORD] 2025',
    '[KEYWORD] Toulouse',
    'Solution [KEYWORD]',
    'Expert [KEYWORD] Haute-Garonne'
  ];

  const suggestions: string[] = [];
  
  keywords.slice(0, 3).forEach(keyword => {
    templates.forEach(template => {
      const suggestion = template
        .replace('[KEYWORD]', keyword)
        .replace('[ACTION]', keyword.includes('fissure') ? 'réparer' : 'traiter');
      suggestions.push(suggestion);
    });
  });

  return suggestions.slice(0, 8); // Max 8 suggestions
}
