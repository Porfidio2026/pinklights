
-- Create profiles table
create table profiles (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  username text unique,
  full_name text,
  age integer,
  location text,
  distance_km numeric,
  drive_minutes integer,
  about_me text,
  is_available boolean default false,
  hair_colour text,
  breast_size text,
  nationality text,
  interests text,
  favorite_flower text,
  -- Add foreign key to auth.users if you plan to add authentication later
  user_id uuid references auth.users(id)
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create reviews table
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  profile_id uuid references profiles(id) not null,
  reviewer_name text not null,
  rating integer check (rating >= 1 and rating <= 5) not null,
  text text not null,
  location text,
  date timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table reviews enable row level security;

-- Create initial RLS policies
create policy "Public profiles are viewable by everyone"
on profiles for select
using (true);

create policy "Public reviews are viewable by everyone"
on reviews for select
using (true);
