import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

// Parse Supabase connection string
const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

// Supabase direct database connection
// Format: postgresql://postgres.[project-ref]:[password]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
const PROJECT_REF = 'zzbsgvceauztzcfxksgv'
const DATABASE_PASSWORD = SERVICE_ROLE_KEY // We'll try using the service key as password

async function createTables() {
  console.log('🚀 DomusVertical PostgreSQL Table Creator')
  console.log('==========================================\n')
  
  // Try different connection methods
  const connectionStrings = [
    // Direct pooler connection (most likely to work)
    `postgresql://postgres.${PROJECT_REF}:${DATABASE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
    // Transaction pooler
    `postgresql://postgres.${PROJECT_REF}:${DATABASE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:5432/postgres`,
    // Direct connection
    `postgresql://postgres:${DATABASE_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`
  ]
  
  let client: Client | null = null
  let connectedUrl = ''
  
  // Try each connection string
  for (const connStr of connectionStrings) {
    try {
      console.log('Attempting connection...')
      client = new Client({ connectionString: connStr })
      await client.connect()
      connectedUrl = connStr.split('@')[1] // Hide password in logs
      console.log(`✅ Connected to database via: ${connectedUrl}\n`)
      break
    } catch (err: any) {
      console.log(`❌ Connection failed: ${err.message}`)
    }
  }
  
  if (!client) {
    console.log('\n⚠️  Could not establish direct database connection')
    console.log('This is because Supabase requires the database password, not the service role key')
    console.log('\n📝 Alternative: Use Supabase CLI or Dashboard')
    console.log('1. Install Supabase CLI: npm install -g supabase')
    console.log('2. Run: supabase link --project-ref', PROJECT_REF)
    console.log('3. Run: supabase db push < SUPABASE_SQL_SETUP.sql')
    return
  }
  
  try {
    // Read SQL file
    const sqlPath = path.join(process.cwd(), 'SUPABASE_SQL_SETUP.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
    
    // Split into individual statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))
    
    console.log(`📄 Executing ${statements.length} SQL statements...\n`)
    
    let successCount = 0
    let skipCount = 0
    
    for (const statement of statements) {
      // Extract what we're doing for logging
      let action = 'Executing'
      if (statement.toLowerCase().includes('create table')) {
        const match = statement.match(/create table (?:if not exists )?(\w+)/i)
        if (match) action = `Creating table: ${match[1]}`
      } else if (statement.toLowerCase().includes('create index')) {
        const match = statement.match(/create index (?:if not exists )?(\w+)/i)
        if (match) action = `Creating index: ${match[1]}`
      } else if (statement.toLowerCase().includes('create policy')) {
        const match = statement.match(/create policy "([^"]+)"/i)
        if (match) action = `Creating policy: ${match[1]}`
      } else if (statement.toLowerCase().includes('alter table')) {
        const match = statement.match(/alter table (\w+)/i)
        if (match) action = `Altering table: ${match[1]}`
      } else if (statement.toLowerCase().includes('insert into')) {
        const match = statement.match(/insert into (\w+)/i)
        if (match) action = `Inserting data into: ${match[1]}`
      }
      
      try {
        await client.query(statement)
        console.log(`✅ ${action}`)
        successCount++
      } catch (err: any) {
        if (err.message.includes('already exists')) {
          console.log(`⏭️  ${action} (already exists)`)
          skipCount++
        } else {
          console.log(`❌ ${action}`)
          console.log(`   Error: ${err.message}`)
        }
      }
    }
    
    console.log('\n==========================================')
    console.log(`✅ Successfully executed: ${successCount} statements`)
    console.log(`⏭️  Skipped (already exist): ${skipCount} statements`)
    
    // Verify tables were created
    console.log('\n📊 Verifying tables...')
    const { rows } = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('projects', 'clients', 'project_stages', 'tasks', 'documents', 'financial_records')
      ORDER BY table_name
    `)
    
    console.log(`\n✅ Tables found in database:`)
    rows.forEach(row => console.log(`   - ${row.table_name}`))
    
    if (rows.length === 6) {
      console.log('\n🎉 All tables created successfully!')
      console.log('📌 Next step: Run npm run seed to populate with sample data')
    }
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed')
  }
}

createTables().catch(console.error)