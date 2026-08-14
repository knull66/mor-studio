-- Recorte, posición y zoom del slider de inicio
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

alter table public.hero_slides
  add column if not exists focal_x numeric default 50,
  add column if not exists focal_y numeric default 50,
  add column if not exists zoom numeric default 100;

update public.hero_slides
set
  focal_x = coalesce(focal_x, 50),
  focal_y = coalesce(focal_y, 50),
  zoom = coalesce(zoom, 100);
