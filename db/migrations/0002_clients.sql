-- 0002_clients.sql
-- Clients table (MVP) + dev RLS policies + seed

create extension if not exists "pgcrypto";

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  owner_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists idx_clients_created_at on public.clients (created_at desc);

alter table public.clients enable row level security;

-- DEV policies (open read/insert)
create policy if not exists "dev_read_clients"
  on public.clients for select
  to anon, authenticated
  using (true);

create policy if not exists "dev_insert_clients"
  on public.clients for insert
  to anon, authenticated
  with check (true);

-- seed one row
insert into public.clients (name, email, phone)
values ('Acme Ltd', 'contact@acme.test', '+37060000000')
on conflict do nothing;

