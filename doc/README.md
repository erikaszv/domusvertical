# NT Knygelė – Dokumentacija (indeksas)

Sveikas atvykęs į projekto dokumentaciją. Čia rasi greitą startą, pilną projekto planą, technines gaires ir darbo eigą.

## Greitas kelias

- Pradėk čia: Start.md (apžvalga ir akcentai)
- Pilnas projekto planas: nt-knygele-plan.md ("biblija" su visomis detalėmis)
- Architektūros santrauka: Architecture.md
- Git darbo eiga: Git-Workflow.md
- DB schema (MVP): Database-Schema-MVP.md
- Auth srautas: Auth-Flow.md
- API dizainas: API-Design.md
- Testavimo gidas: Testing-Guide.md
- Greitas startas 1 savaitei: QuickStart-Week1.md
- Supabase paruošimas ir integracija: Supabase-Setup.md
- PDF apžvalga (jei patogiau): Documentation.pdf

## Repo struktūra (aktualu MVP)

- Next.js app (Vuexy – MUI NextJS Admin Template) – projektas šiame repo root'e
- src/app – App Router maršrutai
- src/views, src/components, src/@core, src/@layouts – UI komponentai (Vuexy)
- src/redux-store – globali būsena (Redux Toolkit)
- src/prisma – Prisma schema ir migracijos
- doc/ – dokumentacija

## Ką daryti dabar

1. Peržvelk Central-Plan.md ir žymėk progresą
2. Perskaityk QuickStart-Week1.md ir atlik žingsnius (lokalus paleidimas, bazinis skeleton)
3. Paruošk Supabase pagal Supabase-Setup.md
4. Vadovaukis nt-knygele-plan.md savaitiniu planu (Savaitė 1–2: Auth, profilis, projektų CRUD)

## Roadmap (trumpai)

- Savaitė 1–2: Auth (Supabase), User profilis, Project CRUD, bazinis dashboard
- Savaitė 3–4: Etapai, dokumentai, kvietimai, activity feed
- Toliau – marketplace, skaičiuotuvai, realtime, PWA ir t. t. (žiūrėk nt-knygele-plan.md)

## Konvencijos

- TypeScript strict, Zod validacija, tRPC API pattern
- UI – Vuexy (MUI) komponentai (Forms, Layout, Feedback, Navigation, Data)
- Git workflow – feature šakos (feature/…), conventional commits

## Naudingi linkai

- Vuexy (Next.js) dokumentacija: https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation/
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs

## Darbo žurnalas ir sprendimai

- WORKLOG: WORKLOG.md
- ADR katalogas: adr/ (pvz., adr/0001-architecture.md)

Jei kas neaišku – atsidaryk Start.md ir nt-knygele-plan.md, o dėl konkrečių setup žingsnių – QuickStart-Week1.md ir Supabase-Setup.md.
