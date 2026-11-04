// script.js - Main JavaScript for Alumni Connect System

// ========================
// GLOBAL VARIABLES & STATE
// ========================
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let authToken = localStorage.getItem('token');

// ========================
// DOM ELEMENT SELECTORS
// ========================
const DOM = {
    // Authentication elements
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    logoutBtn: document.getElementById('logoutBtn'),
    
    // Dashboard elements
    dashboard: document.getElementById('dashboard'),
    userWelcome: document.getElementById('userWelcome'),
    
    // Alumni directory
    alumniGrid: document.getElementById('alumniGrid'),
    searchInput: document.getElementById('searchAlumni'),
    filterYear: document.getElementById('filterYear'),
    filterIndustry: document.getElementById('filterIndustry'),
    
    // Job portal
    jobsContainer: document.getElementById('jobsContainer'),
    postJobForm: document.getElementById('postJobForm'),
    
    // Events
    eventsContainer: document.getElementById('eventsContainer'),
    calendar: document.getElementById('calendar'),
    
    // Donations
    donateForm: document.getElementById('donateForm'),
    donationTotal: document.getElementById('donationTotal'),
    
    // Success stories
    storiesContainer: document.getElementById('storiesContainer'),
    
    // Modals
    profileModal: document.getElementById('profileModal'),
    jobModal: document.getElementById('jobModal'),
    eventModal: document.getElementById('eventModal')
};

// ========================
// AUTHENTICATION FUNCTIONS
// ========================
class AuthManager {
    constructor() {
        this.initAuth();
    }
    
    initAuth() {
        this.checkAuthStatus();
        this.setupAuthListeners();
    }
    
    checkAuthStatus() {
        const token = localStorage.getItem('token');
        if (token) {
            this.validateToken(token);
        } else {
            this.showLoginPage();
        }
    }
    
    async validateToken(token) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (response.ok) {
                const userData = await response.json();
                currentUser = userData;
                this.showDashboard();
            } else {
                this.logout();
            }
        } catch (error) {
            console.error('Token validation failed:', error);
            this.logout();
        }
    }
    
    async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                localStorage.setItem('token', data.token);
                currentUser = data.user;
                this.showDashboard();
                UI.showNotification('Login successful!', 'success');
                return true;
            } else {
                UI.showNotification(data.error || 'Login failed', 'error');
                return false;
            }
        } catch (error) {
            console.error('Login error:', error);
            UI.showNotification('Network error. Please try again.', 'error');
            return false;
        }
    }
    
    async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                UI.showNotification('Registration successful! Please login.', 'success');
                return true;
            } else {
                UI.showNotification(data.error || 'Registration failed', 'error');
                return false;
            }
        } catch (error) {
            console.error('Registration error:', error);
            UI.showNotification('Network error. Please try again.', 'error');
            return false;
        }
    }
    
    logout() {
        localStorage.removeItem('token');
        currentUser = null;
        this.showLoginPage();
        UI.showNotification('Logged out successfully', 'info');
    }
    
    showLoginPage() {
        document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
        document.getElementById('loginPage')?.classList.remove('hidden');
        document.getElementById('registerPage')?.classList.add('hidden');
    }
    
    showDashboard() {
        document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
        document.getElementById('dashboard')?.classList.remove('hidden');
        this.updateUserWelcome();
        this.loadDashboardData();
    }
    
    updateUserWelcome() {
        if (DOM.userWelcome && currentUser) {
            DOM.userWelcome.innerHTML = `
                <h2>Welcome back, ${currentUser.full_name}!</h2>
                <p>Class of ${currentUser.graduation_year || 'N/A'}</p>
            `;
        }
    }
    
    setupAuthListeners() {
        if (DOM.loginForm) {
            DOM.loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                UI.showLoader(DOM.loginForm);
                await this.login(email, password);
                UI.hideLoader(DOM.loginForm);
            });
        }
        
        if (DOM.logoutBtn) {
            DOM.logoutBtn.addEventListener('click', () => this.logout());
        }
    }
}

// ========================
// ALUMNI DIRECTORY FUNCTIONS
// ========================
class AlumniManager {
    static async loadAlumni(filters = {}) {
        try {
            // Build query string from filters
            const queryParams = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_BASE_URL}/alumni?${queryParams}`, {
                headers: this.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch alumni');
            
            const alumni = await response.json();
            this.renderAlumniGrid(alumni);
            return alumni;
        } catch (error) {
            console.error('Error loading alumni:', error);
            UI.showNotification('Failed to load alumni directory', 'error');
            return [];
        }
    }
    
    static renderAlumniGrid(alumni) {
        if (!DOM.alumniGrid) return;
        
        if (alumni.length === 0) {
            DOM.alumniGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-users-slash"></i>
                    <h3>No alumni found</h3>
                    <p>Try adjusting your search filters</p>
                </div>
            `;
            return;
        }
        
