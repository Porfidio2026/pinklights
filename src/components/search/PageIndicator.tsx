
import React from 'react';
import { cn } from '@/lib/utils';

interface PageIndicatorProps {
  total: number;
  current: number;
}

export const PageIndicator: React.FC<PageIndicatorProps> = ({ total, current }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300",
            index === current ? "bg-primary w-4" : "bg-muted"
          )}
        />
      ))}
    </div>
  );
};
