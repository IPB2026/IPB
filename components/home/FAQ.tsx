"use client";

import Script from 'next/script';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Pourquoi le diagnostic sur site est-il payant (249\u00A0\u20AC)\u00A0?",
    answer: "Parce que ce n\u2019est pas un devis\u00A0: c\u2019est une expertise technique. Nous utilisons un fissurom\u00E8tre, un niveau laser, un hygrom\u00E8tre et une cam\u00E9ra thermique pour mesurer objectivement la situation. Le rapport de 15 \u00E0 25\u00A0pages est un document technique opposable \u2014 notamment face \u00E0 un expert d\u2019assurance. Ces 249\u00A0\u20AC sont int\u00E9gralement d\u00E9duits si vous nous confiez les travaux."
  },
  {
    question: "L\u2019agrafage est-il aussi durable que les micropieux\u00A0?",
    answer: "Ce sont deux r\u00E9ponses \u00E0 deux probl\u00E8mes diff\u00E9rents. L\u2019agrafage traite les fissures li\u00E9es \u00E0 un tassement diff\u00E9rentiel mod\u00E9r\u00E9 en redonnant au mur sa coh\u00E9sion. Les micropieux stabilisent les fondations quand le sol est profond\u00E9ment instable. Dans 90\u00A0% des cas en Occitanie, l\u2019agrafage est la r\u00E9ponse adapt\u00E9e."
  },
  {
    question: "Comment distinguer une fissure structurelle d\u2019une fissure esth\u00E9tique\u00A0?",
    answer: "Trois crit\u00E8res techniques\u00A0: 1. Le trac\u00E9 en escalier qui suit les joints de ma\u00E7onnerie. 2. La fissure traversante, visible \u00E0 l\u2019int\u00E9rieur et \u00E0 l\u2019ext\u00E9rieur. 3. Des signes collat\u00E9raux\u00A0: portes qui frottent, carrelage qui casse. Notre diagnostic en ligne gratuit vous donne une premi\u00E8re \u00E9valuation en 3\u00A0minutes."
  },
  {
    question: "Traitez-vous l\u2019humidit\u00E9 par l\u2019int\u00E9rieur ou par l\u2019ext\u00E9rieur\u00A0?",
    answer: "Cela d\u00E9pend du diagnostic. Les remont\u00E9es capillaires se traitent par injection int\u00E9rieure \u2014 la r\u00E9sine polym\u00E9rise dans la masse et cr\u00E9e une barri\u00E8re \u00E9tanche. Les infiltrations lat\u00E9rales peuvent n\u00E9cessiter un traitement ext\u00E9rieur. C\u2019est pourquoi le diagnostic pr\u00E9c\u00E8de toujours l\u2019intervention."
  },
  {
    question: "Combien de temps dure un chantier\u00A0?",
    answer: "Agrafage de fa\u00E7ade\u00A0: 3 \u00E0 5\u00A0jours. Injection humidit\u00E9\u00A0: 1 \u00E0 2\u00A0jours. Cuvelage\u00A0: 2 \u00E0 4\u00A0jours. Nos interventions sont con\u00E7ues pour \u00EAtre peu invasives \u2014 le chantier est nettoy\u00E9 chaque soir."
  },
  {
    question: "Vos travaux sont-ils assur\u00E9s\u00A0?",
    answer: "IPB est assur\u00E9 en Garantie D\u00E9cennale et en Responsabilit\u00E9 Civile Professionnelle aupr\u00E8s de la SMABTP. Les attestations sont fournies sur demande et jointes \u00E0 chaque devis."
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
    <section className="py-20 md:py-32 bg-[#fafafa]">
      <Script
        id="faq-schema-homepage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-[13px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Questions fréquentes
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-b border-slate-200 last:border-0"
            >
              <AccordionTrigger className="text-left font-medium text-[15px] text-slate-900 py-5 hover:no-underline hover:text-slate-600 transition-colors">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-slate-500 leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
