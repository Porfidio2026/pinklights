-- =============================================================================
-- PINKLIGHTS — Full Database Setup & Seed Script
-- =============================================================================
-- Run this in the Supabase SQL Editor on a fresh project.
--
-- After running this script, create 3 users via Supabase Auth
-- (Dashboard > Authentication > Users > Add user):
--   1. admin@pinklights.com       / Test1234!   (Admin + profile user)
--   2. user@pinklights.com        / Test1234!   (Regular profile user)
--   3. partner@pinklights.com     / Test1234!   (Partner / advertiser)
--
-- Then copy each user's UUID from the Auth dashboard and run the
-- "USER-LINKED SEED DATA" block at the bottom (uncomment + paste UUIDs).
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 1. EXTENSIONS
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "cube";
CREATE EXTENSION IF NOT EXISTS "earthdistance";


-- ---------------------------------------------------------------------------
-- 2. TABLES
-- ---------------------------------------------------------------------------

-- Profiles (the core model)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT,
  username TEXT,
  age INTEGER,
  gender TEXT NOT NULL DEFAULT 'Female',
  service_type TEXT NOT NULL DEFAULT 'private',
  about_me TEXT,
  location TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  distance_km DOUBLE PRECISION,
  drive_minutes INTEGER,
  phone_number TEXT,
  hair_colour TEXT,
  breast_size TEXT,
  skin_tone TEXT,
  body_type TEXT,
  favorite_flower TEXT,
  profile_picture_url TEXT,
  is_available BOOLEAN DEFAULT true,
  availability_status TEXT DEFAULT 'available',
  is_featured BOOLEAN DEFAULT false,
  latest_payment TIMESTAMPTZ,
  visibility_expires_at TIMESTAMPTZ DEFAULT NULL,
  payment_exempt BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profile pictures
CREATE TABLE IF NOT EXISTS public.profile_pictures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  picture_url TEXT NOT NULL,
  is_main_picture BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Availabilities (schedule grid)
CREATE TABLE IF NOT EXISTS public.availabilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  hour TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  location TEXT,
  date TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cached coordinates (geocoding cache)
CREATE TABLE IF NOT EXISTS public.cached_coordinates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Profile searches (analytics)
CREATE TABLE IF NOT EXISTS public.profile_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  max_distance INTEGER NOT NULL,
  hair_colours TEXT[],
  breast_sizes TEXT[],
  min_age INTEGER,
  max_age INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Partners (advertisers)
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name TEXT,
  contact_person TEXT,
  email TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Partner ads
CREATE TABLE IF NOT EXISTS public.partner_ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES public.partners(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  destination_url TEXT,
  is_active BOOLEAN DEFAULT true,
  view_count INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Admin users
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Credits (balance per user)
CREATE TABLE IF NOT EXISTS public.credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Credit transactions (audit log)
CREATE TABLE IF NOT EXISTS public.credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL, -- 'purchase' or 'spend'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reported content (moderation)
CREATE TABLE IF NOT EXISTS public.reported_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'resolved', 'dismissed'
  reviewed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Secrets table (legacy — kept for schema compatibility)
CREATE TABLE IF NOT EXISTS public.secrets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- App settings (global config, e.g. marketing_mode)
CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Payment sessions (DitoBanx checkout tracking)
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


-- ---------------------------------------------------------------------------
-- 3. RPC FUNCTIONS
-- ---------------------------------------------------------------------------

-- Search nearby profiles (with filters)
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

-- Get featured profiles
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

-- Update drive time
CREATE OR REPLACE FUNCTION public.update_drive_time(
  profile_id UUID,
  drive_time INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.profiles
  SET drive_minutes = drive_time
  WHERE id = profile_id;
END;
$$;

-- Activate a day credit (deduct 1 credit, set visibility for 24h)
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
  SELECT balance INTO current_balance
  FROM public.credits WHERE user_id = auth.uid();

  IF current_balance IS NULL OR current_balance < 1 THEN
    RAISE EXCEPTION 'Insufficient day credits';
  END IF;

  SELECT visibility_expires_at INTO current_expiry
  FROM public.profiles WHERE user_id = auth.uid();

  IF current_expiry IS NOT NULL AND current_expiry > now() THEN
    new_expiry := current_expiry + INTERVAL '24 hours';
  ELSE
    new_expiry := now() + INTERVAL '24 hours';
  END IF;

  UPDATE public.credits SET balance = balance - 1, updated_at = now()
  WHERE user_id = auth.uid();

  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (auth.uid(), -1, 'spend', 'Activated 1 day of visibility');

  UPDATE public.profiles SET visibility_expires_at = new_expiry
  WHERE user_id = auth.uid();

  RETURN new_expiry;
END;
$$;


-- ---------------------------------------------------------------------------
-- 4. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_pictures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cached_coordinates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reported_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secrets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;

-- PROFILES: public read, owner write, admin write
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));
CREATE POLICY "Admins can insert any profile" ON public.profiles FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- PROFILE PICTURES: public read, owner write
CREATE POLICY "Profile pictures are viewable by everyone" ON public.profile_pictures FOR SELECT USING (true);
CREATE POLICY "Users can manage their own pictures" ON public.profile_pictures FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own pictures" ON public.profile_pictures FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Admins can insert any profile pictures" ON public.profile_pictures FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- AVAILABILITIES: public read, owner write
CREATE POLICY "Availabilities are viewable by everyone" ON public.availabilities FOR SELECT USING (true);
CREATE POLICY "Users can manage their own availabilities" ON public.availabilities FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Users can update their own availabilities" ON public.availabilities FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own availabilities" ON public.availabilities FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid())
);

