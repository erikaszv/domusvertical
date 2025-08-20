# Architektūra – santrauka

Šis dokumentas sutrumpintai apibendrina techninę architektūrą remiantis nt-knygele-plan.md ir realia repo struktūra.

## Frontend

- Next.js (Vuexy – MUI NextJS Admin Template), TypeScript, App Router
- UI: Vuexy (MUI) komponentai ir layout'ai (src/views, src/@core, src/@layouts)
- State: Redux Toolkit (src/redux-store)
- Forms: React Hook Form + Zod (arba Valibot pagal poreikį)
- Stiliai: MUI + Tailwind utility klasės (pagal poreikį)

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

## Projekto struktūra (repo root)

- src/app – App Router maršrutai
- src/views, src/components, src/@core, src/@layouts – UI ir puslapiai (Vuexy)
- src/redux-store – globali būsena (Redux Toolkit)
- src/libs, src/utils – bendri utilitai
- src/prisma – schema.prisma ir migracijos

## Konvencijos

- TypeScript strict, Zod validacija per visus sluoksnius
- API – tRPC su Zod arba aiškūs handler’iai + schema validacijos
- Query optimizacija su Prisma select/include

Daugiau – doc/nt-knygele-plan.md (pilnas dokumentas).
