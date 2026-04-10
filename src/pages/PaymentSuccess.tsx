import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCredits } from '@/hooks/useCredits';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');
  const queryClient = useQueryClient();
  const { balance, isLoading } = useCredits();
  const [pollCount, setPollCount] = useState(0);
  const [ready, setReady] = useState(false);

  // Poll credit balance to catch the webhook update
  useEffect(() => {
    if (ready || pollCount >= 15) {
      setReady(true);
      return;
    }

    const timer = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      queryClient.invalidateQueries({ queryKey: ['visibility-expiry'] });
      setPollCount((c) => c + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pollCount, ready, queryClient]);

  // Stop polling once we see credits
  useEffect(() => {
    if (balance > 0 && pollCount > 0) {
      setReady(true);
    }
  }, [balance, pollCount]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="h-16 w-16 rounded-full gradient-pink flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">Payment Received!</h1>
          <p className="text-muted-foreground">
            Your day credits are being added to your account.
          </p>
        </div>

        {!ready && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing your credits...</span>
          </div>
        )}

        {ready && (
          <div className="space-y-1">
            <p className="text-3xl font-bold text-gradient-pink">
              {isLoading ? '...' : balance}
            </p>
            <p className="text-sm text-muted-foreground">day credits available</p>
          </div>
        )}

        {orderNumber && (
          <p className="text-xs text-muted-foreground">Order: {orderNumber}</p>
        )}

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => navigate('/buy-credits')}
            className="w-full gradient-pink text-white border-0 rounded-xl h-11 font-semibold hover:opacity-90 transition-opacity"
          >
            Activate Your Days
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate('/home')}
            className="w-full text-muted-foreground"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
