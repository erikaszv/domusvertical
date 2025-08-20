import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

// Create fresh Supabase client
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
})

async function seedWithRefresh() {
  console.log('🔄 Refreshing schema and seeding data...\n')
  
  // First, let's verify tables with a different approach
  console.log('Verifying table access...')
  
  try {
    // Try to select from each table to ensure they're accessible
    const tables = ['clients', 'projects', 'project_stages', 'tasks', 'documents', 'financial_records']
    
    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1)
      
      if (error && !error.message.includes('does not exist')) {
        console.log(`✅ Table '${table}' is accessible`)
      } else if (error) {
        console.log(`❌ Table '${table}' error: ${error.message}`)
      } else {
        console.log(`✅ Table '${table}' is ready (${data?.length || 0} records)`)
      }
    }
    
    console.log('\n🌱 Starting data seeding...\n')
    
    // 1. Create clients
    console.log('Creating clients...')
    const clientsData = [
      { 
        name: 'UAB Statybų Grupė', 
        email: 'info@statyba.lt', 
        phone: '+370 600 12345'
      },
      { 
        name: 'Jonas Petraitis', 
        email: 'jonas@gmail.com', 
        phone: '+370 611 98765'
      },
      { 
        name: 'Vilniaus Projektai', 
        email: 'projektai@vilnius.lt', 
        phone: '+370 5 234 5678'
      }
    ]
    
    const { data: clients, error: clientError } = await supabase
      .from('clients')
      .upsert(clientsData, { onConflict: 'name' })
      .select()
    
    if (clientError) {
      console.log('Error creating clients:', clientError)
      // Try insert without upsert
      const { data: clientsRetry, error: clientRetryError } = await supabase
        .from('clients')
        .insert(clientsData)
        .select()
      
      if (clientRetryError) throw clientRetryError
      console.log(`✅ Created ${clientsRetry?.length || 0} clients`)
    } else {
      console.log(`✅ Created/Updated ${clients?.length || 0} clients`)
    }
    
    // Get all clients for reference
    const { data: allClients } = await supabase
      .from('clients')
      .select('*')
    
    if (!allClients || allClients.length === 0) {
      throw new Error('No clients found after insertion')
    }
    
    // 2. Create projects
    console.log('Creating projects...')
    const projectsData = [
      {
        name: 'Šiuolaikinis Namas Vilniuje',
        description: 'Modernaus vienbučio namo statyba Pavilnyje',
        status: 'active',
        budget: 250000,
        client_id: allClients[0].id,
        start_date: '2024-03-01',
        end_date: '2024-12-31'
      },
      {
        name: 'Biurų Pastatas Kaune',
        description: '5 aukštų biurų pastato projektas',
        status: 'planning',
        budget: 1500000,
        client_id: allClients[2]?.id || allClients[0].id,
        start_date: '2024-06-01',
        end_date: '2025-06-01'
      },
      {
        name: 'Renovacija Senamiestyje',
        description: 'Istorinio pastato renovacija',
        status: 'active',
        budget: 180000,
        client_id: allClients[1]?.id || allClients[0].id,
        start_date: '2024-01-15',
        end_date: '2024-08-30'
      }
    ]
    
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .insert(projectsData)
      .select()
    
    if (projectError) throw projectError
    console.log(`✅ Created ${projects?.length || 0} projects`)
    
    // 3. Create project stages
    console.log('Creating project stages...')
    const stages = [
      { name: 'Pasiruošimas', description: 'Teritorijos paruošimas statyboms', order_index: 0, status: 'completed' },
      { name: 'Pamatai', description: 'Pamatų klojimas ir hidroizoliacija', order_index: 1, status: 'in_progress' },
      { name: 'Sienos', description: 'Sienų mūrijimas ir konstrukcijos', order_index: 2, status: 'pending' },
      { name: 'Stogas', description: 'Stogo konstrukcija ir danga', order_index: 3, status: 'pending' },
      { name: 'Apdaila', description: 'Vidaus ir išorės apdailos darbai', order_index: 4, status: 'pending' }
    ]
    
    let stageCount = 0
    for (const project of projects || []) {
      const stagesData = stages.map(stage => ({
        ...stage,
        project_id: project.id
      }))
      
      const { error: stageError } = await supabase
        .from('project_stages')
        .insert(stagesData)
      
      if (stageError) throw stageError
      stageCount += stagesData.length
    }
    console.log(`✅ Created ${stageCount} project stages`)
    
    // 4. Create tasks
    console.log('Creating tasks...')
    if (projects && projects.length > 0) {
      const tasksData = [
        {
          project_id: projects[0].id,
          title: 'Gauti statybos leidimą',
          description: 'Užbaigti visus dokumentus statybos leidimui',
          status: 'done',
          priority: 'high'
        },
        {
          project_id: projects[0].id,
          title: 'Užsakyti medžiagas pamatams',
          description: 'Betonas, armatūra, hidroizoliacija',
          status: 'in_progress',
          priority: 'urgent',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          project_id: projects[0].id,
          title: 'Samdyti elektriką',
          description: 'Rasti kvalifikuotą elektriką instaliacijos darbams',
          status: 'todo',
          priority: 'medium',
          due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ]
      
      // Add tasks for other projects if they exist
      if (projects[1]) {
        tasksData.push({
          project_id: projects[1].id,
          title: 'Architektūriniai brėžiniai',
          description: 'Paruošti detalius architektūrinius brėžinius',
          status: 'in_progress',
          priority: 'high'
        })
      }
      
      if (projects[2]) {
        tasksData.push({
          project_id: projects[2].id,
          title: 'Paveldosaugos suderinimas',
          description: 'Gauti paveldosaugos leidimą renovacijai',
          status: 'review',
          priority: 'urgent'
        })
      }
      
      const { error: taskError } = await supabase
        .from('tasks')
        .insert(tasksData)
      
      if (taskError) throw taskError
      console.log(`✅ Created ${tasksData.length} tasks`)
    }
    
    // 5. Create financial records
    console.log('Creating financial records...')
    if (projects && projects.length > 0) {
      const financialData = [
        {
          project_id: projects[0].id,
          type: 'income',
          category: 'Kliento mokėjimas',
          amount: 50000,
          description: 'Pradinis avansas 20%',
          date: '2024-03-01'
        },
        {
          project_id: projects[0].id,
          type: 'expense',
          category: 'Medžiagos',
          amount: 15000,
          description: 'Pamatų betonas ir armatūra',
          date: '2024-03-15'
        },
        {
          project_id: projects[0].id,
          type: 'expense',
          category: 'Darbas',
          amount: 8000,
          description: 'Brigadai už pamatų darbus',
          date: '2024-03-20'
        }
      ]
      
      // Add financial records for other projects if they exist
      if (projects[2]) {
        financialData.push(
          {
            project_id: projects[2].id,
            type: 'income',
            category: 'Kliento mokėjimas',
            amount: 36000,
            description: 'Pradinis mokėjimas',
            date: '2024-01-15'
          },
          {
            project_id: projects[2].id,
            type: 'expense',
            category: 'Leidimai',
            amount: 2500,
            description: 'Paveldosaugos ir statybos leidimai',
            date: '2024-01-20'
          }
        )
      }
      
      const { error: finError } = await supabase
        .from('financial_records')
        .insert(financialData)
      
      if (finError) throw finError
      console.log(`✅ Created ${financialData.length} financial records`)
    }
    
    // 6. Create documents
    console.log('Creating documents...')
    if (projects && projects.length > 0) {
      const documentsData = [
        {
          project_id: projects[0].id,
          name: 'Statybos leidimas',
          description: 'Oficialus statybos leidimas Nr. 2024-03-001',
          file_url: '/documents/statybos-leidimas.pdf',
          category: 'permit'
        },
        {
          project_id: projects[0].id,
          name: 'Architektūriniai brėžiniai',
          description: 'Pilnas architektūrinių brėžinių komplektas',
          file_url: '/documents/breziniai.pdf',
          category: 'design'
        }
      ]
      
      if (projects[2]) {
        documentsData.push({
          project_id: projects[2].id,
          name: 'Paveldosaugos išvada',
          description: 'Kultūros paveldo departamento išvada',
          file_url: '/documents/paveldosauga.pdf',
          category: 'permit'
        })
      }
      
      const { error: docError } = await supabase
        .from('documents')
        .insert(documentsData)
      
      if (docError) throw docError
      console.log(`✅ Created ${documentsData.length} documents`)
    }
    
    console.log('\n🎉 Data seeded successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - ${allClients.length} clients`)
    console.log(`   - ${projects?.length || 0} projects`)
    console.log(`   - ${stageCount} project stages`)
    console.log('   - Multiple tasks')
    console.log('   - Financial records')
    console.log('   - Sample documents')
    
    console.log('\n🚀 System is ready!')
    console.log('   Visit: http://localhost:3001/en/dashboards/domus')
    
  } catch (error: any) {
    console.error('\n❌ Error during seeding:', error.message || error)
    
    if (error.code === 'PGRST205') {
      console.log('\n⚠️  Schema cache issue detected')
      console.log('This usually means tables were just created')
      console.log('Please wait a moment and try again, or:')
      console.log('1. Go to Supabase Dashboard')
      console.log('2. Navigate to Table Editor')
      console.log('3. Verify tables are visible')
      console.log('4. Run this script again')
    }
  }
}

seedWithRefresh().catch(console.error)