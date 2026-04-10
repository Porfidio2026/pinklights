import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCredits } from '@/hooks/useCredits';
import { supabase } from '@/lib/supabase';
import { Zap, Clock, Sparkles, Crown, Loader2 } from 'lucide-react';

const PACKAGES = [
  { id: '1day', days: 1, price: '$5', label: '1 Day', description: 'Try it out' },
  { id: '7day', days: 7, price: '$25', label: '7 Days', description: 'Most popular', featured: true },
  { id: '30day', days: 30, price: '$75', label: '30 Days', description: 'Best value' },
];

const BuyDayCredits = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { balance, isLoading, isLive, isExempt, visibilityExpiresAt, activateDayCredit } = useCredits();
  const [purchasingPackage, setPurchasingPackage] = useState<string | null>(null);

  const handlePurchase = async (packageId: string) => {
    setPurchasingPackage(packageId);
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { packageId },
      });

      if (error) throw error;

      if (data?.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      toast({
        title: 'Payment Error',
        description: err.message || 'Failed to create payment session. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setPurchasingPackage(null);
    }
  };

  const handleActivate = async () => {
    await activateDayCredit.mutateAsync();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Visibility Status Banner */}
        <div className={`glass-card p-6 text-center ${isLive ? 'border-emerald-500/30' : 'border-pink-300'}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            {isLive ? (
              <>
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                <h2 className="text-lg font-semibold text-emerald-400">Your Profile is LIVE</h2>
              </>
            ) : (
              <>
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <h2 className="text-lg font-semibold text-muted-foreground">Your Profile is Hidden</h2>
              </>
            )}
          </div>

          {isExempt && (
            <p className="text-sm text-muted-foreground">Payment exempt (set by admin)</p>
          )}

          {!isExempt && isLive && visibilityExpiresAt && (
            <p className="text-sm text-muted-foreground">
              Visible until {visibilityExpiresAt.toLocaleString()}
            </p>
          )}

          {!isExempt && !isLive && (
            <p className="text-sm text-muted-foreground">
              Activate day credits to make your profile visible in search results
            </p>
          )}
        </div>

        {/* Day Credit Balance & Activation */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Day Credits</h3>
              <p className="text-3xl font-bold text-gradient-pink">
                {isLoading ? '...' : balance}
              </p>
              <p className="text-sm text-muted-foreground">credits available</p>
            </div>
            <Clock className="h-10 w-10 text-pink opacity-50" />
          </div>

          <Button
            onClick={handleActivate}
            disabled={balance < 1 || activateDayCredit.isPending || isExempt}
            className="w-full gradient-pink text-white border-0 rounded-xl h-12 font-semibold text-base hover:opacity-90 transition-opacity"
          >
            {activateDayCredit.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Zap className="h-5 w-5 mr-2" />
            )}
            {isExempt
              ? 'Payment Exempt'
              : balance < 1
                ? 'No Credits \u2014 Purchase Below'
                : isLive
                  ? 'Add Another Day (+24h)'
                  : 'Go Live for 24 Hours'}
          </Button>

          {balance > 1 && !isExempt && (
            <p className="text-xs text-muted-foreground text-center mt-2">
              You can activate multiple times to stack days
            </p>
          )}
        </div>

        {/* Purchase Packages */}
        <div>
          <h3 className="text-xl font-bold mb-1">Buy Day Credits</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Each credit gives your profile 24 hours of visibility
          </p>

          <div className="grid gap-4">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => handlePurchase(pkg.id)}
                disabled={purchasingPackage !== null}
                className={`glass-card p-5 flex items-center justify-between transition-all duration-200 hover:scale-[1.02] hover:pink-glow ${
                  pkg.featured ? 'border-pink-300 pink-glow' : ''
                } ${purchasingPackage === pkg.id ? 'opacity-70' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                    pkg.featured ? 'gradient-pink' : 'bg-pink-100'
                  }`}>
                    {pkg.featured ? (
                      <Crown className="h-6 w-6 text-white" />
                    ) : (
                      <Sparkles className="h-6 w-6 text-pink" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-lg">{pkg.label}</p>
                    <p className="text-sm text-muted-foreground">{pkg.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  {purchasingPackage === pkg.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-pink" />
                  ) : (
                    <span className="text-xl font-bold text-gradient-pink">{pkg.price}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/home')}
            className="text-muted-foreground"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyDayCredits;
