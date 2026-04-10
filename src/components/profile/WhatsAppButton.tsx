
import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  profileName?: string;
}

export const WhatsAppButton = ({ phoneNumber, profileName }: WhatsAppButtonProps) => {
  const { toast } = useToast();

  const handleWhatsAppClick = () => {
    if (phoneNumber) {
      // Format the phone number by removing any non-digit characters
      const formattedNumber = phoneNumber.replace(/\D/g, '');
      
      // Open WhatsApp with the profile's phone number
      const whatsappUrl = `https://wa.me/${formattedNumber}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp",
        description: `Opening chat with ${profileName}`,
      });
    } else {
      toast({
        title: "No phone number",
        description: "This profile doesn't have a phone number available",
        variant: "destructive",
      });
    }
  };

  return (
    <Button 
      variant="default" 
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
      onClick={handleWhatsAppClick}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </Button>
  );
};
