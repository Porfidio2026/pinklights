import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

export const FAQAccordion = ({ items, title = 'Frequently Asked Questions' }: FAQAccordionProps) => {
  if (items.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold font-display mb-4">{title}</h2>
      <Accordion type="multiple" className="space-y-2">
        {items.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg px-4">
            <AccordionTrigger className="text-left font-medium text-sm py-4">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm pb-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
