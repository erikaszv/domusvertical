-- ============================================
-- DomusVertical Database Setup - COMPLETE
-- Copy ALL of this and paste in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. CLIENTS TABLE
-- ============================================
CREATE TABLE clients (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_id uuid,
  name text NOT NULL,
  email text,
  phone text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Dev policy (open for development)
CREATE POLICY "Dev: Allow all operations on clients" ON clients
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 2. PROJECTS TABLE
-- ============================================
CREATE TABLE projects (
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

-- Dev policy
CREATE POLICY "Dev: Allow all operations on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- 3. PROJECT STAGES TABLE
-- ============================================
CREATE TABLE project_stages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL,
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

-- ============================================
-- 4. TASKS TABLE
-- ============================================
CREATE TABLE tasks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL,
  stage_id uuid,
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

-- ============================================
-- 5. DOCUMENTS TABLE
-- ============================================
CREATE TABLE documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL,
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

-- ============================================
-- 6. FINANCIAL RECORDS TABLE
-- ============================================
CREATE TABLE financial_records (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id uuid NOT NULL,
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

-- ============================================
-- 7. ADD FOREIGN KEYS
-- ============================================
ALTER TABLE projects 
ADD CONSTRAINT fk_projects_client_id 
FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL;

ALTER TABLE project_stages
ADD CONSTRAINT fk_stages_project_id
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_project_id
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE tasks
ADD CONSTRAINT fk_tasks_stage_id
FOREIGN KEY (stage_id) REFERENCES project_stages(id) ON DELETE SET NULL;

ALTER TABLE documents
ADD CONSTRAINT fk_documents_project_id
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

ALTER TABLE financial_records
ADD CONSTRAINT fk_financial_project_id
FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;

-- ============================================
-- 8. CREATE INDEXES
-- ============================================
CREATE INDEX idx_projects_owner_id ON projects(owner_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_clients_created_at ON clients(created_at DESC);
CREATE INDEX idx_project_stages_project_id ON project_stages(project_id);
CREATE INDEX idx_project_stages_status ON project_stages(status);
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_stage_id ON tasks(stage_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_financial_records_project_id ON financial_records(project_id);

-- ============================================
-- 9. INSERT SAMPLE DATA
-- ============================================

-- Insert sample clients
INSERT INTO clients (name, email, phone) VALUES
  ('UAB Statybų Grupė', 'info@statyba.lt', '+370 600 12345'),
  ('Jonas Petraitis', 'jonas@gmail.com', '+370 611 98765'),
  ('Vilniaus Projektai', 'projektai@vilnius.lt', '+370 5 234 5678');

-- Insert sample projects
INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Šiuolaikinis Namas Vilniuje',
  'Modernaus vienbučio namo statyba Pavilnyje',
  'active',
  250000,
  c.id,
  '2024-03-01',
  '2024-12-31'
FROM clients c WHERE c.name = 'UAB Statybų Grupė';

INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Biurų Pastatas Kaune',
  '5 aukštų biurų pastato projektas',
  'planning',
  1500000,
  c.id,
  '2024-06-01',
  '2025-06-01'
FROM clients c WHERE c.name = 'Vilniaus Projektai';

INSERT INTO projects (name, description, status, budget, client_id, start_date, end_date)
SELECT 
  'Renovacija Senamiestyje',
  'Istorinio pastato renovacija',
  'active',
  180000,
  c.id,
  '2024-01-15',
  '2024-08-30'
FROM clients c WHERE c.name = 'Jonas Petraitis';

-- Insert sample stages for each project
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

-- Insert sample tasks
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

INSERT INTO tasks (project_id, title, description, status, priority, due_date)
SELECT 
  p.id,
  'Samdyti elektriką',
  'Rasti kvalifikuotą elektriką instaliacijos darbams',
  'todo',
  'medium',
  CURRENT_DATE + INTERVAL '30 days'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO tasks (project_id, title, description, status, priority)
SELECT 
  p.id,
  'Architektūriniai brėžiniai',
  'Paruošti detalius architektūrinius brėžinius',
  'in_progress',
  'high'
FROM projects p WHERE p.name = 'Biurų Pastatas Kaune';

INSERT INTO tasks (project_id, title, description, status, priority)
SELECT 
  p.id,
  'Paveldosaugos suderinimas',
  'Gauti paveldosaugos leidimą renovacijai',
  'review',
  'urgent'
FROM projects p WHERE p.name = 'Renovacija Senamiestyje';

-- Insert sample financial records
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

INSERT INTO financial_records (project_id, type, category, amount, description, date)
SELECT 
  p.id,
  'expense',
  'Darbas',
  8000,
  'Brigadai už pamatų darbus',
  '2024-03-20'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO financial_records (project_id, type, category, amount, description, date)
SELECT 
  p.id,
  'income',
  'Kliento mokėjimas',
  36000,
  'Pradinis mokėjimas',
  '2024-01-15'
FROM projects p WHERE p.name = 'Renovacija Senamiestyje';

-- Insert sample documents
INSERT INTO documents (project_id, name, description, file_url, category)
SELECT 
  p.id,
  'Statybos leidimas',
  'Oficialus statybos leidimas Nr. 2024-03-001',
  '/documents/statybos-leidimas.pdf',
  'permit'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO documents (project_id, name, description, file_url, category)
SELECT 
  p.id,
  'Architektūriniai brėžiniai',
  'Pilnas architektūrinių brėžinių komplektas',
  '/documents/breziniai.pdf',
  'design'
FROM projects p WHERE p.name = 'Šiuolaikinis Namas Vilniuje';

INSERT INTO documents (project_id, name, description, file_url, category)
SELECT 
  p.id,
  'Paveldosaugos išvada',
  'Kultūros paveldo departamento išvada',
  '/documents/paveldosauga.pdf',
  'permit'
FROM projects p WHERE p.name = 'Renovacija Senamiestyje';

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Setup Complete!' as message;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('projects', 'clients', 'project_stages', 'tasks', 'documents', 'financial_records');

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