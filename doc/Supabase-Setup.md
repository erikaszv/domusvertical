# Supabase Setup

Šis gidas padės greitai paruošti Supabase projektą ir prijungti jį prie šio Next.js app (Vuexy – MUI NextJS Admin Template).

## 1) Supabase projektas

1. Prisijunk: https://supabase.com/
2. Create new project
3. Pasirink region, pavadinimą
4. Gauk:
   - Project URL
   - anon public key
   - service role key

## 2) Aplinkos kintamieji (.env.local)

Sukurk apps/isomorphic-starter/.env.local ir įrašyk:

```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role
DATABASE_URL=postgresql://postgres:password@host:5432/postgres
```

Pastaba: DATABASE_URL – iš Settings > Database. Jei naudoji Supabase vietoje – prisitaikyk.

## 3) Kliento inicializacija

Sukurk apps/isomorphic-starter/src/lib/supabase.ts:

```ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
```

## 4) Auth – bazinis flow

- Landing/login puslapyje panaudok supabase.auth.signInWithPassword({ email, password })
- Registracijai – supabase.auth.signUp({ email, password })
- Sesijai – supabase.auth.getSession() klientinėje pusėje

## 5) Prisma (pasiruošimas)

- Įdiek prisma ir @prisma/client
- Repo root arba apps/isomorphic-starter aplanke sukurk prisma/schema.prisma
- DATABASE_URL naudos Supabase Postgres

Minimalus schema.prisma pavyzdys (tik Project – MVP):

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Project {
  id        String   @id @default(uuid())
  name      String
  type      String
  status    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Tada:

```bash
npx prisma migrate dev --name init
```

## 6) Row Level Security (RLS)

- Supabase pagal nutylėjimą įjungia RLS
- Sukurk policies, pvz. leidžiančias pasiekti Project savo user'iui (kai turėsim user_id lauką)

## 7) Failų saugykla (vėliau)

- Naudosim Supabase Storage dokumentams/nuotraukoms
- Sukurk bucketus: documents, photos

## 8) Naudingi linkai

- Auth: https://supabase.com/docs/guides/auth
- Database: https://supabase.com/docs/guides/database
- Prisma + Supabase: https://supabase.com/docs/guides/integrations/prisma

Kai pabaigsi šiuos žingsnius – grįžk į QuickStart-Week1.md ir tęsk implementaciją.
