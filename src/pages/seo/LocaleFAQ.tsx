import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { FAQAccordion } from '@/components/seo/FAQAccordion';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { isValidLocale, UI_STRINGS } from '@/data/seo/locales';
import { FAQ_TRANSLATIONS } from '@/data/seo/guides';

const LocaleFAQ = () => {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !isValidLocale(locale)) {
    return <Navigate to="/faq" replace />;
  }

  const faq = FAQ_TRANSLATIONS[locale];
  const ui = UI_STRINGS[locale];
  const breadcrumbs = [{ name: ui.faq, url: `/${locale}/faq` }];

  const allFaqItems = faq.categories.flatMap((cat) => cat.items);
  const relatedPages = faq.relatedPages.map((p) => ({
    ...p,
    url: `/${locale}${p.url}`,
  }));

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={faq.metaTitle}
        description={faq.metaDescription}
        url={`/${locale}/faq`}
        breadcrumbs={breadcrumbs}
        faqItems={allFaqItems}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{faq.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{faq.intro}</p>
        </header>

        {faq.categories.map((category, i) => (
          <FAQAccordion key={i} title={category.title} items={category.items} />
        ))}

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

export default LocaleFAQ;
