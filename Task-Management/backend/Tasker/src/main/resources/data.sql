ALTER TABLE projects MODIFY id INT NOT NULL AUTO_INCREMENT;
INSERT INTO projects (proj_name, created_by) VALUES ('Project1', 'Vamsi');
INSERT INTO projects (proj_name, created_by) VALUES ('Project2', 'Alice');
INSERT INTO cards (title, description, priority, status, due_date, estimate_date, project_name, person_name, size, sprint)
VALUES 
('Login Feature', 'Implement user login', 'High', 'Pending', '2025-09-25', '2025-09-20', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 1'),
('Registration', 'User registration page', 'Medium', 'In Progress', '2025-09-28', '2025-09-22', 'TaskerApp', 'Vamsi', 'Small', 'Sprint 1'),
('Dashboard', 'Create main dashboard', 'High', 'Pending', '2025-10-01', '2025-09-25', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 2'),
('Profile Page', 'Implement user profile', 'Low', 'Pending', '2025-10-03', '2025-09-26', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 2'),
('Notifications', 'Add notifications system', 'Medium', 'In Progress', '2025-10-05', '2025-09-28', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 2'),
('Settings', 'Implement settings page', 'Low', 'Pending', '2025-10-07', '2025-09-29', 'TaskerApp', 'Vamsi', 'Small', 'Sprint 3'),
('Reports', 'Generate user reports', 'High', 'Pending', '2025-10-10', '2025-10-01', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 3'),
('Task Search', 'Implement search functionality', 'Medium', 'Pending', '2025-10-12', '2025-10-02', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 3'),
('Calendar Integration', 'Integrate calendar view', 'High', 'Pending', '2025-10-15', '2025-10-05', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 4'),
('Export Data', 'Add export to CSV', 'Medium', 'Pending', '2025-10-18', '2025-10-07', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 4');

