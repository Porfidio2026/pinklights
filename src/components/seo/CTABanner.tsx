import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface CTABannerProps {
  headline?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export const CTABanner = ({
  headline = 'Ready to Browse Profiles?',
  description = 'No account needed to start searching. Find someone near you in seconds.',
  buttonText = 'Start Browsing',
  buttonLink = '/',
}: CTABannerProps) => {
  return (
    <section className="glass-card p-8 text-center space-y-4 my-8">
      <h2 className="text-2xl font-bold font-display">{headline}</h2>
      <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
      <Button asChild className="gradient-pink text-white border-0 rounded-xl h-11 px-8 font-semibold hover:opacity-90 transition-opacity">
        <Link to={buttonLink}>
          <Search className="h-4 w-4 mr-2" />
          {buttonText}
        </Link>
      </Button>
    </section>
  );
};
