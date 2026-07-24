import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { SEOHead } from '@/components/seo/SEOHead';
import { BreadcrumbNav } from '@/components/seo/BreadcrumbNav';
import { CTABanner } from '@/components/seo/CTABanner';
import { MapPin, ArrowRight } from 'lucide-react';

const CITIES = [
  { name: 'Antwerp', slug: 'antwerp', description: 'Fashion capital with vibrant nightlife and a thriving social scene along the Eilandje waterfront.' },
  { name: 'Brussels', slug: 'brussels', description: 'Cosmopolitan capital with a large expat community, multilingual profiles, and diverse neighborhoods.' },
  { name: 'Ghent', slug: 'ghent', description: 'University city with a young, progressive energy and lively cultural quarter.' },
  { name: 'Bruges', slug: 'bruges', description: 'Romantic canal city that transforms into an intimate setting once the day-trippers leave.' },
  { name: 'Liège', slug: 'liege', description: 'Wallonia\'s gateway city with warm French-speaking culture and the famous Carré nightlife district.' },
  { name: 'Leuven', slug: 'leuven', description: 'Belgium\'s premier university town with the Oude Markt and a young professional crowd.' },
  { name: 'Charleroi', slug: 'charleroi', description: 'A city reinventing itself with growing cultural venues and excellent airport connections.' },
  { name: 'Namur', slug: 'namur', description: 'The charming capital of Wallonia, nestled at the confluence of two rivers beneath a historic citadel.' },
];

const FindHub = () => {
  const breadcrumbs = [{ name: 'Find', url: '/find' }];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <SEOHead
        title="Find Companions Across Belgium"
        description="Browse profiles in Antwerp, Brussels, Ghent, Bruges, and more. Discover curated companions near you on Pinklights."
        url="/find"
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-3xl mx-auto">
        <BreadcrumbNav items={breadcrumbs} />

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-display mb-4">
            Find Companions Across Belgium
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pinklights connects you with curated profiles across Belgium's most vibrant cities. Whether you're a local or visiting, browse profiles near you and connect directly via WhatsApp. No lengthy sign-up process, no algorithms. Just real people, real connections.
          </p>
        </header>

        <Card className="p-8 prose prose-sm max-w-none mb-8">
          <h2 className="text-xl font-semibold mb-3">How Location Search Works</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our platform uses location-based search to show you profiles near your chosen city. You can search by distance (up to 50 km), filter by physical preferences, and browse detailed profiles with photos, all without creating an account. When you find someone you'd like to meet, contact them directly through WhatsApp for a fast, personal conversation.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Belgium is compact enough that most cities are within easy reach of each other. Someone in Antwerp might also appear in searches from Ghent or Brussels. Our distance filter lets you decide how far you're willing to travel, or whether you'd prefer someone just around the corner.
          </p>
        </Card>

        <section className="mb-8">
          <h2 className="text-xl font-bold font-display mb-4">Browse by City</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {CITIES.map((city) => (
              <Link key={city.slug} to={`/find/${city.slug}`} className="group">
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
          <h2 className="text-xl font-semibold mb-3">Why Pinklights for Belgium</h2>
          <p className="text-muted-foreground leading-relaxed">
            Belgium sits at the crossroads of Europe, and Pinklights reflects that diversity. Our platform serves both Flemish and Walloon cities, with profiles available in multiple languages. Unlike traditional dating apps that rely on matching algorithms and weeks of messaging, Pinklights gives you direct access to browse profiles with clear photos and real information, then reach out via WhatsApp when you're ready.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-3">
            Whether you're in the diamond district of Antwerp, the EU quarter of Brussels, the student bars of Leuven, or the cobblestone streets of Bruges, there are profiles waiting for you. Safety and discretion are built into the platform. Read our <a href="/safety" className="text-primary hover:underline">safety guide</a> and <a href="/guides/safety-tips" className="text-primary hover:underline">safety tips</a> to learn more.
          </p>
        </Card>

        <CTABanner />
      </div>
    </div>
  );
};

export default FindHub;
