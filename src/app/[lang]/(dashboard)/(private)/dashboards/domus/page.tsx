import { getDictionary } from '@/utils/getDictionary'
import { getServerSupabase } from '@/libs/supabaseClient'

export default async function DomusDashboard({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  await getDictionary(lang as any)

  const supabase = await getServerSupabase()

  // Fetch all metrics
  const [
    { data: projects },
    { data: clients },
    { data: tasks },
    { data: documents },
    { data: financialRecords },
    { data: stages }
  ] = await Promise.all([
    supabase.from('projects').select('id, name, status, budget'),
    supabase.from('clients').select('id, name'),
    supabase.from('tasks').select('id, status, priority'),
    supabase.from('documents').select('id, category'),
    supabase.from('financial_records').select('id, type, amount'),
    supabase.from('project_stages').select('id, status')
  ])

  // Calculate metrics
  const activeProjects = (projects || []).filter((p: any) => p.status === 'active').length
  const totalProjects = (projects || []).length
  const totalClients = (clients || []).length
  const totalBudget = (projects || []).reduce((sum: number, p: any) => sum + (p.budget || 0), 0)

  const tasksByStatus = {
    todo: (tasks || []).filter((t: any) => t.status === 'todo').length,
    in_progress: (tasks || []).filter((t: any) => t.status === 'in_progress').length,
    review: (tasks || []).filter((t: any) => t.status === 'review').length,
    done: (tasks || []).filter((t: any) => t.status === 'done').length,
    blocked: (tasks || []).filter((t: any) => t.status === 'blocked').length
  }

  const urgentTasks = (tasks || []).filter((t: any) => t.priority === 'urgent').length
  const highPriorityTasks = (tasks || []).filter((t: any) => t.priority === 'high').length

  const totalIncome = (financialRecords || [])
    .filter((r: any) => r.type === 'income')
    .reduce((sum: number, r: any) => sum + r.amount, 0)
  const totalExpenses = (financialRecords || [])
    .filter((r: any) => r.type === 'expense')
    .reduce((sum: number, r: any) => sum + r.amount, 0)
  const netBalance = totalIncome - totalExpenses

  const stagesByStatus = {
    pending: (stages || []).filter((s: any) => s.status === 'pending').length,
    in_progress: (stages || []).filter((s: any) => s.status === 'in_progress').length,
    completed: (stages || []).filter((s: any) => s.status === 'completed').length
  }

  const documentsByCategory = (documents || []).reduce((acc: any, doc: any) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1

    return acc
  }, {})

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>DomusVertical Dashboard</h1>
        <p className='text-muted-foreground mt-1'>Real-time overview of your property development projects</p>
      </div>

      {/* Main Metrics */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <div className='p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-blue-700'>Active Projects</p>
              <p className='text-3xl font-bold text-blue-900'>{activeProjects}</p>
              <p className='text-sm text-blue-600 mt-1'>of {totalProjects} total</p>
            </div>
            <i className='tabler-building text-3xl text-blue-500' />
          </div>
        </div>

        <div className='p-6 border rounded-lg bg-gradient-to-br from-green-50 to-green-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-green-700'>Net Balance</p>
              <p className='text-3xl font-bold text-green-900'>€{netBalance.toLocaleString()}</p>
              <p className='text-sm text-green-600 mt-1'>
                {((netBalance / (totalIncome || 1)) * 100).toFixed(0)}% margin
              </p>
            </div>
            <i className='tabler-currency-euro text-3xl text-green-500' />
          </div>
        </div>

        <div className='p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-purple-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-purple-700'>Total Clients</p>
              <p className='text-3xl font-bold text-purple-900'>{totalClients}</p>
              <p className='text-sm text-purple-600 mt-1'>Active relationships</p>
            </div>
            <i className='tabler-users text-3xl text-purple-500' />
          </div>
        </div>

        <div className='p-6 border rounded-lg bg-gradient-to-br from-orange-50 to-orange-100'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm font-medium text-orange-700'>Total Budget</p>
              <p className='text-3xl font-bold text-orange-900'>€{(totalBudget / 1000000).toFixed(1)}M</p>
              <p className='text-sm text-orange-600 mt-1'>Across all projects</p>
            </div>
            <i className='tabler-chart-pie text-3xl text-orange-500' />
          </div>
        </div>
      </div>

      {/* Tasks Overview */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='p-6 border rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Task Status</h2>
          <div className='space-y-3'>
            {Object.entries(tasksByStatus).map(([status, count]) => (
              <div key={status} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='capitalize text-sm font-medium'>{status.replace('_', ' ')}</span>
                  <span className='text-sm text-muted-foreground'>({count})</span>
                </div>
                <div className='flex items-center gap-2 flex-1 max-w-xs ml-4'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full ${
                        status === 'done' ? 'bg-green-500' :
                        status === 'in_progress' ? 'bg-yellow-500' :
                        status === 'review' ? 'bg-blue-500' :
                        status === 'blocked' ? 'bg-red-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${(count / ((tasks || []).length || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {(urgentTasks > 0 || highPriorityTasks > 0) && (
            <div className='mt-4 p-3 bg-red-50 rounded-lg'>
              <p className='text-sm font-medium text-red-800'>
                {urgentTasks > 0 && `${urgentTasks} urgent`}
                {urgentTasks > 0 && highPriorityTasks > 0 && ' and '}
                {highPriorityTasks > 0 && `${highPriorityTasks} high priority`}
                {' '}task{urgentTasks + highPriorityTasks > 1 ? 's' : ''} need attention
              </p>
            </div>
          )}
        </div>

        <div className='p-6 border rounded-lg'>
          <h2 className='text-lg font-semibold mb-4'>Project Stages</h2>
          <div className='space-y-3'>
            {Object.entries(stagesByStatus).map(([status, count]) => (
              <div key={status} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span className='capitalize text-sm font-medium'>{status.replace('_', ' ')}</span>
                  <span className='text-sm text-muted-foreground'>({count})</span>
                </div>
                <div className='flex items-center gap-2 flex-1 max-w-xs ml-4'>
                  <div className='flex-1 bg-gray-200 rounded-full h-2'>
                    <div
                      className={`h-2 rounded-full ${
                        status === 'completed' ? 'bg-green-500' :
                        status === 'in_progress' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${(count / ((stages || []).length || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
            <p className='text-sm font-medium text-blue-800'>
              {Math.round((stagesByStatus.completed / ((stages || []).length || 1)) * 100)}% overall completion
            </p>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='p-6 border rounded-lg'>
          <h3 className='text-lg font-semibold mb-4'>Revenue</h3>
          <p className='text-3xl font-bold text-green-600'>€{totalIncome.toLocaleString()}</p>
          <p className='text-sm text-muted-foreground mt-1'>Total income received</p>
        </div>

        <div className='p-6 border rounded-lg'>
          <h3 className='text-lg font-semibold mb-4'>Expenses</h3>
          <p className='text-3xl font-bold text-red-600'>€{totalExpenses.toLocaleString()}</p>
          <p className='text-sm text-muted-foreground mt-1'>Total costs incurred</p>
        </div>

        <div className='p-6 border rounded-lg'>
          <h3 className='text-lg font-semibold mb-4'>Profit Margin</h3>
          <p className='text-3xl font-bold'>
            {totalIncome > 0 ? ((netBalance / totalIncome) * 100).toFixed(1) : '0'}%
          </p>
          <p className='text-sm text-muted-foreground mt-1'>Net profit ratio</p>
        </div>
      </div>

      {/* Documents Overview */}
      <div className='p-6 border rounded-lg'>
        <h2 className='text-lg font-semibold mb-4'>Document Repository</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3'>
          {Object.entries(documentsByCategory).map(([category, count]) => (
            <div key={category} className='text-center p-3 bg-gray-50 rounded'>
              <p className='text-2xl font-bold'>{count as number}</p>
              <p className='text-xs text-muted-foreground capitalize'>{category}</p>
            </div>
          ))}
          {Object.keys(documentsByCategory).length === 0 && (
            <p className='text-sm text-muted-foreground col-span-full'>No documents uploaded yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className='p-6 border rounded-lg bg-gradient-to-r from-gray-50 to-gray-100'>
        <h2 className='text-lg font-semibold mb-4'>Quick Actions</h2>
        <div className='flex flex-wrap gap-3'>
          <a href={`/${lang}/projects`} className='btn btn-primary'>
            <i className='tabler-plus mr-2' />
            New Project
          </a>
          <a href={`/${lang}/tasks`} className='btn btn-outline-primary'>
            <i className='tabler-checklist mr-2' />
            Manage Tasks
          </a>
          <a href={`/${lang}/financials`} className='btn btn-outline-primary'>
            <i className='tabler-currency-euro mr-2' />
            Add Transaction
          </a>
          <a href={`/${lang}/documents`} className='btn btn-outline-primary'>
            <i className='tabler-file-upload mr-2' />
            Upload Document
          </a>
          <a href={`/${lang}/clients`} className='btn btn-outline-primary'>
            <i className='tabler-user-plus mr-2' />
            Add Client
          </a>
        </div>
      </div>
    </div>
  )
}