import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

// Create Supabase client with service role (has full access)
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function runSQL(sql: string): Promise<any> {
  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))
  
  const results = []
  
  for (const statement of statements) {
    if (statement.toLowerCase().startsWith('create table')) {
      // Extract table name
      const match = statement.match(/create table (?:if not exists )?([\w_]+)/i)
      if (match) {
        console.log(`  Creating table: ${match[1]}`)
      }
    }
    
    try {
      // Use Supabase's rpc to execute raw SQL
      const { data, error } = await supabase.rpc('exec_sql', { query: statement + ';' }).single()
      
      if (error) {
        // If RPC doesn't exist, we'll handle it differently
        if (error.message.includes('Could not find the function')) {
          console.log('  Note: Direct SQL execution not available via RPC')
          return null
        }
        throw error
      }
      
      results.push(data)
    } catch (err: any) {
      // Ignore certain expected errors
      if (err.message?.includes('already exists')) {
        console.log('  Already exists, skipping...')
      } else if (err.message?.includes('Could not find the function')) {
        // RPC not available, skip
        return null
      } else {
        console.error(`  Error: ${err.message}`)
      }
    }
  }
  
  return results
}

async function createTablesDirectly() {
  console.log('\n📦 Creating tables using Supabase Admin API...\n')
  
  // Since we can't execute raw SQL via RPC, we'll create tables using the Supabase REST API
  // by checking if tables exist and inserting test data
  
  const tables = [
    { name: 'clients', testInsert: { name: 'Test Client', email: 'test@test.com' } },
    { name: 'projects', testInsert: { name: 'Test Project', status: 'planning' } },
    { name: 'project_stages', testInsert: null }, // Needs project_id
    { name: 'tasks', testInsert: null }, // Needs project_id
    { name: 'documents', testInsert: null }, // Needs project_id
    { name: 'financial_records', testInsert: null } // Needs project_id
  ]
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
        .from(table.name)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        console.log(`❌ Table '${table.name}' does not exist`)
      } else {
        console.log(`✅ Table '${table.name}' exists (${count || 0} records)`)
      }
    } catch (err) {
      console.log(`❌ Table '${table.name}' error:`, err)
    }
  }
  
  console.log('\n⚠️  Tables must be created via Supabase Dashboard SQL Editor')
  console.log('📋 Please copy the content from SUPABASE_SQL_SETUP.sql')
  console.log('🔗 Go to: https://zzbsgvceauztzcfxksgv.supabase.co/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
}

async function main() {
  console.log('🚀 DomusVertical Database Migration Runner')
  console.log('==========================================\n')
  
  // Try to read and execute SQL file
  const sqlPath = path.join(process.cwd(), 'SUPABASE_SQL_SETUP.sql')
  
  if (fs.existsSync(sqlPath)) {
    const sql = fs.readFileSync(sqlPath, 'utf-8')
    console.log('📄 Found SUPABASE_SQL_SETUP.sql')
    console.log(`   Size: ${(sql.length / 1024).toFixed(2)} KB\n`)
    
    const result = await runSQL(sql)
    
    if (result === null) {
      // Fallback to checking tables
      await createTablesDirectly()
    } else {
      console.log('\n✅ Migration completed successfully!')
    }
  } else {
    // Try migrations directory
    const migrationsDir = path.join(process.cwd(), 'db', 'migrations')
    
    if (fs.existsSync(migrationsDir)) {
      const files = fs.readdirSync(migrationsDir)
        .filter(f => f.endsWith('.sql'))
        .sort()
      
      console.log(`📁 Found ${files.length} migration files\n`)
      
      for (const file of files) {
        console.log(`📝 Running migration: ${file}`)
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8')
        const result = await runSQL(sql)
        
        if (result === null) {
          console.log('  Skipping (RPC not available)...')
          break
        }
      }
      
      // Fallback check
      await createTablesDirectly()
    }
  }
  
  console.log('\n📌 Next steps:')
  console.log('1. If tables are missing, copy SUPABASE_SQL_SETUP.sql to SQL Editor')
  console.log('2. Run the SQL in Supabase Dashboard')
  console.log('3. Visit http://localhost:3001/en/dashboards/domus')
}

main().catch(console.error)