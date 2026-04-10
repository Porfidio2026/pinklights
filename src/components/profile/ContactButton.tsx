
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, Phone } from 'lucide-react';

interface ContactButtonProps {
  phoneNumber?: string | null;
  profileName: string;
}

export const ContactButton = ({ phoneNumber, profileName }: ContactButtonProps) => {
  if (!phoneNumber) return null;

  // Strip non-numeric characters for the WhatsApp link
  const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber.replace('+', '')}`;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-center">Contact</h2>
      <Card className="p-6 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>{phoneNumber}</span>
        </div>
        <Button
          size="lg"
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat on WhatsApp
          </a>
        </Button>
      </Card>
    </section>
  );
};