-- REVIEWS: public read, authenticated insert
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can add reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- CACHED COORDINATES: public read/write
CREATE POLICY "Cached coordinates are viewable by everyone" ON public.cached_coordinates FOR SELECT USING (true);
CREATE POLICY "Anyone can cache coordinates" ON public.cached_coordinates FOR INSERT WITH CHECK (true);

-- PROFILE SEARCHES: public insert, admin read
CREATE POLICY "Anyone can log searches" ON public.profile_searches FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view searches" ON public.profile_searches FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid())
);

-- PARTNERS: owner read/write
CREATE POLICY "Partners can view their own data" ON public.partners FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create partner accounts" ON public.partners FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Partners can update their own data" ON public.partners FOR UPDATE USING (auth.uid() = user_id);

-- PARTNER ADS: public read, owner write
CREATE POLICY "Partner ads are viewable by everyone" ON public.partner_ads FOR SELECT USING (true);
CREATE POLICY "Partners can manage their own ads" ON public.partner_ads FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_id AND partners.user_id = auth.uid())
);
CREATE POLICY "Partners can update their own ads" ON public.partner_ads FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_id AND partners.user_id = auth.uid())
);
CREATE POLICY "Partners can delete their own ads" ON public.partner_ads FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.partners WHERE partners.id = partner_id AND partners.user_id = auth.uid())
);

-- ADMIN USERS: self-read only
CREATE POLICY "Admins can view admin table" ON public.admin_users FOR SELECT USING (auth.uid() = user_id);

-- CREDITS: owner only
CREATE POLICY "Users can view their own credits" ON public.credits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own credits" ON public.credits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own credits" ON public.credits FOR UPDATE USING (auth.uid() = user_id);

-- CREDIT TRANSACTIONS: owner only
CREATE POLICY "Users can view their own transactions" ON public.credit_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own transactions" ON public.credit_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- REPORTED CONTENT: authenticated insert, admin read/update
CREATE POLICY "Authenticated users can report content" ON public.reported_content FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can view reports" ON public.reported_content FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid())
);
CREATE POLICY "Admins can update reports" ON public.reported_content FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE admin_users.user_id = auth.uid())
);

-- SECRETS: no public access
CREATE POLICY "No public access to secrets" ON public.secrets FOR SELECT USING (false);

-- APP SETTINGS: public read, admin write
CREATE POLICY "Anyone can read app settings" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert app settings" ON public.app_settings FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));
CREATE POLICY "Admins can update app settings" ON public.app_settings FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()));

-- PAYMENT SESSIONS: owner read only (inserts/updates via service role)
CREATE POLICY "Users can view their own payment sessions" ON public.payment_sessions FOR SELECT
  USING (auth.uid() = user_id);


-- ---------------------------------------------------------------------------
-- 5. STORAGE BUCKET
-- ---------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile_pictures', 'profile_pictures', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Profile pictures are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile_pictures');

CREATE POLICY "Authenticated users can upload profile pictures"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile_pictures' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can delete their own profile pictures"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'profile_pictures' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can upload any profile pictures"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile_pictures'
    AND EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );


-- ---------------------------------------------------------------------------
-- 6. SEED DATA — Test profiles (no auth user linked yet)
-- ---------------------------------------------------------------------------

-- Default app settings
INSERT INTO public.app_settings (key, value) VALUES ('marketing_mode', 'false')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.profiles (id, full_name, age, gender, service_type, about_me, location, latitude, longitude, hair_colour, breast_size, skin_tone, body_type, is_available, availability_status, is_featured, payment_exempt, profile_picture_url) VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'Sophie',
  24,
  'Female',
  'private',
  'Elegant and refined. I love candlelit evenings, fine dining, and meaningful conversations.',
  'Brussels, Belgium',
  50.8503, 4.3517,
  'Blonde', 'Medium', 'Light', 'Petite',
  true, 'available', true, true,
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop'
),
(
  'a2222222-2222-2222-2222-222222222222',
  'Luna',
  27,
  'Female',
  'outcall',
  'Free-spirited and adventurous. Let us create unforgettable moments together.',
  'Antwerp, Belgium',
  51.2194, 4.4025,
  'Dark', 'Big', 'Brown', 'Medium',
  true, 'available', true, true,
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop'
),
(
  'a3333333-3333-3333-3333-333333333333',
  'Valentina',
  22,
  'Female',
  'soft',
  'Warm, caring, and passionate. Your comfort is my priority.',
  'Ghent, Belgium',
  51.0543, 3.7174,
  'Red', 'Small', 'Light', 'Petite',
  true, 'busy', false, true,
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop'
),
(
  'a4444444-4444-4444-4444-444444444444',
  'Mia',
  29,
  'Trans',
  'private',
  'Confident and captivating. I bring energy and excitement to every encounter.',
  'Leuven, Belgium',
  50.8798, 4.7005,
  'Coloured', 'Medium', 'Dark', 'Medium',
  true, 'available', true, true,
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop'
);

