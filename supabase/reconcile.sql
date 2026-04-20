-- =============================================================================
-- Remote DB Reconciliation Script
-- =============================================================================
-- Purpose: Align the remote Supabase project (uptvbtjryzivhybegvfa) with the
-- migration files in supabase/migrations/. Safe to re-run — fully idempotent.
--
-- How to apply:
--   1. Open Supabase Dashboard -> SQL Editor
--   2. Paste this entire file
--   3. Run
--
-- Sections:
--   1. Missing columns (known drift)
--   2. RLS policy refresh (safety net)
--   3. RPC function refresh (safety net)
-- =============================================================================


-- =============================================================================
-- 1. MISSING COLUMNS (known drift)
-- =============================================================================

alter table public.profiles
  add column if not exists is_banned boolean default false;

alter table public.admin_users
  add column if not exists role text not null default 'admin';

-- cached_coordinates needs a unique index on address to support
-- upsert(onConflict: 'address') from coordinatesService.cache().
-- Using create unique index if not exists keeps this idempotent; the
-- resulting index doubles as the ON CONFLICT target.
create unique index if not exists cached_coordinates_address_key
  on public.cached_coordinates (address);


-- =============================================================================
-- 2. RLS POLICY REFRESH
-- =============================================================================
-- Drop-if-exists + create is safe. If a policy already exists with the exact
-- same name it'll be dropped and recreated. If a differently-named policy
-- exists, it is left in place (additional permissive overlap is harmless).

-- ---- PROFILES ----
alter table public.profiles enable row level security;

drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Users can delete their own profile" on public.profiles;
create policy "Users can delete their own profile"
  on public.profiles for delete
  to authenticated
  using (user_id = auth.uid());

-- Admin overrides (from day_credits_payment migration)
drop policy if exists "Admins can update any profile" on public.profiles;
create policy "Admins can update any profile"
  on public.profiles for update
  using (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can insert any profile" on public.profiles;
create policy "Admins can insert any profile"
  on public.profiles for insert
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));


-- ---- PROFILE_PICTURES ----
alter table public.profile_pictures enable row level security;

drop policy if exists "Profile pictures are viewable by everyone" on public.profile_pictures;
create policy "Profile pictures are viewable by everyone"
  on public.profile_pictures for select
  using (true);

