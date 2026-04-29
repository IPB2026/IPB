import Script from 'next/script';

interface SpeakableSchemaProps {
  /** URL canonique de la page (utilisée pour @id et url) */
  url: string;
  /**
   * Sélecteurs CSS des passages que les lecteurs vocaux (Google Assistant,
   * AI Overviews) peuvent citer ou lire à voix haute.
   *
   * Par défaut on cible :
   * - les questions de FAQ (<summary> à l'intérieur de <details>)
   * - les paragraphes "snippet bait" en tête de page
   * - les H2 éditoriaux
   */
  cssSelectors?: string[];
}

/**
 * SpeakableSchema — Indique à Google les passages citables vocalement.
 *
 * Pourquoi : Schema.org SpeakableSpecification est un signal direct pour les
 * AI Overviews et Google Assistant qui choisissent les fragments à lire ou à
 * citer dans une réponse vocale. C'est une optimisation passive très
 * efficace pour la visibilité dans les recherches conversationnelles.
 *
 * Cf. https://schema.org/SpeakableSpecification
 */
export function SpeakableSchema({
  url,
  cssSelectors = [
    'h1',
    '.snippet-bait',
    'details > summary',
    'details > div',
  ],
}: SpeakableSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };

  return (
    <Script
      id={`speakable-schema-${url.replace(/[^a-z0-9]/gi, '-')}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
