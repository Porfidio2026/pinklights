
import React from 'react';
import { Card } from '@/components/ui/card';

export const ProfileLoading = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl py-8 space-y-8">
        <Card className="w-full h-[500px] animate-pulse" />
      </main>
    </div>
  );
};
