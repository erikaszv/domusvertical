# WORKLOG – NT Knygelė

Šis darbo žurnalas padės sekti progresą, sprendimus ir „kas toliau“.

## 2025-08-19

Atlikta:
- Sukurtas dokumentacijos karkasas: README.md, QuickStart-Week1.md, Supabase-Setup.md, Architecture.md, Git-Workflow.md
- Atnaujintas doc/README.md su naujomis nuorodomis
- Sukurtas minimalus app skeleton: (public)/login, (public)/register, (dashboard)/, (dashboard)/projects
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
- Pagrindinė app: apps/isomorphic-starter
- Isomorphic pavyzdžiai: apps/isomorphic*, naudoti komponentams ir UI pavyzdžiams

