/**
 * Composant JSON-LD pour le SEO local (Schema.org)
 * Améliore le référencement local sur Google pour Toulouse/Haute-Garonne
 */
export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IPB - Institut de Pathologie du Bâtiment",
    "image": "https://www.ipb-expertise.fr/images/IPB_Logo_HD.png",
    "description": "Expert en traitement des fissures et de l'humidité en Haute-Garonne. Solutions techniques (agrafage, injection résine) avec garantie décennale.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "31C Chemin de Roquettes",
      "addressLocality": "Toulouse",
      "postalCode": "31600",
      "addressRegion": "Haute-Garonne",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "43.5",
      "longitude": "1.3"
    },
    "url": "https://www.ipb-expertise.fr",
    "telephone": "+33582953375",
    "priceRange": "€€",
    "areaServed": {
      "@type": "City",
      "name": "Toulouse"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "43.6047",
        "longitude": "1.4442"
      },
      "geoRadius": {
        "@type": "Distance",
        "name": "Haute-Garonne (31)"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services IPB",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Traitement des fissures structurelles",
            "description": "Agrafage et harpage pour stabiliser les fondations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Traitement de l'humidité",
            "description": "Injection résine hydrophobe et cuvelage"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}

