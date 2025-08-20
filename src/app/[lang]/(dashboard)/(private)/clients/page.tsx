import { revalidatePath } from 'next/cache'

import { getServerSupabase } from '@/libs/supabaseClient'
import { getDictionary } from '@/utils/getDictionary'

export default async function ClientsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  async function createClientAction(formData: FormData) {
    'use server'
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim() || null
    const phone = (formData.get('phone') as string)?.trim() || null

    if (!name) return

    const supabase = await getServerSupabase()

    await supabase.from('clients').insert({ name, email, phone })

    revalidatePath(`/${lang}/clients`)
  }

  const supabase = await getServerSupabase()

  const { data: clients, error } = await supabase
    .from('clients')
    .select('id, name, email, phone, created_at')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className='p-6 space-y-4'>
      <h1 className='text-2xl font-semibold'>Clients</h1>

      <form action={createClientAction} className='flex gap-2 items-end'>
        <div className='flex flex-col'>
          <label htmlFor='name' className='text-sm'>Name</label>
          <input id='name' name='name' className='border rounded px-2 py-1' placeholder='Client name' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='email' className='text-sm'>Email</label>
          <input id='email' name='email' className='border rounded px-2 py-1' placeholder='Optional' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='phone' className='text-sm'>Phone</label>
          <input id='phone' name='phone' className='border rounded px-2 py-1' placeholder='Optional' />
        </div>
        <button type='submit' className='btn btn-primary'>Create</button>
      </form>

      {error && (
        <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
          <div className='font-medium mb-1'>Supabase error</div>
          <div className='text-sm whitespace-pre-wrap'>{error.message}</div>
        </div>
      )}

      <ul className='space-y-2'>
        {(clients || []).map((c: any) => (
          <li key={c.id} className='rounded border border-default p-3'>
            <div className='font-medium'>{c.name}</div>
            <div className='text-sm text-muted-foreground'>{c.email || '—'} · {c.phone || '—'}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

