# Auth Flow – Supabase (MVP)

Tikslas: paprastas, bet saugus prisijungimas/registracija ir sesijos tvarkymas.

## Komponentai
- Supabase JS client (`src/lib/supabase.ts`)
- Login/Register puslapiai: (public)/login, (public)/register
- Guard’ai: server komponentuose tikrinti sesiją (vėliau middleware)

## Sesijos logika
- Kliente: `supabase.auth.getSession()` – rodo ar user prisijungęs
- Serveryje: Next.js Route Handlers su Service Role (tik kur būtina), kitaip – RLS
- RLS: leidimas pasiekti tik savo duomenis (projects.owner_id == auth.uid())

## Minimalus login flow
1) Vartotojas įveda email+password
2) `supabase.auth.signInWithPassword({ email, password })`
3) Sėkmė – redirect į /(dashboard)
4) Klaida – rodyti žinutę, neleisti brute force (debounce, rate-limit per route middleware vėliau)

## Registracija
- `supabase.auth.signUp({ email, password })`
- Patvirtinimo el. laiškas (Supabase settings)
- Po patvirtinimo – pirmas įėjimas ir `user_profiles` įrašo sukūrimas

## Guard’ai (MVP)
- Dashboard route’ams: jei nėra sesijos – redirect į /login
- Viešiems route’ams: jei yra sesija – redirect į /(dashboard)

## Security gairės
- Nerašyti Service Role raktų į klientą
- API, kurie reikalauja elevated access – tik per server action/route handler (su server key)
- Visur naudoti Zod validaciją prieš kviečiant DB operacijas

## TODO įgyvendinimas (susieta su kodu)
- [x] Sukurti `src/lib/supabase.ts`
- [x] (public)/login – forma + kvietimas į auth stub (Supabase ready)
- [x] (public)/register – forma + auth stub
- [ ] Server guard’as: paprastas sesijos tikrinimas (layout arba server action)
- [ ] RLS policy sukūrimas projects ir project_stages lentelėms

