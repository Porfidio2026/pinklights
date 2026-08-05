-- =============================================
-- Credit System
-- =============================================

create table if not exists credits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  balance integer not null default 0,
  updated_at timestamp with time zone default now()
);

create table if not exists credit_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  amount integer not null,
  type text not null check (type in ('purchase', 'spend')),
  description text,
  created_at timestamp with time zone default now()
);

-- RLS
alter table credits enable row level security;
alter table credit_transactions enable row level security;

create policy "Users can view their own credits"
on credits for select
to authenticated
using (user_id = auth.uid());

create policy "Users can insert their own credits row"
on credits for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can update their own credits"
on credits for update
to authenticated
using (user_id = auth.uid());

create policy "Users can view their own transactions"
on credit_transactions for select
to authenticated
using (user_id = auth.uid());

create policy "Users can insert their own transactions"
on credit_transactions for insert
to authenticated
with check (user_id = auth.uid());
