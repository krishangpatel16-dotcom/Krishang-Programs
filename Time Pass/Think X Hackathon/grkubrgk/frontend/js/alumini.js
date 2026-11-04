// Alumni Module
class AlumniService {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.auth = window.AuthService;
    }

    // Get all alumni with filters
    async getAllAlumni(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add filters to query params
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/alumni?${queryParams.toString()}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get all alumni error:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to fetch alumni' 
            };
        }
    }

    // Search alumni
    async searchAlumni(query, field = '') {
        try {
            const url = `${this.baseURL}/alumni/search?q=${encodeURIComponent(query)}&field=${field}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Search alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to search alumni' 
            };
        }
    }

    // Get alumni profile by ID
    async getAlumniProfile(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/profile/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni profile error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni profile' 
            };
        }
    }

    // Update alumni profile
    async updateAlumniProfile(profileData) {
        try {
            const url = `${this.baseURL}/alumni/profile`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(profileData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update alumni profile error:', error);
            return { 
                success: false, 
                message: 'Failed to update profile' 
            };
        }
    }

    // Send connection request
    async sendConnectionRequest(alumniId, message = '') {
        try {
            const url = `${this.baseURL}/alumni/connect/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ message })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Send connection request error:', error);
            return { 
                success: false, 
                message: 'Failed to send connection request' 
            };
        }
    }

    // Get alumni statistics
    async getAlumniStats() {
        try {
            const url = `${this.baseURL}/alumni/stats`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni stats error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni statistics' 
            };
        }
    }

    // Get alumni by department
    async getAlumniByDepartment(department) {
        try {
            const url = `${this.baseURL}/alumni?department=${department}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni by department error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni by department' 
            };
        }
    }

    // Get alumni by graduation year
    async getAlumniByGraduationYear(year) {
        try {
            const url = `${this.baseURL}/alumni?graduationYear=${year}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni by graduation year error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni by graduation year' 
            };
        }
    }

    // Get alumni by location
    async getAlumniByLocation(location) {
        try {
            const url = `${this.baseURL}/alumni?location=${encodeURIComponent(location)}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni by location error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni by location' 
            };
        }
    }

    // Get alumni by industry
    async getAlumniByIndustry(industry) {
        try {
            const url = `${this.baseURL}/alumni?industry=${encodeURIComponent(industry)}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni by industry error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni by industry' 
            };
        }
    }

    // Get alumni by skills
    async getAlumniBySkills(skills) {
        try {
            const url = `${this.baseURL}/alumni?skills=${encodeURIComponent(skills.join(','))}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni by skills error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch alumni by skills' 
            };
        }
    }

    // Get alumni mentors
    async getAlumniMentors() {
        try {
            const url = `${this.baseURL}/alumni?availableForMentorship=true`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni mentors error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch mentors' 
            };
        }
    }

    // Get alumni suggestions (people you may know)
    async getAlumniSuggestions(limit = 10) {
        try {
            const url = `${this.baseURL}/alumni?limit=${limit}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni suggestions error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch suggestions' 
            };
        }
    }

    // Get alumni connections
    async getAlumniConnections() {
        try {
            const url = `${this.baseURL}/alumni/connections`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni connections error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch connections' 
            };
        }
    }

    // Get alumni connection requests
    async getConnectionRequests() {
        try {
            const url = `${this.baseURL}/alumni/connection-requests`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get connection requests error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch connection requests' 
            };
        }
    }

    // Accept connection request
    async acceptConnectionRequest(requestId) {
        try {
            const url = `${this.baseURL}/alumni/connection-requests/${requestId}/accept`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Accept connection request error:', error);
            return { 
                success: false, 
                message: 'Failed to accept connection request' 
            };
        }
    }

    // Reject connection request
    async rejectConnectionRequest(requestId) {
        try {
            const url = `${this.baseURL}/alumni/connection-requests/${requestId}/reject`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Reject connection request error:', error);
            return { 
                success: false, 
                message: 'Failed to reject connection request' 
            };
        }
    }

    // Remove connection
    async removeConnection(connectionId) {
        try {
            const url = `${this.baseURL}/alumni/connections/${connectionId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Remove connection error:', error);
            return { 
                success: false, 
                message: 'Failed to remove connection' 
            };
        }
    }

    // Export alumni directory
    async exportAlumniDirectory(format = 'csv') {
        try {
            const url = `${this.baseURL}/alumni/export?format=${format}`;
            const response = await this.auth.fetchWithAuth(url);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `alumni-directory-${new Date().toISOString().split('T')[0]}.${format}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Export alumni directory error:', error);
            return { 
                success: false, 
                message: 'Failed to export alumni directory' 
            };
        }
    }

    // Upload alumni profile picture
    async uploadProfilePicture(file) {
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const url = `${this.baseURL}/alumni/upload-profile-picture`;
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
            console.error('Upload profile picture error:', error);
            return { 
                success: false, 
                message: 'Failed to upload profile picture' 
            };
        }
    }

    // Add work experience
    async addWorkExperience(experience) {
        try {
            const url = `${this.baseURL}/alumni/work-experience`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(experience)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add work experience error:', error);
            return { 
                success: false, 
                message: 'Failed to add work experience' 
            };
        }
    }

    // Update work experience
    async updateWorkExperience(experienceId, experience) {
        try {
            const url = `${this.baseURL}/alumni/work-experience/${experienceId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(experience)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update work experience error:', error);
            return { 
                success: false, 
                message: 'Failed to update work experience' 
            };
        }
    }

    // Delete work experience
    async deleteWorkExperience(experienceId) {
        try {
            const url = `${this.baseURL}/alumni/work-experience/${experienceId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete work experience error:', error);
            return { 
                success: false, 
                message: 'Failed to delete work experience' 
            };
        }
    }

    // Add education
    async addEducation(education) {
        try {
            const url = `${this.baseURL}/alumni/education`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(education)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add education error:', error);
            return { 
                success: false, 
                message: 'Failed to add education' 
            };
        }
    }

    // Update education
    async updateEducation(educationId, education) {
        try {
            const url = `${this.baseURL}/alumni/education/${educationId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(education)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update education error:', error);
            return { 
                success: false, 
                message: 'Failed to update education' 
            };
        }
    }

    // Delete education
    async deleteEducation(educationId) {
        try {
            const url = `${this.baseURL}/alumni/education/${educationId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete education error:', error);
            return { 
                success: false, 
                message: 'Failed to delete education' 
            };
        }
    }

    // Get alumni recommendations based on profile
    async getProfileBasedRecommendations() {
        try {
            const url = `${this.baseURL}/alumni/recommendations`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get profile based recommendations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch recommendations' 
            };
        }
    }

    // Get alumni activity feed
    async getAlumniActivityFeed(limit = 20) {
        try {
            const url = `${this.baseURL}/alumni/activity-feed?limit=${limit}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get alumni activity feed error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch activity feed' 
            };
        }
    }

    // Send message to alumni
    async sendMessage(alumniId, message) {
        try {
            const url = `${this.baseURL}/alumni/messages`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ recipient: alumniId, message })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Send message error:', error);
            return { 
                success: false, 
                message: 'Failed to send message' 
            };
        }
    }

    // Get messages
    async getMessages(alumniId = null) {
        try {
            let url = `${this.baseURL}/alumni/messages`;
            if (alumniId) {
                url += `?alumniId=${alumniId}`;
            }
            
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get messages error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch messages' 
            };
        }
    }

    // Mark message as read
    async markMessageAsRead(messageId) {
        try {
            const url = `${this.baseURL}/alumni/messages/${messageId}/read`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Mark message as read error:', error);
            return { 
                success: false, 
                message: 'Failed to mark message as read' 
            };
        }
    }

    // Delete message
    async deleteMessage(messageId) {
        try {
            const url = `${this.baseURL}/alumni/messages/${messageId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete message error:', error);
            return { 
                success: false, 
                message: 'Failed to delete message' 
            };
        }
    }

    // Report alumni profile
    async reportAlumni(alumniId, reason, description) {
        try {
            const url = `${this.baseURL}/alumni/report`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ alumniId, reason, description })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Report alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to report alumni' 
            };
        }
    }

    // Block alumni
    async blockAlumni(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/block/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Block alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to block alumni' 
            };
        }
    }

    // Unblock alumni
    async unblockAlumni(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/unblock/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Unblock alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to unblock alumni' 
            };
        }
    }

    // Get blocked alumni
    async getBlockedAlumni() {
        try {
            const url = `${this.baseURL}/alumni/blocked`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get blocked alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch blocked alumni' 
            };
        }
    }

    // Update profile visibility
    async updateProfileVisibility(visibility) {
        try {
            const url = `${this.baseURL}/alumni/visibility`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ visibility })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update profile visibility error:', error);
            return { 
                success: false, 
                message: 'Failed to update visibility' 
            };
        }
    }

    // Get profile views
    async getProfileViews() {
        try {
            const url = `${this.baseURL}/alumni/profile-views`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get profile views error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch profile views' 
            };
        }
    }

    // Download alumni vCard
    async downloadVCard(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/vcard/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `contact-${alumniId}.vcf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Download vCard error:', error);
            return { 
                success: false, 
                message: 'Failed to download contact card' 
            };
        }
    }

    // Share alumni profile
    async shareProfile(alumniId, platform, message = '') {
        try {
            const url = `${this.baseURL}/alumni/share/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ platform, message })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Share profile error:', error);
            return { 
                success: false, 
                message: 'Failed to share profile' 
            };
        }
    }

    // Follow alumni
    async followAlumni(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/follow/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Follow alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to follow alumni' 
            };
        }
    }

    // Unfollow alumni
    async unfollowAlumni(alumniId) {
        try {
            const url = `${this.baseURL}/alumni/unfollow/${alumniId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Unfollow alumni error:', error);
            return { 
                success: false, 
                message: 'Failed to unfollow alumni' 
            };
        }
    }

    // Get followers
    async getFollowers() {
        try {
            const url = `${this.baseURL}/alumni/followers`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get followers error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch followers' 
            };
        }
    }

    // Get following
    async getFollowing() {
        try {
            const url = `${this.baseURL}/alumni/following`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get following error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch following' 
            };
        }
    }

    // Request mentorship
    async requestMentorship(alumniId, message, areas) {
        try {
            const url = `${this.baseURL}/alumni/mentorship-request`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ mentorId: alumniId, message, areas })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request mentorship error:', error);
            return { 
                success: false, 
                message: 'Failed to send mentorship request' 
            };
        }
    }

    // Get mentorship requests
    async getMentorshipRequests() {
        try {
            const url = `${this.baseURL}/alumni/mentorship-requests`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get mentorship requests error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch mentorship requests' 
            };
        }
    }

    // Update mentorship request status
    async updateMentorshipRequest(requestId, status) {
        try {
            const url = `${this.baseURL}/alumni/mentorship-requests/${requestId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update mentorship request error:', error);
            return { 
                success: false, 
                message: 'Failed to update mentorship request' 
            };
        }
    }
}

