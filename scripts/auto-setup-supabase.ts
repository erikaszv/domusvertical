import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

async function autoSetupSupabase() {
  console.log('🚀 DomusVertical Automatic Supabase Setup')
  console.log('=========================================\n')
  
  const PROJECT_REF = 'zzbsgvceauztzcfxksgv'
  
  try {
    // Check if Supabase CLI is installed
    console.log('Checking Supabase CLI...')
    try {
      await execAsync('supabase --version')
      console.log('✅ Supabase CLI is installed\n')
    } catch {
      console.log('❌ Supabase CLI not found')
      console.log('Installing Supabase CLI globally...')
      await execAsync('npm install -g supabase')
      console.log('✅ Supabase CLI installed\n')
    }
    
    // Initialize Supabase project
    console.log('Initializing Supabase project...')
    const supabaseDir = path.join(process.cwd(), 'supabase')
    if (!fs.existsSync(supabaseDir)) {
      await execAsync('supabase init')
      console.log('✅ Supabase project initialized\n')
    } else {
      console.log('✅ Supabase project already initialized\n')
    }
    
    // Link to remote project
    console.log('Linking to remote project...')
    try {
      await execAsync(`supabase link --project-ref ${PROJECT_REF}`)
      console.log('✅ Linked to project\n')
    } catch (err: any) {
      if (err.message.includes('already linked')) {
        console.log('✅ Already linked to project\n')
      } else if (err.message.includes('not logged in')) {
        console.log('\n⚠️  You need to login to Supabase first')
        console.log('Run: supabase login')
        console.log('Then run this script again\n')
        return
      } else {
        throw err
      }
    }
    
    // Push SQL to database
    console.log('Creating tables in database...')
    const sqlPath = path.join(process.cwd(), 'SUPABASE_SQL_SETUP.sql')
    
    if (fs.existsSync(sqlPath)) {
      try {
        // Use db push to execute SQL
        const { stdout, stderr } = await execAsync(`supabase db push < "${sqlPath}"`)
        console.log('✅ Tables created successfully\n')
        if (stdout) console.log(stdout)
        if (stderr && !stderr.includes('already exists')) console.log(stderr)
      } catch (err: any) {
        if (err.message.includes('already exists')) {
          console.log('✅ Tables already exist\n')
        } else {
          console.log('⚠️  Error creating tables:', err.message)
          
          // Alternative: copy to migrations folder
          console.log('\nTrying alternative method...')
          const migrationDir = path.join(supabaseDir, 'migrations')
          if (!fs.existsSync(migrationDir)) {
            fs.mkdirSync(migrationDir, { recursive: true })
          }
          
          const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14)
          const migrationFile = path.join(migrationDir, `${timestamp}_domus_setup.sql`)
          fs.copyFileSync(sqlPath, migrationFile)
          
          console.log('📄 Created migration file')
          console.log('Running migration...')
          
          const { stdout: migOut } = await execAsync('supabase db push')
          console.log('✅ Migration completed')
          if (migOut) console.log(migOut)
        }
      }
    }
    
    // Seed data
    console.log('\n🌱 Seeding database...')
    await execAsync('npx tsx scripts/seed-data.ts')
    
    console.log('\n🎉 Setup completed successfully!')
    console.log('📌 Visit: http://localhost:3001/en/dashboards/domus')
    
  } catch (error: any) {
    console.error('\n❌ Setup error:', error.message)
    
    console.log('\n📝 Manual setup required:')
    console.log('1. Install Supabase CLI: npm install -g supabase')
    console.log('2. Login: supabase login')
    console.log(`3. Link project: supabase link --project-ref ${PROJECT_REF}`)
    console.log('4. Push SQL: supabase db push < SUPABASE_SQL_SETUP.sql')
    console.log('5. Seed data: npx tsx scripts/seed-data.ts')
  }
}

autoSetupSupabase().catch(console.error)