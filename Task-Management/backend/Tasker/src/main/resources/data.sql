ALTER TABLE projects MODIFY id INT NOT NULL AUTO_INCREMENT;
INSERT INTO projects (proj_name, created_by) VALUES ('Web Application', 'Vamsi');
INSERT INTO projects (proj_name, created_by) VALUES ('Tasker', 'Chandu');
INSERT INTO cards (title, description, priority, status, due_date, estimate_date, project_name, person_name, size, sprint)
VALUES
('Login Feature', 'Implement user login', 'High', 'Ready', '2025-09-25', '2025-09-20', 'Web Application', 'Vamsi', 'Medium', 'Sprint 1'),
('Registration', 'User registration page', 'Medium', 'In Progress', '2025-09-28', '2025-09-22', 'Web Application', 'Chandu', 'Small', 'Sprint 1'),
('Dashboard', 'Create main dashboard', 'High', 'Ready', '2025-10-01', '2025-09-25', 'Web Application', 'Lenin', 'Large', 'Sprint 2'),
('Profile Page', 'Implement user profile', 'Low', 'Ready', '2025-10-03', '2025-09-26', 'Web Application', 'Siva', 'Medium', 'Sprint 2'),
('Notifications', 'Add notifications system', 'Medium', 'In Progress', '2025-10-05', '2025-09-28', 'Web Application', 'Naveen', 'Medium', 'Sprint 2'),
('Settings', 'Implement settings page', 'Low', 'In Progress', '2025-10-07', '2025-09-29', 'Tasker', 'Naidu', 'Small', 'Sprint 3'),
('Reports', 'Generate user reports', 'High', 'Done', '2025-10-10', '2025-10-01', 'Tasker', 'Vamsi', 'Large', 'Sprint 3'),
('Task Search', 'Implement search functionality', 'Medium', 'Ready', '2025-10-12', '2025-10-02', 'Tasker', 'Chandu', 'Medium', 'Sprint 3'),
('Calendar Integration', 'Integrate calendar view', 'High', 'Done', '2025-10-15', '2025-10-05', 'Tasker', 'Lenin', 'Large', 'Sprint 4'),
('Export Data', 'Add export to CSV', 'Medium', 'Done', '2025-10-18', '2025-10-07', 'Tasker', 'Siva', 'Medium', 'Sprint 4'),
('Analytics Dashboard', 'Build analytics dashboard', 'High', 'In Progress', '2025-10-20', '2025-10-10', 'Web Application', 'Naveen', 'Large', 'Sprint 4'),
('Email Notifications', 'Setup automated emails', 'Medium', 'Ready', '2025-10-22', '2025-10-12', 'Web Application', 'Naidu', 'Medium', 'Sprint 4'),
('User Roles', 'Implement role-based access', 'High', 'In Progress', '2025-10-25', '2025-10-15', 'Tasker', 'Vamsi', 'Large', 'Sprint 5'),
('Password Reset', 'Add password reset feature', 'Medium', 'Ready', '2025-10-27', '2025-10-17', 'Tasker', 'Chandu', 'Small', 'Sprint 5'),
('Activity Log', 'Track user activity', 'Low', 'In Progress', '2025-10-29', '2025-10-19', 'Tasker', 'Lenin', 'Medium', 'Sprint 5'),
('File Upload', 'Allow file uploads', 'Medium', 'Ready', '2025-11-01', '2025-10-20', 'Web Application', 'Siva', 'Medium', 'Sprint 5'),
('Search Filters', 'Add filters to search', 'High', 'Done', '2025-11-03', '2025-10-22', 'Web Application', 'Naveen', 'Medium', 'Sprint 6'),
('Mobile View', 'Make UI mobile responsive', 'Medium', 'Ready', '2025-11-05', '2025-10-25', 'Web Application', 'Naidu', 'Medium', 'Sprint 6'),
('Notifications UI', 'Improve notification UI', 'Low', 'In Progress', '2025-11-07', '2025-10-27', 'Tasker', 'Vamsi', 'Small', 'Sprint 6'),
('Export Reports', 'Allow report export to PDF', 'High', 'Ready', '2025-11-10', '2025-10-30', 'Tasker', 'Chandu', 'Large', 'Sprint 6');


INSERT INTO peoples 
(name, title, organization, work_phone, mobile, role, email, password, user_id, profile_img, status)
VALUES
('Vamsi', 'N/A', 'N/A', '0000000000', '0000000000', 'admin', 'pvamsi3010@gmail.com', '$2a$10$xxl.kC/TN7Tg3BjQX91La.Iuik1QucpjvFXQNRLgMbXU9UojXiuDi', 1, 'a3e9f54b-7435-4456-953b-4cfca1ef2a26.jpg', 'active'),
('Siva', 'N/A', 'N/A', '0000000000', '0000000000', 'team member', 'siva@gmail.com', '$2a$10$zLi..4TdPZsIXVXq6PRrg.JQxBj4wuhpdx98S4x2639Rjtv8zhWza', 2, '1759414912100_image1.jpg', 'active'),
('Lenin', 'N/A', 'N/A', '0000000000', '0000000000', 'team member', 'lenin@gmail.com', '$2a$10$x60Fuu4kg6YErQ136x0JDODjfohJlNeLKW69uXMuQoO/YzXAmHEMy', 3, '87118dcf-b339-4c42-a17f-35edb0cc811e.jpeg', 'active'),
('Chandu', 'N/A', 'N/A', '0000000000', '0000000000', 'admin', 'chandu@gmail.com', '$2a$10$JLJqeKZkSugqouWUrj0h8uJw5C8zng3fwrXpIJ2Blh8qQxnJcTLsC', 4, 'default.png', 'active'),
('Naidu', 'N/A', 'N/A', '0000000000', '0000000000', 'team member', 'naidu@gmail.com', '$2a$10$57wxUlCdj7Xi1AdXxRtKzuOGIHh7V/O7CltXT/iuzLmsi638uVive', 5, '5c500734-eb41-46f6-b027-8fc522ae15d2.jpeg', 'active'),
('Naveen', 'N/A', 'N/A', '0000000000', '0000000000', 'team member', 'naveen@gmail.com', '$2a$10$FrFrg.Ot/1Zj4/c/NlsyuOojArqWK8SrXafcqpFkA8PdInEIpahFW', 6, '01638edb-7afd-4128-a281-7ae4932e042a.jpeg', 'active');
