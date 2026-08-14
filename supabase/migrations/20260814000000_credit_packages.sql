-- Move the day-credit packages out of code and into the database.
--
-- Prices were hardcoded in two places -- supabase/functions/create-payment and
-- src/pages/BuyDayCredits.tsx -- so changing one meant editing both and
-- redeploying, with nothing stopping the two from drifting apart. They are now
-- read from here at request time, so a price change takes effect immediately.

CREATE TABLE IF NOT EXISTS public.credit_packages (
  -- Matches the packageId the frontend sends to create-payment.
  id TEXT PRIMARY KEY,

  label TEXT NOT NULL,               -- "7 Days"      shown on the card
  description TEXT NOT NULL,         -- "Most popular" shown under the label
  invoice_description TEXT NOT NULL, -- "7 Days Access" printed on the DTE

  days INTEGER NOT NULL CHECK (days > 0),
  -- IVA-inclusive, matching how Consumidor Final prices work: the DTE extracts
  -- IVA with amount * 13 / 113 rather than adding it on top.
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  currency TEXT NOT NULL DEFAULT 'USD',

  -- `barras` of the matching item in the Acatha catalog. Null falls back to the
  -- ACATHA_ITEM_CODE secret, which is how the dev company still works.
  acatha_item_code TEXT,

  sort_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.credit_packages ENABLE ROW LEVEL SECURITY;

-- Prices are public information: the purchase page has to render them before
-- anyone signs in.
DROP POLICY IF EXISTS "Anyone can read credit packages" ON public.credit_packages;
CREATE POLICY "Anyone can read credit packages"
  ON public.credit_packages FOR SELECT
  USING (true);

-- Writes are admin-only. Edge Functions use the service role, which bypasses RLS.
DROP POLICY IF EXISTS "Admins can manage credit packages" ON public.credit_packages;
CREATE POLICY "Admins can manage credit packages"
  ON public.credit_packages FOR ALL
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Current live prices, and the Acatha production catalog codes created for them.
INSERT INTO public.credit_packages
  (id, label, description, invoice_description, days, amount_cents, acatha_item_code, sort_order, featured)
VALUES
  ('1day',  '1 Day',  'Try it out',    '1 Day Access',   1,   500, 'PL-1DAY',  1, false),
  ('7day',  '7 Days', 'Most popular',  '7 Days Access',  7,  2500, 'PL-7DAY',  2, true),
  ('30day', '30 Days','Best value',    '30 Days Access', 30, 7500, 'PL-30DAY', 3, false)
ON CONFLICT (id) DO NOTHING;

-- Record which package a payment was for, so the invoice can name the right
-- product and reference the right Acatha item without guessing from the amount.
ALTER TABLE public.payment_sessions
  ADD COLUMN IF NOT EXISTS package_id TEXT REFERENCES public.credit_packages(id);

CREATE INDEX IF NOT EXISTS idx_payment_sessions_package_id
  ON public.payment_sessions(package_id);
