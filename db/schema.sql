-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Projects Table
create table projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  category text not null, -- 'Wedding', 'Corporate', 'Private'
  image_url text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Team Members Table
create table team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  role text not null,
  bio text,
  image_url text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Contact Messages Table
create table messages (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  event_type text,
  message text not null,
  status text default 'new', -- 'new', 'read', 'replied'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Site Configuration Table (About page text, etc.)
create table site_config (
  id uuid default uuid_generate_v4() primary key,
  key text unique not null,
  value text, -- JSON or text content
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table projects enable row level security;
alter table team_members enable row level security;
alter table messages enable row level security;
alter table site_config enable row level security;

-- Policies

-- Public Read Access
create policy "Public projects are viewable by everyone" on projects for select using (true);
create policy "Public team members are viewable by everyone" on team_members for select using (true);
create policy "Public site config is viewable by everyone" on site_config for select using (true);

-- Admin Full Access (Assuming Supabase Auth is strictly for Admin in this scenario, or check role)
-- For simplicity, we assume authenticated users are admins (since registration is restricted or manual)
create policy "Admins can do everything on projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admins can do everything on team members" on team_members for all using (auth.role() = 'authenticated');
create policy "Admins can do everything on site config" on site_config for all using (auth.role() = 'authenticated');
create policy "Admins can view and edit messages" on messages for all using (auth.role() = 'authenticated');

-- Contact Form Submission (Anon Insert)
create policy "Anyone can insert messages" on messages for insert with check (true);
