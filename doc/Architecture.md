# Architektūra – santrauka

Šis dokumentas sutrumpintai apibendrina techninę architektūrą remiantis nt-knygele-plan.md ir realia repo struktūra.

## Frontend
- Next.js (apps/isomorphic-starter), TypeScript, App Router
- UI: Isomorphic komponentai (naudoti iš apps/isomorphic* pavyzdžių)
- State: Zustand + React Query (vėliau)
- Forms: React Hook Form + Zod
- Stiliai: Tailwind CSS

## Backend (Next.js API)
- tRPC arba route handlers (type-safe API)
- Prisma 5.x – ORM
- DB: PostgreSQL (Supabase)
- Auth: Supabase Auth
- Failai: Supabase Storage arba S3

## Infrastruktūra
- Hosting: Vercel (frontend + edge/functions)
- DB/Realtime/Storage: Supabase
- CI/CD: GitHub Actions (vėliau)

## Projekto struktūra (apps/isomorphic-starter)
- src/app – App Router maršrutai
- src/components – UI komponentai
- src/lib – utilitai (pvz., supabase.ts)
- prisma/ – schema.prisma ir migracijos (jei laikysime šiame app)

## Konvencijos
- TypeScript strict, Zod validacija per visus sluoksnius
- API – tRPC su Zod arba aiškūs handler’iai + schema validacijos
- Query optimizacija su Prisma select/include

Daugiau – doc/nt-knygele-plan.md (pilnas dokumentas).
