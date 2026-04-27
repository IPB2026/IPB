"use client";

import React from 'react';
import Script from 'next/script';
import { HelpCircle, Phone, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Le diagnostic sur site est-il gratuit ?",
    answer: "Le diagnostic est une vraie expertise technique, pas un simple devis commercial. Nous intervenons avec un fissuromètre, un niveau laser et une caméra thermique pour mesurer objectivement la situation. Le rapport de 10 à 15 pages que nous remettons est un document opposable — notamment face à un expert d'assurance. C'est pourquoi c'est une prestation payante, mais son montant est intégralement déduit des travaux si vous nous confiez le chantier."
  },
  {
    question: "Comment savoir si mon mur est porteur avant de le toucher ?",
    answer: "Trois indices forts : le mur est perpendiculaire aux solives du plancher, il y a un poteau ou une poutre visible au-dessus, ou il se situe en RDC sous une pièce habitée à l'étage. Mais ces indices ne suffisent pas — seul notre ingénieur, avec les plans ou un sondage, peut le confirmer avec certitude. Ne jamais ouvrir un mur sans note de calcul signée : c'est illégal et dangereux."
  },
  {
    question: "Comment distinguer une fissure structurelle d'une fissure esthétique ?",
    answer: "Trois critères techniques : 1. Le tracé en escalier qui suit les joints de maçonnerie — signe classique de tassement différentiel. 2. La fissure traversante, visible des deux côtés du mur. 3. Des signes collatéraux : portes qui frottent, carrelage qui casse, volets qui ne ferment plus. En cas de doute, notre diagnostic en ligne gratuit vous donne une première évaluation en 3 minutes."
  },
  {
    question: "L'agrafage est-il aussi durable que les micropieux ?",
    answer: "Ce sont deux réponses à deux problèmes différents. L'agrafage traite les fissures liées à un tassement différentiel modéré (< 10 mm) en redonnant au mur sa cohésion structurelle. Les micropieux stabilisent les fondations quand le sol est profondément instable. Dans 90% des cas traités en Occitanie, l'agrafage est la réponse adaptée — et bien moins invasif. Les deux sont couverts par la même garantie décennale."
  },
  {
    question: "Combien de temps dure un chantier d'ouverture de mur porteur ?",
    answer: "L'intervention proprement dite dure 2 à 5 jours selon la portée. Mais la phase préparatoire est indispensable : étude structure (1 à 2 semaines), déclaration préalable si nécessaire, commande et livraison de la poutre. Au total, comptez 3 à 6 semaines entre le premier appel et la réception de chantier. Un agrafage de façade, lui, dure 3 à 5 jours."
  },
  {
    question: "Vos travaux sont-ils assurés ?",
    answer: "IPB est assuré en Garantie Décennale et en Responsabilité Civile Professionnelle auprès d'AXA France (n° 0000022511730204), pour les activités de renforcement structurel, d'ouverture de murs porteurs et de création de baies vitrées. Les attestations d'assurance sont fournies sur demande et systématiquement jointes à chaque devis."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <Script
        id="faq-schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec icône */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-8 h-8 text-orange-600" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900">
              Questions Fréquentes
            </h2>
          </div>
          <p className="text-base md:text-lg text-slate-600">
            Ce que nos clients nous demandent le plus souvent avant d'intervenir.
          </p>
        </div>

        {/* Accordéon */}
        <Accordion type="single" collapsible className="w-full space-y-3 md:space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-200 rounded-xl px-4 md:px-6 bg-white hover:bg-slate-50 transition-colors"
            >
              <AccordionTrigger className="text-left font-bold text-sm md:text-base text-slate-900 py-4 md:py-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base text-slate-600 leading-relaxed pb-4 md:pb-6 pt-0">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Final */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 md:px-6 py-3 md:py-4">
            <Phone className="w-5 h-5 text-orange-600 shrink-0" />
            <p className="text-sm md:text-base text-slate-900 font-bold text-center sm:text-left">
              Une autre question ? Appelez-nous au{" "}
              <a
                href="tel:0582953375"
                className="text-orange-600 hover:text-orange-700 underline"
              >
                05 82 95 33 75
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