// Create singleton instance
const alumniService = new AlumniService();

// Export for use in other modules
window.AlumniService = alumniService;

// Utility functions for alumni directory
window.renderAlumniDirectory = async function(filters = {}) {
    const container = document.getElementById('alumniDirectory');
    if (!container) return;

    // Show loading state
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading alumni directory...</p>
        </div>
    `;

    try {
        const result = await alumniService.getAllAlumni(filters);
        
        if (result.success) {
            if (result.data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-users"></i>
                        <h3>No alumni found</h3>
                        <p>Try adjusting your filters or search criteria</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = result.data.map(alumni => `
                <div class="alumni-card" data-alumni-id="${alumni.user._id}">
                    <div class="alumni-card-header">
                        <div class="alumni-avatar">
                            <img src="${alumni.user.profilePicture || '../assets/images/default-avatar.jpg'}" 
                                 alt="${alumni.user.firstName} ${alumni.user.lastName}">
                        </div>
                        <div class="alumni-info">
                            <h3 class="alumni-name">
                                <a href="alumni-profile.html?id=${alumni.user._id}">
                                    ${alumni.user.firstName} ${alumni.user.lastName}
                                </a>
                            </h3>
                            <p class="alumni-title">${alumni.currentPosition || 'Alumni'}</p>
                            <p class="alumni-company">${alumni.currentCompany || 'Not specified'}</p>
                        </div>
                        <button class="alumni-action-btn" onclick="handleAlumniAction('${alumni.user._id}')">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    
                    <div class="alumni-card-body">
                        <div class="alumni-meta">
                            <span class="meta-item">
                                <i class="fas fa-graduation-cap"></i>
                                Class of ${alumni.user.graduationYear}
                            </span>
                            <span class="meta-item">
                                <i class="fas fa-university"></i>
                                ${alumni.user.department}
                            </span>
                            ${alumni.industry ? `
                                <span class="meta-item">
                                    <i class="fas fa-industry"></i>
                                    ${alumni.industry}
                                </span>
                            ` : ''}
                        </div>
                        
                        ${alumni.skills && alumni.skills.length > 0 ? `
                            <div class="alumni-skills">
                                ${alumni.skills.slice(0, 3).map(skill => `
                                    <span class="skill-tag">${skill}</span>
                                `).join('')}
                                ${alumni.skills.length > 3 ? `
                                    <span class="skill-tag-more">+${alumni.skills.length - 3} more</span>
                                ` : ''}
                            </div>
                        ` : ''}
                        
                        ${alumni.bio ? `
                            <p class="alumni-bio">${alumni.bio.substring(0, 150)}...</p>
                        ` : ''}
                    </div>
                    
                    <div class="alumni-card-footer">
                        <button class="btn btn-outline btn-small" onclick="sendConnectionRequest('${alumni.user._id}')">
                            <i class="fas fa-user-plus"></i> Connect
                        </button>
                        <button class="btn btn-primary btn-small" onclick="viewAlumniProfile('${alumni.user._id}')">
                            <i class="fas fa-eye"></i> View Profile
                        </button>
                    </div>
                </div>
            `).join('');

            // Render pagination if available
            if (result.pagination && result.pagination.pages > 1) {
                renderAlumniPagination(result.pagination);
            }
        } else {
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error loading alumni</h3>
                    <p>${result.message}</p>
                    <button class="btn btn-primary" onclick="renderAlumniDirectory(${JSON.stringify(filters)})">
                        Try Again
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Render alumni directory error:', error);
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Network Error</h3>
                <p>Failed to load alumni directory. Please check your connection.</p>
                <button class="btn btn-primary" onclick="renderAlumniDirectory(${JSON.stringify(filters)})">
                    Try Again
                </button>
            </div>
        `;
    }
};

