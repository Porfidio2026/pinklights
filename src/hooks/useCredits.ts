import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface VisibilityInfo {
  visibility_expires_at: string | null;
  payment_exempt: boolean;
}

export function useCredits() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: balance = 0, isLoading } = useQuery({
    queryKey: ['credits'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return 0;

      const { data, error } = await supabase
        .from('credits')
        .select('balance')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data?.balance ?? 0;
    },
  });

  const { data: visibilityInfo } = useQuery({
    queryKey: ['visibility-expiry'],
    queryFn: async (): Promise<VisibilityInfo | null> => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('visibility_expires_at, payment_exempt')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error) throw error;
      return data as VisibilityInfo | null;
    },
  });

  const isLive = visibilityInfo?.payment_exempt ||
    (visibilityInfo?.visibility_expires_at &&
      new Date(visibilityInfo.visibility_expires_at) > new Date());

  const visibilityExpiresAt = visibilityInfo?.visibility_expires_at
    ? new Date(visibilityInfo.visibility_expires_at)
    : null;

  const isExempt = visibilityInfo?.payment_exempt ?? false;

  const spendCredits = useMutation({
    mutationFn: async ({ amount, description }: { amount: number; description: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data: current } = await supabase
        .from('credits')
        .select('balance')
        .eq('user_id', session.user.id)
        .single();

      if (!current || current.balance < amount) {
        throw new Error('Insufficient credits');
      }

      const { error: updateError } = await supabase
        .from('credits')
        .update({ balance: current.balance - amount, updated_at: new Date().toISOString() })
        .eq('user_id', session.user.id);

      if (updateError) throw updateError;

      const { error: txError } = await supabase
        .from('credit_transactions')
        .insert({
          user_id: session.user.id,
          amount: -amount,
          type: 'spend',
          description,
        });

      if (txError) throw txError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credits'] });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const activateDayCredit = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc('activate_day_credit');
      if (error) throw error;
      return data as string; // returns new expiry timestamp
    },
    onSuccess: (newExpiry) => {
      queryClient.invalidateQueries({ queryKey: ['credits'] });
      queryClient.invalidateQueries({ queryKey: ['visibility-expiry'] });
      toast({
        title: 'Profile is Live!',
        description: `Visible until ${new Date(newExpiry).toLocaleString()}`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message === 'Insufficient day credits'
          ? 'You need at least 1 day credit. Purchase credits first.'
          : error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    balance,
    isLoading,
    isLive,
    isExempt,
    visibilityExpiresAt,
    spendCredits,
    activateDayCredit,
  };
}
