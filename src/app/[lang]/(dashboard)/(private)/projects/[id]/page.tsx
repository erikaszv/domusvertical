import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'

import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

type Stage = {
  id: string
  name: string
  description: string | null
  status: 'pending' | 'in_progress' | 'completed'
  order_index: number
  created_at: string
}


export default async function ProjectDetailsPage({
  params
}: {
  params: Promise<{ lang: string; id: string }>
}) {
  const { lang, id } = await params
  await getDictionary(lang as any)

  async function createStageAction(formData: FormData) {
    'use server'
    const name = (formData.get('name') as string)?.trim()
    const description = (formData.get('description') as string)?.trim() || null

    if (!name) return

    const supabase = await getServerSupabase()

    const { data: maxOrder } = await supabase
      .from('project_stages')
      .select('order_index')
      .eq('project_id', id)
      .order('order_index', { ascending: false })
      .limit(1)
      .single()

    const order_index = (maxOrder?.order_index ?? -1) + 1

    await supabase.from('project_stages').insert({
      project_id: id,
      name,
      description,
      order_index
    })

    revalidatePath(`/${lang}/projects/${id}`)
  }

  async function updateStageStatusAction(formData: FormData) {
    'use server'
    const stageId = formData.get('stageId') as string
    const status = formData.get('status') as Stage['status']

    const supabase = await getServerSupabase()

    await supabase
      .from('project_stages')
      .update({ status })
      .eq('id', stageId)

    revalidatePath(`/${lang}/projects/${id}`)
  }

  const supabase = await getServerSupabase()

  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (projectError || !project) {
    notFound()
  }

  const { data: stages, error: stagesError } = await supabase
    .from('project_stages')
    .select('*')
    .eq('project_id', id)
    .order('order_index', { ascending: true })

  const { data: client } = project.client_id
    ? await supabase
        .from('clients')
        .select('name')
        .eq('id', project.client_id)
        .single()
    : { data: null }

  const statusColors = {
    planning: 'bg-gray-100 text-gray-800',
    active: 'bg-green-100 text-green-800',
    on_hold: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  }

  const stageStatusColors = {
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-3xl font-semibold'>{project.name}</h1>
          {project.description && (
            <p className='text-muted-foreground mt-2'>{project.description}</p>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status as keyof typeof statusColors]}`}>
          {project.status}
        </span>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Client</div>
          <div className='font-medium'>{client?.name || '—'}</div>
        </div>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Budget</div>
          <div className='font-medium'>
            {project.budget ? `€${project.budget.toLocaleString()}` : '—'}
          </div>
        </div>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Timeline</div>
          <div className='font-medium'>
            {project.start_date && project.end_date
              ? `${new Date(project.start_date).toLocaleDateString()} - ${new Date(project.end_date).toLocaleDateString()}`
              : '—'}
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Project Stages</h2>
        </div>

        <form action={createStageAction} className='flex gap-2 items-end p-4 border rounded'>
          <div className='flex-1'>
            <label htmlFor='name' className='text-sm'>Stage Name</label>
            <input
              id='name'
              name='name'
              className='w-full border rounded px-2 py-1'
              placeholder='e.g., Foundation, Framing, Roofing'
              required
            />
          </div>
          <div className='flex-1'>
            <label htmlFor='description' className='text-sm'>Description</label>
            <input
              id='description'
              name='description'
              className='w-full border rounded px-2 py-1'
              placeholder='Optional details'
            />
          </div>
          <button type='submit' className='btn btn-primary'>Add Stage</button>
        </form>

        {stagesError && (
          <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
            <div className='text-sm'>{stagesError.message}</div>
          </div>
        )}

        {(stages || []).length === 0 ? (
          <div className='text-center py-8 text-muted-foreground'>
            No stages defined yet. Add stages to track project progress.
          </div>
        ) : (
          <div className='space-y-2'>
            {(stages || []).map((stage: any, index) => (
              <div key={stage.id} className='p-4 border rounded'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-muted-foreground'>#{index + 1}</span>
                      <h3 className='font-medium'>{stage.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${stageStatusColors[stage.status as keyof typeof stageStatusColors]}`}>
                        {stage.status}
                      </span>
                    </div>
                    {stage.description && (
                      <p className='text-sm text-muted-foreground mt-1'>{stage.description}</p>
                    )}
                  </div>
                  <form action={updateStageStatusAction} className='flex gap-1'>
                    <input type='hidden' name='stageId' value={stage.id} />
                    {stage.status !== 'in_progress' && (
                      <button
                        type='submit'
                        name='status'
                        value='in_progress'
                        className='px-2 py-1 text-xs border rounded hover:bg-yellow-50'
                      >
                        Start
                      </button>
                    )}
                    {stage.status !== 'completed' && (
                      <button
                        type='submit'
                        name='status'
                        value='completed'
                        className='px-2 py-1 text-xs border rounded hover:bg-green-50'
                      >
                        Complete
                      </button>
                    )}
                    {stage.status !== 'pending' && (
                      <button
                        type='submit'
                        name='status'
                        value='pending'
                        className='px-2 py-1 text-xs border rounded hover:bg-gray-50'
                      >
                        Reset
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}