import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { ArrowRight, Scale } from 'lucide-react';

const COMPARISONS = [
  {
    title: 'Pinklights vs Dating Apps',
    slug: 'pinklights-vs-dating-apps',
    description: 'How direct WhatsApp contact and open browsing compare to algorithm-driven matching on Tinder, Bumble, and similar apps.',
  },
  {
    title: 'Pinklights vs Classified Ads',
    slug: 'pinklights-vs-classified-ads',
    description: 'Curated profiles with verification and privacy controls versus open classified ad sites with minimal moderation.',
  },
  {
    title: 'Best Platforms Belgium 2026',
    slug: 'best-platforms-belgium',
    description: 'What to look for in a companion platform in Belgium: safety, verification, ease of contact, and privacy.',
  },
];

const CompareHub = () => {
  const breadcrumbs = [{ name: 'Compare', url: '/compare' }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title="Compare Companion Platforms in Belgium"
        description="Compare Pinklights with dating apps, classified ads, and other platforms. Find the right companion platform for your needs in Belgium."
        url="/compare"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Compare Companion Platforms
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Choosing the right platform matters. Whether you are considering a dating app, a classified ad site, or a dedicated companion platform like Pinklights, each option has distinct strengths and trade-offs. Our comparison guides break down the differences honestly so you can make an informed decision based on what matters most to you: safety, directness, privacy, or reach.
          </p>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-3">Why Comparisons Matter</h2>
          <p className="text-muted-foreground leading-relaxed">
            The landscape of companion platforms in Belgium includes everything from mainstream dating apps to niche classified sites. Each serves a different purpose and audience. Dating apps excel at romantic connections but rely heavily on algorithms and in-app messaging. Classified ads offer wide reach but often lack verification and safety features. Pinklights sits in a specific space: curated profiles, direct WhatsApp contact, and no account required to browse.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We believe in transparency, which is why these comparisons acknowledge the strengths of other approaches alongside our own. The best platform for you depends on what you are looking for. Browse the comparisons below to see where Pinklights fits, and where another option might serve you better.
          </p>
        </Card>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4">Platform Comparisons</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {COMPARISONS.map((comparison) => (
              <Link key={comparison.slug} to={`/compare/${comparison.slug}`} className="group">
                <Card className="p-5 h-full transition-all hover:border-primary/40 hover:bg-accent/30">
                  <div className="flex items-start gap-3">
                    <Scale className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors flex items-center gap-2">
                        {comparison.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{comparison.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <CTABanner />
      </div>
    </div>
  );
};

export default CompareHub;
