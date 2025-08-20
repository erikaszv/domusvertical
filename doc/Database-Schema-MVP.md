# Database Schema – MVP → Production

ATNAUJINTA: 2025-08-20 (pilna transformacija į tikrą sistemą)

Tikslas: Transformuota nuo teorinio modelio į veikiančią DomusVertical property development management sistemą.

## Lentelės (MVP)

### users

Pastaba: jei naudojamas Supabase Auth, naudoti jų `auth.users` kaip šaltinį, o aplikacijos profilio duomenis laikyti `user_profiles`.

Stulpeliai (per profilį):

- id (uuid, pk)
- email (text, unique)
- first_name (text, optional)
- last_name (text, optional)
- avatar_url (text, optional)
- role (enum: 'owner' | 'contractor' | 'vendor' | 'admin') – default 'owner'
- created_at (timestamptz, default now())
- updated_at (timestamptz)

### user_profiles

- id (uuid, pk) – tokia pati kaip auth.user id
- phone (text)
- settings (jsonb)
- created_at, updated_at

### projects (IMPLEMENTED ✅)

- id (uuid, pk)
- owner_id (uuid, fk -> users.id, nullable in dev)
- name (text)
- description (text)
- status (enum: 'planning' | 'active' | 'on_hold' | 'completed') default 'planning'
- budget (numeric)
- client_id (uuid, fk -> clients.id)
- start_date (date)
- end_date (date)
- created_at (timestamptz)
- updated_at (timestamptz)

Indeksai:

- idx_projects_owner (owner_id)
- idx_projects_status (status)

### project_stages (IMPLEMENTED ✅)

- id (uuid, pk)
- project_id (uuid, fk -> projects.id on delete cascade)
- name (text)
- description (text)
- order_index (int)
- status (enum: 'pending' | 'in_progress' | 'completed') default 'pending'
- created_at (timestamptz)
- updated_at (timestamptz)

Unikalumas:

- unique (project_id, order_index)

### documents (paprastinta)

- id (uuid, pk)
- project_id (uuid, fk -> projects.id on delete cascade)
- stage_id (uuid, fk -> project_stages.id, nullable)
- uploaded_by (uuid, fk -> users.id)
- type (varchar) – 'photo' | 'invoice' | 'contract' | 'other'
- name (varchar)
- file_url (text)
- created_at

## RLS gairės (Supabase)

- projects: SELECT/UPDATE/DELETE leidžiama tik owner_id arba projekto nariams (MVP – tik owner)
- project_stages: paveldi per projects
- documents: paveldi per projects

### clients (IMPLEMENTED ✅)

- id (uuid, pk)
- owner_id (uuid, fk -> users.id, nullable in dev)
- name (text)
- email (text)
- phone (text)
- created_at (timestamptz)

Indeksai:
- idx_clients_created_at (created_at desc)

### tasks (IMPLEMENTED ✅)

- id (uuid, pk)
- project_id (uuid, fk -> projects.id)
- stage_id (uuid, fk -> project_stages.id, nullable)
- title (text)
- description (text)
- status (enum: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked') default 'todo'
- priority (enum: 'low' | 'medium' | 'high' | 'urgent') default 'medium'
- assigned_to (uuid)
- due_date (date)
- completed_at (timestamptz)
- created_at (timestamptz)
- updated_at (timestamptz)
- owner_id (uuid)

Indeksai:
- idx_tasks_project_id
- idx_tasks_stage_id
- idx_tasks_status
- idx_tasks_assigned_to

### documents (IMPLEMENTED ✅)

- id (uuid, pk)
- project_id (uuid, fk -> projects.id)
- name (text)
- description (text)
- file_url (text)
- file_size (bigint)
- mime_type (text)
- category (enum: 'general' | 'contract' | 'invoice' | 'permit' | 'design' | 'report' | 'other') default 'general'
- uploaded_by (uuid)
- created_at (timestamptz)
- owner_id (uuid)

Indeksai:
- idx_documents_project_id

### financial_records (IMPLEMENTED ✅)

- id (uuid, pk)
- project_id (uuid, fk -> projects.id)
- type (enum: 'income' | 'expense')
- category (text)
- amount (numeric)
- description (text)
- date (date)
- created_at (timestamptz)
- owner_id (uuid)

Indeksai:
- idx_financial_records_project_id

Pavyzdiniai policy (pseudo):

- `using ( auth.uid() = owner_id )`
- `with check ( auth.uid() = owner_id )`

## Prisma schema (MVP pavyzdys)

```prisma
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

generator client { provider = "prisma-client-js" }

model Project {
  id              String   @id @default(uuid())
  ownerId         String
  name            String
  type            ProjectType
  status          ProjectStatus @default(planning)
  address         Json?
  budget_planned  Decimal? @map("budget_planned")
  budget_spent    Decimal? @map("budget_spent")
  start_date      DateTime? @map("start_date")
  planned_end_date DateTime? @map("planned_end_date")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  stages          ProjectStage[]

  @@index([ownerId], name: "idx_projects_owner")
  @@index([status], name: "idx_projects_status")
}

enum ProjectType { house apartment renovation }

enum ProjectStatus { planning in_progress completed on_hold }

model ProjectStage {
  id                String   @id @default(uuid())
  projectId         String
  name              String
  order_index       Int
  status            StageStatus @default(not_started)
  progress_percentage Int @default(0)
  start_date        DateTime?
  end_date          DateTime?
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")
  project           Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)

  @@unique([projectId, order_index])
}

enum StageStatus { not_started in_progress completed blocked }
```

## Įgyvendintų migracijų tvarka

1. ✅ 0001_init_projects.sql - projects lentelė + dev RLS + seed data
2. ✅ 0002_clients.sql - clients lentelė + dev RLS
3. ✅ 0003_project_stages.sql - project stages lentelė
4. ✅ 0004_extended_schema.sql - tasks, documents, financial_records + visi indeksai

## Vykdymas

```bash
# .env.local turi turėti:
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

npm run db:migrate
```

## Tolimesni plėtiniai (ne MVP)

- marketplace\_\* lentelės
- notifications, activities
- reviews, materials
