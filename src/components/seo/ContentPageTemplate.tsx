import React, { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { SEOHead } from './SEOHead';
import { BreadcrumbNav } from './BreadcrumbNav';
import { CTABanner } from './CTABanner';
import { RelatedPages } from './RelatedPages';
import { FAQAccordion, FAQItem } from './FAQAccordion';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface RelatedPage {
  title: string;
  description: string;
  url: string;
}

interface ContentPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  url: string;
  breadcrumbs: BreadcrumbItem[];
  type?: 'website' | 'article';
  datePublished?: string;
  dateModified?: string;
  faqItems?: FAQItem[];
  relatedPages?: RelatedPage[];
  ctaHeadline?: string;
  ctaDescription?: string;
  children: ReactNode;
}

export const ContentPageTemplate = ({
  title,
  metaTitle,
  metaDescription,
  url,
  breadcrumbs,
  type = 'article',
  datePublished,
  dateModified,
  faqItems,
  relatedPages,
  ctaHeadline,
  ctaDescription,
  children,
}: ContentPageProps) => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        url={url}
        type={type}
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
        datePublished={datePublished}
        dateModified={dateModified}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display">{title}</h1>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          {children}
        </Card>

        <CTABanner headline={ctaHeadline} description={ctaDescription} />

        {faqItems && faqItems.length > 0 && <FAQAccordion items={faqItems} />}

        {relatedPages && relatedPages.length > 0 && (
          <RelatedPages pages={relatedPages} />
        )}
      </div>
    </div>
  );
};
