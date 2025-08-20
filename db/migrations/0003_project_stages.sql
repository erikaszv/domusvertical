-- 0003_project_stages.sql
-- Project stages table + dev RLS

create extension if not exists "pgcrypto";

-- Enums
DO $$ BEGIN
  CREATE TYPE project_status AS ENUM ('planning','in_progress','completed','on_hold');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE stage_status AS ENUM ('not_started','in_progress','completed','blocked');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Add missing columns to projects (idempotent)
alter table if exists public.projects
  add column if not exists status project_status default 'planning',
  add column if not exists address jsonb,
  add column if not exists budget_planned numeric,
  add column if not exists budget_spent numeric,
  add column if not exists start_date date,
  add column if not exists planned_end_date date,
  add column if not exists updated_at timestamptz;

create table if not exists public.project_stages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  order_index int not null,
  status stage_status not null default 'not_started',
  progress_percentage int not null default 0,
  start_date date,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create unique index if not exists uq_project_stages_order on public.project_stages (project_id, order_index);
create index if not exists idx_project_stages_project on public.project_stages (project_id);

alter table public.project_stages enable row level security;

-- DEV policies: open read/insert
create policy if not exists "dev_read_project_stages"
  on public.project_stages for select
  to anon, authenticated
  using (true);

create policy if not exists "dev_insert_project_stages"
  on public.project_stages for insert
  to anon, authenticated
  with check (true);

