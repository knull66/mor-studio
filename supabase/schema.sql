-- MOR Studio · esquema Supabase (idempotente)
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

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

drop policy if exists "packages_public_read" on public.packages;
drop policy if exists "packages_admin_all" on public.packages;
drop policy if exists "portfolio_public_read" on public.portfolio;
drop policy if exists "portfolio_admin_all" on public.portfolio;
drop policy if exists "inquiries_public_insert" on public.inquiries;
drop policy if exists "inquiries_admin_read" on public.inquiries;
drop policy if exists "inquiries_admin_update" on public.inquiries;
drop policy if exists "testimonials_public_read" on public.testimonials;
drop policy if exists "testimonials_admin_all" on public.testimonials;
drop policy if exists "portfolio_images_public_read" on storage.objects;
drop policy if exists "portfolio_images_admin_write" on storage.objects;
drop policy if exists "portfolio_images_admin_update" on storage.objects;
drop policy if exists "portfolio_images_admin_delete" on storage.objects;

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
on conflict (id) do update set public = true;

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

insert into public.packages (
  title, category, price, description, features, duration, is_featured, is_active, sort_order
)
select * from (
  values
    ('Maquillaje de Novia', 'makeup', 285.00, 'Piel luminosa, ojos a prueba de lágrimas y un acabado que se ve impecable en persona y en cámara.', ARRAY['Prueba previa opcional','Maquillaje de larga duración','Pestañas postizas incluidas','Retoque de kit para el día','Asistencia en preparación'], '2.5 — 3 horas', true, true, 1),
    ('Prueba de Novia', 'makeup', 125.00, 'La sesión para decidir piel, ojos y labios con calma, antes del gran día.', ARRAY['Consulta de estilo y referencias','Prueba de dos looks','Fotos de referencia en estudio','Ajustes para el día de la boda'], '90 minutos', false, true, 2),
    ('Maquillaje Social', 'makeup', 95.00, 'Para eventos, quinceañeras, graduaciones y noches que merecen un glow editorial.', ARRAY['Maquillaje social o de noche','Pestañas según el look','Asesoría de cejas','Ideal para fotografía'], '75 minutos', false, true, 3),
    ('Beauty Editorial', 'makeup', 175.00, 'Maquillaje de carácter para campañas, lookbooks y retrato de autor.', ARRAY['Dirección de arte en conjunto','Hasta dos cambios de look','Productos de grado profesional','Coordinación con fotógrafa'], '2 horas', false, true, 4),
    ('Sesión de Estudio', 'photography', 325.00, 'Retrato dirigido en estudio con luz controlada, ideal para beauty, maternidad y personal branding.', ARRAY['20 fotografías editadas','Dirección de pose','2 cambios de outfit','Galería privada digital','Fondo y luz de estudio'], '1.5 horas', true, true, 1),
    ('Sesión Exterior', 'photography', 385.00, 'Luz natural, locaciones con carácter y un ritmo pausado para retratos con alma.', ARRAY['25 fotografías editadas','Locación en San Antonio','Golden hour o luz suave','Asesoría de vestuario'], '2 horas', false, true, 2),
    ('Cobertura de Boda', 'photography', 2200.00, 'Narrativa completa del día: getting ready, ceremonia, retratos y fiesta, con edición cinematográfica.', ARRAY['Cobertura de 8 horas','250+ imágenes editadas','Preview en 7 días','Segunda fotógrafa opcional','Galería de alta resolución'], '8 horas', true, true, 3),
    ('Experiencia MOR Esencial', 'bridal_combo', 650.00, 'Maquillaje profesional + sesión beauty. El punto de partida para verse y sentirse novia.', ARRAY['Maquillaje de novia o social','Sesión de 1.5 h en estudio','25 fotos editadas','Dirección de pose','Mejor valor para sesiones preboda'], 'Medio día', false, true, 1),
    ('Experiencia MOR Premium', 'bridal_combo', 1100.00, 'Nuestro paquete más pedido: prueba, maquillaje del día y retratos que se sienten de editorial.', ARRAY['Prueba de maquillaje incluida','MUA el día del evento','Sesión preboda 2 h','40 fotos editadas','Kit de retoque','Prioridad de fechas 2026'], 'Día completo de preparación', true, true, 2),
    ('Experiencia MOR Élite', 'bridal_combo', 1800.00, 'Servicio integral para el gran día: belleza, retratos y cobertura con un solo equipo creativo.', ARRAY['Prueba + maquillaje de novia','Cobertura fotográfica 6 h','Getting ready documentado','180 imágenes editadas','Asistente de MUA','Traslado local en San Antonio incluido'], 'Boda + preboda', true, true, 3)
) as seed(title, category, price, description, features, duration, is_featured, is_active, sort_order)
where not exists (select 1 from public.packages limit 1);

insert into public.testimonials (client_name, role, quote, rating, is_published)
select * from (
  values
    ('Valeria M.', 'Novia · San Antonio, 2025', 'Elisabeth me maquilló como si me conociera de siempre. En las fotos se ve mi piel, no una máscara, y duró hasta el último baile.', 5, true),
    ('Camila & Diego', 'Boda · Hill Country, Texas', 'Entendió el ritmo del día. Las fotos se sienten cine, no poses rígidas. Reservamos Experiencia MOR sin pensarlo.', 5, true),
    ('Andrea R.', 'Sesión editorial · San Antonio', 'Dirección clara, luz preciosa y un maquillaje que se ve de revista. Salí del estudio sintiendo que por fin me vi como me imagino.', 5, true)
) as seed(client_name, role, quote, rating, is_published)
where not exists (select 1 from public.testimonials limit 1);

-- Redes y slider (también en supabase/migration-site.sql)
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

create policy "settings_public_read" on public.site_settings for select using (true);
create policy "settings_admin_all" on public.site_settings for all to authenticated using (true) with check (true);
create policy "hero_public_read" on public.hero_slides for select using (is_published = true);
create policy "hero_admin_all" on public.hero_slides for all to authenticated using (true) with check (true);

insert into public.site_settings (
  id, instagram, facebook, tiktok, whatsapp, phone_display, email, address
) values (
  'main',
  'https://www.instagram.com/Moor_Beauty_photography/',
  '',
  '',
  '12105485300',
  '+1 (210) 548-5300',
  'hello@morstudio.com',
  'San Antonio, Texas'
)
on conflict (id) do nothing;
