import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
      <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <React.Fragment key={item.url}>
            <ChevronRight className="h-3.5 w-3.5" />
            {isLast ? (
              <span className="text-foreground font-medium">{item.name}</span>
            ) : (
              <Link to={item.url} className="hover:text-primary transition-colors">
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
