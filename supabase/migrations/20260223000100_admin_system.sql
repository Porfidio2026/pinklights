-- =============================================
-- Admin System
-- =============================================

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  role text not null default 'admin',
  created_at timestamp with time zone default now()
);

-- RLS
alter table admin_users enable row level security;

create policy "Admins can view admin_users"
on admin_users for select
to authenticated
using (
  auth.uid() in (select user_id from admin_users)
);
