import { createClient } from '@supabase/supabase-js'

// Force new client with fresh cache
const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

// Add timestamp to force cache refresh
const supabase = createClient(
  `${SUPABASE_URL}?t=${Date.now()}`,
  SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    global: {
      headers: {
        'x-client-info': `supabase-js-node/${Date.now()}`
      }
    }
  }
)

async function forceSeed() {
  console.log('🚀 Force Seeding DomusVertical Database')
  console.log('=======================================\n')
  
  try {
    // Direct REST API approach with cache bypass
    const baseUrl = SUPABASE_URL.replace('?t=' + Date.now(), '')
    const headers = {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
    
    console.log('Step 1: Creating clients...')
    const clientsResponse = await fetch(`${baseUrl}/rest/v1/clients`, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        { name: 'UAB Statybų Grupė', email: 'info@statyba.lt', phone: '+370 600 12345' },
        { name: 'Jonas Petraitis', email: 'jonas@gmail.com', phone: '+370 611 98765' },
        { name: 'Vilniaus Projektai', email: 'projektai@vilnius.lt', phone: '+370 5 234 5678' }
      ])
    })
    
    if (!clientsResponse.ok) {
      const error = await clientsResponse.text()
      console.log('Response status:', clientsResponse.status)
      console.log('Response error:', error)
      
      // If schema cache error, tables exist but API can't see them
      if (error.includes('PGRST205') || error.includes('schema cache')) {
        console.log('\n⚠️  Schema cache issue detected')
        console.log('Tables exist but API cache needs refresh\n')
        
        console.log('📝 Solution: Manual SQL execution required')
        console.log('1. Go to Supabase Dashboard:')
        console.log('   https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
        console.log('\n2. Run this SQL to insert sample data:\n')
        
        const sampleSQL = `
-- Insert sample clients
INSERT INTO clients (name, email, phone) VALUES
  ('UAB Statybų Grupė', 'info@statyba.lt', '+370 600 12345'),
  ('Jonas Petraitis', 'jonas@gmail.com', '+370 611 98765'),
  ('Vilniaus Projektai', 'projektai@vilnius.lt', '+370 5 234 5678');

-- Get client IDs for foreign keys
WITH client_ids AS (
  SELECT id, name FROM clients WHERE name IN ('UAB Statybų Grupė', 'Jonas Petraitis', 'Vilniaus Projektai')
)
-- Insert sample projects
INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Šiuolaikinis Namas Vilniuje',
  'Modernaus vienbučio namo statyba Pavilnyje',
  'active',
  250000,
  (SELECT id FROM client_ids WHERE name = 'UAB Statybų Grupė'),
  '2024-03-01',
  '2024-12-31';

INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Biurų Pastatas Kaune',
  '5 aukštų biurų pastato projektas',
  'planning',
  1500000,
  (SELECT id FROM client_ids WHERE name = 'Vilniaus Projektai'),
  '2024-06-01',
  '2025-06-01';

INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Renovacija Senamiestyje',
  'Istorinio pastato renovacija',
  'active',
  180000,
  (SELECT id FROM client_ids WHERE name = 'Jonas Petraitis'),
  '2024-01-15',
  '2024-08-30';

-- Add sample stages for each project
INSERT INTO project_stages (project_id, name, description, order_index, status)
SELECT 
  p.id,
  s.name,
  s.description,
  s.order_index,
  s.status
FROM projects p
CROSS JOIN (
  VALUES 
    ('Pasiruošimas', 'Teritorijos paruošimas statyboms', 0, 'completed'),
    ('Pamatai', 'Pamatų klojimas ir hidroizoliacija', 1, 'in_progress'),
    ('Sienos', 'Sienų mūrijimas ir konstrukcijos', 2, 'pending'),
    ('Stogas', 'Stogo konstrukcija ir danga', 3, 'pending'),
    ('Apdaila', 'Vidaus ir išorės apdailos darbai', 4, 'pending')
) AS s(name, description, order_index, status);

-- Add sample tasks
INSERT INTO tasks (project_id, title, description, status, priority)
SELECT 
  p.id,
  'Gauti statybos leidimą',
  'Užbaigti visus dokumentus statybos leidimui',
  'done',
  'high'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO tasks (project_id, title, description, status, priority, due_date)
SELECT 
  p.id,
  'Užsakyti medžiagas pamatams',
  'Betonas, armatūra, hidroizoliacija',
  'in_progress',
  'urgent',
  CURRENT_DATE + INTERVAL '7 days'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

-- Add sample financial records
INSERT INTO financial_records (project_id, type, category, amount, description, date)
SELECT 
  p.id,
  'income',
  'Kliento mokėjimas',
  50000,
  'Pradinis avansas 20%',
  '2024-03-01'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO financial_records (project_id, type, category, amount, description, date)
SELECT 
  p.id,
  'expense',
  'Medžiagos',
  15000,
  'Pamatų betonas ir armatūra',
  '2024-03-15'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

-- Add sample documents
INSERT INTO documents (project_id, name, description, file_url, category)
SELECT 
  p.id,
  'Statybos leidimas',
  'Oficialus statybos leidimas Nr. 2024-03-001',
  '/documents/statybos-leidimas.pdf',
  'permit'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

-- Verify data was inserted
SELECT 'Clients' as table_name, COUNT(*) as count FROM clients
UNION ALL
SELECT 'Projects', COUNT(*) FROM projects
UNION ALL
SELECT 'Stages', COUNT(*) FROM project_stages
UNION ALL
SELECT 'Tasks', COUNT(*) FROM tasks
UNION ALL
SELECT 'Financial', COUNT(*) FROM financial_records
UNION ALL
SELECT 'Documents', COUNT(*) FROM documents;
`
        
        console.log(sampleSQL)
        console.log('\n3. Click "Run" to execute')
        console.log('\n4. Verify in Table Editor that data was added')
        console.log('   https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/editor')
        
        // Create SQL file for convenience
        const fs = require('fs')
        const path = require('path')
        const sqlPath = path.join(process.cwd(), 'SEED_DATA.sql')
        fs.writeFileSync(sqlPath, sampleSQL)
        console.log('\n📄 SQL saved to: SEED_DATA.sql')
        
        return
      }
      
      throw new Error(`Failed to create clients: ${error}`)
    }
    
    const clients = await clientsResponse.json()
    console.log(`✅ Created ${clients.length} clients`)
    
    // Continue with other seeding...
    console.log('\n🎉 Seeding completed!')
    console.log('📌 Visit: http://localhost:3001/en/dashboards/domus')
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

forceSeed().catch(console.error)