import { revalidatePath } from 'next/cache'

import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

import ProjectsCreateForm from './projectsCreateForm'

type Project = {
  id: string
  name: string
  description: string | null
  created_at: string
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  async function createProjectAction(formData: FormData) {
    'use server'
    const name = (formData.get('name') as string)?.trim()
    const description = (formData.get('description') as string)?.trim() || null

    if (!name) return

    const supabase = await getServerSupabase()

    await supabase.from('projects').insert({ name, description })
    revalidatePath(`/${lang}/projects`)
  }

  const supabase = await getServerSupabase()

  let projects: Project[] = []
  let supabaseError: string | null = null

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('id, name, description, created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) supabaseError = error.message
    else projects = data ?? []
  } catch (e: any) {
    supabaseError = e?.message ?? 'Unknown error'
  }

  const missingTable =
    supabaseError?.toLowerCase().includes('relation') && supabaseError?.toLowerCase().includes('does not exist')

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-semibold'>Projects</h1>

      <ProjectsCreateForm action={createProjectAction} />

      {supabaseError && (
        <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
          <div className='font-medium mb-1'>Supabase error</div>
          <div className='text-sm whitespace-pre-wrap'>{supabaseError}</div>
          {missingTable && (
            <div className='mt-2 text-sm'>Create the table in Supabase SQL editor and refresh this page.</div>
          )}
        </div>
      )}

      {!supabaseError && projects.length === 0 && <div className='text-sm text-muted-foreground'>No projects yet.</div>}

      <ul className='space-y-2'>
        {projects.map(p => (
          <li key={p.id} className='rounded border border-default p-3 hover:border-primary transition-colors'>
            <a href={`/${lang}/projects/${p.id}`} className='block'>
              <div className='font-medium'>{p.name}</div>
              {p.description ? <div className='text-sm text-muted-foreground'>{p.description}</div> : null}
              <div className='text-xs text-muted-foreground mt-1'>Created: {new Date(p.created_at).toLocaleString()}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
