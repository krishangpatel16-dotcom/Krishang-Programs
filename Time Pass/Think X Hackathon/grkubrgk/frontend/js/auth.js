// Authentication Module
class Auth {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user') || 'null');
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }

    // Check if user is admin
    isAdmin() {
        return this.user?.role === 'admin';
    }

    // Get current user
    getCurrentUser() {
        return this.user;
    }

    // Get token
    getToken() {
        return this.token;
    }

    // Login
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                
                return { success: true, user: this.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Register
    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                this.user = data.user;
                
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                
                return { success: true, user: this.user, message: data.message };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Logout
    async logout() {
        try {
            await fetch(`${this.baseURL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    // Clear authentication data
    clearAuth() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
    }

    // Update profile
    async updateProfile(profileData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();

            if (data.success) {
                this.user = { ...this.user, ...profileData };
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, user: this.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Update profile error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Change password
    async changePassword(currentPassword, newPassword) {
        try {
            const response = await fetch(`${this.baseURL}/auth/change-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Change password error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Forgot password
    async forgotPassword(email) {
        try {
            const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Forgot password error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Reset password
    async resetPassword(token, newPassword) {
        try {
            const response = await fetch(`${this.baseURL}/auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token, newPassword })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Reset password error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Verify email
    async verifyEmail(token) {
        try {
            const response = await fetch(`${this.baseURL}/auth/verify-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });

            const data = await response.json();
            
            if (data.success && this.user) {
                this.user.isVerified = true;
                localStorage.setItem('user', JSON.stringify(this.user));
            }
            
            return data;
        } catch (error) {
            console.error('Verify email error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Refresh token
    async refreshToken() {
        try {
            const response = await fetch(`${this.baseURL}/auth/refresh-token`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                this.token = data.token;
                localStorage.setItem('token', this.token);
                return { success: true, token: this.token };
            } else {
                this.clearAuth();
                return { success: false, message: 'Session expired. Please login again.' };
            }
        } catch (error) {
            console.error('Refresh token error:', error);
            this.clearAuth();
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Check if token is valid
    async validateToken() {
        if (!this.token) {
            return { valid: false, message: 'No token found' };
        }

        try {
            const response = await fetch(`${this.baseURL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            if (response.status === 401) {
                // Token expired, try to refresh
                const refreshResult = await this.refreshToken();
                if (refreshResult.success) {
                    return { valid: true, refreshed: true };
                } else {
                    return { valid: false, message: refreshResult.message };
                }
            }

            if (response.ok) {
                return { valid: true, refreshed: false };
            } else {
                return { valid: false, message: 'Invalid token' };
            }
        } catch (error) {
            console.error('Validate token error:', error);
            return { valid: false, message: 'Network error' };
        }
    }

    // Protected fetch wrapper
    async fetchWithAuth(url, options = {}) {
        // Validate token first
        const tokenValid = await this.validateToken();
        
        if (!tokenValid.valid) {
            throw new Error(tokenValid.message);
        }

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        };

        const mergedOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        return fetch(url, mergedOptions);
    }

    // Get user profile with additional data
    async getUserProfile() {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/me`);
            const data = await response.json();
            
            if (data.success) {
                this.user = data.user;
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, user: this.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Get user profile error:', error);
            return { success: false, message: error.message };
        }
    }

    // Upload profile picture
    async uploadProfilePicture(file) {
        try {
            const formData = new FormData();
            formData.append('profilePicture', file);

            const response = await fetch(`${this.baseURL}/auth/upload-profile-picture`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                },
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                this.user.profilePicture = data.profilePicture;
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true, profilePicture: data.profilePicture };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Upload profile picture error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Delete profile picture
    async deleteProfilePicture() {
        try {
            const response = await fetch(`${this.baseURL}/auth/delete-profile-picture`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                this.user.profilePicture = null;
                localStorage.setItem('user', JSON.stringify(this.user));
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Delete profile picture error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get user statistics
    async getUserStats() {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/stats`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get user stats error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get user notifications
    async getUserNotifications() {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/notifications`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get notifications error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Mark notification as read
    async markNotificationAsRead(notificationId) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/notifications/${notificationId}/read`, {
                method: 'PUT'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Mark notification as read error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get user activity log
    async getUserActivity(limit = 20, page = 1) {
        try {
            const response = await this.fetchWithAuth(
                `${this.baseURL}/auth/activity?limit=${limit}&page=${page}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get user activity error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Update user preferences
    async updateUserPreferences(preferences) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/preferences`, {
                method: 'PUT',
                body: JSON.stringify(preferences)
            });
            const data = await response.json();

            if (data.success && this.user) {
                this.user.preferences = { ...this.user.preferences, ...preferences };
                localStorage.setItem('user', JSON.stringify(this.user));
            }

            return data;
        } catch (error) {
            console.error('Update preferences error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Delete user account
    async deleteAccount(password) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/delete-account`, {
                method: 'DELETE',
                body: JSON.stringify({ password })
            });
            const data = await response.json();

            if (data.success) {
                this.clearAuth();
            }

            return data;
        } catch (error) {
            console.error('Delete account error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Export user data
    async exportUserData() {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/export-data`);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `alumni-connect-data-${new Date().toISOString().split('T')[0]}.json`;
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
            console.error('Export data error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get login history
    async getLoginHistory(limit = 10) {
        try {
            const response = await this.fetchWithAuth(
                `${this.baseURL}/auth/login-history?limit=${limit}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get login history error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Get connected devices
    async getConnectedDevices() {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/devices`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get connected devices error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Revoke device access
    async revokeDevice(deviceId) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/devices/${deviceId}/revoke`, {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Revoke device error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Enable/disable two-factor authentication
    async toggleTwoFactor(enabled) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/two-factor`, {
                method: 'PUT',
                body: JSON.stringify({ enabled })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Toggle two-factor error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Verify two-factor code
    async verifyTwoFactorCode(code) {
        try {
            const response = await fetch(`${this.baseURL}/auth/verify-two-factor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Verify two-factor error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }

    // Request data deletion
    async requestDataDeletion(reason) {
        try {
            const response = await this.fetchWithAuth(`${this.baseURL}/auth/request-data-deletion`, {
                method: 'POST',
                body: JSON.stringify({ reason })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request data deletion error:', error);
            return { success: false, message: 'Network error. Please try again.' };
        }
    }
}

// Create singleton instance
const auth = new Auth();

// Export for use in other modules
window.AuthService = auth;

// Auto-logout on token expiration
setInterval(async () => {
    if (auth.isAuthenticated()) {
        const tokenValid = await auth.validateToken();
        if (!tokenValid.valid) {
            auth.clearAuth();
            if (window.location.pathname.includes('/pages/') && 
                !window.location.pathname.includes('login.html') &&
                !window.location.pathname.includes('register.html')) {
                window.location.href = '../pages/login.html';
            }
        }
    }
}, 300000); // Check every 5 minutes

// Protect authenticated routes
document.addEventListener('DOMContentLoaded', () => {
    const protectedRoutes = [
        'dashboard.html',
        'profile.html',
        'edit-profile.html',
        'job-portal.html?my=applications',
        'events.html?my=registered',
        'donate.html?my=donations'
    ];

    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;

    // Check if current page is protected
    const isProtectedRoute = protectedRoutes.some(route => {
        const routePath = route.split('?')[0];
        const routeSearch = route.split('?')[1] || '';
        
        return currentPath.includes(routePath) && 
               (routeSearch === '' || currentSearch.includes(routeSearch));
    });

    if (isProtectedRoute && !auth.isAuthenticated()) {
        window.location.href = '../pages/login.html';
    }

    // Check if user is trying to access login/register while already logged in
    const authPages = ['login.html', 'register.html'];
    const isAuthPage = authPages.some(page => currentPath.includes(page));
    
    if (isAuthPage && auth.isAuthenticated()) {
        window.location.href = '../pages/dashboard.html';
    }

    // Update UI based on auth state
    updateUIBasedOnAuth();
});

function updateUIBasedOnAuth() {
    const user = auth.getCurrentUser();
    
    // Update user name in dashboard if present
    const userNameElements = document.querySelectorAll('#userName, .user-name');
    userNameElements.forEach(element => {
        if (user && user.firstName) {
            element.textContent = user.firstName;
        }
    });
    
    // Update profile picture
    const profilePictureElements = document.querySelectorAll('.user-avatar img, .profile-avatar img');
    profilePictureElements.forEach(element => {
        if (user && user.profilePicture) {
            element.src = user.profilePicture;
        }
    });
    
    // Update verification badge
    if (user && !user.isVerified) {
        const verificationBadge = document.querySelector('.verification-badge');
        if (verificationBadge) {
            verificationBadge.innerHTML = `
                <span class="badge badge-warning">
                    <i class="fas fa-exclamation-circle"></i> Email not verified
                </span>
            `;
        }
    }
}

// Utility function to show auth errors
function showAuthError(message, type = 'error') {
    const alertContainer = document.getElementById('alertContainer') || document.createElement('div');
    alertContainer.id = 'alertContainer';
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '20px';
    alertContainer.style.right = '20px';
    alertContainer.style.zIndex = '9999';
    
    if (!document.getElementById('alertContainer')) {
        document.body.appendChild(alertContainer);
    }
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.style.marginBottom = '10px';
    alert.style.animation = 'slideIn 0.3s ease';
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        ${message}
        <button class="alert-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    alertContainer.appendChild(alert);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Add CSS for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .alert {
        display: flex;
        align-items: center;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-width: 400px;
    }
    
    .alert i {
        margin-right: 10px;
        font-size: 18px;
    }
    
    .alert-success {
        background-color: #d4edda;
        border: 1px solid #c3e6cb;
        color: #155724;
    }
    
    .alert-error {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .alert-warning {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        color: #856404;
    }
    
    .alert-info {
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
        color: #0c5460;
    }
    
    .alert-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        margin-left: auto;
        opacity: 0.7;
    }
    
    .alert-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Export utility functions
window.showAuthError = showAuthError;
window.updateUIBasedOnAuth = updateUIBasedOnAuth;