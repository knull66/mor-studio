-- Anuncio, horario, traducciones EN de paquetes/testimonios
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

alter table public.site_settings
  add column if not exists announcement_es text,
  add column if not exists announcement_en text,
  add column if not exists announcement_enabled boolean default false,
  add column if not exists hours text;

alter table public.packages
  add column if not exists title_en text,
  add column if not exists description_en text,
  add column if not exists features_en text[],
  add column if not exists duration_en text;

alter table public.testimonials
  add column if not exists quote_en text,
  add column if not exists role_en text;

update public.site_settings
set hours = coalesce(hours, 'Mar — Sáb · 10:00 a.m. – 7:00 p.m.')
where id = 'main';
