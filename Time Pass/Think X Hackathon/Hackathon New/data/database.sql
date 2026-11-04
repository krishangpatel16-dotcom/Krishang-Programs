-- alumni.sql
CREATE DATABASE alumni_portal;
USE alumni_portal;

-- Users/Alumni Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    graduation_year INT,
    degree VARCHAR(100),
    current_company VARCHAR(255),
    position VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(255),
    profile_picture_url VARCHAR(500),
    bio TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Alumni Directory Extended Info
CREATE TABLE alumni_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    skills TEXT,
    interests TEXT,
    linkedin_url VARCHAR(500),
    github_url VARCHAR(500),
    website_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Job Portal
CREATE TABLE job_listings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    posted_by INT,
    company_name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(255),
    job_type ENUM('full-time', 'part-time', 'internship', 'contract'),
    salary_range VARCHAR(100),
    application_deadline DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE
);

-- Donations
CREATE TABLE donations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    donor_id INT,
    amount DECIMAL(10,2) NOT NULL,
    donation_type VARCHAR(100),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Events
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATETIME,
    location VARCHAR(255),
    event_type ENUM('reunion', 'workshop', 'networking', 'webinar'),
    max_attendees INT,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Success Stories
CREATE TABLE success_stories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    alumni_id INT,
    title VARCHAR(255) NOT NULL,
    story TEXT NOT NULL,
    category VARCHAR(100),
    featured_image_url VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumni_id) REFERENCES users(id)
);