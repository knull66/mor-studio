-- Redes sociales + slider del hero
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

create table if not exists public.site_settings (
  id text primary key default 'main',
  instagram text,
  facebook text,
  tiktok text,
  whatsapp text,
  phone_display text,
  email text,
  address text,
  updated_at timestamptz default timezone('utc'::text, now())
);

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text,
  caption text,
  focal_x numeric default 50,
  focal_y numeric default 50,
  zoom numeric default 100,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.site_settings enable row level security;
alter table public.hero_slides enable row level security;

drop policy if exists "settings_public_read" on public.site_settings;
drop policy if exists "settings_admin_all" on public.site_settings;
drop policy if exists "hero_public_read" on public.hero_slides;
drop policy if exists "hero_admin_all" on public.hero_slides;

create policy "settings_public_read"
  on public.site_settings for select
  using (true);

create policy "settings_admin_all"
  on public.site_settings for all
  to authenticated
  using (true)
  with check (true);

create policy "hero_public_read"
  on public.hero_slides for select
  using (is_published = true);

create policy "hero_admin_all"
  on public.hero_slides for all
  to authenticated
  using (true)
  with check (true);

insert into public.site_settings (
  id, instagram, facebook, tiktok, whatsapp, phone_display, email, address
) values (
  'main',
  'https://www.instagram.com/Moor_Beauty_photography/',
  '',
  '',
  '12105485300',
  '+1 (210) 548-5300',
  'booking@morstudio.vip',
  'San Antonio, Texas'
)
on conflict (id) do nothing;
