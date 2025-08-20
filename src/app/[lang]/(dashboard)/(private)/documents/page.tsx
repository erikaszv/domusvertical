import { revalidatePath } from 'next/cache'

import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

type Document = {
  id: string
  name: string
  description: string | null
  file_url: string
  file_size: number | null
  mime_type: string | null
  category: 'general' | 'contract' | 'invoice' | 'permit' | 'design' | 'report' | 'other'
  project: {
    id: string
    name: string
  } | null
  created_at: string
}

export default async function DocumentsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  async function createDocumentAction(formData: FormData) {
    'use server'
    const name = (formData.get('name') as string)?.trim()
    const description = (formData.get('description') as string)?.trim() || null
    const project_id = formData.get('project_id') as string || null
    const category = formData.get('category') as Document['category'] || 'general'
    const file_url = (formData.get('file_url') as string)?.trim()

    if (!name || !file_url) return

    const supabase = await getServerSupabase()

    await supabase.from('documents').insert({ 
      name, 
      description, 
      project_id,
      category,
      file_url
    })

    revalidatePath(`/${lang}/documents`)
  }

  async function deleteDocumentAction(formData: FormData) {
    'use server'
    const documentId = formData.get('documentId') as string

    const supabase = await getServerSupabase()

    await supabase
      .from('documents')
      .delete()
      .eq('id', documentId)

    revalidatePath(`/${lang}/documents`)
  }

  const supabase = await getServerSupabase()

  const { data: documents = [], error: docsError } = await supabase
    .from('documents')
    .select(`
      id,
      name,
      description,
      file_url,
      file_size,
      mime_type,
      category,
      created_at,
      project:projects(id, name)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .order('name')

  const categoryColors = {
    general: 'bg-gray-100 text-gray-800',
    contract: 'bg-purple-100 text-purple-800',
    invoice: 'bg-green-100 text-green-800',
    permit: 'bg-orange-100 text-orange-800',
    design: 'bg-blue-100 text-blue-800',
    report: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800'
  }

  const categoryIcons = {
    general: 'tabler-file',
    contract: 'tabler-file-text',
    invoice: 'tabler-file-invoice',
    permit: 'tabler-certificate',
    design: 'tabler-brush',
    report: 'tabler-report',
    other: 'tabler-file-dots'
  }

  const formatFileSize = (bytes: number | null) => {
    if (!bytes) return '—'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  const groupedDocs = (documents || []).reduce((acc: any, doc: any) => {
    const category = doc.category
    if (!acc[category]) acc[category] = []
    acc[category].push(doc)

    return acc
  }, {})

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Documents</h1>
        <div className='text-sm text-muted-foreground'>
          {(documents || []).length} documents
        </div>
      </div>

      <form action={createDocumentAction} className='p-4 border rounded space-y-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <div>
            <label htmlFor='name' className='text-sm font-medium'>Document Name</label>
            <input
              id='name'
              name='name'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='e.g., Floor Plans v2'
              required
            />
          </div>
          <div>
            <label htmlFor='file_url' className='text-sm font-medium'>File URL</label>
            <input
              id='file_url'
              name='file_url'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='https://... or /uploads/...'
              required
            />
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
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
          <div>
            <label htmlFor='category' className='text-sm font-medium'>Category</label>
            <select
              id='category'
              name='category'
              className='w-full border rounded px-2 py-1 mt-1'
              defaultValue='general'
            >
              <option value='general'>General</option>
              <option value='contract'>Contract</option>
              <option value='invoice'>Invoice</option>
              <option value='permit'>Permit</option>
              <option value='design'>Design</option>
              <option value='report'>Report</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor='description' className='text-sm font-medium'>Description</label>
            <input
              id='description'
              name='description'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='Optional notes'
            />
          </div>
        </div>
        
        <button type='submit' className='btn btn-primary'>Add Document</button>
      </form>

      {docsError && (
        <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
          <div className='text-sm'>{docsError.message}</div>
        </div>
      )}

      <div className='space-y-6'>
        {Object.entries(groupedDocs).map(([category, categoryDocs]) => (
          <div key={category} className='space-y-2'>
            <div className='flex items-center gap-2'>
              <i className={`${categoryIcons[category as Document['category']]} text-lg`} />
              <h3 className='font-medium capitalize'>{category}</h3>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${categoryColors[category as Document['category']]}`}>
                {(categoryDocs as Document[]).length}
              </span>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
              {(categoryDocs as Document[]).map((doc: Document) => (
                <div key={doc.id} className='p-4 border rounded hover:shadow-sm transition-shadow'>
                  <div className='flex items-start justify-between'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <i className={`${categoryIcons[doc.category]} text-muted-foreground`} />
                        <a 
                          href={doc.file_url} 
                          target='_blank' 
                          rel='noopener noreferrer'
                          className='font-medium text-sm truncate hover:text-primary'
                        >
                          {doc.name}
                        </a>
                      </div>
                      {doc.description && (
                        <div className='text-xs text-muted-foreground mt-1'>{doc.description}</div>
                      )}
                      {doc.project && (
                        <div className='text-xs text-blue-600 mt-1'>
                          {doc.project.name}
                        </div>
                      )}
                      <div className='flex items-center gap-3 mt-2 text-xs text-muted-foreground'>
                        <span>{formatFileSize(doc.file_size)}</span>
                        <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <form action={deleteDocumentAction}>
                      <input type='hidden' name='documentId' value={doc.id} />
                      <button
                        type='submit'
                        className='text-red-500 hover:text-red-700 p-1'
                        title='Delete document'
                      >
                        <i className='tabler-trash text-sm' />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {(documents || []).length === 0 && (
          <div className='text-center py-8 text-muted-foreground'>
            No documents uploaded yet. Add your first document above.
          </div>
        )}
      </div>
    </div>
  )
}