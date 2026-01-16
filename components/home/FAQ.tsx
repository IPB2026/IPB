"use client";

import React from 'react';
import { HelpCircle, Phone, ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Pourquoi le diagnostic expert sur site est-il payant ?",
    answer: "Contrairement à un simple devis commercial 'à la louche', nous réalisons une véritable expertise technique instrumentée. Nous analysons les sols, mesurons les écartements et l'humidité. Cependant, ce montant est un acompte : il est déduit à 100% de votre facture finale si vous nous confiez les travaux."
  },
  {
    question: "L'agrafage est-il une solution aussi durable que les micropieux ?",
    answer: "Pour 90% des maisons touchées par la sécheresse, OUI. Les micropieux sont des travaux lourds (30k€+) réservés aux affaissements majeurs. L'agrafage redonne au mur sa cohérence monolithique pour un coût divisé par 3, avec une Garantie Décennale identique."
  },
  {
    question: "Comment savoir si mes fissures sont structurelles ou esthétiques ?",
    answer: "Trois indices ne trompent pas : 1. La forme en escalier (suit les joints). 2. La fissure est traversante (visible dedans et dehors). 3. Vos portes ou fenêtres commencent à frotter. Si vous avez un doute, utilisez notre Diagnostic Digital gratuit en haut de page pour une pré-analyse immédiate."
  },
  {
    question: "Traitez-vous l'humidité par l'intérieur ou l'extérieur ?",
    answer: "Nous privilégions l'intervention par l'intérieur pour éviter de détruire vos aménagements extérieurs. Nous créons une barrière étanche par injection de résine à la base des murs. Le produit se diffuse dans toute l'épaisseur du mur pour bloquer définitivement les remontées capillaires."
  },
  {
    question: "Quelle est la durée moyenne d'un chantier ?",
    answer: "Nos interventions sont rapides et peu invasives. Comptez 2 à 4 jours pour un agrafage de façade complète, et 1 à 2 jours pour un traitement d'humidité standard. Nous mettons un point d'honneur à laisser le chantier propre après notre passage."
  },
  {
    question: "Vos travaux sont-ils couverts par une assurance ?",
    answer: "Absolument. IPB dispose d'une Garantie Décennale et d'une Responsabilité Civile Professionnelle spécifiques aux activités de renforcement de structure et de traitement de l'humidité. Votre patrimoine est protégé pendant 10 ans."
  }
];

export function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
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
            Tout savoir sur notre méthode d'intervention et nos garanties.
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
