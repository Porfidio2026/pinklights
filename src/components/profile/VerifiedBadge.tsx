import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerifiedBadgeProps {
  className?: string;
}

export const VerifiedBadge = ({ className }: VerifiedBadgeProps) => {
  return (
    <span title="Verified profile" className={className}>
      <CheckCircle2 className="h-5 w-5 text-green-500 inline-block" />
    </span>
  );
};
