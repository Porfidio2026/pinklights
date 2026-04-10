-- =============================================
-- RLS Policies for all tables
-- =============================================

-- ---- PROFILES ----
-- Keep existing public read policy
-- Add write policies for profile owners

create policy "Users can insert their own profile"
on profiles for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own profile"
on profiles for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Users can delete their own profile"
on profiles for delete
to authenticated
using (user_id = auth.uid());

-- Add is_banned column
alter table profiles add column if not exists is_banned boolean default false;

-- ---- PROFILE_PICTURES ----
alter table profile_pictures enable row level security;

create policy "Profile pictures are viewable by everyone"
on profile_pictures for select
using (true);

create policy "Users can insert pictures for their own profile"
on profile_pictures for insert
to authenticated
with check (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

create policy "Users can update their own profile pictures"
on profile_pictures for update
to authenticated
using (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

create policy "Users can delete their own profile pictures"
on profile_pictures for delete
to authenticated
using (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

-- ---- AVAILABILITIES ----
alter table availabilities enable row level security;

create policy "Availabilities are viewable by everyone"
on availabilities for select
using (true);

create policy "Users can insert availabilities for their own profile"
on availabilities for insert
to authenticated
with check (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

create policy "Users can update their own availabilities"
on availabilities for update
to authenticated
using (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

create policy "Users can delete their own availabilities"
on availabilities for delete
to authenticated
using (
  profile_id in (
    select id from profiles where user_id = auth.uid()
  )
);

-- ---- REVIEWS ----
-- Keep existing public read policy
-- Allow anyone to insert reviews (no auth required for viewers)

create policy "Anyone can insert reviews"
on reviews for insert
with check (true);

-- ---- PARTNERS ----
alter table partners enable row level security;

create policy "Partners can view their own data"
on partners for select
to authenticated
using (user_id = auth.uid());

create policy "Authenticated users can create a partner account"
on partners for insert
to authenticated
with check (user_id = auth.uid());

create policy "Partners can update their own data"
on partners for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Partners can delete their own account"
on partners for delete
to authenticated
using (user_id = auth.uid());

-- ---- PARTNER_ADS ----
alter table partner_ads enable row level security;

create policy "Active ads are viewable by everyone"
on partner_ads for select
using (is_active = true or partner_id in (
  select id from partners where user_id = auth.uid()
));

create policy "Partners can insert ads for their own account"
on partner_ads for insert
to authenticated
with check (
  partner_id in (
    select id from partners where user_id = auth.uid()
  )
);

create policy "Partners can update their own ads"
on partner_ads for update
to authenticated
using (
  partner_id in (
    select id from partners where user_id = auth.uid()
  )
);

create policy "Partners can delete their own ads"
on partner_ads for delete
to authenticated
using (
  partner_id in (
    select id from partners where user_id = auth.uid()
  )
);

-- ---- PROFILE_SEARCHES ----
alter table profile_searches enable row level security;

create policy "Anyone can insert search records"
on profile_searches for insert
with check (true);

-- No select/update/delete for regular users

-- ---- CACHED_COORDINATES ----
alter table cached_coordinates enable row level security;

create policy "Anyone can read cached coordinates"
on cached_coordinates for select
using (true);

create policy "Anyone can insert cached coordinates"
on cached_coordinates for insert
with check (true);

-- ---- SECRETS ----
alter table secrets enable row level security;

create policy "Secrets readable by authenticated users"
on secrets for select
to authenticated
using (true);
