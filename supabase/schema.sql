-- MOR Studio · esquema Supabase
-- Ejecutar en SQL Editor del proyecto. Luego crea un usuario en Authentication
-- y un bucket público llamado "portfolio".

create extension if not exists "pgcrypto";

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  title varchar not null,
  category varchar not null check (category in ('makeup', 'photography', 'bridal_combo')),
  price numeric(10,2) not null,
  description text,
  features text[] default '{}',
  duration varchar,
  is_featured boolean default false,
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default timezone('utc'::text, now())
);

create table if not exists public.portfolio (
  id uuid primary key default gen_random_uuid(),
  title varchar,
  category varchar not null check (category in ('brides', 'makeup', 'studio', 'exteriors')),
  image_url text not null,
  alt text,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default timezone('utc'::text, now())
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  client_name varchar not null,
  email varchar,
  phone varchar not null,
  event_date date,
  service_type varchar,
  message text,
  status varchar default 'pending' check (status in ('pending', 'attended')),
  created_at timestamptz default timezone('utc'::text, now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name varchar not null,
  role varchar,
  quote text not null,
  rating int default 5,
  is_published boolean default true,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.packages enable row level security;
alter table public.portfolio enable row level security;
alter table public.inquiries enable row level security;
alter table public.testimonials enable row level security;

create policy "packages_public_read"
  on public.packages for select
  using (is_active = true);

create policy "packages_admin_all"
  on public.packages for all
  to authenticated
  using (true)
  with check (true);

create policy "portfolio_public_read"
  on public.portfolio for select
  using (is_published = true);

create policy "portfolio_admin_all"
  on public.portfolio for all
  to authenticated
  using (true)
  with check (true);

create policy "inquiries_public_insert"
  on public.inquiries for insert
  to anon, authenticated
  with check (true);

create policy "inquiries_admin_read"
  on public.inquiries for select
  to authenticated
  using (true);

create policy "inquiries_admin_update"
  on public.inquiries for update
  to authenticated
  using (true)
  with check (true);

create policy "testimonials_public_read"
  on public.testimonials for select
  using (is_published = true);

create policy "testimonials_admin_all"
  on public.testimonials for all
  to authenticated
  using (true)
  with check (true);

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy "portfolio_images_public_read"
  on storage.objects for select
  using (bucket_id = 'portfolio');

create policy "portfolio_images_admin_write"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio');

create policy "portfolio_images_admin_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio')
  with check (bucket_id = 'portfolio');

create policy "portfolio_images_admin_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio');
