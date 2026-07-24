import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, RefreshCw, Loader2 } from 'lucide-react';

interface AdminInvoice {
  id: string;
  user_id: string;
  invoice_type: string;
  amount_cents: number;
  currency: string;
  description: string | null;
  status: string;
  error_message: string | null;
  retry_count: number;
  dte_number: string | null;
  created_at: string;
  completed_at: string | null;
}

function statusBadge(status: string) {
  switch (status) {
    case 'completed':
      return <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Completed</span>;
    case 'processing':
      return <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Processing</span>;
    case 'pending':
      return <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Pending</span>;
    case 'failed':
      return <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Failed</span>;
    default:
      return <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{status}</span>;
  }
}

const AdminInvoices = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ['admin-invoices', search, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from('invoices')
        .select('id, user_id, invoice_type, amount_cents, currency, description, status, error_message, retry_count, dte_number, created_at, completed_at')
        .order('created_at', { ascending: false })
        .limit(200);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as unknown as AdminInvoice[];
    },
  });

  const filteredInvoices = search
    ? invoices.filter((inv) => {
        return (inv.description || '').toLowerCase().includes(search.toLowerCase()) ||
          (inv.dte_number || '').toLowerCase().includes(search.toLowerCase());
      })
    : invoices;

  const handleRetry = async (invoiceId: string) => {
    setRetryingId(invoiceId);
    try {
      // Find the invoice to get payment_session_id
      const { data: invoice } = await supabase
        .from('invoices')
        .select('payment_session_id')
        .eq('id', invoiceId)
        .single();

      if (!invoice?.payment_session_id) {
        throw new Error('No payment session linked to this invoice');
      }

      const { error } = await supabase.functions.invoke('generate-invoice', {
        body: { payment_session_id: invoice.payment_session_id },
      });

      if (error) throw error;

      toast({ title: 'Invoice retry triggered' });
      queryClient.invalidateQueries({ queryKey: ['admin-invoices'] });
    } catch (err: any) {
      toast({
        title: 'Retry failed',
        description: err.message || 'Could not retry invoice generation',
        variant: 'destructive',
      });
    } finally {
      setRetryingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-background border border-border rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="completed">Completed</option>
            <option value="processing">Processing</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or DTE..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading invoices...</div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-left px-4 py-3 font-medium">Amount</th>
                  <th className="text-left px-4 py-3 font-medium">DTE #</th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-left px-4 py-3 font-medium">Date</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-[200px]">
                      {invoice.description || '-'}
                    </td>
                    <td className="px-4 py-3">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: invoice.currency,
                      }).format(invoice.amount_cents / 100)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {invoice.dte_number || '-'}
                    </td>
                    <td className="px-4 py-3">{statusBadge(invoice.status)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(invoice.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {invoice.status === 'failed' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetry(invoice.id)}
                            disabled={retryingId === invoice.id}
                            title="Retry invoice generation"
                          >
                            {retryingId === invoice.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredInvoices.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No invoices found</div>
          )}
        </Card>
      )}
    </div>
  );
};

export default AdminInvoices;
