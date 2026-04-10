
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Star, Coins } from 'lucide-react';
import { useCredits } from '@/hooks/useCredits';
import { CreditBalance } from '@/components/credits/CreditBalance';
import { supabase } from '@/lib/supabase';

const FEATURE_COST = 50; // credits to feature a profile

const FeaturedProfile = () => {
  const { toast } = useToast();
  const { balance, spendCredits } = useCredits();

  const handleUpgrade = async () => {
    if (balance < FEATURE_COST) {
      toast({
        title: "Insufficient Credits",
        description: `You need ${FEATURE_COST} credits to feature your profile. You have ${balance}.`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Feature the profile
      const { error } = await supabase
        .from('profiles')
        .update({ is_featured: true })
        .eq('user_id', session.user.id);

      if (error) throw error;

      // Spend credits
      await spendCredits.mutateAsync({ amount: FEATURE_COST, description: 'Feature profile' });

      toast({
        title: "Profile Featured!",
        description: "Your profile is now featured and will appear at the top of search results.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to feature your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <Card className="p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-4">Upgrade to Featured Profile</h1>
            <p className="text-muted-foreground">
              Stand out from the crowd and get more visibility
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-secondary/20 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Profile Benefits
              </h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-1 text-yellow-500" />
                  Appear at the top of search results
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-1 text-yellow-500" />
                  Get a special badge on your profile
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-1 text-yellow-500" />
                  Access to premium features
                </li>
                <li className="flex items-start gap-2">
                  <Star className="w-4 h-4 mt-1 text-yellow-500" />
                  Priority customer support
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <CreditBalance />
              </div>
              <div className="space-y-2">
                <p className="text-3xl font-bold flex items-center justify-center gap-2">
                  <Coins className="h-8 w-8 text-yellow-500" />
                  {FEATURE_COST} Credits
                </p>
                <p className="text-sm text-muted-foreground">one-time payment to feature your profile</p>
              </div>

              <Button
                onClick={handleUpgrade}
                className="w-full"
                size="lg"
                disabled={balance < FEATURE_COST || spendCredits.isPending}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {balance < FEATURE_COST ? 'Not Enough Credits' : 'Feature My Profile'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FeaturedProfile;
