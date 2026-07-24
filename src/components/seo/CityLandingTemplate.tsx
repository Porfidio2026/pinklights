import React from 'react';
import { Card } from '@/components/ui/card';
import { SEOHead } from './SEOHead';
import { BreadcrumbNav } from './BreadcrumbNav';
import { CTABanner } from './CTABanner';
import { FAQAccordion, FAQItem } from './FAQAccordion';
import { RelatedPages } from './RelatedPages';
import { MapPin } from 'lucide-react';

interface RelatedCity {
  title: string;
  description: string;
  url: string;
}

interface CityLandingProps {
  cityName: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubtext: string;
  /** Main body content — array of { heading, text } sections */
  sections: { heading: string; text: string }[];
  faqItems: FAQItem[];
  relatedCities: RelatedCity[];
}

export const CityLandingTemplate = ({
  cityName,
  slug,
  metaTitle,
  metaDescription,
  heroHeadline,
  heroSubtext,
  sections,
  faqItems,
  relatedCities,
}: CityLandingProps) => {
  const breadcrumbs = [
    { name: 'Find', url: '/find' },
    { name: cityName, url: `/find/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={metaTitle}
        description={metaDescription}
        url={`/find/${slug}`}
        type="article"
        breadcrumbs={breadcrumbs}
        faqItems={faqItems}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        {/* Hero */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-primary mb-3">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">{cityName}, Belgium</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{heroHeadline}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{heroSubtext}</p>
        </header>

        {/* Content sections */}
        <Card className="p-8 prose prose-sm max-w-none mb-8">
          {sections.map((section, i) => (
            <div key={i} className={i > 0 ? 'mt-6' : ''}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {section.text}
              </div>
            </div>
          ))}
        </Card>

        <CTABanner
          headline={`Find Someone in ${cityName}`}
          description={`Browse profiles near ${cityName}. No account needed — contact directly via WhatsApp.`}
          buttonText="Search Now"
          buttonLink="/"
        />

        <FAQAccordion items={faqItems} title={`Common Questions About Dating in ${cityName}`} />

        <RelatedPages title="Explore Other Cities" pages={relatedCities} />
      </div>
    </div>
  );
};
