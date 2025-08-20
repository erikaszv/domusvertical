import fs from 'node:fs'
import path from 'node:path'

const PROJECT_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

// WARNING: This script requires the SERVICE ROLE KEY. Do NOT expose it to the client or commit it.
// It should only be run locally in a trusted environment.

async function main() {
  if (!PROJECT_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env')
    process.exit(1)
  }

  const migrationsDir = path.resolve('db/migrations')
  const files = fs
    .readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .sort()

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')

    console.log(`Applying migration: ${file}`)
    const res = await fetch(`${PROJECT_URL}/rest/v1/rpc/execute_sql`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sql })
    })

    if (!res.ok) {
      const text = await res.text()
      console.error(`Failed to apply ${file}:`, res.status, text)
      process.exit(1)
    }

    console.log(`Applied: ${file}`)
  }

  console.log('All migrations applied successfully')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

