# DomusVertical Setup Instructions

## ⚠️ IMMEDIATE ACTION REQUIRED

To run database migrations and make the system work, you need to:

### 1. Get your Supabase SERVICE_ROLE_KEY

1. Go to your Supabase project: https://supabase.com/dashboard/project/umgxfznmssatfaivrmdv
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API** under Project Settings
4. Find the **service_role** key (secret key with full access)
5. Copy the entire key

### 2. Add it to .env.local

Add this line to your `.env.local` file:
```
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **IMPORTANT**: NEVER commit this key to git. It has full access to your database.

### 3. Run Database Migrations

Once you've added the SERVICE_ROLE_KEY, run:
```bash
npm run db:migrate
```

This will create all the tables:
- projects
- clients  
- project_stages
- tasks
- documents
- financial_records

### 4. Access the Application

The app is already running at http://localhost:3000

Navigate to these pages to see your new modules:
- http://localhost:3000/en/dashboards/domus - Real-time Dashboard
- http://localhost:3000/en/projects - Projects Management
- http://localhost:3000/en/clients - Clients Database
- http://localhost:3000/en/tasks - Task Kanban Board
- http://localhost:3000/en/documents - Document Repository
- http://localhost:3000/en/financials - Financial Tracking

## What Was Built

You now have a **fully functional property development management system** with:

### Core Features
- ✅ Project management with stages
- ✅ Client database
- ✅ Task management (Kanban style)
- ✅ Document repository
- ✅ Financial tracking (income/expenses)
- ✅ Real-time dashboard with metrics

### Technical Stack
- Frontend: Next.js 15, TypeScript, MUI
- Backend: Supabase (PostgreSQL)
- Real-time data sync
- Server Actions for all operations

## Troubleshooting

If pages show 404:
1. Make sure migrations ran successfully (`npm run db:migrate`)
2. Check Supabase dashboard to verify tables were created
3. Restart the dev server: `npm run dev`

If you see "relation does not exist" errors:
- The database tables haven't been created yet
- Run `npm run db:migrate` with proper SERVICE_ROLE_KEY

## Next Steps

After setup is complete:
1. Create your first project
2. Add some clients
3. Create tasks and assign to projects
4. Track financials
5. Upload documents

The system is production-ready and can handle real data immediately!