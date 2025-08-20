# Central Plan – MVP (W1–W4)

Šis planas yra „viena vieta“, kur matosi kryptis, progreso checkbox’ai ir nuorodos.

## Būsena (trumpai)
- [x] Dokumentacijos karkasas (README, QuickStart, Supabase-Setup, Architecture, Git-Workflow)
- [x] WORKLOG + ADR #0001
- [x] Minimalus app skeleton (login, register, dashboard, projects) + auth stub
- [ ] DB schema (Prisma) 
- [ ] Auth integracija (Supabase)
- [ ] API route’ai (projects)
- [ ] Testų bazė

## W1 – Fundamentals
Tikslai:
- [x] Repo apžiūra ir dokumentacijos karkasas
- [x] App skeleton ir public/dashboard maršrutai
- [ ] DB schema (Prisma) parengimas
- [ ] Auth stub -> realus Supabase klientas
- [ ] API /projects route (mock)

Nuorodos:
- QuickStart-Week1.md, Supabase-Setup.md, Database-Schema-MVP.md, Auth-Flow.md, API-Design.md, Testing-Guide.md

## W2 – Auth + Project CRUD
- [ ] Prisijungimas/Registracija su Supabase
- [ ] RLS policy projektams
- [ ] Project CRUD su Prisma
- [ ] Dashboard KPI mock -> realūs skaičiai

## W3 – Stages + Documents
- [ ] Project stages UI + CRUD
- [ ] Documents įkėlimas (Storage) – paprastas variantas
- [ ] E2E smoke flow (login -> create project -> add stage -> upload doc)

## W4 – Kokybė ir paruošimas beta
- [ ] Testai: unit + API smoke
- [ ] Lint/typecheck švaru
- [ ] Build veikia lokaliai
- [ ] Bazinis monitoring (planuose)

## Pastabos
- Visus sprendimus fiksuoti ADR (adr/)
- Kasdien/esant pokyčiams pildyti WORKLOG.md