drop policy if exists "Users can insert pictures for their own profile" on public.profile_pictures;
create policy "Users can insert pictures for their own profile"
  on public.profile_pictures for insert
  to authenticated
  with check (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists "Users can update their own profile pictures" on public.profile_pictures;
create policy "Users can update their own profile pictures"
  on public.profile_pictures for update
  to authenticated
  using (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists "Users can delete their own profile pictures" on public.profile_pictures;
create policy "Users can delete their own profile pictures"
  on public.profile_pictures for delete
  to authenticated
  using (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists "Admins can insert any profile pictures" on public.profile_pictures;
create policy "Admins can insert any profile pictures"
  on public.profile_pictures for insert
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));


-- ---- AVAILABILITIES ----
alter table public.availabilities enable row level security;

drop policy if exists "Availabilities are viewable by everyone" on public.availabilities;
create policy "Availabilities are viewable by everyone"
  on public.availabilities for select
  using (true);

drop policy if exists "Users can insert availabilities for their own profile" on public.availabilities;
create policy "Users can insert availabilities for their own profile"
  on public.availabilities for insert
  to authenticated
  with check (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists "Users can update their own availabilities" on public.availabilities;
create policy "Users can update their own availabilities"
  on public.availabilities for update
  to authenticated
  using (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );

drop policy if exists "Users can delete their own availabilities" on public.availabilities;
create policy "Users can delete their own availabilities"
  on public.availabilities for delete
  to authenticated
  using (
    profile_id in (select id from public.profiles where user_id = auth.uid())
  );


-- ---- REVIEWS ----
alter table public.reviews enable row level security;

drop policy if exists "Public reviews are viewable by everyone" on public.reviews;
create policy "Public reviews are viewable by everyone"
  on public.reviews for select
  using (true);

drop policy if exists "Anyone can insert reviews" on public.reviews;
create policy "Anyone can insert reviews"
  on public.reviews for insert
  with check (true);


-- ---- PARTNERS ----
alter table public.partners enable row level security;

drop policy if exists "Partners can view their own data" on public.partners;
create policy "Partners can view their own data"
  on public.partners for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Authenticated users can create a partner account" on public.partners;
create policy "Authenticated users can create a partner account"
  on public.partners for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Partners can update their own data" on public.partners;
create policy "Partners can update their own data"
  on public.partners for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "Partners can delete their own account" on public.partners;
create policy "Partners can delete their own account"
  on public.partners for delete
  to authenticated
  using (user_id = auth.uid());


-- ---- PARTNER_ADS ----
alter table public.partner_ads enable row level security;

drop policy if exists "Active ads are viewable by everyone" on public.partner_ads;
create policy "Active ads are viewable by everyone"
  on public.partner_ads for select
  using (
    is_active = true
    or partner_id in (select id from public.partners where user_id = auth.uid())
  );

drop policy if exists "Partners can insert ads for their own account" on public.partner_ads;
create policy "Partners can insert ads for their own account"
  on public.partner_ads for insert
  to authenticated
  with check (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );

drop policy if exists "Partners can update their own ads" on public.partner_ads;
create policy "Partners can update their own ads"
  on public.partner_ads for update
  to authenticated
  using (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );

drop policy if exists "Partners can delete their own ads" on public.partner_ads;
create policy "Partners can delete their own ads"
  on public.partner_ads for delete
  to authenticated
  using (
    partner_id in (select id from public.partners where user_id = auth.uid())
  );


-- ---- PROFILE_SEARCHES ----
alter table public.profile_searches enable row level security;

drop policy if exists "Anyone can insert search records" on public.profile_searches;
create policy "Anyone can insert search records"
  on public.profile_searches for insert
  with check (true);


-- ---- CACHED_COORDINATES ----
alter table public.cached_coordinates enable row level security;

drop policy if exists "Anyone can read cached coordinates" on public.cached_coordinates;
create policy "Anyone can read cached coordinates"
  on public.cached_coordinates for select
  using (true);

drop policy if exists "Anyone can insert cached coordinates" on public.cached_coordinates;
create policy "Anyone can insert cached coordinates"
  on public.cached_coordinates for insert
  with check (true);

drop policy if exists "Anyone can update cached coordinates" on public.cached_coordinates;
create policy "Anyone can update cached coordinates"
  on public.cached_coordinates for update
  using (true)
  with check (true);


-- ---- SECRETS ----
alter table public.secrets enable row level security;

drop policy if exists "Secrets readable by authenticated users" on public.secrets;
create policy "Secrets readable by authenticated users"
  on public.secrets for select
  to authenticated
  using (true);


-- ---- ADMIN_USERS ----
alter table public.admin_users enable row level security;

-- IMPORTANT: this policy must NOT subquery admin_users itself, otherwise
-- any other policy that checks "exists(select 1 from admin_users ...)"
-- triggers infinite recursion (42P17). A direct equality check avoids it:
-- admins see their own row, non-admins see nothing.
drop policy if exists "Admins can view admin_users" on public.admin_users;
create policy "Admins can view admin_users"
  on public.admin_users for select
  to authenticated
  using (user_id = auth.uid());


-- ---- CREDITS ----
alter table public.credits enable row level security;

drop policy if exists "Users can view their own credits" on public.credits;
create policy "Users can view their own credits"
  on public.credits for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own credits row" on public.credits;
create policy "Users can insert their own credits row"
  on public.credits for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Users can update their own credits" on public.credits;
create policy "Users can update their own credits"
  on public.credits for update
  to authenticated
  using (user_id = auth.uid());


-- ---- CREDIT_TRANSACTIONS ----
alter table public.credit_transactions enable row level security;

drop policy if exists "Users can view their own transactions" on public.credit_transactions;
create policy "Users can view their own transactions"
  on public.credit_transactions for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists "Users can insert their own transactions" on public.credit_transactions;
create policy "Users can insert their own transactions"
  on public.credit_transactions for insert
  to authenticated
  with check (user_id = auth.uid());


-- ---- REPORTED_CONTENT ----
alter table public.reported_content enable row level security;

drop policy if exists "Anyone can insert reports" on public.reported_content;
create policy "Anyone can insert reports"
  on public.reported_content for insert
  with check (true);

drop policy if exists "Admins can view reports" on public.reported_content;
create policy "Admins can view reports"
  on public.reported_content for select
  to authenticated
  using (auth.uid() in (select user_id from public.admin_users));

drop policy if exists "Admins can update reports" on public.reported_content;
create policy "Admins can update reports"
  on public.reported_content for update
  to authenticated
  using (auth.uid() in (select user_id from public.admin_users));


-- ---- APP_SETTINGS ----
alter table public.app_settings enable row level security;

drop policy if exists "Anyone can read app settings" on public.app_settings;
create policy "Anyone can read app settings"
  on public.app_settings for select
  using (true);

drop policy if exists "Admins can manage app settings" on public.app_settings;
create policy "Admins can manage app settings"
  on public.app_settings for insert
  with check (exists (select 1 from public.admin_users where user_id = auth.uid()));

drop policy if exists "Admins can update app settings" on public.app_settings;
create policy "Admins can update app settings"
  on public.app_settings for update
  using (exists (select 1 from public.admin_users where user_id = auth.uid()));

-- Seed default marketing_mode if not present
insert into public.app_settings (key, value)
values ('marketing_mode', 'false')
on conflict (key) do nothing;


-- ---- PAYMENT_SESSIONS ----
alter table public.payment_sessions enable row level security;

drop policy if exists "Users can view their own payment sessions" on public.payment_sessions;
create policy "Users can view their own payment sessions"
  on public.payment_sessions for select
  using (auth.uid() = user_id);


-- ---- STORAGE: profile_pictures bucket ----
-- Create the bucket if missing. Public so getPublicUrl() returns a URL
-- anyone can view (profile pictures are shown on public profile pages).
insert into storage.buckets (id, name, public)
values ('profile_pictures', 'profile_pictures', true)
on conflict (id) do nothing;

-- Anyone can read (public bucket).
drop policy if exists "Profile pictures are publicly readable" on storage.objects;
create policy "Profile pictures are publicly readable"
  on storage.objects for select
  using (bucket_id = 'profile_pictures');

-- Authenticated users can upload to a folder whose first segment
-- matches their own uid — matches the ${user.id}/${uuid}.${ext} pattern
-- in UploadProfilePicture.tsx.
drop policy if exists "Users can upload their own profile pictures" on storage.objects;
create policy "Users can upload their own profile pictures"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can update their own profile pictures in storage" on storage.objects;
create policy "Users can update their own profile pictures in storage"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "Users can delete their own profile pictures in storage" on storage.objects;
create policy "Users can delete their own profile pictures in storage"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'profile_pictures'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- Admins can upload for any user (bulk import, etc.)
drop policy if exists "Admins can upload any profile pictures" on storage.objects;
create policy "Admins can upload any profile pictures"
  on storage.objects for insert
  with check (
    bucket_id = 'profile_pictures'
    and exists (select 1 from public.admin_users where user_id = auth.uid())
  );


-- =============================================================================
-- 2b. STORAGE SCHEMA UPGRADE (manual apply of Supabase storage migration 0026)
-- =============================================================================
-- The remote project was created before Supabase's storage service added the
-- `level` column and `storage.prefixes` table. Without these, every upload
-- fails with DatabaseInvalidObjectDefinition.
-- Verbatim from supabase/storage migrations/tenant/0026-objects-prefixes.sql
-- plus a no-op backfill and the non-concurrent index. Safe on an empty
-- storage.objects — backfill is a no-op when there are no rows.

alter table storage.objects add column if not exists level int null;

create or replace function storage.get_level(name text)
  returns int
as $func$
  select array_length(string_to_array(name, '/'), 1);
$func$ language sql immutable strict;

create table if not exists storage.prefixes (
  bucket_id text,
  name text collate "C" not null,
  level int generated always as (storage.get_level(name)) stored,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  constraint prefixes_bucketId_fkey foreign key (bucket_id) references storage.buckets (id),
  primary key (bucket_id, level, name)
);

alter table storage.prefixes enable row level security;

create or replace function storage.get_prefix(name text)
  returns text
as $func$
  select
    case when strpos(name, '/') > 0
         then regexp_replace(name, '[\/]{1}[^\/]+\/?$', '')
         else '' end;
$func$ language sql immutable strict;

create or replace function storage.get_prefixes(name text)
  returns text[]
as $func$
declare
  parts text[];
  prefixes text[];
  prefix text;
begin
  parts := string_to_array(name, '/');
  prefixes := '{}';
  for i in 1..array_length(parts, 1) - 1 loop
    prefix := array_to_string(parts[1:i], '/');
    prefixes := array_append(prefixes, prefix);
  end loop;
  return prefixes;
end;
$func$ language plpgsql immutable strict;

create or replace function storage.add_prefixes(_bucket_id text, _name text)
  returns void
  security definer
as $func$
declare
  prefixes text[];
begin
  prefixes := storage.get_prefixes(_name);
  if array_length(prefixes, 1) > 0 then
    insert into storage.prefixes (name, bucket_id)
    select unnest(prefixes) as name, _bucket_id
    on conflict do nothing;
  end if;
end;
$func$ language plpgsql volatile;

create or replace function storage.delete_prefix(_bucket_id text, _name text)
  returns boolean
  security definer
as $func$
begin
  if exists (
    select from storage.prefixes
    where prefixes.bucket_id = _bucket_id
      and level = storage.get_level(_name) + 1
      and prefixes.name collate "C" like _name || '/%'
    limit 1
  ) or exists (
    select from storage.objects
    where objects.bucket_id = _bucket_id
      and storage.get_level(objects.name) = storage.get_level(_name) + 1
      and objects.name collate "C" like _name || '/%'
    limit 1
  ) then
    return false;
  else
    delete from storage.prefixes
    where prefixes.bucket_id = _bucket_id
      and level = storage.get_level(_name)
      and prefixes.name = _name;
    return true;
  end if;
end;
$func$ language plpgsql volatile;

create or replace function storage.prefixes_insert_trigger()
  returns trigger
as $func$
begin
  perform storage.add_prefixes(new.bucket_id, new.name);
  return new;
end;
$func$ language plpgsql volatile;

create or replace function storage.objects_insert_prefix_trigger()
  returns trigger
as $func$
begin
  perform storage.add_prefixes(new.bucket_id, new.name);
  new.level := storage.get_level(new.name);
  return new;
end;
$func$ language plpgsql volatile;

create or replace function storage.delete_prefix_hierarchy_trigger()
  returns trigger
as $func$
declare
  prefix text;
begin
  prefix := storage.get_prefix(old.name);
  if coalesce(prefix, '') != '' then
    perform storage.delete_prefix(old.bucket_id, prefix);
  end if;
  return old;
end;
$func$ language plpgsql volatile;

create or replace trigger prefixes_delete_hierarchy
  after delete on storage.prefixes
  for each row
  execute function storage.delete_prefix_hierarchy_trigger();

create or replace trigger objects_insert_create_prefix
  before insert on storage.objects
  for each row
  execute function storage.objects_insert_prefix_trigger();

create or replace trigger objects_update_create_prefix
  before update on storage.objects
  for each row
  when (new.name != old.name)
  execute function storage.objects_insert_prefix_trigger();

create or replace trigger objects_delete_delete_prefix
  after delete on storage.objects
  for each row
  execute function storage.delete_prefix_hierarchy_trigger();

-- Trigger from 0035 so direct writes to prefixes also cascade
create or replace trigger prefixes_create_hierarchy
  before insert on storage.prefixes
  for each row
  when (pg_trigger_depth() < 1)
  execute function storage.prefixes_insert_trigger();

-- Grants
do $$
declare
  anon_role text = coalesce(current_setting('storage.anon_role', true), 'anon');
  authenticated_role text = coalesce(current_setting('storage.authenticated_role', true), 'authenticated');
  service_role text = coalesce(current_setting('storage.service_role', true), 'service_role');
begin
  execute 'grant all on table storage.prefixes to ' || service_role || ', ' || authenticated_role || ', ' || anon_role;
end$$;

-- Backfill level for any pre-existing objects (no-op on empty table)
update storage.objects set level = storage.get_level(name) where level is null;

-- Non-concurrent equivalent of 0031's CREATE INDEX CONCURRENTLY
-- (safe because storage.objects is empty; avoids CONCURRENTLY which can't
-- run inside a transaction block in the SQL editor).
create unique index if not exists objects_bucket_id_level_idx
  on storage.objects (bucket_id, level, name collate "C");


-- =============================================================================
-- 3. RPC FUNCTION REFRESH
-- =============================================================================
-- `create or replace function` is inherently idempotent.

create or replace function public.search_nearby_profiles(
  search_lat double precision,
  search_lon double precision,
  max_distance_km double precision,
  search_service_type text default null,
  search_gender text default null,
  hair_colours text[] default null,
  breast_sizes text[] default null,
  skin_tones text[] default null,
  body_types text[] default null,
  min_age integer default null,
  max_age integer default null
)
returns table (
  id uuid,
  full_name text,
  age integer,
  location text,
  availability_status text,
  profile_picture_url text,
  distance_km double precision,
  hair_colour text,
  breast_size text,
  skin_tone text,
  body_type text,
  gender text,
  service_type text,
  latitude double precision,
  longitude double precision
)
language plpgsql
as $$
begin
  return query
  select
    p.id,
    p.full_name,
    p.age,
    p.location,
    p.availability_status,
    p.profile_picture_url,
    round(
      (point(p.longitude, p.latitude) <@> point(search_lon, search_lat))::numeric * 1.609344, 1
    )::double precision as distance_km,
    p.hair_colour,
    p.breast_size,
    p.skin_tone,
    p.body_type,
    p.gender,
    p.service_type,
    p.latitude,
    p.longitude
  from public.profiles p
  where p.latitude is not null
    and p.longitude is not null
    and (point(p.longitude, p.latitude) <@> point(search_lon, search_lat)) * 1.609344 <= max_distance_km
    and (search_service_type is null or p.service_type = search_service_type)
    and (search_gender is null or p.gender = search_gender)
    and (hair_colours is null or p.hair_colour = any(hair_colours))
    and (breast_sizes is null or p.breast_size = any(breast_sizes))
    and (skin_tones is null or p.skin_tone = any(skin_tones))
    and (body_types is null or p.body_type = any(body_types))
    and (min_age is null or p.age >= min_age)
    and (max_age is null or p.age <= max_age)
    and (
      exists (select 1 from public.app_settings where key = 'marketing_mode' and value = 'true')
      or p.payment_exempt = true
      or p.visibility_expires_at > now()
    )
  order by distance_km;
end;
$$;


create or replace function public.get_featured_profiles(
  search_service_type text default null,
  search_gender text default null,
  limit_count integer default 10
)
returns table (
  id uuid,
  full_name text,
  age integer,
  location text,
  availability_status text,
  profile_picture_url text,
  latest_payment timestamptz,
  is_featured boolean,
  service_type text,
  gender text
)
language plpgsql
as $$
begin
  return query
  select
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
  from public.profiles p
  where (search_service_type is null or p.service_type = search_service_type)
    and (search_gender is null or p.gender = search_gender)
    and (
      exists (select 1 from public.app_settings where key = 'marketing_mode' and value = 'true')
      or p.payment_exempt = true
      or p.visibility_expires_at > now()
    )
  order by p.is_featured desc, p.latest_payment desc nulls last, p.created_at desc
  limit limit_count;
end;
$$;


create or replace function public.activate_day_credit()
returns timestamptz
language plpgsql
security definer
as $$
declare
  current_balance integer;
  new_expiry timestamptz;
  current_expiry timestamptz;
begin
  select balance into current_balance
  from public.credits
  where user_id = auth.uid();

  if current_balance is null or current_balance < 1 then
    raise exception 'Insufficient day credits';
  end if;

  select visibility_expires_at into current_expiry
  from public.profiles
  where user_id = auth.uid();

  if current_expiry is not null and current_expiry > now() then
    new_expiry := current_expiry + interval '24 hours';
  else
    new_expiry := now() + interval '24 hours';
  end if;

  update public.credits
  set balance = balance - 1, updated_at = now()
  where user_id = auth.uid();

  insert into public.credit_transactions (user_id, amount, type, description)
  values (auth.uid(), -1, 'spend', 'Activated 1 day of visibility');

  update public.profiles
  set visibility_expires_at = new_expiry
  where user_id = auth.uid();

  return new_expiry;
end;
$$;


-- =============================================================================
-- Done. Expected notices: zero errors. Some policies may report "does not
-- exist, skipping" which is normal for drop-if-exists.
-- =============================================================================
