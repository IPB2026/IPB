"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqItem } from "@/app/data/faqs";

interface FaqSectionProps {
  title: string;
  data: FaqItem[];
  theme: 'orange' | 'blue';
}

export function FaqSection({ title, data, theme }: FaqSectionProps) {
  const themeClasses = {
    orange: {
      border: 'border-orange-200',
      hover: 'hover:border-orange-300',
      active: 'data-[state=open]:border-orange-500',
      icon: 'text-orange-600',
    },
    blue: {
      border: 'border-blue-200',
      hover: 'hover:border-blue-300',
      active: 'data-[state=open]:border-blue-500',
      icon: 'text-blue-600',
    },
  };

  const colors = themeClasses[theme];

  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-slate-600 text-lg">
            Réponses aux questions les plus fréquentes de nos clients
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {data.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className={`border-2 ${colors.border} ${colors.hover} ${colors.active} rounded-xl px-6 bg-white transition-colors`}
            >
              <AccordionTrigger className={`text-left font-bold text-slate-900 py-6 hover:no-underline [&[data-state=open]>svg]:${colors.icon}`}>
                <span className="pr-4">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed pb-6 pt-0">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

