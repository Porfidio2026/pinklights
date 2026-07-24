import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { BookOpen, ArrowRight } from 'lucide-react';

const GUIDES = [
  {
    title: 'How It Works',
    slug: 'how-it-works',
    description: 'A step-by-step walkthrough of browsing profiles, filtering by preferences, and connecting via WhatsApp.',
  },
  {
    title: 'Safety Tips',
    slug: 'safety-tips',
    description: 'Ten practical tips for staying safe when meeting someone new — from choosing the right venue to protecting your privacy.',
  },
  {
    title: 'First Meeting Guide',
    slug: 'first-meeting',
    description: 'Everything you need to know before your first in-person meeting, including conversation tips and red flags to watch for.',
  },
  {
    title: 'For Visitors to Belgium',
    slug: 'for-visitors',
    description: 'A guide for travelers: how to use Pinklights during a short stay, language tips, and city recommendations.',
  },
  {
    title: 'Profile Tips',
    slug: 'profile-tips',
    description: 'Best practices for profile creators — from choosing the right photos to writing a bio that stands out.',
  },
];

const GuidesHub = () => {
  const breadcrumbs = [{ name: 'Guides', url: '/guides' }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title="Guides & Tips for Using Pinklights"
        description="Explore our guides on browsing profiles, staying safe, preparing for a first meeting, and making the most of Pinklights in Belgium."
        url="/guides"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Guides & Tips
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Whether you are new to Pinklights or a returning user, our guides cover everything from getting started to staying safe. Each guide is designed to help you get the most out of the platform with confidence and discretion.
          </p>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-3">Why We Created These Guides</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pinklights is built around simplicity — no accounts needed to browse, direct WhatsApp contact, and real profiles with clear photos. But simplicity does not mean you should skip preparation. These guides help you navigate the platform confidently, whether you are browsing for the first time, creating your own profile, or visiting Belgium from abroad.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            We believe in transparency and informed choices. Every guide below is written with your safety, comfort, and privacy in mind. Take a few minutes to read the ones that apply to you — it can make all the difference.
          </p>
        </Card>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4">All Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {GUIDES.map((guide) => (
              <Link key={guide.slug} to={`/guides/${guide.slug}`} className="group">
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
        </section>

        <CTABanner />
      </div>
    </div>
  );
};

export default GuidesHub;
