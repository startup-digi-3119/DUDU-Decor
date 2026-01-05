-- Enable pgcrypto (optional, often needed for gen_random_uuid in older PG, but Neon is PG15+)
create extension if not exists "pgcrypto";

-- Projects Table
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  category text not null, -- 'Wedding', 'Corporate', 'Private'
  image_url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Team Members Table
create table if not exists team_members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  bio text,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Messages Table
create table if not exists messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  event_type text,
  message text not null,
  status text default 'new', -- 'new', 'read', 'replied'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Configuration Table
create table if not exists site_config (
  id uuid default gen_random_uuid() primary key,
  key text unique not null,
  value text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table team_members enable row level security;
alter table messages enable row level security;
alter table site_config enable row level security;

-- Policies (Simplified for vanilla DB usage without auth middleware context)
-- In a real app, you'd use a backend to enforce these, or set_config variables.
-- For now, we allow read/write assuming the connection owner manages access.

create policy "Public Access" on projects for all using (true);
create policy "Public Access" on team_members for all using (true);
create policy "Public Access" on site_config for all using (true);
create policy "Public Access" on messages for all using (true);
