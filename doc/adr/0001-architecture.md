# ADR 0001: Technologijų stekas ir architektūra

Statusas: Priimta
Data: 2025-08-19

Kontekstas:

- Projektas orientuotas į Lietuvos NT ekosistemą su MVP per 2–3 mėn.
- Reikia greitos iteracijos, stiprių UI komponentų, paprasto deploy ir mobilumo.

Sprendimas:

- Frontend: Next.js (App Router), TypeScript, Vuexy (MUI) UI komponentai
- State: Zustand + React Query (vėlesniems etapams)
- Autentifikacija: Supabase Auth
- Duomenų bazė: PostgreSQL (Supabase) su Prisma ORM
- API: tRPC arba Route Handlers (Next.js) su Zod validacijomis
- Hostingas: Vercel (frontend + API), DB/Storage: Supabase

Pasekmės:

- Greita kūrimo eiga, daug iš anksto paruoštų UI komponentų
- Tipais paremtas API ir duomenų sluoksnis (Zod + tRPC/Prisma)
- Paprastas deploy, geras DX

* Lock-in į Next.js + Supabase ekosistemą (priimtina MVP stadijoje)
* Reikalinga drausmė validacijoms ir policy (RLS) tvarkymui

Alternatyvos:

- NextAuth vietoj Supabase Auth (atsisakyta – norime vieningo tiekėjo auth+db+storage)
- Express/Nest atskirai nuo Next (atsisakyta – daugiau overhead MVP stadijoje)
