# Central Plan – MVP (W1–W4)

Šis planas yra „viena vieta“, kur matosi kryptis, progreso checkbox’ai ir nuorodos.

## Būsena (trumpai) - ATNAUJINTA 2025-08-20
- [x] Dokumentacijos karkasas (README, QuickStart, Supabase-Setup, Architecture, Git-Workflow)
- [x] WORKLOG + ADR #0001
- [x] Minimalus app skeleton (login, register, dashboard, projects) + auth stub
- [x] DB schema (Supabase migracijos sistema vietoj Prisma) ✅
- [x] Supabase integracija (klientai, migracijos) ✅
- [x] Server Actions vietoj API routes (projects, clients, tasks, documents, financials) ✅
- [x] DomusVertical Dashboard su real-time metrikomis ✅
- [ ] Auth integracija (Supabase Auth su RLS)
- [ ] Testų bazė

## W1 – Fundamentals ✅ COMPLETED
Tikslai:
- [x] Repo apžiūra ir dokumentacijos karkasas
- [x] App skeleton ir public/dashboard maršrutai
- [x] DB schema (Supabase migracijos) parengimas ✅
- [x] Auth stub -> realus Supabase klientas ✅
- [x] Server Actions vietoj API routes ✅

Nuorodos:
- QuickStart-Week1.md, Supabase-Setup.md, Database-Schema-MVP.md, Auth-Flow.md, API-Design.md, Testing-Guide.md

## W2 – Auth + Project CRUD ✅ MOSTLY COMPLETED
- [ ] Prisijungimas/Registracija su Supabase (pending)
- [x] RLS policy projektams (dev mode) ✅
- [x] Project CRUD su server actions ✅
- [x] Dashboard KPI mock -> realūs skaičiai ✅
- [x] Clients CRUD ✅
- [x] Tasks management su Kanban view ✅
- [x] Financial tracking ✅

## W3 – Stages + Documents ✅ COMPLETED AHEAD OF SCHEDULE
- [x] Project stages UI + CRUD ✅
- [x] Documents management (URL-based) ✅
- [x] DomusVertical Dashboard su visomis metrikomis ✅
- [ ] Documents įkėlimas (Storage) – next phase
- [ ] E2E smoke flow (login -> create project -> add stage -> upload doc)

## W4 – Kokybė ir paruošimas beta
- [ ] Testai: unit + API smoke
- [ ] Lint/typecheck švaru
- [ ] Build veikia lokaliai
- [ ] Bazinis monitoring (planuose)

## Pastabos
- Visus sprendimus fiksuoti ADR (adr/)
- Kasdien/esant pokyčiams pildyti WORKLOG.md

