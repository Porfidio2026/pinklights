import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface RelatedPage {
  title: string;
  description: string;
  url: string;
}

interface RelatedPagesProps {
  title?: string;
  pages: RelatedPage[];
}

export const RelatedPages = ({ title = 'Related Pages', pages }: RelatedPagesProps) => {
  if (pages.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold font-display mb-4">{title}</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {pages.map((page) => (
          <Link key={page.url} to={page.url} className="group">
            <Card className="p-5 h-full transition-all hover:border-primary/40 hover:bg-accent/30">
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors flex items-center gap-2">
                {page.title}
                <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-sm text-muted-foreground">{page.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
