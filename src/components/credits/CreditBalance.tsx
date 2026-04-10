import React from 'react';
import { useCredits } from '@/hooks/useCredits';
import { Coins } from 'lucide-react';

export const CreditBalance = () => {
  const { balance, isLoading } = useCredits();

  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Coins className="h-4 w-4 text-primary" />
      <span>{isLoading ? '...' : balance} credits</span>
    </div>
  );
};
