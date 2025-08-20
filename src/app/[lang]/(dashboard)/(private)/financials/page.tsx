import { revalidatePath } from 'next/cache'

import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

type FinancialRecord = {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string | null
  date: string
  project: {
    id: string
    name: string
  } | null
  created_at: string
}

type ProjectBudget = {
  id: string
  name: string
  budget: number | null
  spent: number
  income: number
  balance: number
}

export default async function FinancialsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  async function createRecordAction(formData: FormData) {
    'use server'
    const type = formData.get('type') as 'income' | 'expense'
    const category = (formData.get('category') as string)?.trim()
    const amount = parseFloat(formData.get('amount') as string)
    const description = (formData.get('description') as string)?.trim() || null
    const project_id = formData.get('project_id') as string || null
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0]

    if (!category || !amount || isNaN(amount)) return

    const supabase = await getServerSupabase()

    await supabase.from('financial_records').insert({ 
      type,
      category,
      amount,
      description,
      project_id,
      date
    })

    revalidatePath(`/${lang}/financials`)
  }

  const supabase = await getServerSupabase()

  const { data: records, error: recordsError } = await supabase
    .from('financial_records')
    .select(`
      id,
      type,
      category,
      amount,
      description,
      date,
      created_at,
      project:projects(id, name)
    `)
    .order('date', { ascending: false })
    .limit(100)

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name, budget')
    .order('name')

  // Calculate project budgets
  const projectBudgets: ProjectBudget[] = (projects || []).map((project: any) => {
    const projectRecords = (records || []).filter((r: any) => r.project?.id === project.id)
    const spent = projectRecords
      .filter((r: any) => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0)
    const income = projectRecords
      .filter((r: any) => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0)
    
    return {
      id: project.id,
      name: project.name,
      budget: project.budget,
      spent,
      income,
      balance: income - spent
    }
  })

  // Calculate totals
  const totalIncome = (records || [])
    .filter((r: any) => r.type === 'income')
    .reduce((sum, r) => sum + r.amount, 0)
  const totalExpenses = (records || [])
    .filter((r: any) => r.type === 'expense')
    .reduce((sum, r) => sum + r.amount, 0)
  const totalBalance = totalIncome - totalExpenses

  const expenseCategories = [
    'Materials',
    'Labor',
    'Equipment',
    'Permits',
    'Subcontractors',
    'Utilities',
    'Insurance',
    'Transportation',
    'Other'
  ]

  const incomeCategories = [
    'Client Payment',
    'Deposit',
    'Progress Payment',
    'Final Payment',
    'Change Order',
    'Other'
  ]

  return (
    <div className='p-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold'>Financial Tracking</h1>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Total Income</div>
          <div className='text-2xl font-bold text-green-600'>
            €{totalIncome.toLocaleString()}
          </div>
        </div>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Total Expenses</div>
          <div className='text-2xl font-bold text-red-600'>
            €{totalExpenses.toLocaleString()}
          </div>
        </div>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Net Balance</div>
          <div className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            €{totalBalance.toLocaleString()}
          </div>
        </div>
        <div className='p-4 border rounded'>
          <div className='text-sm text-muted-foreground'>Active Projects</div>
          <div className='text-2xl font-bold'>
            {projectBudgets.filter(p => p.budget).length}
          </div>
        </div>
      </div>

      {/* Add Record Form */}
      <form action={createRecordAction} className='p-4 border rounded space-y-3'>
        <h3 className='font-medium mb-2'>Add Financial Record</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
          <div>
            <label htmlFor='type' className='text-sm font-medium'>Type</label>
            <select
              id='type'
              name='type'
              className='w-full border rounded px-2 py-1 mt-1'
              defaultValue='expense'
            >
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
          </div>
          <div>
            <label htmlFor='category' className='text-sm font-medium'>Category</label>
            <input
              id='category'
              name='category'
              list='categories'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='Select or type category'
              required
            />
            <datalist id='categories'>
              {[...expenseCategories, ...incomeCategories].map(cat => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3'>
          <div>
            <label htmlFor='amount' className='text-sm font-medium'>Amount (€)</label>
            <input
              id='amount'
              name='amount'
              type='number'
              step='0.01'
              min='0'
              className='w-full border rounded px-2 py-1 mt-1'
              placeholder='0.00'
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
          <div>
            <label htmlFor='date' className='text-sm font-medium'>Date</label>
            <input
              id='date'
              name='date'
              type='date'
              className='w-full border rounded px-2 py-1 mt-1'
              defaultValue={new Date().toISOString().split('T')[0]}
            />
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
        
        <button type='submit' className='btn btn-primary'>Add Record</button>
      </form>

      {recordsError && (
        <div className='rounded border border-red-300 bg-red-50 p-3 text-red-800'>
          <div className='text-sm'>{recordsError.message}</div>
        </div>
      )}

      {/* Project Budgets */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Project Budgets</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {projectBudgets.filter(p => p.budget || p.spent > 0 || p.income > 0).map(project => (
            <div key={project.id} className='p-4 border rounded'>
              <div className='font-medium mb-2'>{project.name}</div>
              <div className='space-y-1 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Budget:</span>
                  <span className='font-medium'>
                    {project.budget ? `€${project.budget.toLocaleString()}` : '—'}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Income:</span>
                  <span className='text-green-600'>€{project.income.toLocaleString()}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Spent:</span>
                  <span className='text-red-600'>€{project.spent.toLocaleString()}</span>
                </div>
                <div className='flex justify-between pt-1 border-t'>
                  <span className='text-muted-foreground'>Balance:</span>
                  <span className={`font-bold ${project.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    €{project.balance.toLocaleString()}
                  </span>
                </div>
                {project.budget && (
                  <div className='pt-2'>
                    <div className='flex justify-between text-xs text-muted-foreground mb-1'>
                      <span>Budget Used</span>
                      <span>{Math.round((project.spent / project.budget) * 100)}%</span>
                    </div>
                    <div className='w-full bg-gray-200 rounded-full h-2'>
                      <div
                        className={`h-2 rounded-full ${
                          project.spent > project.budget ? 'bg-red-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(100, (project.spent / project.budget) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Recent Transactions</h3>
        <div className='overflow-x-auto'>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='border-b'>
                <th className='text-left p-2 text-sm font-medium'>Date</th>
                <th className='text-left p-2 text-sm font-medium'>Type</th>
                <th className='text-left p-2 text-sm font-medium'>Category</th>
                <th className='text-left p-2 text-sm font-medium'>Project</th>
                <th className='text-left p-2 text-sm font-medium'>Description</th>
                <th className='text-right p-2 text-sm font-medium'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {(records || []).slice(0, 20).map((record: any) => (
                <tr key={record.id} className='border-b hover:bg-muted/50'>
                  <td className='p-2 text-sm'>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td className='p-2'>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${
                      record.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {record.type}
                    </span>
                  </td>
                  <td className='p-2 text-sm'>{record.category}</td>
                  <td className='p-2 text-sm text-blue-600'>
                    {record.project?.name || '—'}
                  </td>
                  <td className='p-2 text-sm text-muted-foreground'>
                    {record.description || '—'}
                  </td>
                  <td className={`p-2 text-sm text-right font-medium ${
                    record.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {record.type === 'income' ? '+' : '-'}€{record.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {(records || []).length === 0 && (
          <div className='text-center py-8 text-muted-foreground'>
            No financial records yet. Add your first transaction above.
          </div>
        )}
      </div>
    </div>
  )
}