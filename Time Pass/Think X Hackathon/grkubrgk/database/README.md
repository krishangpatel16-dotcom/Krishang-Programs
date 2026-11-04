# Alumni Connect Database Documentation

## Overview
This database supports the Alumni Connect platform with comprehensive data management for alumni networking, job portals, donations, events, and success stories.

## Database Schema

### Core Tables

#### 1. Users (`users`)
Stores user account information for alumni, administrators, and students.

**Key Fields:**
- `email`: Unique email address
- `password_hash`: Bcrypt hashed password
- `graduation_year`: Year of graduation
- `department`: Engineering department
- `role`: User role (alumni/admin/student)
- `is_verified`: Email verification status

#### 2. Alumni Profiles (`alumni_profiles`)
Extended profile information for alumni users.

**Key Fields:**
- `current_position`: Current job title
- `current_company`: Current employer
- `industry`: Industry sector
- `skills`: JSON array of skills
- `available_for_mentorship`: Mentor availability flag

#### 3. Jobs (`jobs`)
Job postings from alumni and companies.

**Key Fields:**
- `title`: Job title
- `company`: Hiring company
- `location`: Job location
- `employment_type`: Full-time/Part-time/Contract/Remote
- `experience_level`: Required experience level
- `is_active`: Job posting status

#### 4. Donations (`donations`)
Records of alumni donations to the institution.

**Key Fields:**
- `amount`: Donation amount
- `purpose`: Donation category
- `payment_method`: Payment method used
- `status`: Transaction status
- `is_anonymous`: Anonymous donation flag

#### 5. Events (`events`)
Alumni events, reunions, and workshops.

**Key Fields:**
- `title`: Event title
- `description`: Event details
- `event_date`: Date and time
- `location`: Physical or virtual location
- `event_type`: Type of event
- `max_attendees`: Capacity limit

#### 6. Stories (`stories`)
Success stories and achievements from alumni.

**Key Fields:**
- `title`: Story title
- `content`: Story content
- `category`: Story category
- `is_featured`: Featured story flag
- `is_published`: Publication status

### Relationship Tables

#### 1. Work Experience (`work_experience`)
Stores career history for alumni profiles.

#### 2. Education (`education`)
Additional educational background.

#### 3. Job Applications (`job_applications`)
Tracks job applications from alumni.

#### 4. Event Registrations (`event_registrations`)
Manages event attendance.

#### 5. Story Interactions (`story_likes`, `story_comments`)
Handles user interactions with stories.

#### 6. Connections (`connections`, `connection_requests`)
Manages alumni networking connections.

## Indexes

### Primary Indexes
- All tables have `id` as PRIMARY KEY
- Foreign key relationships are properly indexed

### Search Indexes
- Full-text search on `jobs`, `events`, and `stories`
- Indexes on frequently searched fields
- Composite indexes for common query patterns

### Performance Indexes
- Date-based indexes for time-series data
- Status-based indexes for filtering
- User-based indexes for personal data queries

## Views

### 1. `alumni_summary`
Provides aggregated statistics about alumni by department.

**Columns:**
- `department`: Engineering department
- `total_alumni`: Count of alumni
- `avg_years_since_graduation`: Average alumni experience
- `unique_companies`: Number of unique employers

### 2. `monthly_donations`
Monthly donation trends and totals.

**Columns:**
- `month`: Year-Month format
- `donation_count`: Number of donations
- `total_amount`: Total donated amount

### 3. `active_jobs_summary`
Overview of currently active job postings.

**Columns:**
- `company`: Hiring company
- `active_jobs`: Number of active postings
- `avg_salary`: Average salary range

## Stored Procedures

### `search_alumni`
Comprehensive alumni search with multiple filters.

**Parameters:**
- `search_term`: Name, company, or position search
- `grad_year`: Graduation year filter
- `dept`: Department filter
- `industry_filter`: Industry sector filter

**Usage:**
```sql
CALL search_alumni('software', 2015, 'CSE', 'Technology');