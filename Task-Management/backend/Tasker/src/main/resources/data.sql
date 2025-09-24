ALTER TABLE projects MODIFY id INT NOT NULL AUTO_INCREMENT;
INSERT INTO projects (proj_name, created_by) VALUES ('Project1', 'Vamsi');
INSERT INTO projects (proj_name, created_by) VALUES ('Project2', 'Alice');
INSERT INTO cards (title, description, priority, status, due_date, estimate_date, project_name, person_name, size, sprint)
VALUES 
('Login Feature', 'Implement user login', 'High', 'Ready', '2025-09-25', '2025-09-20', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 1'),
('Registration', 'User registration page', 'Medium', 'In Progress', '2025-09-28', '2025-09-22', 'TaskerApp', 'Vamsi', 'Small', 'Sprint 1'),
('Dashboard', 'Create main dashboard', 'High', 'Ready', '2025-10-01', '2025-09-25', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 2'),
('Profile Page', 'Implement user profile', 'Low', 'Ready', '2025-10-03', '2025-09-26', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 2'),
('Notifications', 'Add notifications system', 'Medium', 'In Progress', '2025-10-05', '2025-09-28', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 2'),
('Settings', 'Implement settings page', 'Low', 'In Progress', '2025-10-07', '2025-09-29', 'TaskerApp', 'Vamsi', 'Small', 'Sprint 3'),
('Reports', 'Generate user reports', 'High', 'Done', '2025-10-10', '2025-10-01', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 3'),
('Task Search', 'Implement search functionality', 'Medium', 'Ready', '2025-10-12', '2025-10-02', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 3'),
('Calendar Integration', 'Integrate calendar view', 'High', 'Done', '2025-10-15', '2025-10-05', 'TaskerApp', 'Vamsi', 'Large', 'Sprint 4'),
('Export Data', 'Add export to CSV', 'Medium', 'Done', '2025-10-18', '2025-10-07', 'TaskerApp', 'Vamsi', 'Medium', 'Sprint 4');

INSERT INTO peoples
(name, title, organization, work_phone, mobile, email, password, user_id, profile_img)
VALUES
('Alice Johnson', 'Manager', 'TechCorp', 1234567890, 9876543210, 'alice@example.com', 'alice123', 'alice01', LOAD_FILE('C:\Users\91832\Downloads\ramcharan.jpg')),
('Bob Smith', 'Developer', 'DevSolutions', 2345678901, 8765432109, 'bob@example.com', 'bob123', 'bob01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image2.jpeg')),
('Carol White', 'Designer', 'DesignHub', 3456789012, 7654321098, 'carol@example.com', 'carol123', 'carol01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image3.jpeg')),
('David Lee', 'QA Engineer', 'TestWorks', 4567890123, 6543210987, 'david@example.com', 'david123', 'david01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image4.jpeg')),
('Eva Brown', 'HR', 'PeopleFirst', 5678901234, 5432109876, 'eva@example.com', 'eva123', 'eva01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image5.jpeg')),
('Frank Green', 'Support', 'HelpDesk', 6789012345, 4321098765, 'frank@example.com', 'frank123', 'frank01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image1.jpeg')),
('Grace Hall', 'Consultant', 'BizConsult', 7890123456, 3210987654, 'grace@example.com', 'grace123', 'grace01', LOAD_FILE('C:\Users\vamsi\Task Management Project\Task-Management\frontend\task-managent\src\assets\image2.jpeg'));