        DOM.alumniGrid.innerHTML = alumni.map(alum => `
            <div class="alumni-card" onclick="AlumniManager.showAlumniProfile(${alum.id})">
                <div class="alumni-avatar">
                    ${alum.full_name ? alum.full_name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div class="alumni-info">
                    <h3>${alum.full_name || 'Alumni Name'}</h3>
                    <p class="graduation">Class of ${alum.graduation_year || 'N/A'}</p>
                    ${alum.current_company ? `<p class="company"><i class="fas fa-building"></i> ${alum.current_company}</p>` : ''}
                    ${alum.position ? `<p class="position"><i class="fas fa-briefcase"></i> ${alum.position}</p>` : ''}
                    ${alum.location ? `<p class="location"><i class="fas fa-map-marker-alt"></i> ${alum.location}</p>` : ''}
                </div>
                <div class="alumni-actions">
                    <button class="btn-connect" onclick="event.stopPropagation(); AlumniManager.connect(${alum.id})">
                        <i class="fas fa-user-plus"></i> Connect
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    static async showAlumniProfile(alumniId) {
        try {
            const response = await fetch(`${API_BASE_URL}/alumni/${alumniId}`, {
                headers: this.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch profile');
            
            const alumni = await response.json();
            this.renderAlumniModal(alumni);
        } catch (error) {
            console.error('Error loading alumni profile:', error);
            UI.showNotification('Failed to load profile', 'error');
        }
    }
    
    static renderAlumniModal(alumni) {
        if (!DOM.profileModal) return;
        
        const modalContent = `
            <div class="modal-header">
                <h2>${alumni.full_name}</h2>
                <button class="modal-close" onclick="UI.closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="profile-header">
                    <div class="profile-avatar-large">
                        ${alumni.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div class="profile-info">
                        <h3>${alumni.full_name}</h3>
                        <p>Class of ${alumni.graduation_year}</p>
                        <p>${alumni.degree || ''}</p>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="detail-section">
                        <h4><i class="fas fa-briefcase"></i> Career</h4>
                        <p><strong>Company:</strong> ${alumni.current_company || 'Not specified'}</p>
                        <p><strong>Position:</strong> ${alumni.position || 'Not specified'}</p>
                        <p><strong>Industry:</strong> ${alumni.industry || 'Not specified'}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
                        <p>${alumni.location || 'Not specified'}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                        <p><strong>Degree:</strong> ${alumni.degree || 'Not specified'}</p>
                        <p><strong>Graduation Year:</strong> ${alumni.graduation_year}</p>
                    </div>
                    
                    ${alumni.bio ? `
                    <div class="detail-section">
                        <h4><i class="fas fa-user"></i> Bio</h4>
                        <p>${alumni.bio}</p>
                    </div>
                    ` : ''}
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-primary" onclick="AlumniManager.connect(${alumni.id})">
                        <i class="fas fa-user-plus"></i> Connect
                    </button>
                    <button class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> Send Message
                    </button>
                </div>
            </div>
        `;
        
        DOM.profileModal.innerHTML = modalContent;
        UI.openModal(DOM.profileModal);
    }
    
    static async connect(alumniId) {
        if (!currentUser) {
            UI.showNotification('Please login to connect', 'warning');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/connections`, {
                method: 'POST',
                headers: this.getAuthHeaders(),
                body: JSON.stringify({ alumni_id: alumniId })
            });
            
            if (response.ok) {
                UI.showNotification('Connection request sent!', 'success');
            }
        } catch (error) {
            console.error('Error sending connection:', error);
            UI.showNotification('Failed to send connection request', 'error');
        }
    }
    
    static getAuthHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        };
    }
    
    static setupSearchFilters() {
        if (DOM.searchInput) {
            let searchTimeout;
            DOM.searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.loadAlumni({ search: e.target.value });
                }, 300);
            });
        }
        
        if (DOM.filterYear) {
            DOM.filterYear.addEventListener('change', (e) => {
                const filters = { year: e.target.value };
                this.loadAlumni(filters);
            });
        }
        
        if (DOM.filterIndustry) {
            DOM.filterIndustry.addEventListener('change', (e) => {
                const filters = { industry: e.target.value };
                this.loadAlumni(filters);
            });
        }
    }
}

// ========================
// JOB PORTAL FUNCTIONS
// ========================
class JobManager {
    static async loadJobs() {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs`, {
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch jobs');
            
            const jobs = await response.json();
            this.renderJobs(jobs);
            return jobs;
        } catch (error) {
            console.error('Error loading jobs:', error);
            UI.showNotification('Failed to load job listings', 'error');
            return [];
        }
    }
    
    static renderJobs(jobs) {
        if (!DOM.jobsContainer) return;
        
        if (jobs.length === 0) {
            DOM.jobsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-briefcase"></i>
                    <h3>No job listings available</h3>
                    <p>Be the first to post a job opportunity!</p>
                </div>
            `;
            return;
        }
        
