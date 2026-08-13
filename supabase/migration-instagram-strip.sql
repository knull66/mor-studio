-- Tira de fotos tipo Instagram (admin)
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

create table if not exists public.instagram_strip (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  alt text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.instagram_strip enable row level security;

drop policy if exists "instagram_strip_public_read" on public.instagram_strip;
drop policy if exists "instagram_strip_admin_all" on public.instagram_strip;

create policy "instagram_strip_public_read"
  on public.instagram_strip for select
  using (is_published = true);

create policy "instagram_strip_admin_all"
  on public.instagram_strip for all
  to authenticated
  using (true)
  with check (true);
