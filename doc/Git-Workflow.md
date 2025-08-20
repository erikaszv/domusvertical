# Git Workflow

Šis dokumentas apibrėžia šakų strategiją, commit konvencijas ir PR procesą NT Knygelei.

## Šakos
- main – production paruoštas kodas
- develop – aktyvus development (nebūtina, jei feature -> main per PR tinka komandai)
- feature/* – naujos funkcijos (pvz. feature/auth-supabase)
- fix/* – klaidų taisymai
- chore/* – tvarkymai, CI, deps

## Conventional Commits
- feat: naujas funkcionalumas
- fix: klaidos taisymas
- docs: dokumentacija
- refactor: perrašymai be naujų funkcijų
- chore: įrankiai, CI, deps, build
- test: testai

Pavyzdžiai:
- feat(project): add create form skeleton
- fix(auth): handle invalid session on refresh
- docs: add Supabase-Setup guide

## Pull Request (PR) procesas
1. Sukurk feature šaką
2. Maži, aiškūs commit'ai su normaliais aprašymais
3. Atidaryk PR į develop (arba main, jei viena šaka)
4. PR aprašyme:
   - Kas daryta
   - Kaip paleisti/validuoti
   - Screenshots (jei UI)
5. Patikrink CI (lint, build, test)
6. Code review (2 akys jei įmanoma)
7. Squash & merge (konvencinis pavadinimas)

## Code Review check-list
- [ ] Build be klaidų
- [ ] Nėra TypeScript klaidų
- [ ] Lint/style laikomasi
- [ ] Nėra nereikalingo kodo/komentarų
- [ ] Error/empty/loading būsenos padengtos
- [ ] Apsauga nuo edge atvejų (null, undefined, empty)

## Release (vėliau)
- Tag versijas (semver) arba GitHub Releases
- Changelog generacija iš Conventional Commits

