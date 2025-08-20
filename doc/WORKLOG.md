# WORKLOG – NT Knygelė

Šis darbo žurnalas padės sekti progresą, sprendimus ir „kas toliau“.

## 2025-08-20

**Transformacija nuo Demo UI į Tikrą DomusVertical Sistemą**

Atlikta (didelės apimties darbai):

**Infrastruktūra:**
- Pridėtas Supabase klientas (SSR + browser) ir .env.local su projekto URL + anon raktu
- Sukurta DB migracijų sistema: db/migrations + scripts/apply-migrations.ts
- Parašytos migracijos:
  - 0001_init_projects.sql: projects lentelė + dev RLS + seed
  - 0002_clients.sql: clients lentelė + dev RLS
  - 0003_project_stages.sql: project stages lentelė
  - 0004_extended_schema.sql: tasks, documents, financial_records + visi indeksai

**Implementuoti moduliai (visi su tikra Supabase integracija):**

1. **Projects Module** (/[lang]/projects)
   - Projektų sąrašas su real-time duomenimis
   - Create Project forma (server action)
   - Project Details puslapis (/[lang]/projects/[id])
   - Stages valdymas (add, status update)

2. **Clients Module** (/[lang]/clients)
   - Klientų sąrašas
   - Create Client forma
   - Email/phone kontaktų valdymas

3. **Tasks Module** (/[lang]/tasks)
   - Kanban-style task board (5 kolonos: todo, in_progress, review, done, blocked)
   - Priority sistema (low, medium, high, urgent)
   - Project association
   - Due dates ir status tracking

4. **Documents Module** (/[lang]/documents)
   - Dokumentų kategorijos (general, contract, invoice, permit, design, report, other)
   - Project association
   - File URL valdymas
   - Grupavimas pagal kategorijas

5. **Financial Module** (/[lang]/financials)
   - Income/Expense tracking
   - Project budget monitoring
   - Real-time metrics (total income, expenses, net balance)
   - Project-level P&L
   - Transaction istorija

6. **DomusVertical Dashboard** (/[lang]/dashboards/domus)
   - Real-time metrikų dashboard
   - Active projects, net balance, total clients, total budget
   - Task status overview su priority alertais
   - Project stages progress
   - Financial summary
   - Document repository stats
   - Quick actions navigacija

**UI/UX patobulinimai:**
- Sutaisytos visos lint problemos
- Pridėti visi moduliai į vertikalų ir horizontalų meniu
- Showcase gating išlaikytas (demo UI paslėptas pagal NEXT_PUBLIC_SHOWCASE)
- Responsive design visuose moduliuose

Kas toliau:
- Įdiegti Supabase Auth su griežtom RLS (owner_id = auth.uid())
- Teams/User management modulis
- Email notifikacijos
- File upload į Supabase Storage

## 2025-08-19

Atlikta:

- Sukurtas dokumentacijos karkasas: README.md, QuickStart-Week1.md, Supabase-Setup.md, Architecture.md, Git-Workflow.md
- Atnaujintas doc/README.md su naujomis nuorodomis
- Sukurtas minimalus app skeleton (Vuexy): (public)/login, (public)/register, (dashboard)/, (dashboard)/projects
- Sukurtas lib/auth.ts stub’as
- Sukurti dokumentai: Database-Schema-MVP.md, Auth-Flow.md, API-Design.md, Testing-Guide.md
- Central-Plan.md – centrinis planas (W1–W4)
- Paruoštas src/lib/supabase.ts ir src/lib/schemas.ts
- Sukurtas app/api/projects/route.ts (mock)
- Paruoštas prisma/schema.prisma (MVP) ir .env.example

Vyksta:

- Sekantis etapas: reali Supabase Auth integracija ir Project CRUD su Prisma

Kas toliau:

- Implementuoti login/register formą su Supabase
- Paruošti RLS policies projekto lentelėms
- Integruoti Prisma Project CRUD į /api/projects
- Paprasti unit testai Zod schemoms ir API handleriams

Pastabos:

- Pagrindinė app: šis repo (Vuexy – MUI NextJS Admin Template)
- Vuexy dokumentacija: žr. doc/THEME_README.md ir https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/
