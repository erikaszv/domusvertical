import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjUxNDUsImV4cCI6MjA3MTMwMTE0NX0.GdxWtAuIxeY9spUgD67f_jtnDZT44BmgU_ldi-3GMR8'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkTables() {
  console.log('🔍 Checking existing tables...')
  
  try {
    // Try to query each table to see if it exists
    const tables = ['projects', 'clients', 'project_stages', 'tasks', 'documents', 'financial_records']
    
    for (const table of tables) {
      const { data, error } = await supabase.from(table).select('id').limit(1)
      
      if (error) {
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          console.log(`❌ Table '${table}' does not exist`)
        } else {
          console.log(`⚠️ Table '${table}' error: ${error.message}`)
        }
      } else {
        console.log(`✅ Table '${table}' exists`)
      }
    }
    
    console.log('\n📋 To create missing tables, please run the SQL in SUPABASE_SQL_SETUP.sql')
    console.log('   Go to: https://zzbsgvceauztzcfxksgv.supabase.co/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
    
  } catch (error) {
    console.error('Error checking tables:', error)
  }
}

async function insertSampleData() {
  console.log('\n📦 Attempting to insert sample data...')
  
  try {
    // Check if client exists
    const { data: existingClient } = await supabase
      .from('clients')
      .select('id')
      .eq('name', 'Sample Client')
      .single()
    
    let clientId = existingClient?.id
    
    if (!clientId) {
      // Insert sample client
      const { data: newClient, error: clientError } = await supabase
        .from('clients')
        .insert({
          name: 'Sample Client',
          email: 'client@example.com',
          phone: '+370 600 12345'
        })
        .select()
        .single()
      
      if (clientError) {
        console.error('Error creating client:', clientError)
        return
      }
      
      clientId = newClient.id
      console.log('✅ Created sample client')
    }
    
    // Check if project exists
    const { data: existingProject } = await supabase
      .from('projects')
      .select('id')
      .eq('name', 'Sample Villa Project')
      .single()
    
    let projectId = existingProject?.id
    
    if (!projectId) {
      // Insert sample project
      const { data: newProject, error: projectError } = await supabase
        .from('projects')
        .insert({
          name: 'Sample Villa Project',
          description: 'Modern villa construction in Vilnius',
          status: 'active',
          budget: 250000,
          client_id: clientId
        })
        .select()
        .single()
      
      if (projectError) {
        console.error('Error creating project:', projectError)
        return
      }
      
      projectId = newProject.id
      console.log('✅ Created sample project')
      
      // Insert stages
      const stages = [
        { name: 'Site Preparation', description: 'Clear and prepare the construction site', order_index: 0, status: 'completed' },
        { name: 'Foundation', description: 'Pour concrete foundation and install utilities', order_index: 1, status: 'in_progress' },
        { name: 'Framing', description: 'Build the structural frame of the building', order_index: 2, status: 'pending' },
        { name: 'Roofing', description: 'Install roof structure and covering', order_index: 3, status: 'pending' }
      ]
      
      for (const stage of stages) {
        await supabase.from('project_stages').insert({
          project_id: projectId,
          ...stage
        })
      }
      console.log('✅ Created project stages')
      
      // Insert tasks
      await supabase.from('tasks').insert([
        {
          project_id: projectId,
          title: 'Review architectural plans',
          description: 'Final review of plans before construction',
          status: 'done',
          priority: 'high'
        },
        {
          project_id: projectId,
          title: 'Order construction materials',
          description: 'Order steel, concrete, and lumber',
          status: 'in_progress',
          priority: 'urgent',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ])
      console.log('✅ Created sample tasks')
      
      // Insert financial records
      await supabase.from('financial_records').insert([
        {
          project_id: projectId,
          type: 'expense',
          category: 'Materials',
          amount: 15000,
          description: 'Initial material purchase'
        },
        {
          project_id: projectId,
          type: 'income',
          category: 'Client Payment',
          amount: 50000,
          description: 'Initial deposit from client'
        }
      ])
      console.log('✅ Created financial records')
    }
    
    console.log('\n🎉 Sample data setup complete!')
    
  } catch (error) {
    console.error('Error inserting sample data:', error)
  }
}

async function main() {
  console.log('🚀 DomusVertical Database Setup')
  console.log('================================\n')
  
  await checkTables()
  
  // Try to insert sample data
  const { data, error } = await supabase.from('projects').select('id').limit(1)
  if (!error) {
    await insertSampleData()
  }
}

main().catch(console.error)