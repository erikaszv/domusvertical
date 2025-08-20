import fetch from 'node-fetch'

const SUPABASE_URL = 'https://zzbsgvceauztzcfxksgv.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6YnNndmNlYXV6dHpjZnhrc2d2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTcyNTE0NSwiZXhwIjoyMDcxMzAxMTQ1fQ.okWIw3j1VU7I1wpeqyJdNIyh7LuCSh3OYd00wdrfNMU'

async function directAPISeed() {
  console.log('🚀 Direct API Seeding')
  console.log('====================\n')
  
  const headers = {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
  
  try {
    // 1. Create clients
    console.log('Creating clients...')
    const clientsRes = await fetch(`${SUPABASE_URL}/rest/v1/clients`, {
      method: 'POST',
      headers,
      body: JSON.stringify([
        { name: 'UAB Statybų Grupė', email: 'info@statyba.lt', phone: '+370 600 12345' },
        { name: 'Jonas Petraitis', email: 'jonas@gmail.com', phone: '+370 611 98765' },
        { name: 'Vilniaus Projektai', email: 'projektai@vilnius.lt', phone: '+370 5 234 5678' }
      ])
    })
    
    if (!clientsRes.ok) {
      const error = await clientsRes.text()
      console.log('Clients error:', error)
      
      // Check if tables exist by trying a GET
      const checkRes = await fetch(`${SUPABASE_URL}/rest/v1/clients?select=*&limit=1`, {
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        }
      })
      
      if (!checkRes.ok) {
        const checkError = await checkRes.text()
        console.log('\n❌ Cannot access tables via REST API')
        console.log('Error:', checkError)
        
        console.log('\n📝 The tables must be created in Supabase Dashboard:')
        console.log('1. Go to: https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
        console.log('2. Copy ALL content from SUPABASE_SQL_SETUP.sql')
        console.log('3. Paste it into the SQL editor')
        console.log('4. Click "Run" button')
        console.log('5. Wait for confirmation')
        console.log('6. Come back and run: npx tsx scripts/seed-data.ts')
        return
      } else {
        const existing = await checkRes.json()
        console.log('Tables exist, data present:', existing)
      }
    } else {
      const clients = await clientsRes.json() as any[]
      console.log(`✅ Created ${clients.length} clients`)
      
      // Continue with other data...
      // Get clients for references
      const getClientsRes = await fetch(`${SUPABASE_URL}/rest/v1/clients?select=*`, {
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        }
      })
      const allClients = await getClientsRes.json() as any[]
      
      // 2. Create projects
      console.log('Creating projects...')
      const projectsRes = await fetch(`${SUPABASE_URL}/rest/v1/projects`, {
        method: 'POST',
        headers,
        body: JSON.stringify([
          {
            name: 'Šiuolaikinis Namas Vilniuje',
            description: 'Modernaus vienbučio namo statyba Pavilnyje',
            status: 'active',
            budget: 250000,
            client_id: allClients[0].id,
            start_date: '2024-03-01',
            end_date: '2024-12-31'
          },
          {
            name: 'Biurų Pastatas Kaune',
            description: '5 aukštų biurų pastato projektas',
            status: 'planning',
            budget: 1500000,
            client_id: allClients[2]?.id || allClients[0].id,
            start_date: '2024-06-01',
            end_date: '2025-06-01'
          },
          {
            name: 'Renovacija Senamiestyje',
            description: 'Istorinio pastato renovacija',
            status: 'active',
            budget: 180000,
            client_id: allClients[1]?.id || allClients[0].id,
            start_date: '2024-01-15',
            end_date: '2024-08-30'
          }
        ])
      })
      
      if (projectsRes.ok) {
        const projects = await projectsRes.json() as any[]
        console.log(`✅ Created ${projects.length} projects`)
        
        // Continue with stages, tasks, etc...
        console.log('\n🎉 Initial data seeded successfully!')
        console.log('📌 Run full seeding script for complete data')
      }
    }
    
  } catch (error: any) {
    console.error('❌ Error:', error.message)
  }
}

directAPISeed().catch(console.error)