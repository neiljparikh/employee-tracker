-- Insert sample data into the 'department' table
INSERT INTO department (name) VALUES
  ('HR'),
  ('Engineering'),
  ('Marketing'),
  ('Finance');

-- Insert sample data into the 'role' table
INSERT INTO role (title, salary, department_id) VALUES
  ('HR Manager', 80000.00, 1),
  ('Software Engineer', 90000.00, 2),
  ('Marketing Specialist', 75000.00, 3),
  ('Financial Analyst', 85000.00, 4);

-- Insert sample data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),      -- HR Manager
  ('Jane', 'Smith', 2, 1),        -- Software Engineer (managed by John Doe)
  ('Bob', 'Johnson', 3, NULL),    -- Marketing Specialist
  ('Alice', 'Williams', 4, 1),    -- Financial Analyst (managed by John Doe)
  ('Charlie', 'Brown', 2, 1);     -- Software Engineer (managed by John Doe)