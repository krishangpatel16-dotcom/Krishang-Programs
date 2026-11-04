// Jobs Module
class JobsService {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.auth = window.AuthService;
    }

    // Get all jobs with filters
    async getAllJobs(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add filters to query params
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/jobs?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get all jobs error:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to fetch jobs' 
            };
        }
    }

    // Get job by ID
    async getJobById(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get job by ID error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch job details' 
            };
        }
    }

    // Create job posting
    async createJob(jobData) {
        try {
            const url = `${this.baseURL}/jobs`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(jobData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create job error:', error);
            return { 
                success: false, 
                message: 'Failed to create job posting' 
            };
        }
    }

    // Update job posting
    async updateJob(jobId, jobData) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(jobData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update job error:', error);
            return { 
                success: false, 
                message: 'Failed to update job posting' 
            };
        }
    }

    // Delete job posting
    async deleteJob(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete job error:', error);
            return { 
                success: false, 
                message: 'Failed to delete job posting' 
            };
        }
    }

    // Apply for job
    async applyForJob(jobId, applicationData) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/apply`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(applicationData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Apply for job error:', error);
            return { 
                success: false, 
                message: 'Failed to apply for job' 
            };
        }
    }

    // Get my job applications
    async getMyApplications() {
        try {
            const url = `${this.baseURL}/jobs/my/applications`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get my applications error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch applications' 
            };
        }
    }

    // Get jobs posted by me
    async getMyPostedJobs() {
        try {
            const url = `${this.baseURL}/jobs/my/posted`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get my posted jobs error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch posted jobs' 
            };
        }
    }

    // Get application details
    async getApplicationDetails(applicationId) {
        try {
            const url = `${this.baseURL}/jobs/applications/${applicationId}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get application details error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch application details' 
            };
        }
    }

    // Update application status (for job poster)
    async updateApplicationStatus(applicationId, status) {
        try {
            const url = `${this.baseURL}/jobs/applications/${applicationId}/status`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update application status error:', error);
            return { 
                success: false, 
                message: 'Failed to update application status' 
            };
        }
    }

    // Withdraw application
    async withdrawApplication(applicationId) {
        try {
            const url = `${this.baseURL}/jobs/applications/${applicationId}/withdraw`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Withdraw application error:', error);
            return { 
                success: false, 
                message: 'Failed to withdraw application' 
            };
        }
    }

    // Save job
    async saveJob(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/save`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Save job error:', error);
            return { 
                success: false, 
                message: 'Failed to save job' 
            };
        }
    }

    // Unsave job
    async unsaveJob(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/unsave`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Unsave job error:', error);
            return { 
                success: false, 
                message: 'Failed to unsave job' 
            };
        }
    }

    // Get saved jobs
    async getSavedJobs() {
        try {
            const url = `${this.baseURL}/jobs/saved`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get saved jobs error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch saved jobs' 
            };
        }
    }

    // Search jobs
    async searchJobs(query, filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('search', query);
            
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/jobs/search?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Search jobs error:', error);
            return { 
                success: false, 
                message: 'Failed to search jobs' 
            };
        }
    }

    // Get job categories
    async getJobCategories() {
        try {
            const url = `${this.baseURL}/jobs/categories`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get job categories error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch job categories' 
            };
        }
    }

    // Get job statistics
    async getJobStats() {
        try {
            const url = `${this.baseURL}/jobs/stats`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get job stats error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch job statistics' 
            };
        }
    }

    // Get recommended jobs
    async getRecommendedJobs() {
        try {
            const url = `${this.baseURL}/jobs/recommended`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get recommended jobs error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch recommended jobs' 
            };
        }
    }

    // Get similar jobs
    async getSimilarJobs(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/similar`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get similar jobs error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch similar jobs' 
            };
        }
    }

    // Report job
    async reportJob(jobId, reason, description) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/report`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ reason, description })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Report job error:', error);
            return { 
                success: false, 
                message: 'Failed to report job' 
            };
        }
    }

    // Share job
    async shareJob(jobId, platform) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/share`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ platform })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Share job error:', error);
            return { 
                success: false, 
                message: 'Failed to share job' 
            };
        }
    }

    // Get job applications (for job poster)
    async getJobApplications(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/applications`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get job applications error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch job applications' 
            };
        }
    }

    // Send interview invitation
    async sendInterviewInvitation(applicationId, interviewData) {
        try {
            const url = `${this.baseURL}/jobs/applications/${applicationId}/interview`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(interviewData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Send interview invitation error:', error);
            return { 
                success: false, 
                message: 'Failed to send interview invitation' 
            };
        }
    }

    // Get interview details
    async getInterviewDetails(interviewId) {
        try {
            const url = `${this.baseURL}/jobs/interviews/${interviewId}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get interview details error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch interview details' 
            };
        }
    }

    // Update interview status
    async updateInterviewStatus(interviewId, status) {
        try {
            const url = `${this.baseURL}/jobs/interviews/${interviewId}/status`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update interview status error:', error);
            return { 
                success: false, 
                message: 'Failed to update interview status' 
            };
        }
    }

    // Upload resume
    async uploadResume(file) {
        try {
            const formData = new FormData();
            formData.append('resume', file);

            const url = `${this.baseURL}/jobs/upload-resume`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.auth.getToken()}`
                },
                body: formData
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Upload resume error:', error);
            return { 
                success: false, 
                message: 'Failed to upload resume' 
            };
        }
    }

    // Get my resumes
    async getMyResumes() {
        try {
            const url = `${this.baseURL}/jobs/my/resumes`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get my resumes error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch resumes' 
            };
        }
    }

    // Delete resume
    async deleteResume(resumeId) {
        try {
            const url = `${this.baseURL}/jobs/resumes/${resumeId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete resume error:', error);
            return { 
                success: false, 
                message: 'Failed to delete resume' 
            };
        }
    }

    // Set default resume
    async setDefaultResume(resumeId) {
        try {
            const url = `${this.baseURL}/jobs/resumes/${resumeId}/default`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Set default resume error:', error);
            return { 
                success: false, 
                message: 'Failed to set default resume' 
            };
        }
    }

    // Get application analytics
    async getApplicationAnalytics() {
        try {
            const url = `${this.baseURL}/jobs/analytics/applications`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get application analytics error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch application analytics' 
            };
        }
    }

    // Get job posting analytics
    async getJobPostingAnalytics(jobId) {
        try {
            const url = `${this.baseURL}/jobs/${jobId}/analytics`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get job posting analytics error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch job analytics' 
            };
        }
    }
}

// Create singleton instance
const jobsService = new JobsService();

// Export for use in other modules
window.JobsService = jobsService;

// Utility functions for job portal
window.renderJobPortal = async function(filters = {}) {
    const container = document.getElementById('jobPortal');
    if (!container) return;

    // Show loading state
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading job opportunities...</p>
        </div>
    `;

    try {
        const result = await jobsService.getAllJobs(filters);
        
        if (result.success) {
            if (result.data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-briefcase"></i>
                        <h3>No job opportunities found</h3>
                        <p>Try adjusting your filters or check back later</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = result.data.map(job => `
                <div class="job-listing" data-job-id="${job._id}">
                    <div class="job-listing-header">
                        <div class="job-title-section">
                            <h3 class="job-title">
                                <a href="job-details.html?id=${job._id}">${job.title}</a>
                            </h3>
                            <div class="job-meta">
                                <span class="job-company">
                                    <i class="fas fa-building"></i>
                                    ${job.company}
                                </span>
                                <span class="job-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    ${job.location}
                                </span>
                                <span class="job-type ${job.employmentType.toLowerCase()}">
                                    ${job.employmentType}
                                </span>
                            </div>
                        </div>
                        <div class="job-actions">
                            <button class="job-action-btn" onclick="handleJobAction('${job._id}')">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="job-listing-body">
                        <p class="job-description">${job.description.substring(0, 200)}...</p>
                        
                        <div class="job-details">
                            <div class="job-detail">
                                <i class="fas fa-chart-line"></i>
                                <span>${job.experienceLevel} Level</span>
                            </div>
                            ${job.salaryRange ? `
                                <div class="job-detail">
                                    <i class="fas fa-money-bill-wave"></i>
                                    <span>${formatSalary(job.salaryRange)}</span>
                                </div>
                            ` : ''}
                            <div class="job-detail">
                                <i class="fas fa-clock"></i>
                                <span>Posted ${formatTimeAgo(job.createdAt)}</span>
                            </div>
                        </div>
                        
                        ${job.skillsRequired && job.skillsRequired.length > 0 ? `
                            <div class="job-skills">
                                ${job.skillsRequired.slice(0, 5).map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                                ${job.skillsRequired.length > 5 ? `
                                    <span class="skill-tag-more">+${job.skillsRequired.length - 5} more</span>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="job-listing-footer">
                        <div class="job-stats">
                            <span class="job-stat">
                                <i class="fas fa-eye"></i>
                                ${job.views || 0} views
                            </span>
                            <span class="job-stat">
                                <i class="fas fa-user-check"></i>
                                ${job.applications?.length || 0} applications
                            </span>
                        </div>
                        <div class="job-cta">
                            <button class="btn btn-outline btn-small" onclick="saveJob('${job._id}')">
                                <i class="fas fa-bookmark"></i> Save
                            </button>
                            <button class="btn btn-primary btn-small" onclick="applyForJobModal('${job._id}')">
                                <i class="fas fa-paper-plane"></i> Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Render pagination if available
            if (result.pagination && result.pagination.pages > 1) {
                renderJobPagination(result.pagination);
            }
        } else {
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error loading jobs</h3>
                    <p>${result.message}</p>
                    <button class="btn btn-primary" onclick="renderJobPortal(${JSON.stringify(filters)})">
                        Try Again
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Render job portal error:', error);
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Network Error</h3>
                <p>Failed to load job portal. Please check your connection.</p>
                <button class="btn btn-primary" onclick="renderJobPortal(${JSON.stringify(filters)})">
                    Try Again
                </button>
            </div>
        `;
    }
};

window.formatSalary = function(salaryRange) {
    if (!salaryRange) return 'Salary not specified';
    
    const { min, max, currency } = salaryRange;
    if (min && max) {
        return `${currency || '$'}${min.toLocaleString()} - ${currency || '$'}${max.toLocaleString()}`;
    } else if (min) {
        return `From ${currency || '$'}${min.toLocaleString()}`;
    } else if (max) {
        return `Up to ${currency || '$'}${max.toLocaleString()}`;
    }
    return 'Salary not specified';
};

window.formatTimeAgo = function(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
    return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

window.renderJobPagination = function(pagination) {
    const container = document.getElementById('jobPagination');
    if (!container || !pagination) return;

    const { page, pages, total } = pagination;
    
    let paginationHTML = `
        <div class="pagination">
            <button class="pagination-btn ${page === 1 ? 'disabled' : ''}" 
                    ${page === 1 ? 'disabled' : 'onclick="changeJobPage(' + (page - 1) + ')"'}>
                <i class="fas fa-chevron-left"></i> Previous
            </button>
            
            <div class="pagination-numbers">
    `;

    // Show page numbers
    const maxVisible = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisible / 2));
    let endPage = Math.min(pages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        paginationHTML += `
            <button class="pagination-btn" onclick="changeJobPage(1)">1</button>
            ${startPage > 2 ? '<span class="pagination-ellipsis">...</span>' : ''}
        `;
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === page ? 'active' : ''}" 
                    onclick="changeJobPage(${i})">
                ${i}
            </button>
        `;
    }

    if (endPage < pages) {
        paginationHTML += `
            ${endPage < pages - 1 ? '<span class="pagination-ellipsis">...</span>' : ''}
            <button class="pagination-btn" onclick="changeJobPage(${pages})">${pages}</button>
        `;
    }

    paginationHTML += `
            </div>
            
            <button class="pagination-btn ${page === pages ? 'disabled' : ''}" 
                    ${page === pages ? 'disabled' : 'onclick="changeJobPage(' + (page + 1) + ')"'}>
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        
        <div class="pagination-info">
            Showing page ${page} of ${pages} (${total} total jobs)
        </div>
    `;

    container.innerHTML = paginationHTML;
};

window.changeJobPage = function(newPage) {
    const currentFilters = window.currentJobFilters || {};
    currentFilters.page = newPage;
    window.currentJobFilters = currentFilters;
    renderJobPortal(currentFilters);
};

window.handleJobAction = function(jobId) {
    // Show action menu
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu show';
    menu.style.position = 'absolute';
    menu.innerHTML = `
        <a href="job-details.html?id=${jobId}" class="dropdown-item">
            <i class="fas fa-eye"></i> View Details
        </a>
        <button class="dropdown-item" onclick="saveJob('${jobId}')">
            <i class="fas fa-bookmark"></i> Save Job
        </button>
        <button class="dropdown-item" onclick="shareJob('${jobId}')">
            <i class="fas fa-share-alt"></i> Share Job
        </button>
        ${window.AuthService.isAuthenticated() ? `
            <div class="dropdown-divider"></div>
            <button class="dropdown-item text-danger" onclick="reportJob('${jobId}')">
                <i class="fas fa-flag"></i> Report Job
            </button>
        ` : ''}
    `;

    // Position and show menu
    const listing = document.querySelector(`[data-job-id="${jobId}"]`);
    const rect = listing.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.right - 200 + window.scrollX}px`;
    
    document.body.appendChild(menu);

    // Close menu when clicking outside
    const closeMenu = (e) => {
        if (!menu.contains(e.target) && !listing.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 0);
};

window.saveJob = async function(jobId) {
    try {
        const result = await jobsService.saveJob(jobId);
        if (result.success) {
            showToast('Job saved successfully!', 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to save job', 'error');
    }
};

window.applyForJobModal = async function(jobId) {
    // Check if user is authenticated
    if (!window.AuthService.isAuthenticated()) {
        window.location.href = 'login.html?redirect=job-details.html?id=' + jobId;
        return;
    }

    // Get job details first
    const jobResult = await jobsService.getJobById(jobId);
    if (!jobResult.success) {
        showToast('Failed to load job details', 'error');
        return;
    }

    const job = jobResult.data;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Apply for: ${job.title}</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="applyJobForm">
                    <div class="form-group">
                        <label class="form-label">Full Name</label>
                        <input type="text" class="form-control" value="${window.AuthService.getCurrentUser()?.firstName} ${window.AuthService.getCurrentUser()?.lastName}" disabled>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-control" value="${window.AuthService.getCurrentUser()?.email}" disabled>
                    </div>
                    
                    <div class="form-group">
                        <label for="coverLetter" class="form-label">Cover Letter</label>
                        <textarea id="coverLetter" class="form-control" rows="5" 
                                  placeholder="Tell us why you're a great fit for this position..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Resume</label>
                        <div class="resume-upload">
                            <input type="file" id="resumeUpload" accept=".pdf,.doc,.docx" class="hidden">
                            <div class="upload-area" onclick="document.getElementById('resumeUpload').click()">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <p>Click to upload resume (PDF, DOC, DOCX)</p>
                                <p class="upload-hint">Max file size: 5MB</p>
                            </div>
                            <div id="resumePreview" class="resume-preview"></div>
                        </div>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="termsApply" required>
                        <label for="termsApply" class="form-check-label">
                            I agree to share my profile information with ${job.company}
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="submitJobApplication('${jobId}')">
                    Submit Application
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle file upload
    const fileInput = document.getElementById('resumeUpload');
    const previewArea = document.getElementById('resumePreview');

    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                showToast('File size must be less than 5MB', 'error');
                return;
            }

            const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!validTypes.includes(file.type)) {
                showToast('Please upload PDF or Word documents only', 'error');
                return;
            }

            previewArea.innerHTML = `
                <div class="file-preview">
                    <i class="fas fa-file-pdf"></i>
                    <div>
                        <strong>${file.name}</strong>
                        <p>${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button class="btn btn-text" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        }
    });
};

window.submitJobApplication = async function(jobId) {
    const form = document.getElementById('applyJobForm');
    const coverLetter = document.getElementById('coverLetter').value;
    const fileInput = document.getElementById('resumeUpload');
    const termsCheckbox = document.getElementById('termsApply');

    if (!termsCheckbox.checked) {
        showToast('Please agree to share your information', 'error');
        return;
    }

    if (!coverLetter.trim()) {
        showToast('Please write a cover letter', 'error');
        return;
    }

    const applicationData = {
        coverLetter: coverLetter.trim()
    };

    // If resume is uploaded, handle it
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const uploadResult = await jobsService.uploadResume(file);
        
        if (!uploadResult.success) {
            showToast(uploadResult.message, 'error');
            return;
        }
        
        applicationData.resume = uploadResult.resumePath;
    }

    try {
        const result = await jobsService.applyForJob(jobId, applicationData);
        if (result.success) {
            showToast('Application submitted successfully!', 'success');
            
            // Close modal
            const modal = document.querySelector('.modal.show');
            if (modal) modal.remove();
            
            // Update UI
            const applyBtn = document.querySelector(`[data-job-id="${jobId}"] .job-cta .btn-primary`);
            if (applyBtn) {
                applyBtn.innerHTML = '<i class="fas fa-check"></i> Applied';
                applyBtn.disabled = true;
                applyBtn.classList.remove('btn-primary');
                applyBtn.classList.add('btn-success');
            }
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to submit application', 'error');
    }
};

window.shareJob = function(jobId) {
    // Get current URL
    const url = window.location.origin + '/pages/job-details.html?id=' + jobId;
    
    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Job Opportunity</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="share-options">
                    <button class="share-option" onclick="shareToPlatform('${jobId}', 'linkedin')">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option" onclick="shareToPlatform('${jobId}', 'twitter')">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" onclick="shareToPlatform('${jobId}', 'facebook')">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" onclick="shareToPlatform('${jobId}', 'email')">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </button>
                    <button class="share-option" onclick="shareToPlatform('${jobId}', 'whatsapp')">
                        <i class="fab fa-whatsapp"></i>
                        <span>WhatsApp</span>
                    </button>
                </div>
                
                <div class="share-link">
                    <label class="form-label">Or copy link:</label>
                    <div class="input-group">
                        <input type="text" class="form-control" value="${url}" readonly>
                        <button class="btn btn-primary" onclick="copyToClipboard('${url}')">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window.shareToPlatform = async function(jobId, platform) {
    const url = window.location.origin + '/pages/job-details.html?id=' + jobId;
    const jobTitle = document.querySelector(`[data-job-id="${jobId}"] .job-title a`).textContent;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(jobTitle)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(jobTitle)}&body=${encodeURIComponent(`Check out this job opportunity: ${url}`)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(`${jobTitle} - ${url}`)}`;
            break;
    }
    
    window.open(shareUrl, '_blank');
};

window.copyToClipboard = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Link copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Link copied to clipboard!', 'success');
    });
};

window.reportJob = async function(jobId) {
    const reason = prompt('Please enter the reason for reporting this job:');
    if (!reason) return;
    
    const description = prompt('Please provide more details:');
    if (!description) return;
    
    try {
        const result = await jobsService.reportJob(jobId, reason, description);
        if (result.success) {
            showToast('Job reported successfully. Our team will review it.', 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to report job', 'error');
    }
};

// Initialize job portal on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('jobPortal')) {
        // Get filters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {
            search: urlParams.get('search') || '',
            employmentType: urlParams.get('type') || '',
            experienceLevel: urlParams.get('level') || '',
            location: urlParams.get('location') || '',
            company: urlParams.get('company') || '',
            page: parseInt(urlParams.get('page') || '1'),
            limit: parseInt(urlParams.get('limit') || '20')
        };

        window.currentJobFilters = filters;
        renderJobPortal(filters);

        // Set up filter form
        const filterForm = document.getElementById('jobFilterForm');
        if (filterForm) {
            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(filterForm);
                const newFilters = {
                    search: formData.get('search') || '',
                    employmentType: formData.get('employmentType') || '',
                    experienceLevel: formData.get('experienceLevel') || '',
                    location: formData.get('location') || '',
                    company: formData.get('company') || '',
                    page: 1,
                    limit: 20
                };
                window.currentJobFilters = newFilters;
                renderJobPortal(newFilters);
            });
        }

        // Set up search input
        const searchInput = document.getElementById('jobSearchInput');
        const searchBtn = document.getElementById('jobSearchBtn');
        
        if (searchInput && searchBtn) {
            const handleSearch = () => {
                const filters = window.currentJobFilters || {};
                filters.search = searchInput.value.trim();
                filters.page = 1;
                window.currentJobFilters = filters;
                renderJobPortal(filters);
            };
            
            searchBtn.addEventListener('click', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }
    }
});