import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function seedData() {
  console.log('🌱 Seeding DomusVertical with sample data...\n')
  
  try {
    // 1. Create sample clients
    console.log('Creating clients...')
    const { data: clients, error: clientError } = await supabase
      .from('clients')
      .insert([
        { name: 'UAB Statybų Grupė', email: 'info@statyba.lt', phone: '+370 600 12345' },
        { name: 'Jonas Petraitis', email: 'jonas@gmail.com', phone: '+370 611 98765' },
        { name: 'Vilniaus Projektai', email: 'projektai@vilnius.lt', phone: '+370 5 234 5678' }
      ])
      .select()
    
    if (clientError) throw clientError
    console.log(`✅ Created ${clients.length} clients`)
    
    // 2. Create sample projects
    console.log('Creating projects...')
    const { data: projects, error: projectError } = await supabase
      .from('projects')
      .insert([
        {
          name: 'Šiuolaikinis Namas Vilniuje',
          description: 'Modernaus vienbučio namo statyba Pavilnyje',
          status: 'active',
          budget: 250000,
          client_id: clients[0].id,
          start_date: '2024-03-01',
          end_date: '2024-12-31'
        },
        {
          name: 'Biurų Pastatas Kaune',
          description: '5 aukštų biurų pastato projektas',
          status: 'planning',
          budget: 1500000,
          client_id: clients[2].id,
          start_date: '2024-06-01',
          end_date: '2025-06-01'
        },
        {
          name: 'Renovacija Senamiestyje',
          description: 'Istorinio pastato renovacija',
          status: 'active',
          budget: 180000,
          client_id: clients[1].id,
          start_date: '2024-01-15',
          end_date: '2024-08-30'
        }
      ])
      .select()
    
    if (projectError) throw projectError
    console.log(`✅ Created ${projects.length} projects`)
    
    // 3. Create project stages
    console.log('Creating project stages...')
    const stages = [
      { name: 'Pasiruošimas', description: 'Teritorijos paruošimas statyboms', order_index: 0, status: 'completed' },
      { name: 'Pamatai', description: 'Pamatų klojimas ir hidroizoliacija', order_index: 1, status: 'in_progress' },
      { name: 'Sienos', description: 'Sienų mūrijimas ir konstrukcijos', order_index: 2, status: 'pending' },
      { name: 'Stogas', description: 'Stogo konstrukcija ir danga', order_index: 3, status: 'pending' },
      { name: 'Apdaila', description: 'Vidaus ir išorės apdailos darbai', order_index: 4, status: 'pending' }
    ]
    
    for (const project of projects) {
      const { error: stageError } = await supabase
        .from('project_stages')
        .insert(
          stages.map(stage => ({
            ...stage,
            project_id: project.id
          }))
        )
      
      if (stageError) throw stageError
    }
    console.log(`✅ Created ${stages.length} stages for each project`)
    
    // 4. Create tasks
    console.log('Creating tasks...')
    const { error: taskError } = await supabase
      .from('tasks')
      .insert([
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
        },
        {
          project_id: projects[1].id,
          title: 'Architektūriniai brėžiniai',
          description: 'Paruošti detalius architektūrinius brėžinius',
          status: 'in_progress',
          priority: 'high'
        },
        {
          project_id: projects[1].id,
          title: 'Geologiniai tyrimai',
          description: 'Atlikti grunto tyrimus statybos vietoje',
          status: 'todo',
          priority: 'high',
          due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          project_id: projects[2].id,
          title: 'Paveldosaugos suderinimas',
          description: 'Gauti paveldosaugos leidimą renovacijai',
          status: 'review',
          priority: 'urgent'
        }
      ])
    
    if (taskError) throw taskError
    console.log('✅ Created 6 tasks')
    
    // 5. Create financial records
    console.log('Creating financial records...')
    const { error: finError } = await supabase
      .from('financial_records')
      .insert([
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
        },
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
          category: 'Leidiniai',
          amount: 2500,
          description: 'Paveldosaugos ir statybos leidimai',
          date: '2024-01-20'
        }
      ])
    
    if (finError) throw finError
    console.log('✅ Created 5 financial records')
    
    // 6. Create sample documents
    console.log('Creating documents...')
    const { error: docError } = await supabase
      .from('documents')
      .insert([
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
        },
        {
          project_id: projects[0].id,
          name: 'Statybos sutartis',
          description: 'Sutartis su UAB Statybų Grupė',
          file_url: '/documents/sutartis.pdf',
          category: 'contract'
        },
        {
          project_id: projects[2].id,
          name: 'Paveldosaugos išvada',
          description: 'Kultūros paveldo departamento išvada',
          file_url: '/documents/paveldosauga.pdf',
          category: 'permit'
        }
      ])
    
    if (docError) throw docError
    console.log('✅ Created 4 documents')
    
    console.log('\n🎉 Sample data seeded successfully!')
    console.log('\n📊 Summary:')
    console.log('   - 3 clients')
    console.log('   - 3 projects')
    console.log('   - 15 project stages')
    console.log('   - 6 tasks')
    console.log('   - 5 financial records')
    console.log('   - 4 documents')
    
    console.log('\n🚀 System is ready!')
    console.log('   Visit: http://localhost:3001/en/dashboards/domus')
    
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    throw error
  }
}

seedData().catch(console.error)