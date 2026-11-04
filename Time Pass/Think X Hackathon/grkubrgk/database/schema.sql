-- Alumni Connect Database Schema
-- MySQL/MariaDB

-- Create database
CREATE DATABASE IF NOT EXISTS alumni_connect;
USE alumni_connect;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    graduation_year INT NOT NULL,
    department ENUM('CSE', 'ECE', 'ME', 'CE', 'EE', 'IT') NOT NULL,
    role ENUM('alumni', 'admin', 'student') DEFAULT 'alumni',
    profile_picture VARCHAR(500),
    contact_number VARCHAR(20),
    current_city VARCHAR(100),
    current_country VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_password_token VARCHAR(255),
    reset_password_expires DATETIME,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_graduation_year (graduation_year),
    INDEX idx_department (department)
);

-- Alumni profiles table
CREATE TABLE alumni_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,
    bio TEXT,
    current_position VARCHAR(200),
    current_company VARCHAR(200),
    industry VARCHAR(100),
    skills JSON,
    social_links JSON,
    interests JSON,
    available_for_mentorship BOOLEAN DEFAULT FALSE,
    mentorship_areas JSON,
    visibility ENUM('public', 'alumni-only', 'private') DEFAULT 'alumni-only',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_industry (industry),
    INDEX idx_mentorship (available_for_mentorship)
);

-- Work experience table
CREATE TABLE work_experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_id INT NOT NULL,
    position VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    FOREIGN KEY (profile_id) REFERENCES alumni_profiles(id) ON DELETE CASCADE,
    INDEX idx_profile (profile_id)
);

-- Education table
CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    profile_id INT NOT NULL,
    degree VARCHAR(200) NOT NULL,
    institution VARCHAR(200) NOT NULL,
    field_of_study VARCHAR(200),
    start_year INT NOT NULL,
    end_year INT,
    FOREIGN KEY (profile_id) REFERENCES alumni_profiles(id) ON DELETE CASCADE
);

-- Jobs table
CREATE TABLE jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    requirements JSON,
    skills_required JSON,
    employment_type ENUM('Full-time', 'Part-time', 'Contract', 'Internship', 'Remote') DEFAULT 'Full-time',
    experience_level ENUM('Entry', 'Mid', 'Senior', 'Executive') DEFAULT 'Mid',
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    salary_currency VARCHAR(3) DEFAULT 'USD',
    posted_by INT NOT NULL,
    contact_email VARCHAR(255),
    application_link VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    application_deadline DATE,
    tags JSON,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id),
    INDEX idx_company (company),
    INDEX idx_location (location),
    INDEX idx_employment_type (employment_type),
    FULLTEXT idx_search (title, description, company)
);

-- Job applications table
CREATE TABLE job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    job_id INT NOT NULL,
    applicant_id INT NOT NULL,
    cover_letter TEXT,
    resume_path VARCHAR(500),
    status ENUM('pending', 'reviewed', 'shortlisted', 'rejected') DEFAULT 'pending',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (applicant_id) REFERENCES users(id),
    UNIQUE KEY unique_application (job_id, applicant_id),
    INDEX idx_status (status)
);

-- Donations table
CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    purpose ENUM('scholarship', 'infrastructure', 'research', 'event', 'general') DEFAULT 'general',
    specific_purpose VARCHAR(500),
    payment_method ENUM('credit_card', 'paypal', 'bank_transfer', 'upi') NOT NULL,
    transaction_id VARCHAR(255) UNIQUE,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    is_anonymous BOOLEAN DEFAULT FALSE,
    message TEXT,
    receipt_sent BOOLEAN DEFAULT FALSE,
    receipt_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    FOREIGN KEY (donor_id) REFERENCES users(id),
    INDEX idx_donor (donor_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Events table
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    event_date DATETIME NOT NULL,
    end_date DATETIME,
    location VARCHAR(200) NOT NULL,
    venue VARCHAR(500),
    event_type ENUM('reunion', 'workshop', 'seminar', 'networking', 'career_fair', 'webinar') DEFAULT 'networking',
    organizer_id INT NOT NULL,
    max_attendees INT,
    cover_image VARCHAR(500),
    is_virtual BOOLEAN DEFAULT FALSE,
    meeting_link VARCHAR(500),
    registration_deadline DATE,
    registration_fee DECIMAL(10,2),
    registration_fee_currency VARCHAR(3) DEFAULT 'USD',
    tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (organizer_id) REFERENCES users(id),
    INDEX idx_event_date (event_date),
    INDEX idx_event_type (event_type),
    FULLTEXT idx_event_search (title, description, location)
);

-- Event registrations table
CREATE TABLE event_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    user_id INT NOT NULL,
    status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_registration (event_id, user_id),
    INDEX idx_status (status)
);

-- Event speakers table
CREATE TABLE event_speakers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    designation VARCHAR(200),
    company VARCHAR(200),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Event agenda table
CREATE TABLE event_agenda (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT NOT NULL,
    agenda_time VARCHAR(50) NOT NULL,
    agenda_title VARCHAR(200) NOT NULL,
    agenda_description TEXT,
    speaker_name VARCHAR(200),
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Stories table
CREATE TABLE stories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INT NOT NULL,
    category ENUM('career', 'entrepreneurship', 'research', 'achievement', 'philanthropy', 'mentorship') DEFAULT 'career',
    featured_image VARCHAR(500),
    tags JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT FALSE,
    published_at DATETIME,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id),
    INDEX idx_category (category),
    INDEX idx_featured (is_featured),
    INDEX idx_published (is_published),
    FULLTEXT idx_story_search (title, content)
);

-- Story likes table
CREATE TABLE story_likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL,
    user_id INT NOT NULL,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_like (story_id, user_id)
);

