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
  const h3Regex = /<h3[^>]*>([\s\S]*?\?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g;
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
    totalTime: 'PT10M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'EUR',
      value: '149'
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Étape ${index + 1}`,
      text: step,
      itemListElement: [{
        '@type': 'HowToDirection',
        text: step
      }]
    }))
  };
}

/**
 * Extrait automatiquement les étapes HowTo d'un article (détecte les listes numérotées)
 */
export function extractHowToSteps(content: string): string[] {
  const steps: string[] = [];
  
  // Pattern : <ol> avec <li> ou pattern numérique
  const olRegex = /<ol[^>]*>([\s\S]*?)<\/ol>/g;
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
  
  const olMatches = content.match(olRegex);
  if (olMatches && olMatches[0]) {
    let liMatch;
    while ((liMatch = liRegex.exec(olMatches[0])) !== null) {
      const step = liMatch[1].replace(/<[^>]+>/g, '').trim();
      if (step && step.length > 10) {
        steps.push(step);
      }
    }
  }
  
  return steps.slice(0, 8); // Max 8 étapes
}

/**
 * Génère des liens internes contextuels basés sur les keywords
 */
export function getContextualLinks(currentSlug: string, keywords: string[]): Array<{ text: string; url: string; }> {
  const linkMap: Record<string, Array<{ text: string; url: string; }>> = {
    'fissures': [
      { text: 'diagnostic fissures gratuit', url: '/diagnostic' },
      { text: 'agrafage de fissures', url: '/expertise/fissures' },
      { text: 'expertise fissures Toulouse', url: '/villes/toulouse' },
      { text: 'fissures en escalier', url: '/blog/fissures-escalier-tassement-differentiel' },
      { text: 'fissure mur porteur', url: '/problemes/fissure-verticale-mur-porteur' }
    ],
    'humidite': [
      { text: 'traitement humidité', url: '/expertise/humidite' },
      { text: 'injection résine', url: '/blog/traitement-humidite-injection-resine' },
      { text: 'diagnostic humidité', url: '/diagnostic' },
      { text: 'mérule danger', url: '/blog/merule-champignon-maison-danger' },
      { text: 'salpêtre traitement', url: '/blog/salpetre-toulouse-traitement-definitif' }
    ],
    'catastrophe naturelle': [
      { text: 'démarches CAT-NAT sécheresse', url: '/blog/catastrophe-naturelle-secheresse-demarches-indemnisation' },
      { text: 'indemnisation fissures', url: '/blog/catastrophe-naturelle-secheresse-demarches-indemnisation' },
      { text: 'diagnostic fissures', url: '/diagnostic' }
    ],
    'cat-nat': [
      { text: 'guide CAT-NAT complet', url: '/blog/catastrophe-naturelle-secheresse-demarches-indemnisation' },
      { text: 'fissures sécheresse', url: '/blog/secheresse-argile-haute-garonne' },
      { text: 'diagnostic gratuit', url: '/diagnostic' }
    ],
    'agrafage': [
      { text: 'agrafage vs micropieux', url: '/blog/agrafage-vs-micropieux-choix' },
      { text: 'prix agrafage 2026', url: '/blog/agrafage-vs-micropieux-choix' },
      { text: 'agrafage Toulouse', url: '/expertise/fissures' }
    ],
    'salpetre': [
      { text: 'traitement salpêtre Toulouse', url: '/blog/salpetre-toulouse-traitement-definitif' },
      { text: 'remontées capillaires', url: '/blog/humidite-remontee-capillaire-solution' },
      { text: 'injection résine', url: '/blog/traitement-humidite-injection-resine' },
      { text: 'poudre blanche mur', url: '/problemes/salpetre-poudre-blanche-mur' }
    ],
    'merule': [
      { text: 'mérule danger maison', url: '/blog/merule-champignon-maison-danger' },
      { text: 'champignon bois', url: '/problemes/merule-champignon-bois-maison' },
      { text: 'traitement humidité', url: '/expertise/humidite' }
    ],
    'champignon': [
      { text: 'mérule champignon', url: '/blog/merule-champignon-maison-danger' },
      { text: 'humidité murs', url: '/expertise/humidite' },
      { text: 'diagnostic humidité', url: '/diagnostic' }
    ],
    'diagnostic': [
      { text: 'diagnostic structurel', url: '/blog/diagnostic-structurel-maison' },
      { text: 'diagnostic gratuit', url: '/diagnostic' },
      { text: 'expert fissures', url: '/expertise/fissures' }
    ],
    'toulouse': [
      { text: 'expert Toulouse', url: '/villes/toulouse' },
      { text: 'sol argileux Haute-Garonne', url: '/blog/secheresse-argile-haute-garonne' },
      { text: 'zones d\'intervention', url: '/contact' },
      { text: 'expert Haute-Garonne', url: '/departements/haute-garonne' }
    ],
    'gers': [
      { text: 'expert Gers', url: '/departements/gers' },
      { text: 'fissures Gers', url: '/blog/expert-fissures-gers-guide-complet' }
    ],
    'tarn': [
      { text: 'fissures Tarn-et-Garonne', url: '/blog/fissures-maison-tarn-et-garonne-solutions' },
      { text: 'expert Montauban', url: '/departements/tarn-et-garonne' }
    ],
    'ariege': [
      { text: 'expert Ariège', url: '/departements/ariege' }
    ],
    'cave': [
      { text: 'humidité cave', url: '/blog/humidite-cave-sous-sol' },
      { text: 'cuvelage cave', url: '/expertise/humidite' }
    ],
    'moisissure': [
      { text: 'condensation ou infiltration', url: '/blog/condensation-ou-infiltration' },
      { text: 'VMC et ventilation', url: '/blog/ventilation-humidite-condensation' }
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

/**
 * 💣 ARME NUCLÉAIRE : Génère le Schema Review/Rating pour les étoiles dans Google
 */
export function generateReviewSchema(_articleTitle: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'IPB - Institut de Pathologie du Bâtiment',
    image: 'https://www.ipb-expertise.fr/images/IPB_Logo_HD.png',
    telephone: '+33582953375',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tournefeuille',
      postalCode: '31170',
      addressCountry: 'FR'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '14',
      bestRating: '5',
      worstRating: '1'
    }
  };
}

/**
 * 💣 ARME NUCLÉAIRE : Remplace automatiquement les keywords par des liens internes
 */
export function injectInternalLinks(content: string, currentSlug: string): string {
  const linkReplacements: Record<string, string> = {
    // Fissures
    'diagnostic gratuit': '/diagnostic',
    'diagnostic structurel': '/blog/diagnostic-structurel-maison',
    'agrafage': '/expertise/fissures',
    'micropieux': '/blog/agrafage-vs-micropieux-choix',
    'tassement différentiel': '/blog/fissures-escalier-tassement-differentiel',
    'sol argileux': '/blog/secheresse-argile-haute-garonne',
    
    // Humidité
    'remontées capillaires': '/blog/humidite-remontee-capillaire-solution',
    'injection résine': '/blog/traitement-humidite-injection-resine',
    'salpêtre': '/blog/humidite-salpetre-traitement',
    'VMC': '/blog/ventilation-humidite-condensation',
    'cuvelage': '/blog/humidite-cave-sous-sol',
    
    // Services
    'expert fissures': '/expertise/fissures',
    'traitement humidité': '/expertise/humidite',
    'garantie décennale': '/blog/garantie-decennale-travaux-structure'
  };

  let modifiedContent = content;
  let linksAdded = 0;
  const maxLinks = 5; // Max 5 liens automatiques pour pas spammer

  Object.entries(linkReplacements).forEach(([keyword, url]) => {
    if (linksAdded >= maxLinks) return;
    if (url.includes(currentSlug)) return; // Pas de lien vers soi-même
    
    const regex = new RegExp(`(?<!<a[^>]*>)\\b(${keyword})\\b(?![^<]*<\\/a>)`, 'gi');
    
    if (regex.test(modifiedContent)) {
      regex.lastIndex = 0;
      let replaced = false;
      modifiedContent = modifiedContent.replace(regex, (match) => {
        if (replaced || linksAdded >= maxLinks) return match;
        replaced = true;
        linksAdded++;
        return `<a href="${url}" class="text-orange-600 font-semibold hover:text-orange-700 underline decoration-2 decoration-orange-300 hover:decoration-orange-500 transition">${match}</a>`;
      });
    }
  });

  return modifiedContent;
}
