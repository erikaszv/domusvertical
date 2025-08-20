# Testing Guide – MVP

Tikslas: greitai paleidžiami, naudingi testai MVP stadijai.

## Lygiai
- Unit – utilitai, schema validacijos
- Component – paprasti UI komponentai (React Testing Library)
- API – route handlers su mock auth
- E2E – vėliau (Cypress/Playwright), pagrindiniai user flow

## Įrankiai (siūlomi)
- Vitest arba Jest (priklausomai nuo repo standartų)
- @testing-library/react
- @testing-library/jest-dom

## Praktika
- Kiekvienam util/ui komponentui – trumpi, aiškūs testai
- API testuose – validuoti 400 scenarijus (blogas input), 200/201 (sėkmė)
- Test naming: should-do-something-when-X

## Paleidimas
- npm run test (pasirinktas runneris)
- npm run test:watch – vietinei plėtrai

## Pavyzdinis unit testas (Zod schema)
```ts
import { ProjectSchema } from '@/lib/schemas';

test('valid project input', () => {
  const result = ProjectSchema.safeParse({ name: 'Test', type: 'house' });
  expect(result.success).toBe(true);
});

test('invalid project input', () => {
  const result = ProjectSchema.safeParse({ name: 'a', type: 'unknown' });
  expect(result.success).toBe(false);
});
```

## CI gairės (vėliau)
- Lint + typecheck + unit tests privalomi PR
- E2E tik prieš release arba nightlies

