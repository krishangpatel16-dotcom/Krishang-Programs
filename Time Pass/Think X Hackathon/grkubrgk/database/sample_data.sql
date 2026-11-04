-- Sample Data for Alumni Connect System
-- Insert sample users

-- Alumni users
INSERT INTO users (email, password_hash, first_name, last_name, graduation_year, department, role, is_verified, current_city, contact_number) VALUES
('john.doe@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'John', 'Doe', 2010, 'CSE', 'alumni', TRUE, 'San Francisco', '+1-555-0101'),
('jane.smith@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'Jane', 'Smith', 2012, 'ECE', 'alumni', TRUE, 'New York', '+1-555-0102'),
('bob.johnson@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'Bob', 'Johnson', 2015, 'ME', 'alumni', TRUE, 'Chicago', '+1-555-0103'),
('alice.williams@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'Alice', 'Williams', 2018, 'CSE', 'alumni', TRUE, 'Seattle', '+1-555-0104'),
('charlie.brown@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'Charlie', 'Brown', 2013, 'EE', 'alumni', TRUE, 'Boston', '+1-555-0105'),
('diana.prince@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW', 'Diana', 'Prince', 2016, 'IT', 'alumni', TRUE, 'Los Angeles', '+1-555-0106');

-- Insert alumni profiles
INSERT INTO alumni_profiles (user_id, bio, current_position, current_company, industry, skills, available_for_mentorship) VALUES
(2, 'Senior Software Engineer with 10+ years of experience in web development.', 'Senior Software Engineer', 'Google', 'Technology', '["JavaScript", "React", "Node.js", "Python"]', TRUE),
(3, 'Electronics engineer specializing in embedded systems and IoT.', 'Embedded Systems Engineer', 'Intel', 'Electronics', '["C/C++", "Embedded Systems", "IoT", "PCB Design"]', TRUE),
(4, 'Mechanical engineer with expertise in automotive design.', 'Mechanical Design Engineer', 'Tesla', 'Automotive', '["CAD", "SolidWorks", "FEA", "Thermal Analysis"]', FALSE),
(5, 'Full-stack developer passionate about creating scalable applications.', 'Full Stack Developer', 'Microsoft', 'Technology', '["Java", "Spring Boot", "Angular", "AWS"]', TRUE),
(6, 'Electrical engineer working on power systems and renewable energy.', 'Power Systems Engineer', 'General Electric', 'Energy', '["Power Systems", "MATLAB", "Renewable Energy", "SCADA"]', FALSE),
(7, 'IT consultant helping businesses with digital transformation.', 'IT Consultant', 'Accenture', 'Consulting', '["Cloud Computing", "DevOps", "Agile", "Project Management"]', TRUE);

-- Insert sample jobs
INSERT INTO jobs (title, company, location, description, requirements, employment_type, experience_level, posted_by, is_active) VALUES
('Senior Frontend Developer', 'TechCorp Inc.', 'San Francisco, CA', 'Looking for a senior frontend developer with React experience...', '["5+ years React", "TypeScript", "Redux"]', 'Full-time', 'Senior', 2, TRUE),
('Embedded Systems Engineer', 'IoT Solutions', 'Austin, TX', 'Design and develop embedded systems for IoT devices...', '["C/C++", "RTOS", "Embedded Linux"]', 'Full-time', 'Mid', 3, TRUE),
('Mechanical Engineer', 'AutoDesign Co.', 'Detroit, MI', 'Work on cutting-edge automotive design projects...', '["CAD", "FEA", "Automotive Experience"]', 'Full-time', 'Entry', 4, TRUE),
('Cloud Architect', 'Cloud Masters', 'Remote', 'Design and implement cloud infrastructure solutions...', '["AWS", "Azure", "Terraform", "Kubernetes"]', 'Remote', 'Senior', 5, TRUE);

-- Insert sample donations
INSERT INTO donations (donor_id, amount, purpose, payment_method, status, is_anonymous) VALUES
(2, 1000.00, 'scholarship', 'credit_card', 'completed', FALSE),
(3, 500.00, 'infrastructure', 'paypal', 'completed', TRUE),
(4, 250.00, 'research', 'bank_transfer', 'completed', FALSE),
(5, 100.00, 'general', 'credit_card', 'completed', FALSE);

-- Insert sample events
INSERT INTO events (title, description, event_date, location, event_type, organizer_id, max_attendees) VALUES
('Annual Alumni Reunion 2024', 'Join us for the annual alumni reunion and networking event.', '2024-06-15 18:00:00', 'College Campus Auditorium', 'reunion', 2, 200),
('Tech Career Workshop', 'Workshop on latest tech trends and career opportunities.', '2024-05-20 14:00:00', 'Virtual (Zoom)', 'workshop', 3, 100),
('Startup Funding Seminar', 'Learn about venture capital and startup funding.', '2024-07-10 10:00:00', 'Innovation Center', 'seminar', 4, 150);

-- Insert sample stories
INSERT INTO stories (title, content, author_id, category, is_published, is_featured, published_at) VALUES
('From Campus to CEO: My Journey', 'Ten years ago, I was sitting in the same classrooms as you...', 2, 'entrepreneurship', TRUE, TRUE, '2024-01-15 10:00:00'),
('Breaking into Tech: A Guide for Graduates', 'The tech industry can seem daunting, but here''s how I made it...', 3, 'career', TRUE, FALSE, '2024-02-20 14:30:00'),
('Research that Changed Lives', 'Our team''s research in renewable energy has impacted communities...', 5, 'research', TRUE, TRUE, '2024-03-10 09:00:00');

-- Insert event registrations
INSERT INTO event_registrations (event_id, user_id, status) VALUES
(1, 3, 'registered'),
(1, 4, 'registered'),
(1, 5, 'registered'),
(2, 2, 'registered'),
(2, 6, 'registered');

-- Insert job applications
INSERT INTO job_applications (job_id, applicant_id, cover_letter, status) VALUES
(1, 3, 'I am very interested in this position...', 'pending'),
(1, 4, 'With my experience in React...', 'reviewed'),
(2, 5, 'I have extensive experience in embedded systems...', 'shortlisted');

-- Insert story comments
INSERT INTO story_comments (story_id, user_id, comment) VALUES
(1, 3, 'Inspiring story! Thank you for sharing.'),
(1, 4, 'This gives me hope for my own journey.'),
(2, 2, 'Great advice for recent graduates!');

-- Insert story likes
INSERT INTO story_likes (story_id, user_id) VALUES
(1, 3),
(1, 4),
(1, 5),
(2, 3),
(3, 2);

-- Insert connection requests
INSERT INTO connection_requests (requester_id, recipient_id, message, status) VALUES
(3, 2, 'Would love to connect and learn from your experience!', 'accepted'),
(4, 2, 'Fellow CSE graduate here, let''s connect!', 'pending'),
(5, 3, 'Interested in discussing embedded systems.', 'accepted');

-- Insert accepted connections
INSERT INTO connections (user1_id, user2_id) VALUES
(2, 3), -- John and Bob are connected
(3, 5); -- Bob and Charlie are connected

-- Insert notifications
INSERT INTO notifications (user_id, type, title, message, reference_id) VALUES
(2, 'connection_request', 'New Connection Request', 'Bob Johnson wants to connect with you', 3),
(3, 'story_comment', 'New Comment on Your Story', 'Alice Williams commented on your story', 1),
(4, 'job_application', 'Job Application Received', 'Your application for Senior Frontend Developer has been received', 1);

-- Insert feedback
INSERT INTO feedback (user_id, category, title, description, rating, status) VALUES
(2, 'feature', 'Great Platform!', 'The alumni directory feature is very useful.', 5, 'new'),
(3, 'suggestion', 'Mobile App Request', 'Please develop a mobile app for better accessibility.', 4, 'reviewed'),
(4, 'general', 'User Interface', 'The UI could be more intuitive.', 3, 'new');

-- Insert mentorship requests
INSERT INTO mentorship_requests (mentee_id, mentor_id, message, areas, status) VALUES
(3, 2, 'I would appreciate guidance on career growth in tech.', '["Career Advice", "Technical Skills"]', 'pending'),
(4, 3, 'Looking for mentorship in embedded systems.', '["Embedded Systems", "Career Transition"]', 'accepted');

-- Verify data insertion
SELECT 'Users:' as Table_Name, COUNT(*) as Count FROM users UNION ALL
SELECT 'Alumni Profiles:', COUNT(*) FROM alumni_profiles UNION ALL
SELECT 'Jobs:', COUNT(*) FROM jobs UNION ALL
SELECT 'Donations:', COUNT(*) FROM donations UNION ALL
SELECT 'Events:', COUNT(*) FROM events UNION ALL
SELECT 'Stories:', COUNT(*) FROM stories UNION ALL
SELECT 'Connections:', COUNT(*) FROM connections;