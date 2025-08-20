import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3MjUxNDUsImV4cCI6MjA3MTMwMTE0NX0.GdxWtAuIxeY9spUgD67f_jtnDZT44BmgU_ldi-3GMR8'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

// Create Supabase client with service role
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Table definitions that map to our SQL schema
const tableSchemas = {
  clients: {
    name: 'text',
    email: 'text',
    phone: 'text'
  },
  projects: {
    owner_id: 'uuid',
    name: 'text',
    description: 'text',
    status: 'text',
    budget: 'numeric',
    client_id: 'uuid',
    start_date: 'date',
    end_date: 'date'
  },
  project_stages: {
    project_id: 'uuid',
    name: 'text',
    description: 'text',
    status: 'text',
    order_index: 'int4'
  },
  tasks: {
    project_id: 'uuid',
    stage_id: 'uuid',
    title: 'text',
    description: 'text',
    status: 'text',
    priority: 'text',
    assigned_to: 'uuid',
    due_date: 'date',
    completed_at: 'timestamptz',
    owner_id: 'uuid'
  },
  documents: {
    project_id: 'uuid',
    name: 'text',
    description: 'text',
    file_url: 'text',
    file_size: 'int8',
    mime_type: 'text',
    category: 'text',
    uploaded_by: 'uuid',
    owner_id: 'uuid'
  },
  financial_records: {
    project_id: 'uuid',
    type: 'text',
    category: 'text',
    amount: 'numeric',
    description: 'text',
    date: 'date',
    owner_id: 'uuid'
  }
}

async function createTablesViaAPI() {
  console.log('🚀 DomusVertical Table Creator (API Method)')
  console.log('==========================================\n')
  
  // First, let's check what tables exist
  console.log('📊 Checking existing tables...\n')
  
  const tables = Object.keys(tableSchemas)
  const existingTables: string[] = []
  const missingTables: string[] = []
  
  for (const tableName of tables) {
    try {
      const { count, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact', head: true })
      
      if (error) {
        if (error.message.includes('does not exist')) {
          console.log(`❌ Table '${tableName}' does not exist`)
          missingTables.push(tableName)
        } else {
          console.log(`⚠️  Table '${tableName}' error: ${error.message}`)
        }
      } else {
        console.log(`✅ Table '${tableName}' exists (${count || 0} records)`)
        existingTables.push(tableName)
      }
    } catch (err: any) {
      console.log(`❌ Error checking '${tableName}': ${err.message}`)
      missingTables.push(tableName)
    }
  }
  
  console.log('\n==========================================')
  console.log(`✅ Existing tables: ${existingTables.length}`)
  console.log(`❌ Missing tables: ${missingTables.length}`)
  
  if (missingTables.length > 0) {
    console.log('\n⚠️  Cannot create tables via REST API')
    console.log('Supabase requires tables to be created via:')
    console.log('\n📝 Option 1: Dashboard SQL Editor')
    console.log('1. Go to: https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
    console.log('2. Copy content from SUPABASE_SQL_SETUP.sql')
    console.log('3. Click "Run" to execute')
    
    console.log('\n🔧 Option 2: Supabase CLI')
    console.log('1. Install: npm install -g supabase')
    console.log('2. Login: supabase login')
    console.log('3. Link: supabase link --project-ref zzbsgvceauztzcfxksgv')
    console.log('4. Push: supabase db push < SUPABASE_SQL_SETUP.sql')
    
    console.log('\n💡 Option 3: Using Database URL (if available)')
    console.log('If you have the database password (not the service key):')
    console.log('1. Get it from: https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/settings/database')
    console.log('2. Use psql or any PostgreSQL client to connect and run SQL')
    
    // Create a helper script for the user
    await createSupabaseCLIScript()
  } else {
    console.log('\n🎉 All tables exist! System is ready.')
    console.log('📌 Next step: Run "npm run seed" to add sample data')
  }
}

async function createSupabaseCLIScript() {
  const scriptContent = `#!/bin/bash
# DomusVertical Supabase Table Setup Script
# This script uses Supabase CLI to create tables

echo "🚀 DomusVertical Supabase CLI Setup"
echo "===================================="

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found"
    echo "Installing Supabase CLI..."
    npm install -g supabase
fi

echo "✅ Supabase CLI is installed"

# Link to project
echo ""
echo "Linking to project..."
supabase link --project-ref zzbsgvceauztzcfxksgv

# Push SQL
echo ""
echo "Creating tables..."
supabase db push < SUPABASE_SQL_SETUP.sql

echo ""
echo "✅ Tables created successfully!"
echo "📌 Run 'npm run seed' to add sample data"
`
  
  const scriptPath = path.join(process.cwd(), 'scripts', 'setup-tables-cli.sh')
  fs.writeFileSync(scriptPath, scriptContent)
  console.log(`\n📄 Created helper script: scripts/setup-tables-cli.sh`)
  console.log('   Run it with: bash scripts/setup-tables-cli.sh')
}

createTablesViaAPI().catch(console.error)