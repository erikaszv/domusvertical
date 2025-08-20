-- 0004_extended_schema.sql
-- Extends projects table and adds stages, tasks, documents

-- Add columns to projects
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'on_hold', 'completed')),
ADD COLUMN IF NOT EXISTS budget numeric,
ADD COLUMN IF NOT EXISTS client_id uuid REFERENCES clients(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS start_date date,
ADD COLUMN IF NOT EXISTS end_date date,
ADD COLUMN IF NOT EXISTS owner_id uuid;

-- Project stages table
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

-- Tasks table
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

-- Documents table
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

-- Financial records
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_project_stages_project_id ON project_stages(project_id);
CREATE INDEX IF NOT EXISTS idx_project_stages_status ON project_stages(status);
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_stage_id ON tasks(stage_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_documents_project_id ON documents(project_id);
CREATE INDEX IF NOT EXISTS idx_financial_records_project_id ON financial_records(project_id);

-- Enable RLS (dev mode - open for now)
ALTER TABLE project_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records ENABLE ROW LEVEL SECURITY;

-- Dev RLS policies (open for development)
CREATE POLICY "Dev: Allow all operations on project_stages" ON project_stages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Dev: Allow all operations on tasks" ON tasks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Dev: Allow all operations on documents" ON documents
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Dev: Allow all operations on financial_records" ON financial_records
  FOR ALL USING (true) WITH CHECK (true);

-- Sample data
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
WHERE p.name = 'Sample Project'
ON CONFLICT DO NOTHING;