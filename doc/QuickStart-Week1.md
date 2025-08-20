# Quick Start – Savaitė 1

Tikslas: turėti paleidžiamą Next.js (apps/isomorphic-starter) app'ą su baziniais puslapiais, Supabase Auth integracijos skeletu ir Project CRUD struktūra (be gilios logikos).

## 0) Prieš pradžią
- Node.js 20+
- pnpm arba npm (naudok esamą lockfile valdymą repo – jei yra pnpm-lock.yaml, rinkis pnpm)

## 1) Lokalus paleidimas (isomorphic-starter)
```bash
cd apps/isomorphic-starter
# Įdiek priklausomybes
npm install
# Arba: pnpm install
# Paleisk dev
npm run dev
```
Jei kyla klaidų – pasitikrink Node versiją ir .env.example (žr. 2 skyrių).

## 2) Aplinkos kintamieji
Sukurk .env.local faile:
```
NEXT_PUBLIC_APP_NAME=NT Knygelė
# Supabase (užpildysi po Supabase-Setup)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

## 3) Supabase bazinis setup (santrauka)
Išsami versija – doc/Supabase-Setup.md.
- Sukurk projektą Supabase
- Gauk URL ir anon key (įrašyk į .env.local)
- Pasiruošk Prisma (schema.prisma skeletoną kursime vėliau)

## 4) App skeleton (maršrutai ir UI)
- apps/isomorphic-starter/src/app/ – sukurk bazinius route:
  - /(public)/ – login, register, landing
  - /(dashboard)/ – dashboard, projects, projects/[id]
- Naudok Isomorphic UI komponentus (Form, Input, Button, Card) iš repo pavyzdžių.

Minimalus landing puslapis:
```tsx
export default function Page() { return (<main className="p-6">NT Knygelė</main>); }
```

## 5) Auth skeletas (Supabase)
- Įdiek @supabase/supabase-js
- Sukurk lib/supabase.ts su createClient ir export
- Login/Register formos su React Hook Form + Zod, bet pradžiai tinka paprasta forma

## 6) Project CRUD struktūra
- Sukurk server/api trunką (tRPC arba Next.js route handlers)
- Tipai: Project { id, name, type, status }
- Pradžiai laikyk atmintyje (in-memory) arba naudok mock'ą – tik UI ir flow

## 7) Kokybės patikra
- npm run build (turėtų sėkmingai suveikti)
- Greiti komponentų testai (jei yra test runneris), kitaip – smoke test naršyklėje

## 8) Ką laikysime DONE šią savaitę
- Veikia dev serveris
- Yra landing + login + dashboard tušti puslapiai
- Yra Project sąrašas (mock) ir Create Project forma (mock)
- Aplinkos kintamieji paruošti Supabase integracijai

Toliau – pereik prie Supabase-Setup.md ir pradėk realią Auth + DB integraciją.

