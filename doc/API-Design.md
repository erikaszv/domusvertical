# API Design – MVP

Tikslas: nuoseklus, tipais paremtas API (tRPC arba Next route handlers) su Zod validacijomis.

## Pasirinkimas (MVP)
- Naudosime Next.js route handlers + Zod (paprasta pradžiai)
- Vėliau galima pereiti į tRPC, jei bus poreikis tipo saugumui end-to-end

## Konvencijos
- /api/projects – GET/POST
- /api/projects/[id] – GET/PATCH/DELETE
- Body visada validuojamas su Zod

## Zod schemos (pavyzdys)
```ts
import { z } from 'zod';

export const ProjectSchema = z.object({
  name: z.string().min(3).max(100),
  type: z.enum(['house', 'apartment', 'renovation']),
  status: z.enum(['planning', 'in_progress', 'completed', 'on_hold']).optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
```

## Route handlers (pavyzdys)
```ts
// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import { ProjectSchema } from '@/lib/schemas';

export async function GET() {
  // TODO: fetch projects for current user (pagal RLS)
  return NextResponse.json([]);
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  // TODO: create project
  return NextResponse.json({ ok: true }, { status: 201 });
}
```

## Error handling
- Visada grąžinti JSON su `error` ir status code
- Server loguose fiksuoti tik saugią informaciją

## Pagination/Filtering (vėliau)
- ?take, ?skip arba cursor
- ?status, ?type filtrai

## Autentifikacija
- GET/POST turi remtis sesija (auth.uid) – per Supabase server-side helperius (vėliau)

