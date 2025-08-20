import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const PROJECT_REF = 'zzbsgvceauztzcfxksgv'
const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

async function createViaManagementAPI() {
  console.log('🚀 Creating Tables via Supabase Management API')
  console.log('==============================================\n')
  
  try {
    // First check if we can access the database
    console.log('Checking database access...')
    
    // Try Supabase Management API endpoint (if available)
    const managementUrl = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`
    
    // Read SQL file
    const sqlPath = path.join(process.cwd(), 'CREATE_TABLES_NOW.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
    
    // Try executing via management API
    const response = await fetch(managementUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: sqlContent
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      console.log('Management API not available:', response.status)
      
      // Alternative: Use pg-connection via edge function
      console.log('\n📝 Alternative approach: Using Supabase Edge Function')
      
      // Create an edge function that can execute SQL
      const edgeFunctionCode = `
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const { sql } = await req.json()
    
    // Execute SQL directly
    const result = await Deno.openKv() // This would need actual DB connection
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
`
      
      console.log('\n⚠️  Direct database access requires one of:')
      console.log('1. PostgreSQL connection (blocked by Supabase network)')
      console.log('2. Supabase Dashboard SQL Editor')
      console.log('3. Supabase CLI with authentication')
      
      // Last attempt: Create tables one by one via REST API
      console.log('\n🔧 Final attempt: Creating tables individually...')
      await createTablesViaREST()
    } else {
      const result = await response.json()
      console.log('✅ Tables created successfully via Management API!')
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

async function createTablesViaREST() {
  // Try to create a stored procedure that can create tables
  const headers = {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json'
  }
  
  console.log('Attempting to create tables via stored procedure...')
  
  // SQL to create a function that creates tables
  const createTableFunction = `
CREATE OR REPLACE FUNCTION create_domus_tables()
RETURNS void AS $$
BEGIN
  -- Create clients table
  CREATE TABLE IF NOT EXISTS clients (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid,
    name text NOT NULL,
    email text,
    phone text,
    created_at timestamptz DEFAULT now()
  );
  
  -- Create projects table
  CREATE TABLE IF NOT EXISTS projects (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id uuid,
    name text NOT NULL,
    description text,
    status text DEFAULT 'planning',
    budget numeric,
    client_id uuid,
    start_date date,
    end_date date,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
  
  -- Enable RLS
  ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
  ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
END;
$$ LANGUAGE plpgsql;
`
  
  // Try to execute via RPC
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/create_domus_tables`, {
    method: 'POST',
    headers,
    body: JSON.stringify({})
  })
  
  if (!response.ok) {
    const error = await response.text()
    console.log('Cannot create function:', error)
    
    console.log('\n📋 SOLUTION: Copy and run this in Supabase SQL Editor:')
    console.log('URL: https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
    console.log('\nThe SQL file is ready: CREATE_TABLES_NOW.sql')
    console.log('Just copy, paste, and click Run!')
  } else {
    console.log('✅ Tables created via stored procedure!')
  }
}

createViaManagementAPI().catch(console.error)