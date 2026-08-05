-- =============================================================================
-- DAY CREDITS PAYMENT SYSTEM
-- =============================================================================
-- Adds DitoBanx payment integration with "day credits" model:
-- - Profile owners buy day credits via DitoBanx checkout
-- - Manually activate credits to make profile visible for 24h windows
-- - Admin can exempt individual profiles or enable global marketing mode
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 1. NEW COLUMNS ON PROFILES
-- ---------------------------------------------------------------------------

-- When non-NULL and in the future, profile is visible in search
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS visibility_expires_at TIMESTAMPTZ DEFAULT NULL;

-- Admin per-profile override: always visible regardless of payment
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS payment_exempt BOOLEAN DEFAULT false;


-- ---------------------------------------------------------------------------
-- 2. APP SETTINGS TABLE (global config)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read (needed by RPC functions to check marketing_mode)
CREATE POLICY "Anyone can read app settings"
  ON public.app_settings FOR SELECT USING (true);

-- Only admins can write
CREATE POLICY "Admins can manage app settings"
  ON public.app_settings FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

CREATE POLICY "Admins can update app settings"
  ON public.app_settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Seed default
INSERT INTO public.app_settings (key, value)
VALUES ('marketing_mode', 'false')
ON CONFLICT (key) DO NOTHING;


-- ---------------------------------------------------------------------------
-- 3. PAYMENT SESSIONS TABLE (DitoBanx tracking)
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.payment_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  order_number TEXT NOT NULL UNIQUE,
  day_credits INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'completed', 'failed')),
  ditobanx_session_id TEXT,
  ditobanx_payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own payment history
CREATE POLICY "Users can view their own payment sessions"
  ON public.payment_sessions FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT and UPDATE handled by Edge Functions via service role key (bypasses RLS)


-- ---------------------------------------------------------------------------
-- 4. UPDATE RPC: search_nearby_profiles (add visibility gate)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.search_nearby_profiles(
  search_lat DOUBLE PRECISION,
  search_lon DOUBLE PRECISION,
  max_distance_km DOUBLE PRECISION,
  search_service_type TEXT DEFAULT NULL,
  search_gender TEXT DEFAULT NULL,
  hair_colours TEXT[] DEFAULT NULL,
  breast_sizes TEXT[] DEFAULT NULL,
  skin_tones TEXT[] DEFAULT NULL,
  body_types TEXT[] DEFAULT NULL,
  min_age INTEGER DEFAULT NULL,
  max_age INTEGER DEFAULT NULL
)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  age INTEGER,
  location TEXT,
  availability_status TEXT,
  profile_picture_url TEXT,
  distance_km DOUBLE PRECISION,
  hair_colour TEXT,
  breast_size TEXT,
  skin_tone TEXT,
  body_type TEXT,
  gender TEXT,
  service_type TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.age,
    p.location,
    p.availability_status,
    p.profile_picture_url,
    ROUND(
      (point(p.longitude, p.latitude) <@> point(search_lon, search_lat))::numeric * 1.609344, 1
    )::double precision AS distance_km,
    p.hair_colour,
    p.breast_size,
    p.skin_tone,
    p.body_type,
    p.gender,
    p.service_type,
    p.latitude,
    p.longitude
  FROM public.profiles p
  WHERE p.latitude IS NOT NULL
    AND p.longitude IS NOT NULL
    AND (point(p.longitude, p.latitude) <@> point(search_lon, search_lat)) * 1.609344 <= max_distance_km
    AND (search_service_type IS NULL OR p.service_type = search_service_type)
    AND (search_gender IS NULL OR p.gender = search_gender)
    AND (hair_colours IS NULL OR p.hair_colour = ANY(hair_colours))
    AND (breast_sizes IS NULL OR p.breast_size = ANY(breast_sizes))
    AND (skin_tones IS NULL OR p.skin_tone = ANY(skin_tones))
    AND (body_types IS NULL OR p.body_type = ANY(body_types))
    AND (min_age IS NULL OR p.age >= min_age)
    AND (max_age IS NULL OR p.age <= max_age)
    -- Visibility gate: paid, exempt, or marketing mode
    AND (
      EXISTS (SELECT 1 FROM public.app_settings WHERE key = 'marketing_mode' AND value = 'true')
      OR p.payment_exempt = true
      OR p.visibility_expires_at > now()
    )
  ORDER BY distance_km;
