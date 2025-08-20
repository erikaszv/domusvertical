'use client'

export default function ProjectsCreateForm({ action }: { action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className='flex gap-2 items-end'>
      <div className='flex flex-col'>
        <label htmlFor='name' className='text-sm'>Name</label>
        <input id='name' name='name' className='border rounded px-2 py-1' placeholder='Project name' />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='description' className='text-sm'>Description</label>
        <input id='description' name='description' className='border rounded px-2 py-1' placeholder='Optional' />
      </div>
      <button type='submit' className='btn btn-primary'>Create</button>
    </form>
  )
}