        DOM.jobsContainer.innerHTML = jobs.map(job => `
            <div class="job-card">
                <div class="job-header">
                    <h3>${job.position}</h3>
                    <span class="job-type ${job.job_type}">${job.job_type}</span>
                </div>
                <p class="company"><i class="fas fa-building"></i> ${job.company_name}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${job.location || 'Remote'}</p>
                <p class="description">${job.description.substring(0, 150)}...</p>
                <div class="job-footer">
                    <span class="posted-by">Posted by: ${job.posted_by_name || 'Alumni'}</span>
                    <div class="job-actions">
                        <button class="btn-view" onclick="JobManager.viewJob(${job.id})">
                            View Details
                        </button>
                        <button class="btn-apply" onclick="JobManager.applyJob(${job.id})">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    static async viewJob(jobId) {
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch job details');
            
            const job = await response.json();
            this.renderJobModal(job);
        } catch (error) {
            console.error('Error loading job:', error);
            UI.showNotification('Failed to load job details', 'error');
        }
    }
    
    static renderJobModal(job) {
        if (!DOM.jobModal) return;
        
        const modalContent = `
            <div class="modal-header">
                <h2>${job.position}</h2>
                <button class="modal-close" onclick="UI.closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="job-details">
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-building"></i> Company:</span>
                        <span class="detail-value">${job.company_name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-map-marker-alt"></i> Location:</span>
                        <span class="detail-value">${job.location || 'Remote'}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-briefcase"></i> Job Type:</span>
                        <span class="detail-value ${job.job_type}">${job.job_type}</span>
                    </div>
                    ${job.salary_range ? `
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-money-bill-wave"></i> Salary:</span>
                        <span class="detail-value">${job.salary_range}</span>
                    </div>
                    ` : ''}
                    <div class="detail-row">
                        <span class="detail-label"><i class="fas fa-calendar-alt"></i> Deadline:</span>
                        <span class="detail-value">${new Date(job.application_deadline).toLocaleDateString()}</span>
                    </div>
                    
                    <div class="job-description">
                        <h4>Job Description</h4>
                        <p>${job.description}</p>
                    </div>
                    
                    ${job.requirements ? `
                    <div class="job-requirements">
                        <h4>Requirements</h4>
                        <p>${job.requirements}</p>
                    </div>
                    ` : ''}
                    
                    <div class="job-actions-modal">
                        <button class="btn btn-primary btn-apply-modal" onclick="JobManager.applyJob(${job.id})">
                            <i class="fas fa-paper-plane"></i> Apply Now
                        </button>
                        <button class="btn btn-secondary" onclick="UI.closeModal()">
                            Save for Later
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        DOM.jobModal.innerHTML = modalContent;
        UI.openModal(DOM.jobModal);
    }
    
    static async applyJob(jobId) {
        if (!currentUser) {
            UI.showNotification('Please login to apply', 'warning');
            return;
        }
        
        const apply = confirm('Are you sure you want to apply for this position?');
        if (!apply) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
                method: 'POST',
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (response.ok) {
                UI.showNotification('Application submitted successfully!', 'success');
            }
        } catch (error) {
            console.error('Error applying for job:', error);
            UI.showNotification('Failed to submit application', 'error');
        }
    }
    
    static setupPostJobForm() {
        if (DOM.postJobForm) {
            DOM.postJobForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!currentUser) {
                    UI.showNotification('Please login to post jobs', 'warning');
                    return;
                }
                
                const jobData = {
                    company_name: document.getElementById('companyName').value,
                    position: document.getElementById('position').value,
                    description: document.getElementById('description').value,
                    requirements: document.getElementById('requirements').value,
                    location: document.getElementById('location').value,
                    job_type: document.getElementById('jobType').value,
                    salary_range: document.getElementById('salaryRange').value,
                    application_deadline: document.getElementById('deadline').value
                };
                
                try {
                    const response = await fetch(`${API_BASE_URL}/jobs`, {
                        method: 'POST',
                        headers: AlumniManager.getAuthHeaders(),
                        body: JSON.stringify(jobData)
                    });
                    
                    if (response.ok) {
                        UI.showNotification('Job posted successfully!', 'success');
                        DOM.postJobForm.reset();
                        this.loadJobs();
                    }
                } catch (error) {
                    console.error('Error posting job:', error);
                    UI.showNotification('Failed to post job', 'error');
                }
            });
        }
    }
}

