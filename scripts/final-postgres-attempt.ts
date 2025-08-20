import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

// Supabase connection details
const DATABASE_PASSWORD = '15MinDomus15'

// Try different Supabase regions and formats
const connections = [
  // US West format
  'postgresql://postgres.zzbsgvceauztzcfxksgv:15MinDomus15@aws-0-us-west-1.pooler.supabase.com:6543/postgres',
  'postgresql://postgres.zzbsgvceauztzcfxksgv:15MinDomus15@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
  
  // EU format (in case project is in EU)
  'postgresql://postgres.zzbsgvceauztzcfxksgv:15MinDomus15@aws-0-eu-central-1.pooler.supabase.com:6543/postgres',
  'postgresql://postgres.zzbsgvceauztzcfxksgv:15MinDomus15@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
  
  // Asia format
  'postgresql://postgres.zzbsgvceauztzcfxksgv:15MinDomus15@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres',
  
  // Direct DB (various formats)
  'postgresql://postgres:15MinDomus15@db.zzbsgvceauztzcfxksgv.supabase.co:5432/postgres',
  'postgresql://postgres:15MinDomus15@db.zzbsgvceauztzcfxksgv.supabase.co:6543/postgres',
  
  // Legacy format
  'postgresql://postgres:15MinDomus15@zzbsgvceauztzcfxksgv.supabase.co:5432/postgres',
  'postgresql://postgres:15MinDomus15@zzbsgvceauztzcfxksgv.db.supabase.co:5432/postgres'
]

async function finalAttempt() {
  console.log('🚀 Final PostgreSQL Connection Attempt')
  console.log('======================================\n')
  
  let client: Client | null = null
  let attemptNum = 0
  
  for (const connString of connections) {
    attemptNum++
    const hostMatch = connString.match(/@([^:\/]+)/)
    const host = hostMatch ? hostMatch[1] : 'unknown'
    
    try {
      console.log(`Attempt ${attemptNum}: ${host}...`)
      client = new Client({ 
        connectionString: connString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000
      })
      await client.connect()
      console.log('✅ CONNECTED SUCCESSFULLY!\n')
      break
    } catch (err: any) {
      const errorMsg = err.message.substring(0, 50)
      console.log(`❌ ${errorMsg}\n`)
    }
  }
  
  if (!client) {
    console.log('⚠️  Cannot connect with database password\n')
    console.log('Possible issues:')
    console.log('1. Password might have changed')
    console.log('2. Project region is different')
    console.log('3. Supabase pooler requires different auth\n')
    
    console.log('📝 SOLUTION: Manual execution required')
    console.log('========================================')
    console.log('1. Go to Supabase Dashboard SQL Editor:')
    console.log('   https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new\n')
    console.log('2. Copy entire content from: CREATE_TABLES_NOW.sql\n')
    console.log('3. Paste and click "Run"\n')
    console.log('4. Tables will be created instantly!\n')
    
    // Create a helper script for Windows
    const batchContent = `@echo off
echo Opening Supabase SQL Editor...
start https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new
echo.
echo Instructions:
echo 1. Browser will open Supabase SQL Editor
echo 2. Copy all content from CREATE_TABLES_NOW.sql
echo 3. Paste into SQL Editor
echo 4. Click "Run" button
echo.
pause`
    
    fs.writeFileSync('open-supabase-sql.bat', batchContent)
    console.log('📄 Created helper: open-supabase-sql.bat')
    console.log('   Double-click to open SQL Editor\n')
    
    return
  }
  
  // If connected, create tables
  try {
    console.log('📦 Creating tables and inserting data...\n')
    
    const sqlPath = path.join(process.cwd(), 'CREATE_TABLES_NOW.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
    
    // Execute entire SQL at once (Supabase supports this)
    await client.query(sqlContent)
    
    console.log('✅ All tables created successfully!')
    console.log('✅ Sample data inserted!')
    
    // Verify
    const { rows } = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('clients', 'projects', 'project_stages', 'tasks', 'documents', 'financial_records')
    `)
    
    console.log(`\n📊 Created ${rows.length} tables:`)
    rows.forEach(r => console.log(`   - ${r.table_name}`))
    
    console.log('\n🎉 DOMUSVERTICAL IS READY!')
    console.log('📌 Visit: http://localhost:3001/en/dashboards/domus')
    
  } catch (error: any) {
    console.error('Error executing SQL:', error.message)
  } finally {
    await client.end()
  }
}

finalAttempt().catch(console.error)