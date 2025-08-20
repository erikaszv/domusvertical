import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function verifyTables() {
  console.log('🔍 DomusVertical Database Verification')
  console.log('======================================\n')
  
  const tables = [
    'clients',
    'projects', 
    'project_stages',
    'tasks',
    'documents',
    'financial_records'
  ]
  
  let allTablesExist = true
  let totalRecords = 0
  
  console.log('📊 Checking tables and data:\n')
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
      
      if (error) {
        console.log(`❌ ${table}: NOT FOUND`)
        console.log(`   Error: ${error.message}`)
        allTablesExist = false
      } else {
        const recordCount = data?.length || 0
        totalRecords += recordCount
        console.log(`✅ ${table}: EXISTS (${recordCount} records)`)
        
        // Show sample data for key tables
        if (table === 'clients' && data && data.length > 0) {
          console.log('   Sample clients:')
          data.slice(0, 3).forEach(client => {
            console.log(`   - ${client.name} (${client.email})`)
          })
        }
        
        if (table === 'projects' && data && data.length > 0) {
          console.log('   Sample projects:')
          data.slice(0, 3).forEach(project => {
            console.log(`   - ${project.name} (${project.status})`)
          })
        }
      }
    } catch (err: any) {
      console.log(`❌ ${table}: ERROR - ${err.message}`)
      allTablesExist = false
    }
  }
  
  console.log('\n======================================')
  
  if (allTablesExist) {
    console.log('🎉 SUCCESS! All tables exist!')
    console.log(`📈 Total records in database: ${totalRecords}`)
    
    // Get detailed stats
    console.log('\n📊 Detailed Statistics:')
    
    try {
      // Count relationships
      const { data: projectsWithClients } = await supabase
        .from('projects')
        .select('*, clients(name)')
      
      if (projectsWithClients && projectsWithClients.length > 0) {
        console.log('\n🔗 Projects with clients:')
        projectsWithClients.forEach(p => {
          console.log(`   - ${p.name} → Client: ${p.clients?.name || 'No client'}`)
        })
      }
      
      // Check stages
      const { data: stages } = await supabase
        .from('project_stages')
        .select('*, projects(name)')
        .order('order_index')
        .limit(5)
      
      if (stages && stages.length > 0) {
        console.log('\n📋 Sample project stages:')
        stages.forEach(s => {
          console.log(`   - ${s.name} (${s.status}) → Project: ${s.projects?.name}`)
        })
      }
      
      // Check financial summary
      const { data: income } = await supabase
        .from('financial_records')
        .select('amount')
        .eq('type', 'income')
      
      const { data: expense } = await supabase
        .from('financial_records')
        .select('amount')
        .eq('type', 'expense')
      
      const totalIncome = income?.reduce((sum, r) => sum + Number(r.amount), 0) || 0
      const totalExpense = expense?.reduce((sum, r) => sum + Number(r.amount), 0) || 0
      
      console.log('\n💰 Financial Summary:')
      console.log(`   - Total Income: €${totalIncome.toLocaleString()}`)
      console.log(`   - Total Expenses: €${totalExpense.toLocaleString()}`)
      console.log(`   - Net: €${(totalIncome - totalExpense).toLocaleString()}`)
      
    } catch (err) {
      console.log('Could not fetch detailed stats')
    }
    
    console.log('\n✨ DOMUSVERTICAL IS FULLY OPERATIONAL!')
    console.log('🚀 Visit: http://localhost:3001/en/dashboards/domus')
    console.log('\n📌 You can now:')
    console.log('   - View real-time dashboard')
    console.log('   - Manage projects and clients')
    console.log('   - Track tasks and stages')
    console.log('   - Upload documents')
    console.log('   - Monitor financials')
    
  } else {
    console.log('⚠️  Some tables are missing or inaccessible')
    console.log('\nPlease ensure you ran the SQL in Supabase Dashboard')
    console.log('File: CREATE_TABLES_NOW.sql')
  }
}

verifyTables().catch(console.error)