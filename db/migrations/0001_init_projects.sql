-- 0001_init_projects.sql
-- Initial projects table and dev-friendly RLS policies.

create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  owner_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_created_at on public.projects (created_at desc);

alter table public.projects enable row level security;

-- DEV policies (open read/insert). Tighten after auth is wired.
create policy if not exists "dev_read_projects"
  on public.projects for select
  to anon, authenticated
  using (true);

create policy if not exists "dev_insert_projects"
  on public.projects for insert
  to anon, authenticated
  with check (true);

-- seed one row for quick verification
insert into public.projects (name, description)
values ('First Project', 'Hello from Supabase!')
on conflict do nothing;

