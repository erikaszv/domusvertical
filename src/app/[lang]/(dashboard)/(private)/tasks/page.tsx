import { revalidatePath } from 'next/cache'

import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

type Task = {
  id: string
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'review' | 'done' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  due_date: string | null
  project: {
    id: string
    name: string
  } | null
  stage: {
    id: string
    name: string
  } | null
  created_at: string
}

export default async function TasksPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  async function createTaskAction(formData: FormData) {
    'use server'
    const title = (formData.get('title') as string)?.trim()
    const description = (formData.get('description') as string)?.trim() || null
    const project_id = formData.get('project_id') as string || null
    const priority = formData.get('priority') as Task['priority'] || 'medium'
    const due_date = formData.get('due_date') as string || null

    if (!title) return

    const supabase = await getServerSupabase()

    await supabase.from('tasks').insert({ 
      title, 
      description, 
      project_id,
      priority,
      due_date
    })

    revalidatePath(`/${lang}/tasks`)
  }

  async function updateTaskStatusAction(formData: FormData) {
    'use server'
    const taskId = formData.get('taskId') as string
    const status = formData.get('status') as Task['status']

    const supabase = await getServerSupabase()

    const updateData: any = { status }
    if (status === 'done') {
      updateData.completed_at = new Date().toISOString()
    }

    await supabase
      .from('tasks')
      .update(updateData)
      .eq('id', taskId)

    revalidatePath(`/${lang}/tasks`)
  }

  const supabase = await getServerSupabase()

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select(`
      id,
      title,
      description,
      status,
      priority,
      due_date,
      created_at,
      project:projects(id, name),
      stage:project_stages(id, name)
    `)
    .order('created_at', { ascending: false })
    .limit(50)

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .order('name')

  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    review: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
    blocked: 'bg-red-100 text-red-800'
  }

  const priorityColors = {
    low: 'text-gray-500',
    medium: 'text-blue-600',
    high: 'text-orange-600',
    urgent: 'text-red-600 font-bold'
  }

  const groupedTasks = {
    todo: (tasks || []).filter((t: any) => t.status === 'todo'),
    in_progress: (tasks || []).filter((t: any) => t.status === 'in_progress'),
    review: (tasks || []).filter((t: any) => t.status === 'review'),
    done: (tasks || []).filter((t: any) => t.status === 'done'),
    blocked: (tasks || []).filter((t: any) => t.status === 'blocked')
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Tasks</h1>
        <div className='text-sm text-muted-foreground'>
          {(tasks || []).length} total tasks
        </div>
      </div>

      <form action={createTaskAction} className='p-4 border rounded space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <div>
            <label htmlFor='title' className='text-sm font-medium'>Task Title</label>
            <input
              id='title'
              name='title'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='Enter task title'
              required
            />
          </div>
          <div>
            <label htmlFor='project_id' className='text-sm font-medium'>Project</label>
            <select
              id='project_id'
              name='project_id'
              className='w-full border rounded px-2 py-1 mt-1'
            >
              <option value=''>No project</option>
              {(projects || []).map((p: any) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          <div>
            <label htmlFor='priority' className='text-sm font-medium'>Priority</label>
            <select
              id='priority'
              name='priority'
              className='w-full border rounded px-2 py-1 mt-1'
              defaultValue='medium'
            >
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
              <option value='urgent'>Urgent</option>
            </select>
          </div>
          <div>
            <label htmlFor='due_date' className='text-sm font-medium'>Due Date</label>
            <input
              id='due_date'
              name='due_date'
              type='date'
              className='w-full border rounded px-2 py-1 mt-1'
            />
          </div>
          <div>
            <label htmlFor='description' className='text-sm font-medium'>Description</label>
            <input
              id='description'
              name='description'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='Optional details'
            />
          </div>
        </div>
        
        <button type='submit' className='btn btn-primary'>Create Task</button>
      </form>

      {tasksError && (
        <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
          <div className='text-sm'>{tasksError.message}</div>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          <div key={status} className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium capitalize'>{status.replace('_', ' ')}</h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[status as Task['status']]}`}>
                {statusTasks.length}
              </span>
            </div>
            <div className='space-y-2'>
              {statusTasks.length === 0 ? (
                <div className='text-sm text-muted-foreground text-center py-4 border rounded'>
                  No tasks
                </div>
              ) : (
                statusTasks.map((task: any) => (
                  <div key={task.id} className='p-3 border rounded hover:shadow-sm transition-shadow'>
                    <div className='space-y-1'>
                      <div className='font-medium text-sm'>{task.title}</div>
                      {task.description && (
                        <div className='text-xs text-muted-foreground'>{task.description}</div>
                      )}
                      {task.project && (
                        <div className='text-xs text-blue-600'>
                          {task.project.name}
                        </div>
                      )}
                      <div className='flex items-center justify-between'>
                        <span className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                          {task.priority}
                        </span>
                        {task.due_date && (
                          <span className='text-xs text-muted-foreground'>
                            {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <form action={updateTaskStatusAction} className='mt-2'>
                      <input type='hidden' name='taskId' value={task.id} />
                      <select
                        name='status'
                        defaultValue={task.status}
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                        className='w-full text-xs border rounded px-1 py-0.5'
                      >
                        <option value='todo'>To Do</option>
                        <option value='in_progress'>In Progress</option>
                        <option value='review'>Review</option>
                        <option value='done'>Done</option>
                        <option value='blocked'>Blocked</option>
                      </select>
                    </form>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}