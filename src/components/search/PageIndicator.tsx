
import React from 'react';

interface PageIndicatorProps {
  total: number;
  current: number;
}

/**
 * Shows position in the result set as "2 / 10".
 *
 * This replaced a row of dots, which stopped being readable once a search
 * returned more than a handful of profiles and never conveyed how many were
 * left.
 */
export const PageIndicator: React.FC<PageIndicatorProps> = ({ total, current }) => {
  if (!total) return null;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
      <div
        className="rounded-full bg-background/50 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white tabular-nums"
        aria-live="polite"
        aria-label={`Profile ${current + 1} of ${total}`}
      >
        {current + 1} <span className="text-white/60">/ {total}</span>
      </div>
    </div>
  );
};
