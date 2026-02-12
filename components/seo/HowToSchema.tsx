'use client';

import Script from 'next/script';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration format, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string;
    value: string;
  };
  steps: HowToStep[];
  image?: string;
}

/**
 * Schema HowTo pour gagner les featured snippets Google
 * 
 * Ce schema permet d'afficher des instructions étape par étape
 * directement dans les résultats de recherche (position 0).
 * 
 * Idéal pour des requêtes comme :
 * - "comment réparer une fissure"
 * - "comment traiter l'humidité"
 * - "que faire en cas de fissure"
 */
export function HowToSchema({
  name,
  description,
  totalTime,
  estimatedCost,
  steps,
  image,
}: HowToSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value,
      },
    }),
    ...(image && { "image": image }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url }),
    })),
  };

  return (
    <Script
      id={`howto-schema-${name.replace(/\s+/g, '-').toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Schémas pré-configurés pour les pages clés

export function DiagnosticHowToSchema() {
  return (
    <HowToSchema
      name="Comment diagnostiquer une fissure dans votre maison"
      description="Guide en 5 étapes pour identifier si une fissure est dangereuse et nécessite une intervention professionnelle."
      totalTime="PT10M"
      steps={[
        {
          name: "Observer le type de fissure",
          text: "Identifiez si la fissure est horizontale, verticale ou en escalier. Les fissures en escalier suivant les joints sont souvent les plus préoccupantes.",
        },
        {
          name: "Mesurer la largeur",
          text: "Utilisez une règle ou un pied à coulisse. Une fissure de plus de 2mm de large nécessite une expertise professionnelle.",
        },
        {
          name: "Vérifier l'évolution",
          text: "Placez un témoin en plâtre sur la fissure. S'il se fissure en quelques semaines, la fissure est active et évolutive.",
        },
        {
          name: "Rechercher les signes associés",
          text: "Portes qui coincent, fenêtres difficiles à ouvrir, carrelage fissuré : ces signes indiquent un problème structurel.",
        },
        {
          name: "Contacter un expert",
          text: "Demandez un diagnostic professionnel gratuit pour évaluer la gravité et obtenir les solutions adaptées.",
          url: "https://www.ipb-expertise.fr/diagnostic",
        },
      ]}
    />
  );
}

export function TraitementHumiditeHowToSchema() {
  return (
    <HowToSchema
      name="Comment traiter l'humidité dans une maison"
      description="Les étapes essentielles pour identifier et traiter définitivement les problèmes d'humidité dans votre habitation."
      totalTime="PT15M"
      steps={[
        {
          name: "Identifier la source d'humidité",
          text: "Distinguez entre remontées capillaires (bas des murs), condensation (fenêtres, salles d'eau) ou infiltrations (taches localisées après pluie).",
        },
        {
          name: "Mesurer le taux d'humidité",
          text: "Un hygromètre permet de mesurer l'humidité. Au-dessus de 65%, une intervention est recommandée.",
        },
        {
          name: "Vérifier la ventilation",
          text: "Une mauvaise ventilation aggrave tous les problèmes d'humidité. Vérifiez le fonctionnement de votre VMC.",
        },
        {
          name: "Traiter les causes, pas les symptômes",
          text: "Repeindre sur de l'humidité ne résout rien. Il faut traiter à la source : injection résine, drainage, ou ventilation.",
        },
        {
          name: "Faire appel à un expert",
          text: "Un diagnostic professionnel identifie précisément les causes et les solutions durables avec garantie décennale.",
          url: "https://www.ipb-expertise.fr/diagnostic",
        },
      ]}
    />
  );
}

export function AgrafageHowToSchema() {
  return (
    <HowToSchema
      name="Comment fonctionne l'agrafage de fissures"
      description="Découvrez le processus professionnel de réparation des fissures par agrafage, une technique garantie 10 ans."
      totalTime="PT2H"
      estimatedCost={{ currency: "EUR", value: "150-300" }}
      steps={[
        {
          name: "Diagnostic de la fissure",
          text: "Un expert analyse la fissure, sa profondeur, son orientation et son évolution pour déterminer le traitement adapté.",
        },
        {
          name: "Préparation du support",
          text: "La zone est nettoyée et préparée. Les fissures sont ouvertes en V pour permettre une meilleure adhérence.",
        },
        {
          name: "Pose des agrafes métalliques",
          text: "Des agrafes en acier inoxydable sont scellées perpendiculairement à la fissure tous les 20-30 cm.",
        },
        {
          name: "Injection de résine",
          text: "Une résine époxy est injectée dans la fissure pour assurer l'étanchéité et la solidarité des parois.",
        },
        {
          name: "Finition et garantie",
          text: "Le tout est recouvert et harmonisé avec le support existant. Une garantie décennale couvre l'intervention.",
        },
      ]}
    />
  );
}
