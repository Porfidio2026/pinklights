import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { RelatedPages } from '@/components/seo/RelatedPages';
import { isValidLocale, UI_STRINGS } from '@/data/seo/locales';
import { COMPARE_TRANSLATIONS } from '@/data/seo/pages';

const LocaleComparePage = () => {
  const { locale, slug } = useParams<{ locale: string; slug: string }>();

  if (!locale || !isValidLocale(locale) || !slug) {
    return <Navigate to="/compare" replace />;
  }

  const comparisons = COMPARE_TRANSLATIONS[locale];
  const page = comparisons?.[slug];
  const ui = UI_STRINGS[locale];

  if (!page) {
    return <Navigate to={`/${locale}/compare`} replace />;
  }

  const breadcrumbs = [
    { name: ui.compare, url: `/${locale}/compare` },
    { name: page.title, url: `/${locale}/compare/${slug}` },
  ];

  const relatedPages = page.relatedPages.map((p) => ({
    ...p,
    url: `/${locale}${p.url}`,
  }));

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={page.metaTitle}
        description={page.metaDescription}
        url={`/${locale}/compare/${slug}`}
        type="article"
        breadcrumbs={breadcrumbs}
        faqItems={page.faqItems}
        datePublished="2026-07-24"
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

export default LocaleComparePage;
