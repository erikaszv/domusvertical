# Database Schema – MVP

Tikslas: minimalus modelis, leidžiantis sukurti autentifikaciją, projektų CRUD ir pagrindinį dashboard.

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

### projects
- id (uuid, pk)
- owner_id (uuid, fk -> users.id)
- name (varchar)
- type (enum: 'house' | 'apartment' | 'renovation')
- status (enum: 'planning' | 'in_progress' | 'completed' | 'on_hold') default 'planning'
- address (jsonb) – { street, city, postal_code }
- budget_planned (numeric)
- budget_spent (numeric)
- start_date (date)
- planned_end_date (date)
- created_at, updated_at

Indeksai:
- idx_projects_owner (owner_id)
- idx_projects_status (status)

### project_stages
- id (uuid, pk)
- project_id (uuid, fk -> projects.id on delete cascade)
- name (varchar)
- order_index (int)
- status (enum: 'not_started' | 'in_progress' | 'completed' | 'blocked') default 'not_started'
- progress_percentage (int) default 0
- start_date (date)
- end_date (date)
- created_at, updated_at

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

## Migracijų tvarka
1) Users/UserProfiles (jei reikalinga papildomai prie Supabase)
2) Projects
3) ProjectStages
4) Documents

## Tolimesni plėtiniai (ne MVP)
- marketplace_* lentelės
- notifications, activities
- reviews, materials

