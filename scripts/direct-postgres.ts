import { Client } from 'pg'
import fs from 'fs'
import path from 'path'

// Direct PostgreSQL connection parameters
const connections = [
  {
    // Supabase Pooler Transaction Mode
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.zzbsgvceauztzcfxksgv',
    password: '15MinDomus15',
    ssl: { rejectUnauthorized: false }
  },
  {
    // Supabase Pooler Session Mode  
    host: 'aws-0-us-west-1.pooler.supabase.com',
    port: 5432,
    database: 'postgres',
    user: 'postgres.zzbsgvceauztzcfxksgv',
    password: '15MinDomus15',
    ssl: { rejectUnauthorized: false }
  },
  {
    // Direct connection
    host: 'db.zzbsgvceauztzcfxksgv.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '15MinDomus15',
    ssl: { rejectUnauthorized: false }
  }
]

async function directPostgres() {
  console.log('🚀 DomusVertical Direct PostgreSQL Setup')
  console.log('========================================\n')
  
  let client: Client | null = null
  let connIndex = 0
  
  for (const config of connections) {
    connIndex++
    try {
      console.log(`Attempt ${connIndex}: Connecting to ${config.host}:${config.port}...`)
      client = new Client(config)
      await client.connect()
      console.log('✅ Connected successfully!\n')
      break
    } catch (err: any) {
      console.log(`❌ Failed: ${err.message}\n`)
    }
  }
  
  if (!client) {
    console.log('⚠️  All connection attempts failed')
    console.log('\nPossible reasons:')
    console.log('1. Database password might be incorrect')
    console.log('2. Network restrictions from Supabase')
    console.log('3. Connection pooler configuration')
    
    console.log('\n📝 Please use Supabase Dashboard instead:')
    console.log('1. Go to: https://supabase.com/dashboard/project/zzbsgvceauztzcfxksgv/sql/new')
    console.log('2. Copy content from CREATE_TABLES_NOW.sql')
    console.log('3. Paste and click Run')
    return
  }
  
  try {
    // First, check if tables already exist
    console.log('Checking existing tables...')
    const { rows: existingTables } = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `)
    
    console.log(`Found ${existingTables.length} existing tables:`)
    existingTables.forEach(row => console.log(`  - ${row.table_name}`))
    
    const targetTables = ['clients', 'projects', 'project_stages', 'tasks', 'documents', 'financial_records']
    const missingTables = targetTables.filter(t => 
      !existingTables.some(et => et.table_name === t)
    )
    
    if (missingTables.length === 0) {
      console.log('\n✅ All tables already exist!')
      
      // Check if they have data
      console.log('\nChecking data...')
      for (const table of targetTables) {
        const { rows } = await client.query(`SELECT COUNT(*) as count FROM ${table}`)
        console.log(`  ${table}: ${rows[0].count} records`)
      }
      
      // If no data, insert sample data
      const { rows: clientCount } = await client.query('SELECT COUNT(*) FROM clients')
      if (clientCount[0].count === '0') {
        console.log('\n🌱 Inserting sample data...')
        await insertSampleData(client)
      }
      
    } else {
      console.log(`\n📦 Need to create ${missingTables.length} tables: ${missingTables.join(', ')}`)
      
      // Create missing tables
      console.log('\nCreating tables...')
      const sqlPath = path.join(process.cwd(), 'CREATE_TABLES_NOW.sql')
      const sqlContent = fs.readFileSync(sqlPath, 'utf-8')
      
      // Execute SQL statements
      const statements = sqlContent
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'))
      
      for (const statement of statements) {
        if (statement.toLowerCase().includes('select')) continue // Skip select statements
        
        try {
          await client.query(statement)
          
          // Log what was created
          if (statement.toLowerCase().includes('create table')) {
            const match = statement.match(/create table (?:if not exists )?(\w+)/i)
            if (match) console.log(`  ✅ Created table: ${match[1]}`)
          }
        } catch (err: any) {
          if (!err.message.includes('already exists')) {
            console.log(`  ❌ Error: ${err.message.substring(0, 50)}...`)
          }
        }
      }
      
      console.log('\n🎉 Setup completed!')
    }
    
    console.log('\n📌 System ready at: http://localhost:3001/en/dashboards/domus')
    
  } catch (error: any) {
    console.error('\n❌ Error during setup:', error.message)
  } finally {
    await client.end()
    console.log('\n🔌 Connection closed')
  }
}

async function insertSampleData(client: Client) {
  try {
    // Insert clients
    await client.query(`
      INSERT INTO clients (name, email, phone) VALUES
      ('UAB Statybų Grupė', 'info@statyba.lt', '+370 600 12345'),
      ('Jonas Petraitis', 'jonas@gmail.com', '+370 611 98765'),
      ('Vilniaus Projektai', 'projektai@vilnius.lt', '+370 5 234 5678')
    `)
    console.log('  ✅ Added 3 clients')
    
    // Get client IDs
    const { rows: clients } = await client.query('SELECT id, name FROM clients')
    
    // Insert projects
    for (const projectData of [
      { name: 'Šiuolaikinis Namas Vilniuje', client: 'UAB Statybų Grupė', budget: 250000 },
      { name: 'Biurų Pastatas Kaune', client: 'Vilniaus Projektai', budget: 1500000 },
      { name: 'Renovacija Senamiestyje', client: 'Jonas Petraitis', budget: 180000 }
    ]) {
      const client_id = clients.find(c => c.name === projectData.client)?.id
      if (client_id) {
        await client.query(`
          INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          projectData.name,
          'Project description',
          'active',
          projectData.budget,
          client_id,
          '2024-03-01',
          '2024-12-31'
        ])
      }
    }
    console.log('  ✅ Added 3 projects')
    
    // Add stages and tasks
    const { rows: projects } = await client.query('SELECT id, name FROM projects')
    
    for (const project of projects) {
      // Add stages
      const stages = [
        ['Pasiruošimas', 'Teritorijos paruošimas', 0, 'completed'],
        ['Pamatai', 'Pamatų klojimas', 1, 'in_progress'],
        ['Sienos', 'Sienų mūrijimas', 2, 'pending'],
        ['Stogas', 'Stogo konstrukcija', 3, 'pending'],
        ['Apdaila', 'Apdailos darbai', 4, 'pending']
      ]
      
      for (const [name, desc, order, status] of stages) {
        await client.query(`
          INSERT INTO project_stages (project_id, name, description, order_index, status)
          VALUES ($1, $2, $3, $4, $5)
        `, [project.id, name, desc, order, status])
      }
      
      // Add a sample task
      await client.query(`
        INSERT INTO tasks (project_id, title, description, status, priority)
        VALUES ($1, $2, $3, $4, $5)
      `, [project.id, 'Sample task', 'Task description', 'todo', 'medium'])
    }
    console.log('  ✅ Added stages and tasks')
    
    console.log('\n✅ Sample data inserted successfully!')
    
  } catch (err: any) {
    console.log(`  ⚠️  Some data might already exist: ${err.message.substring(0, 50)}`)
  }
}

directPostgres().catch(console.error)