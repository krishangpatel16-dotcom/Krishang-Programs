/**
 * Alumni Network Platform - Main JavaScript File
 * Handles common functionality across all pages
 */

// DOM Elements
let currentUser = null;

// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const API_ENDPOINTS = {
    AUTH: '/auth',
    ALUMNI: '/alumni',
    JOBS: '/jobs',
    EVENTS: '/events',
    DONATIONS: '/donations',
    STORIES: '/stories'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Alumni Network Platform loaded');
    
    // Check authentication status
    checkAuthStatus();
    
    // Initialize common event listeners
    initCommonEventListeners();
    
    // Initialize page-specific functionality
    initPageSpecificFunctions();
    
    // Load navigation if using component-based approach
    loadNavigation();
    
    // Load footer if using component-based approach
    loadFooter();
});

/**
 * Check user authentication status
 */
async function checkAuthStatus() {
    try {
        const token = localStorage.getItem('authToken');
        if (!token) {
            updateAuthUI(false);
            return;
        }

        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH}/verify`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const userData = await response.json();
            currentUser = userData;
            updateAuthUI(true, userData);
            console.log('User authenticated:', userData);
        } else {
            localStorage.removeItem('authToken');
            updateAuthUI(false);
        }
    } catch (error) {
        console.error('Auth check failed:', error);
        updateAuthUI(false);
    }
}

/**
 * Update UI based on authentication status
 */
function updateAuthUI(isAuthenticated, userData = null) {
    const authElements = document.querySelectorAll('[data-auth]');
    const guestElements = document.querySelectorAll('[data-guest]');
    const userAvatar = document.querySelector('#userAvatar');
    const userName = document.querySelector('#userName');

    if (isAuthenticated && userData) {
        // Show authenticated elements
        authElements.forEach(el => el.style.display = '');
        guestElements.forEach(el => el.style.display = 'none');
        
        // Update user info
        if (userAvatar) {
            userAvatar.src = userData.avatar || '/assets/images/default-avatar.png';
            userAvatar.alt = `${userData.name}'s avatar`;
        }
        if (userName) {
            userName.textContent = userData.name || userData.email;
        }
        
        // Store user data for easy access
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
    } else {
        // Show guest elements
        authElements.forEach(el => el.style.display = 'none');
        guestElements.forEach(el => el.style.display = '');
        
        // Clear user data
        sessionStorage.removeItem('currentUser');
    }
}

/**
 * Initialize common event listeners
 */
function initCommonEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => performSearch(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch(searchInput.value);
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Notification bell
    const notificationBell = document.getElementById('notificationBell');
    if (notificationBell) {
        notificationBell.addEventListener('click', showNotifications);
    }

    // Modal close buttons
    document.querySelectorAll('[data-modal-close]').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', toggleBackToTopButton);
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

/**
 * Initialize page-specific functions
 */
function initPageSpecificFunctions() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'alumni-directory':
            initAlumniDirectory();
            break;
        case 'job-portal':
            initJobPortal();
            break;
        case 'events':
            initEvents();
            break;
        case 'donate':
            initDonations();
            break;
        case 'success-stories':
            initSuccessStories();
            break;
        case 'dashboard':
            initDashboard();
            break;
        case 'login':
        case 'register':
            initAuthForms();
            break;
    }
}

/**
 * Get current page name
 */
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '');
    return page === '' ? 'index' : page;
}

/**
 * Perform global search
 */
async function performSearch(query) {
    if (!query.trim()) {
        showToast('Please enter a search term', 'warning');
        return;
    }

    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('Search failed');
        
        const results = await response.json();
        displaySearchResults(results);
    } catch (error) {
        console.error('Search error:', error);
        showToast('Search failed. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}

/**
 * Display search results
 */
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) return;

    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="alert alert-info">
                <p>No results found for your search.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = results.map(result => `
        <div class="card mb-md">
            <div class="card-body">
                <h4>${result.title || result.name}</h4>
                <p>${result.description || ''}</p>
                <div class="flex justify-end mt-md">
                    <a href="${result.link}" class="btn btn-sm btn-primary">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * Handle logout
 */
function handleLogout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI(false);
    showToast('Logged out successfully', 'success');
    
    // Redirect to home page if not already there
    if (window.location.pathname !== '/') {
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

/**
 * Show notifications
 */
async function showNotifications() {
    try {
        const response = await fetch(`${API_BASE_URL}/notifications`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('Failed to fetch notifications');
        
        const notifications = await response.json();
        displayNotificationsModal(notifications);
    } catch (error) {
        console.error('Notification error:', error);
        showToast('Failed to load notifications', 'error');
    }
}

/**
 * Display notifications modal
 */
function displayNotificationsModal(notifications) {
    const modal = document.getElementById('notificationsModal');
    if (!modal) return;

    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = notifications.length === 0 
        ? '<p class="text-center text-secondary">No new notifications</p>'
        : notifications.map(notification => `
            <div class="p-sm border-b border-gray-200 last:border-b-0">
                <div class="flex items-start gap-sm">
                    <div class="w-2 h-2 rounded-full mt-2 ${
                        notification.read ? 'bg-gray-300' : 'bg-primary-color'
                    }"></div>
                    <div class="flex-1">
                        <p class="font-medium">${notification.title}</p>
                        <p class="text-sm text-secondary">${notification.message}</p>
                        <p class="text-xs text-light mt-xs">${formatDate(notification.createdAt)}</p>
                    </div>
                </div>
            </div>
        `).join('');

    modal.classList.add('active');
}

/**
 * Toggle back to top button
 */
function toggleBackToTopButton() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Show loading state
 */
function showLoading(show, element = document.body) {
    const loadingElement = element.querySelector('.loading-overlay');
    
    if (show) {
        if (!loadingElement) {
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            overlay.innerHTML = '<div class="spinner"></div>';
            element.appendChild(overlay);
        }
    } else {
        if (loadingElement) {
            loadingElement.remove();
        }
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());

    const toast = document.createElement('div');
    toast.className = `toast fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 10);

    // Remove after 5 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get authentication headers
 */
function getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

/**
 * Make API request with error handling
 */
async function makeRequest(url, options = {}) {
    try {
        showLoading(true);
        const response = await fetch(url, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        showToast('Request failed. Please try again.', 'error');
        throw error;
    } finally {
        showLoading(false);
    }
}

/**
 * Load navigation component
 */
async function loadNavigation() {
    const navContainer = document.querySelector('[data-component="navbar"]');
    if (!navContainer) return;

    try {
        const response = await fetch('/components/navbar.html');
        if (!response.ok) return;
        
        const html = await response.text();
        navContainer.innerHTML = html;
        
        // Reinitialize event listeners after navigation loads
        initCommonEventListeners();
    } catch (error) {
        console.error('Failed to load navigation:', error);
    }
}

/**
 * Load footer component
 */
async function loadFooter() {
    const footerContainer = document.querySelector('[data-component="footer"]');
    if (!footerContainer) return;

    try {
        const response = await fetch('/components/footer.html');
        if (!response.ok) return;
        
        const html = await response.text();
        footerContainer.innerHTML = html;
    } catch (error) {
        console.error('Failed to load footer:', error);
    }
}

/**
 * Initialize dashboard
 */
async function initDashboard() {
    // This would be implemented in dashboard.js
    console.log('Dashboard initialized');
}

/**
 * Initialize auth forms
 */
function initAuthForms() {
    // This would be implemented in auth.js
    console.log('Auth forms initialized');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkAuthStatus,
        updateAuthUI,
        getAuthHeaders,
        makeRequest,
        showToast,
        formatDate
    };
}