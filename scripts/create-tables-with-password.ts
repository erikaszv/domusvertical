import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

// Supabase PostgreSQL connection with real password
const PROJECT_REF = 'zzbsgvceauztzcfxksgv'
const DATABASE_PASSWORD = '15MinDomus15'

// Supabase PostgreSQL connection strings
const connectionStrings = [
  // Pooler connection (transaction mode)
  `postgresql://postgres.${PROJECT_REF}:${DATABASE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`,
  // Pooler connection (session mode)
  `postgresql://postgres.${PROJECT_REF}:${DATABASE_PASSWORD}@aws-0-us-west-1.pooler.supabase.com:5432/postgres`,
  // Direct connection
  `postgresql://postgres:${DATABASE_PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`
]

async function createTablesWithPassword() {
  console.log('🚀 DomusVertical PostgreSQL Setup with Database Password')
  console.log('========================================================\n')
  
  let client: Client | null = null
  
  // Try each connection string
  for (const connStr of connectionStrings) {
    try {
      console.log('Attempting connection...')
      client = new Client({ connectionString: connStr })
      await client.connect()
      console.log('✅ Connected to PostgreSQL database!\n')
      break
    } catch (err: any) {
      console.log(`❌ Connection failed: ${err.message}`)
    }
  }
  
  if (!client) {
    console.error('❌ Could not connect to database with any connection string')
    return
  }
  
  try {
    // Read the complete SQL file
    const sqlPath = path.join(process.cwd(), 'CREATE_TABLES_NOW.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
    
    // Split into individual statements
    const statements = sqlContent
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--') && !s.toLowerCase().startsWith('select'))
    
    console.log(`📄 Executing ${statements.length} SQL statements...\n`)
    
    let successCount = 0
    let skipCount = 0
    let errorCount = 0
    
    for (const statement of statements) {
      // Extract what we're doing for logging
      let action = 'Executing'
      if (statement.toLowerCase().includes('create extension')) {
        action = 'Enabling UUID extension'
      } else if (statement.toLowerCase().includes('create table')) {
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
          errorCount++
        }
      }
    }
    
    console.log('\n========================================================')
    console.log(`✅ Successfully executed: ${successCount} statements`)
    console.log(`⏭️  Skipped (already exist): ${skipCount} statements`)
    if (errorCount > 0) {
      console.log(`❌ Failed: ${errorCount} statements`)
    }
    
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
    
    // Check data counts
    console.log('\n📈 Data summary:')
    const tables = ['clients', 'projects', 'project_stages', 'tasks', 'financial_records', 'documents']
    for (const table of tables) {
      try {
        const { rows: countRows } = await client.query(`SELECT COUNT(*) as count FROM ${table}`)
        console.log(`   - ${table}: ${countRows[0].count} records`)
      } catch (err) {
        // Table might not exist
      }
    }
    
    if (rows.length === 6) {
      console.log('\n🎉 Database setup completed successfully!')
      console.log('📌 Visit: http://localhost:3001/en/dashboards/domus')
      console.log('\n✨ DomusVertical is now fully operational!')
    }
    
  } catch (error) {
    console.error('❌ Error executing SQL:', error)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed')
  }
}

createTablesWithPassword().catch(console.error)