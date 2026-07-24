-- Invoice system for Acatha DTE integration
-- Tracks invoices generated after payments and caches Acatha auth tokens

-- Invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  payment_session_id UUID REFERENCES public.payment_sessions(id) ON DELETE SET NULL,

  -- Acatha/DTE references
  acatha_dte_id TEXT,
  acatha_client_id TEXT,
  dte_number TEXT,
  control_number TEXT,
  generation_code TEXT,

  -- Invoice data
  invoice_type TEXT NOT NULL DEFAULT 'day_credits'
    CHECK (invoice_type IN ('day_credits', 'partner_ad')),
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  description TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- PDF and raw DTE data
  pdf_url TEXT,
  json_dte JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- Users can view their own invoices
CREATE POLICY "Users can view own invoices"
  ON public.invoices FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all invoices
CREATE POLICY "Admins can view all invoices"
  ON public.invoices FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Indexes
CREATE INDEX idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_payment_session_id ON public.invoices(payment_session_id);

-- Acatha session cache (accessed only by Edge Functions via service role)
CREATE TABLE IF NOT EXISTS public.acatha_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT NOT NULL,
  session_id TEXT NOT NULL,
  company_id TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