-- Profile pictures
INSERT INTO public.profile_pictures (profile_id, picture_url, is_main_picture, display_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop', true, 0),
('a2222222-2222-2222-2222-222222222222', 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=500&fit=crop', true, 0),
('a3333333-3333-3333-3333-333333333333', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=500&fit=crop', true, 0),
('a4444444-4444-4444-4444-444444444444', 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=500&fit=crop', true, 0);

-- Reviews
INSERT INTO public.reviews (profile_id, reviewer_name, rating, text, location) VALUES
('a1111111-1111-1111-1111-111111111111', 'Marc', 5, 'Absolutely wonderful experience. Very professional and charming.', 'Brussels'),
('a1111111-1111-1111-1111-111111111111', 'Thomas', 4, 'Great company, highly recommended.', 'Brussels'),
('a2222222-2222-2222-2222-222222222222', 'Jean', 5, 'Luna is incredible. Will definitely book again.', 'Antwerp'),
('a4444444-4444-4444-4444-444444444444', 'David', 5, 'Mia is amazing. The best experience I have had.', 'Leuven');

-- Availabilities
INSERT INTO public.availabilities (profile_id, day_of_week, hour) VALUES
('a1111111-1111-1111-1111-111111111111', 'Monday', '10:00'),
('a1111111-1111-1111-1111-111111111111', 'Monday', '11:00'),
('a1111111-1111-1111-1111-111111111111', 'Monday', '14:00'),
('a1111111-1111-1111-1111-111111111111', 'Wednesday', '10:00'),
('a1111111-1111-1111-1111-111111111111', 'Friday', '18:00'),
('a2222222-2222-2222-2222-222222222222', 'Tuesday', '12:00'),
('a2222222-2222-2222-2222-222222222222', 'Thursday', '20:00'),
('a2222222-2222-2222-2222-222222222222', 'Saturday', '14:00');

-- Cached coordinates (so search works without Google Maps API)
INSERT INTO public.cached_coordinates (address, latitude, longitude) VALUES
('Brussels, Belgium', 50.8503, 4.3517),
('Antwerp, Belgium', 51.2194, 4.4025),
('Ghent, Belgium', 51.0543, 3.7174),
('Leuven, Belgium', 50.8798, 4.7005);


-- ---------------------------------------------------------------------------
-- 7. USER-LINKED SEED DATA
-- ---------------------------------------------------------------------------
-- After creating the 3 auth users in the Supabase Dashboard, copy each UUID
-- and replace the placeholder UUIDs below. Then uncomment and run this block.
--
-- To find user UUIDs:
--   Dashboard > Authentication > Users > click user > copy UUID

/*
DO $$
DECLARE
  admin_uid   UUID := 'PASTE-ADMIN-UUID-HERE';     -- admin@pinklights.com
  user_uid    UUID := 'PASTE-USER-UUID-HERE';       -- user@pinklights.com
  partner_uid UUID := 'PASTE-PARTNER-UUID-HERE';    -- partner@pinklights.com
BEGIN

  -- Link Sophie profile to regular user
  UPDATE public.profiles
  SET user_id = user_uid
  WHERE id = 'a1111111-1111-1111-1111-111111111111';

  -- Make admin user an admin
  INSERT INTO public.admin_users (user_id) VALUES (admin_uid);

  -- Give regular user 200 welcome credits
  INSERT INTO public.credits (user_id, balance) VALUES (user_uid, 200);
  INSERT INTO public.credit_transactions (user_id, amount, type, description)
  VALUES (user_uid, 200, 'purchase', 'Welcome bonus credits');

  -- Create partner account
  INSERT INTO public.partners (user_id, company_name, contact_person, email, phone_number)
  VALUES (partner_uid, 'Nightlife Events BV', 'Partner User', 'partner@pinklights.com', '+32 470 000 000');

  -- Create a sample ad for the partner
  INSERT INTO public.partner_ads (partner_id, title, description, destination_url, is_active)
  VALUES (
    (SELECT id FROM public.partners WHERE user_id = partner_uid),
    'VIP Night — Brussels',
    'Exclusive event this Saturday. Limited spots available.',
    'https://example.com/event',
    true
  );

END $$;
*/


-- =============================================================================
-- DONE! Your Pinklights staging database is ready.
-- =============================================================================
