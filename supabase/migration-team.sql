-- Equipo / sección de la artista
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name varchar not null,
  role text,
  role_en text,
  bio text,
  bio_en text,
  bio_2 text,
  bio_2_en text,
  image_url text,
  image_url_2 text,
  is_founder boolean default false,
  is_published boolean default true,
  sort_order int default 0,
  created_at timestamptz default timezone('utc'::text, now())
);

alter table public.team_members enable row level security;

drop policy if exists "team_public_read" on public.team_members;
drop policy if exists "team_admin_all" on public.team_members;

create policy "team_public_read"
  on public.team_members for select
  using (is_published = true);

create policy "team_admin_all"
  on public.team_members for all
  to authenticated
  using (true)
  with check (true);

insert into public.team_members (
  name, role, role_en, bio, bio_en, bio_2, bio_2_en,
  image_url, image_url_2, is_founder, is_published, sort_order
)
select * from (
  values (
    'Elisabeth Morao',
    'Fundadora · Maquillista y fotógrafa profesional',
    'Founder · Makeup artist & professional photographer',
    'Elisabeth Morao es la artista, dueña y fotógrafa profesional de MOR Studio. Une maquillaje y fotografía en una sola mirada: prepara la piel para la cámara y dirige la luz para la piel, sin prisas ni looks que no sobreviven al flash.',
    'Elisabeth Morao is the artist, owner, and professional photographer of MOR Studio. She brings makeup and photography into a single point of view: skin prepared for the camera, light directed for the skin — no rush, no looks that disappear under flash.',
    'Desde San Antonio y el Hill Country, Texas, acompaña a novias, quinceañeras, familias y marcas que buscan un lujo cálido: menos filtro, más presencia. Cada sesión se siente íntima, editorial y hecha a tu medida.',
    'From San Antonio and the Texas Hill Country, she works with brides, quinceañeras, families, and brands who want warm luxury: less filter, more presence. Every session feels intimate, editorial, and made for you.',
    '/images/elisabeth-morao-1.png',
    '/images/elisabeth-morao-2.png',
    true,
    true,
    1
  )
) as seed(
  name, role, role_en, bio, bio_en, bio_2, bio_2_en,
  image_url, image_url_2, is_founder, is_published, sort_order
)
where not exists (select 1 from public.team_members limit 1);