END;
$$;


-- ---------------------------------------------------------------------------
-- 5. UPDATE RPC: get_featured_profiles (add visibility gate)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.get_featured_profiles(
  search_service_type TEXT DEFAULT NULL,
  search_gender TEXT DEFAULT NULL,
  limit_count INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  age INTEGER,
  location TEXT,
  availability_status TEXT,
  profile_picture_url TEXT,
  latest_payment TIMESTAMPTZ,
  is_featured BOOLEAN,
  service_type TEXT,
  gender TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.full_name,
    p.age,
    p.location,
    p.availability_status,
    p.profile_picture_url,
    p.latest_payment,
    p.is_featured,
    p.service_type,
    p.gender
  FROM public.profiles p
  WHERE (search_service_type IS NULL OR p.service_type = search_service_type)
    AND (search_gender IS NULL OR p.gender = search_gender)
    -- Visibility gate: paid, exempt, or marketing mode
    AND (
      EXISTS (SELECT 1 FROM public.app_settings WHERE key = 'marketing_mode' AND value = 'true')
      OR p.payment_exempt = true
      OR p.visibility_expires_at > now()
    )
  ORDER BY p.is_featured DESC, p.latest_payment DESC NULLS LAST, p.created_at DESC
  LIMIT limit_count;
END;
$$;


-- ---------------------------------------------------------------------------
-- 6. NEW RPC: activate_day_credit
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.activate_day_credit()
RETURNS TIMESTAMPTZ
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_balance INTEGER;
  new_expiry TIMESTAMPTZ;
  current_expiry TIMESTAMPTZ;
BEGIN
  -- Get current balance
  SELECT balance INTO current_balance
  FROM public.credits
  WHERE user_id = auth.uid();

  IF current_balance IS NULL OR current_balance < 1 THEN
    RAISE EXCEPTION 'Insufficient day credits';
  END IF;

  -- Get current visibility expiry
  SELECT visibility_expires_at INTO current_expiry
  FROM public.profiles
  WHERE user_id = auth.uid();

  -- If currently active, extend from current expiry; otherwise start from now
  IF current_expiry IS NOT NULL AND current_expiry > now() THEN
    new_expiry := current_expiry + INTERVAL '24 hours';
  ELSE
    new_expiry := now() + INTERVAL '24 hours';
  END IF;

  -- Deduct 1 day credit
  UPDATE public.credits
  SET balance = balance - 1, updated_at = now()
  WHERE user_id = auth.uid();

  -- Record transaction
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (auth.uid(), -1, 'spend', 'Activated 1 day of visibility');

  -- Set new visibility expiry on profile
  UPDATE public.profiles
  SET visibility_expires_at = new_expiry
  WHERE user_id = auth.uid();

  RETURN new_expiry;
END;
$$;


-- ---------------------------------------------------------------------------
-- 7. FIX: Admin profile UPDATE policy (pre-existing bug)
-- ---------------------------------------------------------------------------
-- The existing policy only allows profile owners to update.
-- Admins need to toggle is_banned, is_featured, payment_exempt.

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Admins can insert profiles on behalf of others (bulk import)
CREATE POLICY "Admins can insert any profile"
  ON public.profiles FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- Admins can upload to profile_pictures storage on behalf of others
CREATE POLICY "Admins can upload any profile pictures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile_pictures'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- Admins can insert profile_pictures records for any profile
CREATE POLICY "Admins can insert any profile pictures"
  ON public.profile_pictures FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));
