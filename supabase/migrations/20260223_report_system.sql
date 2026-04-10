-- =============================================
-- Report / Content Moderation System
-- =============================================

create table if not exists reported_content (
  id uuid primary key default gen_random_uuid(),
  reporter_ip text,
  profile_id uuid references profiles(id) on delete cascade not null,
  reason text not null,
  details text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed')),
  reviewed_by uuid references auth.users(id),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- RLS
alter table reported_content enable row level security;

-- Anyone can submit a report (no auth required for public profile viewers)
create policy "Anyone can insert reports"
on reported_content for insert
with check (true);

-- Only admins can view and manage reports
create policy "Admins can view reports"
on reported_content for select
to authenticated
using (
  auth.uid() in (select user_id from admin_users)
);

create policy "Admins can update reports"
on reported_content for update
to authenticated
using (
  auth.uid() in (select user_id from admin_users)
);