// ========================
// EVENTS MANAGEMENT
// ========================
class EventManager {
    static async loadEvents() {
        try {
            const response = await fetch(`${API_BASE_URL}/events`, {
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (!response.ok) throw new Error('Failed to fetch events');
            
            const events = await response.json();
            this.renderEvents(events);
            this.renderCalendar(events);
            return events;
        } catch (error) {
            console.error('Error loading events:', error);
            UI.showNotification('Failed to load events', 'error');
            return [];
        }
    }
    
    static renderEvents(events) {
        if (!DOM.eventsContainer) return;
        
        if (events.length === 0) {
            DOM.eventsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h3>No upcoming events</h3>
                    <p>Check back later for new events!</p>
                </div>
            `;
            return;
        }
        
        DOM.eventsContainer.innerHTML = events.map(event => `
            <div class="event-card">
                <div class="event-date">
                    <div class="event-day">${new Date(event.event_date).getDate()}</div>
                    <div class="event-month">${new Date(event.event_date).toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p class="event-time">
                        <i class="fas fa-clock"></i> ${new Date(event.event_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                    <p class="event-location">
                        <i class="fas fa-map-marker-alt"></i> ${event.location}
                    </p>
                    <p class="event-type ${event.event_type}">${event.event_type}</p>
                    <p class="event-description">${event.description.substring(0, 100)}...</p>
                </div>
                <div class="event-actions">
                    <button class="btn-rsvp" onclick="EventManager.rsvpToEvent(${event.id})">
                        <i class="fas fa-calendar-check"></i> RSVP
                    </button>
                    <button class="btn-view-event" onclick="EventManager.viewEvent(${event.id})">
                        Details
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    static renderCalendar(events) {
        if (!DOM.calendar) return;
        
        // Simplified calendar view
        const today = new Date();
        const upcomingEvents = events.filter(event => 
            new Date(event.event_date) >= today
        ).slice(0, 5);
        
        DOM.calendar.innerHTML = `
            <h3>Upcoming Events</h3>
            <div class="calendar-list">
                ${upcomingEvents.map(event => `
                    <div class="calendar-item">
                        <div class="calendar-date">
                            ${new Date(event.event_date).toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div class="calendar-title">${event.title}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    static async rsvpToEvent(eventId) {
        if (!currentUser) {
            UI.showNotification('Please login to RSVP', 'warning');
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/events/${eventId}/rsvp`, {
                method: 'POST',
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (response.ok) {
                UI.showNotification('RSVP confirmed!', 'success');
            }
        } catch (error) {
            console.error('Error RSVPing to event:', error);
            UI.showNotification('Failed to RSVP', 'error');
        }
    }
}

// ========================
// DONATION SYSTEM
// ========================
class DonationManager {
    static async loadDonationStats() {
        try {
            const response = await fetch(`${API_BASE_URL}/donations/stats`, {
                headers: AlumniManager.getAuthHeaders()
            });
            
            if (response.ok) {
                const stats = await response.json();
                if (DOM.donationTotal) {
                    DOM.donationTotal.textContent = `₹${stats.total.toLocaleString()}`;
                }
            }
        } catch (error) {
            console.error('Error loading donation stats:', error);
        }
    }
    
    static setupDonationForm() {
        if (DOM.donateForm) {
            DOM.donateForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                if (!currentUser) {
                    UI.showNotification('Please login to donate', 'warning');
                    return;
                }
                
                const donationData = {
                    amount: parseFloat(document.getElementById('amount').value),
                    donation_type: document.getElementById('donationType').value,
                    message: document.getElementById('message').value,
                    is_anonymous: document.getElementById('anonymous').checked
                };
                
                try {
                    const response = await fetch(`${API_BASE_URL}/donations`, {
                        method: 'POST',
                        headers: AlumniManager.getAuthHeaders(),
                        body: JSON.stringify(donationData)
                    });
                    
                    if (response.ok) {
                        UI.showNotification('Thank you for your donation!', 'success');
                        DOM.donateForm.reset();
                        this.loadDonationStats();
                        
                        // Simulate payment success
                        this.showReceipt(donationData);
                    }
                } catch (error) {
                    console.error('Error processing donation:', error);
                    UI.showNotification('Donation failed. Please try again.', 'error');
                }
            });
        }
    }
    
    static showReceipt(donation) {
        const receiptModal = document.createElement('div');
        receiptModal.className = 'modal';
        receiptModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Donation Receipt</h2>
                    <button class="modal-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="receipt-details">
                        <p><strong>Transaction ID:</strong> DON-${Date.now()}</p>
                        <p><strong>Amount:</strong> ₹${donation.amount.toFixed(2)}</p>
                        <p><strong>Type:</strong> ${donation.donation_type}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <p><strong>Status:</strong> <span class="text-success">Completed</span></p>
                        ${donation.message ? `<p><strong>Message:</strong> ${donation.message}</p>` : ''}
                    </div>
                    <div class="receipt-thankyou">
                        <i class="fas fa-heart text-danger"></i>
                        <p>Thank you for supporting our alma mater!</