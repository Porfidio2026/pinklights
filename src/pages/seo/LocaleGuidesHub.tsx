import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { isValidLocale, UI_STRINGS } from '@/data/seo/locales';
import { GUIDES_HUB_TRANSLATIONS } from '@/data/seo/guides';
import { BookOpen, ArrowRight } from 'lucide-react';

const LocaleGuidesHub = () => {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !isValidLocale(locale)) {
    return <Navigate to="/guides" replace />;
  }

  const hub = GUIDES_HUB_TRANSLATIONS[locale];
  const ui = UI_STRINGS[locale];
  const breadcrumbs = [{ name: ui.guides, url: `/${locale}/guides` }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={hub.metaTitle}
        description={hub.metaDescription}
        url={`/${locale}/guides`}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{hub.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{hub.intro}</p>
        </header>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {hub.guides.map((guide) => (
            <Link key={guide.slug} to={`/${locale}/guides/${guide.slug}`} className="group">
              <Card className="p-5 h-full transition-all hover:border-primary/40 hover:bg-accent/30">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                      {guide.title}
                      <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{guide.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <CTABanner
          headline={ui.readyToBrowse}
          description={ui.readyToBrowseDesc}
          buttonText={ui.startBrowsing}
        />
      </div>
    </div>
  );
};

export default LocaleGuidesHub;
