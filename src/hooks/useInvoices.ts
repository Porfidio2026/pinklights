import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface Invoice {
  id: string;
  user_id: string;
  payment_session_id: string | null;
  acatha_dte_id: string | null;
  dte_number: string | null;
  control_number: string | null;
  generation_code: string | null;
  invoice_type: 'day_credits' | 'partner_ad';
  amount_cents: number;
  currency: string;
  description: string | null;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error_message: string | null;
  retry_count: number;
  pdf_url: string | null;
  created_at: string;
  completed_at: string | null;
}

export function useInvoices() {
  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data ?? []) as Invoice[];
    },
  });

  return { invoices, isLoading };
}