window.renderAlumniPagination = function(pagination) {
    const container = document.getElementById('alumniPagination');
    if (!container || !pagination) return;

    const { page, pages, total } = pagination;
    
    let paginationHTML = `
        <div class="pagination">
            <button class="pagination-btn ${page === 1 ? 'disabled' : ''}" 
                    ${page === 1 ? 'disabled' : 'onclick="changeAlumniPage(' + (page - 1) + ')"'}>
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
            <button class="pagination-btn" onclick="changeAlumniPage(1)">1</button>
            ${startPage > 2 ? '<span class="pagination-ellipsis">...</span>' : ''}
        `;
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === page ? 'active' : ''}" 
                    onclick="changeAlumniPage(${i})">
                ${i}
            </button>
        `;
    }

    if (endPage < pages) {
        paginationHTML += `
            ${endPage < pages - 1 ? '<span class="pagination-ellipsis">...</span>' : ''}
            <button class="pagination-btn" onclick="changeAlumniPage(${pages})">${pages}</button>
        `;
    }

    paginationHTML += `
            </div>
            
            <button class="pagination-btn ${page === pages ? 'disabled' : ''}" 
                    ${page === pages ? 'disabled' : 'onclick="changeAlumniPage(' + (page + 1) + ')"'}>
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        
        <div class="pagination-info">
            Showing page ${page} of ${pages} (${total} total alumni)
        </div>
    `;

    container.innerHTML = paginationHTML;
};

window.changeAlumniPage = function(newPage) {
    const currentFilters = window.currentAlumniFilters || {};
    currentFilters.page = newPage;
    window.currentAlumniFilters = currentFilters;
    renderAlumniDirectory(currentFilters);
};

window.sendConnectionRequest = async function(alumniId) {
    try {
        const result = await alumniService.sendConnectionRequest(alumniId);
        if (result.success) {
            showToast('Connection request sent successfully!', 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to send connection request', 'error');
    }
};

window.viewAlumniProfile = function(alumniId) {
    window.location.href = `alumni-profile.html?id=${alumniId}`;
};

window.handleAlumniAction = function(alumniId) {
    // Show action menu
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu show';
    menu.style.position = 'absolute';
    menu.innerHTML = `
        <a href="alumni-profile.html?id=${alumniId}" class="dropdown-item">
            <i class="fas fa-eye"></i> View Profile
        </a>
        <button class="dropdown-item" onclick="sendConnectionRequest('${alumniId}')">
            <i class="fas fa-user-plus"></i> Connect
        </button>
        <button class="dropdown-item" onclick="sendMessageToAlumni('${alumniId}')">
            <i class="fas fa-envelope"></i> Send Message
        </button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" onclick="shareAlumniProfile('${alumniId}')">
            <i class="fas fa-share-alt"></i> Share Profile
        </button>
        <button class="dropdown-item" onclick="downloadAlumniVCard('${alumniId}')">
            <i class="fas fa-download"></i> Download Contact
        </button>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item text-danger" onclick="reportAlumni('${alumniId}')">
            <i class="fas fa-flag"></i> Report Profile
        </button>
    `;

    // Position and show menu
    const card = document.querySelector(`[data-alumni-id="${alumniId}"]`);
    const rect = card.getBoundingClientRect();
    menu.style.top = `${rect.bottom + window.scrollY}px`;
    menu.style.left = `${rect.right - 200 + window.scrollX}px`;
    
    document.body.appendChild(menu);

    // Close menu when clicking outside
    const closeMenu = (e) => {
        if (!menu.contains(e.target) && !card.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 0);
};

// Initialize alumni directory on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('alumniDirectory')) {
        // Get filters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {
            search: urlParams.get('search') || '',
            graduationYear: urlParams.get('graduationYear') || '',
            department: urlParams.get('department') || '',
            industry: urlParams.get('industry') || '',
            location: urlParams.get('location') || '',
            page: parseInt(urlParams.get('page') || '1'),
            limit: parseInt(urlParams.get('limit') || '20')
        };

        window.currentAlumniFilters = filters;
        renderAlumniDirectory(filters);

        // Set up filter form
        const filterForm = document.getElementById('alumniFilterForm');
        if (filterForm) {
            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(filterForm);
                const newFilters = {
                    search: formData.get('search') || '',
                    graduationYear: formData.get('graduationYear') || '',
                    department: formData.get('department') || '',
                    industry: formData.get('industry') || '',
                    location: formData.get('location') || '',
                    page: 1,
                    limit: 20
                };
                window.currentAlumniFilters = newFilters;
                renderAlumniDirectory(newFilters);
            });
        }
    }
});

// Toast notification function
window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 3000);
};