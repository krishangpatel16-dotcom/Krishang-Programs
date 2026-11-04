// Navigation Component
class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const isLoggedIn = !!localStorage.getItem('token');

        this.innerHTML = `
            <div class="nav-container">
                <a href="../index.html" class="logo">
                    <img src="../assets/images/logo.png" alt="Alumni Connect Logo">
                    <span class="logo-text">Alumni Connect</span>
                </a>
                
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
                
                <ul class="nav-links" id="navLinks">
                    <li><a href="../index.html" class="${window.location.pathname.includes('index.html') ? 'active' : ''}">Home</a></li>
                    <li><a href="../pages/alumni-directory.html" class="${window.location.pathname.includes('alumni-directory.html') ? 'active' : ''}">Alumni Directory</a></li>
                    <li><a href="../pages/mentorship.html" class="${window.location.pathname.includes('mentorship.html') ? 'active' : ''}">Mentorship</a></li>
                    <li><a href="../pages/job-portal.html" class="${window.location.pathname.includes('job-portal.html') ? 'active' : ''}">Job Portal</a></li>
                    <li><a href="../pages/events.html" class="${window.location.pathname.includes('events.html') ? 'active' : ''}">Events</a></li>
                    <li><a href="../pages/gallery.html" class="${window.location.pathname.includes('gallery.html') ? 'active' : ''}">Gallery</a></li>
                    <li><a href="../pages/donate.html" class="${window.location.pathname.includes('donate.html') ? 'active' : ''}">Donate</a></li>
                </ul>
                
                <div class="user-menu" id="userMenu">
                    ${isLoggedIn ? this.renderLoggedInMenu(user) : this.renderLoggedOutMenu()}
                </div>
            </div>
            
            <div class="mobile-menu" id="mobileMenu">
                <ul class="mobile-nav-links">
                    <li><a href="../index.html" class="${window.location.pathname.includes('index.html') ? 'active' : ''}">Home</a></li>
                    <li><a href="../pages/alumni-directory.html" class="${window.location.pathname.includes('alumni-directory.html') ? 'active' : ''}">Alumni Directory</a></li>
                    <li><a href="../pages/mentorship.html" class="${window.location.pathname.includes('mentorship.html') ? 'active' : ''}">Mentorship</a></li>
                    <li><a href="../pages/job-portal.html" class="${window.location.pathname.includes('job-portal.html') ? 'active' : ''}">Job Portal</a></li>
                    <li><a href="../pages/events.html" class="${window.location.pathname.includes('events.html') ? 'active' : ''}">Events</a></li>
                    <li><a href="../pages/gallery.html" class="${window.location.pathname.includes('gallery.html') ? 'active' : ''}">Gallery</a></li>
                    <li><a href="../pages/donate.html" class="${window.location.pathname.includes('donate.html') ? 'active' : ''}">Donate</a></li>
                    ${isLoggedIn ? `
                        <li><a href="../pages/dashboard.html"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                        <li><a href="../pages/profile.html"><i class="fas fa-user"></i> Profile</a></li>
                        <li><a href="#" id="mobileLogout"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                    ` : `
                        <li><a href="../pages/login.html"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                        <li><a href="../pages/register.html"><i class="fas fa-user-plus"></i> Register</a></li>
                    `}
                </ul>
            </div>
        `;
    }

    renderLoggedInMenu(user) {
        return `
            <div class="user-dropdown">
                <button class="user-dropdown-toggle" id="userDropdownToggle">
                    <div class="user-avatar">
                        ${user.profilePicture ?
                `<img src="${user.profilePicture}" alt="${user.firstName}">` :
                `<span>${user.firstName?.charAt(0) || 'A'}</span>`
            }
                    </div>
                    <span class="user-name">${user.firstName || 'User'}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="dropdown-menu" id="userDropdown">
                    <a href="../pages/dashboard.html" class="dropdown-item">
                        <i class="fas fa-tachometer-alt"></i> Dashboard
                    </a>
                    <a href="../pages/profile.html" class="dropdown-item">
                        <i class="fas fa-user"></i> My Profile
                    </a>
                    <a href="../pages/edit-profile.html" class="dropdown-item">
                        <i class="fas fa-user-edit"></i> Edit Profile
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="../pages/job-portal.html?my=applications" class="dropdown-item">
                        <i class="fas fa-briefcase"></i> My Applications
                    </a>
                    <a href="../pages/events.html?my=registered" class="dropdown-item">
                        <i class="fas fa-calendar-check"></i> My Events
                    </a>
                    <a href="../pages/donate.html?my=donations" class="dropdown-item">
                        <i class="fas fa-donate"></i> My Donations
                    </a>
                    <div class="dropdown-divider"></div>
                    ${user.role === 'admin' ? `
                        <a href="../pages/admin-dashboard.html" class="dropdown-item">
                            <i class="fas fa-cog"></i> Admin Panel
                        </a>
                        <div class="dropdown-divider"></div>
                    ` : ''}
                    <a href="#" class="dropdown-item" id="logoutBtn">
                        <i class="fas fa-sign-out-alt"></i> Logout
                    </a>
                </div>
            </div>
        `;
    }

    renderLoggedOutMenu() {
        return `
            <a href="../pages/login.html" class="btn btn-secondary">Login</a>
            <a href="../pages/register.html" class="btn btn-primary">Register</a>
        `;
    }

    attachEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = this.querySelector('#mobileMenuBtn');
        const mobileMenu = this.querySelector('#mobileMenu');
        const navLinks = this.querySelector('#navLinks');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('show');
                navLinks.classList.toggle('show');
            });
        }

        // User dropdown toggle
        const userDropdownToggle = this.querySelector('#userDropdownToggle');
        const userDropdown = this.querySelector('#userDropdown');

        if (userDropdownToggle && userDropdown) {
            userDropdownToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                userDropdown.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!userDropdown.contains(e.target) && !userDropdownToggle.contains(e.target)) {
                    userDropdown.classList.remove('show');
                }
            });
        }

        // Logout functionality
        const logoutBtn = this.querySelector('#logoutBtn');
        const mobileLogout = this.querySelector('#mobileLogout');

        const handleLogout = () => {
            fetch('http://localhost:5000/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '../pages/login.html';
                })
                .catch(() => {
                    // Even if API call fails, clear local storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '../pages/login.html';
                });
        };

        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
        }

        if (mobileLogout) {
            mobileLogout.addEventListener('click', handleLogout);
        }

        // Close mobile menu when clicking a link
        const mobileLinks = this.querySelectorAll('.mobile-nav-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                navLinks.classList.remove('show');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('show');
                navLinks.classList.remove('show');
            }
        });
    }

    disconnectedCallback() {
        // Clean up event listeners if needed
    }
}

// Define the custom element
customElements.define('alumni-navbar', Navbar);

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const navbarContainer = document.getElementById('navbar');
    if (navbarContainer) {
        navbarContainer.innerHTML = '<alumni-navbar></alumni-navbar>';
    }
});