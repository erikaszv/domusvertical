-- ============================================
-- DomusVertical Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid,
  name text NOT NULL,
  description text,
  status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'on_hold', 'completed')),
  budget numeric,
  client_id uuid,
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Dev policy (open for development)
CREATE POLICY "Dev: Allow all operations on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_projects_owner_id ON projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- ============================================
-- 2. CLIENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid,
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Dev policy
CREATE POLICY "Dev: Allow all operations on clients" ON clients
  FOR ALL USING (true) WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at DESC);

-- ============================================
-- 3. PROJECT STAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS project_stages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_stages ENABLE ROW LEVEL SECURITY;

-- Dev policy
CREATE POLICY "Dev: Allow all operations on project_stages" ON project_stages
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_stages_project_id ON project_stages(project_id);
CREATE INDEX IF NOT EXISTS idx_project_stages_status ON project_stages(status);

-- ============================================
-- 4. TASKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_id uuid REFERENCES project_stages(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'review', 'done', 'blocked')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  assigned_to uuid,
  due_date date,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  owner_id uuid
);

-- Enable RLS
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Dev policy
CREATE POLICY "Dev: Allow all operations on tasks" ON tasks
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_stage_id ON tasks(stage_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);

-- ============================================
-- 5. DOCUMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_size bigint,
  mime_type text,
  category text DEFAULT 'general' CHECK (category IN ('general', 'contract', 'invoice', 'permit', 'design', 'report', 'other')),
  uploaded_by uuid,
  created_at timestamptz DEFAULT now(),
  owner_id uuid
);

-- Enable RLS
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Dev policy
CREATE POLICY "Dev: Allow all operations on documents" ON documents
  FOR ALL USING (true) WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);

-- ============================================
-- 6. FINANCIAL RECORDS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS financial_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  amount numeric NOT NULL,
  description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  owner_id uuid
);

-- Enable RLS
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

-- Dev policy
CREATE POLICY "Dev: Allow all operations on financial_records" ON financial_records
  FOR ALL USING (true) WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_financial_records_project_id ON financial_records(project_id);

-- ============================================
-- 7. ADD FOREIGN KEY FOR CLIENT_ID IN PROJECTS
-- ============================================
ALTER TABLE projects 
ADD CONSTRAINT fk_projects_client_id 
FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;

-- ============================================
-- 8. INSERT SAMPLE DATA
-- ============================================

-- Insert sample client
INSERT INTO clients (name, email, phone)
VALUES ('Sample Client', 'client@example.com', '+370 600 12345')
ON CONFLICT DO NOTHING;

-- Insert sample project
INSERT INTO projects (name, description, status, budget, client_id)
SELECT 
  'Sample Villa Project',
  'Modern villa construction in Vilnius',
  'active',
  250000,
  c.id
FROM clients c
WHERE c.name = 'Sample Client'
ON CONFLICT DO NOTHING;

-- Insert sample stages for the project
INSERT INTO project_stages (project_id, name, description, order_index, status)
SELECT 
  p.id,
  stage.name,
  stage.description,
  stage.order_index,
  stage.status
FROM projects p
CROSS JOIN (
  VALUES 
    ('Site Preparation', 'Clear and prepare the construction site', 0, 'completed'),
    ('Foundation', 'Pour concrete foundation and install utilities', 1, 'in_progress'),
    ('Framing', 'Build the structural frame of the building', 2, 'pending'),
    ('Roofing', 'Install roof structure and covering', 3, 'pending')
) AS stage(name, description, order_index, status)
WHERE p.name = 'Sample Villa Project'
ON CONFLICT DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (project_id, title, description, status, priority)
SELECT 
  p.id,
  'Review architectural plans',
  'Final review of plans before construction',
  'done',
  'high'
FROM projects p
WHERE p.name = 'Sample Villa Project'
ON CONFLICT DO NOTHING;

INSERT INTO tasks (project_id, title, description, status, priority, due_date)
SELECT 
  p.id,
  'Order construction materials',
  'Order steel, concrete, and lumber',
  'in_progress',
  'urgent',
  CURRENT_DATE + INTERVAL '7 days'
FROM projects p
WHERE p.name = 'Sample Villa Project'
ON CONFLICT DO NOTHING;

-- Insert sample financial records
INSERT INTO financial_records (project_id, type, category, amount, description)
SELECT 
  p.id,
  'expense',
  'Materials',
  15000,
  'Initial material purchase'
FROM projects p
WHERE p.name = 'Sample Villa Project'
ON CONFLICT DO NOTHING;

INSERT INTO financial_records (project_id, type, category, amount, description)
SELECT 
  p.id,
  'income',
  'Client Payment',
  50000,
  'Initial deposit from client'
FROM projects p
WHERE p.name = 'Sample Villa Project'
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
-- Run these to verify tables were created:
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'clients', 'project_stages', 'tasks', 'documents', 'financial_records');

-- Check sample data:
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as client_count FROM clients;
SELECT COUNT(*) as stage_count FROM project_stages;
SELECT COUNT(*) as task_count FROM tasks;
SELECT COUNT(*) as financial_count FROM financial_records;