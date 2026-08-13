-- Categorías de portafolio y servicio de peinados
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

alter table public.packages drop constraint if exists packages_category_check;
alter table public.packages
  add constraint packages_category_check
  check (category in ('makeup', 'hair', 'photography', 'bridal_combo'));

update public.portfolio
set category = 'photography'
where category in ('studio', 'exteriors');

alter table public.portfolio drop constraint if exists portfolio_category_check;
alter table public.portfolio
  add constraint portfolio_category_check
  check (category in ('brides', 'makeup', 'photography', 'hair'));

insert into public.packages (
  title, category, price, description, features, duration, is_featured, is_active, sort_order
)
select * from (
  values
    (
      'Peinado de Novia',
      'hair',
      175.00,
      'Recogido o ondas de larga duración, pensado para ceremonias, viento y fotografías de todo el día.',
      ARRAY['Consulta de estilo y referencias','Prueba previa opcional','Fijación de larga duración','Horquillas y accesorios de novia','Retoque para el after'],
      '90 minutos',
      true,
      true,
      1
    ),
    (
      'Peinado Social',
      'hair',
      85.00,
      'Recogido, semirecogido u ondas para eventos, quinceañeras y noches que piden un look de revista.',
      ARRAY['Peinado según el evento','Fijación que aguanta baile y fotos','Acabado alineado al maquillaje','Ideal junto al maquillaje social'],
      '60 minutos',
      false,
      true,
      2
    ),
    (
      'Prueba de Peinado',
      'hair',
      70.00,
      'La cita para decidir volumen, recogido y accesorios con calma, antes del gran día.',
      ARRAY['Hasta dos opciones de peinado','Prueba de accesorios y velo','Fotos de referencia','Ajustes para el día del evento'],
      '60 minutos',
      false,
      true,
      3
    )
) as seed(title, category, price, description, features, duration, is_featured, is_active, sort_order)
where not exists (
  select 1 from public.packages where category = 'hair'
);