-- Story comments table
CREATE TABLE story_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    story_id INT NOT NULL,
    user_id INT NOT NULL,
    comment TEXT NOT NULL,
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    parent_comment_id INT,
    FOREIGN KEY (story_id) REFERENCES stories(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (parent_comment_id) REFERENCES story_comments(id) ON DELETE CASCADE,
    INDEX idx_story (story_id)
);

-- Connection requests table
CREATE TABLE connection_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    requester_id INT NOT NULL,
    recipient_id INT NOT NULL,
    message TEXT,
    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at DATETIME,
    FOREIGN KEY (requester_id) REFERENCES users(id),
    FOREIGN KEY (recipient_id) REFERENCES users(id),
    UNIQUE KEY unique_request (requester_id, recipient_id),
    INDEX idx_status (status)
);

-- Connections table (for accepted connections)
CREATE TABLE connections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user1_id INT NOT NULL,
    user2_id INT NOT NULL,
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user1_id) REFERENCES users(id),
    FOREIGN KEY (user2_id) REFERENCES users(id),
    UNIQUE KEY unique_connection (user1_id, user2_id),
    CHECK (user1_id < user2_id) -- Ensure unique pairs
);

-- Notifications table
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('connection_request', 'job_application', 'event_registration', 'donation_receipt', 'story_comment', 'mentorship_request') NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    reference_id INT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read)
);

-- User tokens table (for JWT token management)
CREATE TABLE user_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(500) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user (user_id)
);

-- Feedback table
CREATE TABLE feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    category ENUM('general', 'bug', 'feature', 'suggestion') DEFAULT 'general',
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    status ENUM('new', 'reviewed', 'in_progress', 'resolved') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_category (category)
);

-- Mentorship requests table
CREATE TABLE mentorship_requests (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mentee_id INT NOT NULL,
    mentor_id INT NOT NULL,
    message TEXT NOT NULL,
    areas JSON,
    status ENUM('pending', 'accepted', 'rejected', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at DATETIME,
    completed_at DATETIME,
    FOREIGN KEY (mentee_id) REFERENCES users(id),
    FOREIGN KEY (mentor_id) REFERENCES users(id),
    INDEX idx_status (status),
    INDEX idx_mentor (mentor_id)
);

-- Insert sample admin user
INSERT INTO users (email, password_hash, first_name, last_name, graduation_year, department, role, is_verified)
VALUES (
    'admin@alumni.com',
    -- Password: Admin@123 (hashed with bcrypt)
    '$2a$10$N9qo8uLOickgx2ZMRZoMye3EZF7HdK5kQ7pOW.QQR7H7.6v6YvzJW',
    'System',
    'Administrator',
    2000,
    'CSE',
    'admin',
    TRUE
);

-- Create views for reporting
CREATE VIEW alumni_summary AS
SELECT 
    u.department,
    COUNT(*) as total_alumni,
    AVG(YEAR(CURRENT_DATE) - u.graduation_year) as avg_years_since_graduation,
    COUNT(DISTINCT ap.current_company) as unique_companies
FROM users u
LEFT JOIN alumni_profiles ap ON u.id = ap.user_id
WHERE u.role = 'alumni'
GROUP BY u.department;

CREATE VIEW monthly_donations AS
SELECT 
    DATE_FORMAT(d.created_at, '%Y-%m') as month,
    COUNT(*) as donation_count,
    SUM(d.amount) as total_amount
FROM donations d
WHERE d.status = 'completed'
GROUP BY DATE_FORMAT(d.created_at, '%Y-%m')
ORDER BY month DESC;

CREATE VIEW active_jobs_summary AS
SELECT 
    j.company,
    COUNT(*) as active_jobs,
    AVG(j.salary_min + j.salary_max) / 2 as avg_salary
FROM jobs j
WHERE j.is_active = TRUE 
AND j.application_deadline >= CURRENT_DATE
GROUP BY j.company
ORDER BY active_jobs DESC;

-- Create stored procedure for alumni search
DELIMITER //
CREATE PROCEDURE search_alumni(
    IN search_term VARCHAR(255),
    IN grad_year INT,
    IN dept VARCHAR(10),
    IN industry_filter VARCHAR(100)
)
BEGIN
    SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        u.graduation_year,
        u.department,
        u.profile_picture,
        ap.current_position,
        ap.current_company,
        ap.industry,
        ap.skills
    FROM users u
    LEFT JOIN alumni_profiles ap ON u.id = ap.user_id
    WHERE u.role = 'alumni'
    AND (
        search_term IS NULL OR
        u.first_name LIKE CONCAT('%', search_term, '%') OR
        u.last_name LIKE CONCAT('%', search_term, '%') OR
        ap.current_company LIKE CONCAT('%', search_term, '%') OR
        ap.current_position LIKE CONCAT('%', search_term, '%')
    )
    AND (grad_year IS NULL OR u.graduation_year = grad_year)
    AND (dept IS NULL OR u.department = dept)
    AND (industry_filter IS NULL OR ap.industry LIKE CONCAT('%', industry_filter, '%'))
    ORDER BY u.last_name, u.first_name;
END //
DELIMITER ;

-- Create trigger to update alumni profile timestamp
DELIMITER //
CREATE TRIGGER update_alumni_profile_timestamp
BEFORE UPDATE ON alumni_profiles
FOR EACH ROW
BEGIN
    SET NEW.last_updated = CURRENT_TIMESTAMP;
END //
DELIMITER ;

-- Create trigger to log donation completion
DELIMITER //
CREATE TRIGGER log_donation_completion
AFTER UPDATE ON donations
FOR EACH ROW
BEGIN
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        SET NEW.completed_at = CURRENT_TIMESTAMP;
    END IF;
END //
DELIMITER ;