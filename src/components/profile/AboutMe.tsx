
import React from 'react';
import { Card } from '@/components/ui/card';

interface AboutMeProps {
  content: string;
}

export const AboutMe = ({ content }: AboutMeProps) => {
  if (!content) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">About Me</h2>
      <Card className="p-6">
        <p className="text-lg leading-relaxed">{content}</p>
      </Card>
    </section>
  );
};
