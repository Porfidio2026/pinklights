
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase, setupSessionTimeout } from '@/lib/supabase';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  User,
  Image,
  Clock,
  MapPin,
  CreditCard,
  Settings
} from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCredits } from '@/hooks/useCredits';

interface PartnerAd {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  destination_url: string | null;
  is_active: boolean;
}

const HomePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { balance, isLive, isExempt, visibilityExpiresAt } = useCredits();

  useEffect(() => {
    const checkProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to continue",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      setupSessionTimeout();

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error || !profile) {
        toast({
          title: "Profile Required",
          description: "Please complete your profile information first",
        });
        navigate('/create-profile');
      }
    };

    checkProfile();
  }, [navigate, toast]);

  const { data: partnerAds = [] } = useQuery({
    queryKey: ['partner-ads-active'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('partner_ads')
        .select('id, title, description, image_url, destination_url, is_active')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as PartnerAd[];
    },
  });

  const handleAdClick = async (ad: PartnerAd) => {
    // Track click
    await supabase
      .from('partner_ads')
      .update({ click_count: (ad as any).click_count ? (ad as any).click_count + 1 : 1 })
      .eq('id', ad.id);

    if (ad.destination_url) {
      window.open(ad.destination_url, '_blank', 'noopener,noreferrer');
    }
  };

  const navButtons = [
    { icon: User, text: 'Edit Profile', path: '/create-profile' },
    { icon: Image, text: 'Edit Pictures', path: '/upload-profile-picture' },
    { icon: Clock, text: 'Set Availability', path: '/set-availabilities' },
    { icon: MapPin, text: 'Change Address', path: '/address' },
    { icon: CreditCard, text: 'Payment & Visibility', path: '/buy-credits' },
    { icon: Settings, text: 'Account Settings', path: '/account-settings' },
  ];

  const AdCarousel = ({ ads, title }: { ads: PartnerAd[]; title: string }) => {
    if (ads.length === 0) return null;

    return (
      <div className="bg-card/80 backdrop-blur-xl rounded-lg p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {ads.map((ad) => (
              <CarouselItem key={ad.id} className="md:basis-1/3">
                <button
                  onClick={() => handleAdClick(ad)}
                  className="w-full bg-secondary/30 rounded-lg overflow-hidden h-40 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {ad.image_url ? (
                    <img
                      src={ad.image_url}
                      alt={ad.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="p-4 text-center">
                      <span className="font-medium">{ad.title}</span>
                      {ad.description && (
                        <p className="text-sm text-muted-foreground mt-1">{ad.description}</p>
                      )}
                    </div>
                  )}
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            <CarouselPrevious className="relative static left-0 translate-y-0" />
            <CarouselNext className="relative static right-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <AdCarousel ads={partnerAds} title="Featured Partners" />

        {/* Main Navigation Buttons */}
        <div className="bg-card/80 backdrop-blur-xl rounded-lg p-6 border border-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-display">Welcome to Your Dashboard</h1>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-medium">{balance} day credits</span>
              <div className="flex items-center gap-1.5">
                <div className={`h-2 w-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
                <span className={isLive ? 'text-emerald-400' : 'text-muted-foreground'}>
                  {isExempt ? 'Exempt' : isLive ? 'Live' : 'Hidden'}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {navButtons.map((button) => (
              <Button
                key={button.text}
                onClick={() => navigate(button.path)}
                className="flex flex-col h-24 py-2 w-full"
                variant="default"
              >
                <button.icon className="h-6 w-6 mb-2" />
                <span>{button.text}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
