-- Comparaciones de antes y después (admin)
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

create table if not exists public.before_after_pairs (
  id uuid primary key default gen_random_uuid(),
  before_image_url text not null,
  after_image_url text not null,
  title text,
  before_label text,
  after_label text,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.before_after_pairs enable row level security;

drop policy if exists "before_after_public_read" on public.before_after_pairs;
drop policy if exists "before_after_admin_all" on public.before_after_pairs;

create policy "before_after_public_read"
  on public.before_after_pairs for select
  using (is_published = true);

create policy "before_after_admin_all"
  on public.before_after_pairs for all
  to authenticated
  using (true)
  with check (true);
