import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { isValidLocale } from '@/data/seo/locales';
import { CITY_HUB_TRANSLATIONS } from '@/data/seo/cities';
import { UI_STRINGS } from '@/data/seo/locales';
import { MapPin, ArrowRight } from 'lucide-react';

const LocaleFindHub = () => {
  const { locale } = useParams<{ locale: string }>();

  if (!locale || !isValidLocale(locale)) {
    return <Navigate to="/find" replace />;
  }

  const hub = CITY_HUB_TRANSLATIONS[locale];
  const ui = UI_STRINGS[locale];
  const breadcrumbs = [{ name: ui.find, url: `/${locale}/find` }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title={hub.metaTitle}
        description={hub.metaDescription}
        url={`/${locale}/find`}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">{hub.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{hub.intro}</p>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-3">{hub.howSearchWorks.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{hub.howSearchWorks.text}</p>
          <p className="text-muted-foreground leading-relaxed mt-3">{hub.howSearchWorks.text2}</p>
        </Card>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4">{hub.browseByCityHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {hub.cities.map((city) => (
              <Link key={city.slug} to={`/${locale}/find/${city.slug}`} className="group">
                <Card className="p-5 h-full transition-all hover:border-primary/40 hover:bg-accent/30">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                        {city.name}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{city.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-3">{hub.whyPinklights.heading}</h2>
          <p className="text-muted-foreground leading-relaxed">{hub.whyPinklights.text}</p>
          <p className="text-muted-foreground leading-relaxed mt-3">{hub.whyPinklights.text2}</p>
        </Card>

        <CTABanner
          headline={ui.readyToBrowse}
          description={ui.readyToBrowseDesc}
          buttonText={ui.startBrowsing}
        />
      </div>
    </div>
  );
};

export default LocaleFindHub;
