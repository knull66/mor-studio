-- Pagos Stripe: depósito 50% ligado a solicitudes
-- SQL Editor: https://supabase.com/dashboard/project/tsklhgltblwysmvmtepy/sql/new

alter table public.inquiries
  add column if not exists payment_method varchar default 'whatsapp',
  add column if not exists payment_status varchar default 'unpaid',
  add column if not exists stripe_checkout_session_id varchar,
  add column if not exists package_id text,
  add column if not exists package_title text,
  add column if not exists amount_cents int;

alter table public.inquiries
  drop constraint if exists inquiries_payment_method_check;
alter table public.inquiries
  add constraint inquiries_payment_method_check
  check (payment_method in ('whatsapp', 'stripe'));

alter table public.inquiries
  drop constraint if exists inquiries_payment_status_check;
alter table public.inquiries
  add constraint inquiries_payment_status_check
  check (payment_status in ('unpaid', 'paid', 'refunded'));

create unique index if not exists inquiries_stripe_session_uidx
  on public.inquiries (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;
