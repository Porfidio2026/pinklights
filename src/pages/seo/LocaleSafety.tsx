import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { FAQAccordion } from '@/components/seo/FAQAccordion';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { isValidLocale, UI_STRINGS } from '@/data/seo/locales';
import { SAFETY_TRANSLATIONS } from '@/data/seo/pages';

const LocaleSafety = () => {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !isValidLocale(locale)) {
    return <Navigate to="/safety" replace />;
  }

  const page = SAFETY_TRANSLATIONS[locale];
  const ui = UI_STRINGS[locale];
  const breadcrumbs = [{ name: page.title, url: `/${locale}/safety` }];

  const relatedPages = page.relatedPages.map((p) => ({
    ...p,
    url: `/${locale}${p.url}`,
  }));

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={page.metaTitle}
        description={page.metaDescription}
        url={`/${locale}/safety`}
        breadcrumbs={breadcrumbs}
        faqItems={page.faqItems}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display">{page.title}</h1>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          {page.sections.map((section, i) => (
            <div key={i} className={i > 0 ? 'mt-6' : ''}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              {section.paragraphs.map((p, j) => (
                <p key={j} className={`text-muted-foreground leading-relaxed${j > 0 ? ' mt-3' : ''}`}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </Card>

        {page.faqItems && page.faqItems.length > 0 && (
          <FAQAccordion title={ui.commonQuestions} items={page.faqItems} />
        )}

        <CTABanner
          headline={ui.readyToBrowse}
          description={ui.readyToBrowseDesc}
          buttonText={ui.startBrowsing}
        />

        {relatedPages.length > 0 && (
          <RelatedPages title={ui.relatedPages} pages={relatedPages} />
        )}
      </div>
    </div>
  );
};

export default LocaleSafety;
