import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useInvoices, Invoice } from '@/hooks/useInvoices';
import {
  FileText,
  Download,
  MessageCircle,
  Mail,
  Loader2,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

function statusBadge(status: Invoice['status']) {
  switch (status) {
    case 'completed':
      return <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Completed</span>;
    case 'processing':
      return <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Processing</span>;
    case 'pending':
      return <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Pending</span>;
    case 'failed':
      return <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">Failed</span>;
  }
}

function formatAmount(cents: number, currency: string) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

const MyInvoices = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { invoices, isLoading } = useInvoices();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const _ = null; // downloadingId removed, PDF opens directly

  const handleDownloadPdf = (invoice: Invoice) => {
    if (!invoice.pdf_url) {
      toast({ title: 'PDF not available yet', description: 'Invoice is still being generated', variant: 'destructive' });
      return;
    }
    window.open(invoice.pdf_url, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = (invoice: Invoice) => {
    const lines = [
      `Invoice: ${invoice.dte_number || invoice.id}`,
      invoice.description || 'Pinklights',
      `Amount: ${formatAmount(invoice.amount_cents, invoice.currency)}`,
      `Date: ${new Date(invoice.created_at).toLocaleDateString()}`,
    ];
    if (invoice.pdf_url) {
      lines.push(`Download PDF: ${invoice.pdf_url}`);
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
  };

  const handleShareEmail = (invoice: Invoice) => {
    const subject = `Invoice ${invoice.dte_number || invoice.id} - Pinklights`;
    const lines = [
      'Invoice Details:',
      '',
      invoice.description || 'Pinklights',
      `Amount: ${formatAmount(invoice.amount_cents, invoice.currency)}`,
      `Date: ${new Date(invoice.created_at).toLocaleDateString()}`,
      `Status: ${invoice.status}`,
    ];
    if (invoice.dte_number) lines.push(`DTE Number: ${invoice.dte_number}`);
    if (invoice.pdf_url) lines.push(`\nDownload PDF: ${invoice.pdf_url}`);
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6" />
            My Invoices
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
            Loading invoices...
          </div>
        ) : invoices.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-lg font-semibold mb-2">No invoices yet</h2>
            <p className="text-muted-foreground mb-4">
              Invoices are automatically generated when you purchase day credits.
            </p>
            <Button onClick={() => navigate('/buy-credits')}>
              Buy Day Credits
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {invoices.map((invoice) => {
              const isExpanded = expandedId === invoice.id;
              return (
                <Card key={invoice.id} className="overflow-hidden">
                  <button
                    type="button"
                    className="w-full px-4 py-4 flex items-center justify-between text-left"
                    onClick={() => setExpandedId(isExpanded ? null : invoice.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium truncate">
                          {invoice.description || 'Invoice'}
                        </span>
                        {statusBadge(invoice.status)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{new Date(invoice.created_at).toLocaleDateString()}</span>
                        <span className="font-medium text-foreground">
                          {formatAmount(invoice.amount_cents, invoice.currency)}
                        </span>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {invoice.dte_number && (
                          <>
                            <span className="text-muted-foreground">DTE Number</span>
                            <span className="font-mono">{invoice.dte_number}</span>
                          </>
                        )}
                        {invoice.control_number && (
                          <>
                            <span className="text-muted-foreground">Control Number</span>
                            <span className="font-mono">{invoice.control_number}</span>
                          </>
                        )}
                        {invoice.generation_code && (
                          <>
                            <span className="text-muted-foreground">Generation Code</span>
                            <span className="font-mono text-xs">{invoice.generation_code}</span>
                          </>
                        )}
                        <span className="text-muted-foreground">Status</span>
                        <span>{invoice.status}</span>
                        {invoice.completed_at && (
                          <>
                            <span className="text-muted-foreground">Completed</span>
                            <span>{new Date(invoice.completed_at).toLocaleString()}</span>
                          </>
                        )}
                        {invoice.error_message && (
                          <>
                            <span className="text-muted-foreground">Error</span>
                            <span className="text-destructive text-xs">{invoice.error_message}</span>
                          </>
                        )}
                      </div>

                      <div className="flex gap-2 pt-2">
                        {invoice.pdf_url && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDownloadPdf(invoice)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            PDF
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareWhatsApp(invoice)}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleShareEmail(invoice)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Email
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInvoices;
