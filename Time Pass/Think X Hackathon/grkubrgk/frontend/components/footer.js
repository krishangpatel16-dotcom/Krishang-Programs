// Footer Component
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="../assets/images/logo.png" alt="Alumni Connect">
                        <h3>Alumni Connect</h3>
                    </div>
                    <p class="footer-description">
                        Government Engineering College's official alumni network platform.
                        Connect, grow, and give back with fellow alumni.
                    </p>
                    <div class="social-links">
                        <a href="#" class="social-link" aria-label="Facebook">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="LinkedIn">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="#" class="social-link" aria-label="YouTube">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="../index.html">Home</a></li>
                        <li><a href="../pages/alumni-directory.html">Alumni Directory</a></li>
                        <li><a href="../pages/job-portal.html">Job Portal</a></li>
                        <li><a href="../pages/events.html">Events</a></li>
                        <li><a href="../pages/donate.html">Donate</a></li>
                        <li><a href="../pages/success-stories.html">Success Stories</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul class="footer-links">
                        <li><a href="../pages/faq.html">FAQ</a></li>
                        <li><a href="../pages/blog.html">Blog</a></li>
                        <li><a href="../pages/mentorship.html">Mentorship Program</a></li>
                        <li><a href="../pages/career-resources.html">Career Resources</a></li>
                        <li><a href="../pages/volunteer.html">Volunteer Opportunities</a></li>
                        <li><a href="../pages/contact.html">Contact Us</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Contact Information</h4>
                    <ul class="contact-info">
                        <li>
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Government Engineering College<br>City, State 12345</span>
                        </li>
                        <li>
                            <i class="fas fa-phone"></i>
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <i class="fas fa-envelope"></i>
                            <span>alumni@gec.edu</span>
                        </li>
                        <li>
                            <i class="fas fa-clock"></i>
                            <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                        </li>
                    </ul>
                    
                    <div class="newsletter">
                        <h5>Stay Updated</h5>
                        <p>Subscribe to our newsletter for the latest updates</p>
                        <form id="newsletterForm" class="newsletter-form">
                            <input type="email" placeholder="Enter your email" required>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <p>&copy; ${new Date().getFullYear()} Alumni Connect. All rights reserved.</p>
                    <div class="footer-bottom-links">
                        <a href="../pages/privacy.html">Privacy Policy</a>
                        <a href="../pages/terms.html">Terms of Service</a>
                        <a href="../pages/cookies.html">Cookie Policy</a>
                        <a href="../pages/sitemap.html">Sitemap</a>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Newsletter form submission
        const newsletterForm = this.querySelector('#newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput.value.trim();
                
                if (email && this.validateEmail(email)) {
                    // Show loading state
                    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
                    const originalContent = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    submitBtn.disabled = true;
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Show success message
                        this.showToast('Successfully subscribed to newsletter!', 'success');
                        
                        // Reset form
                        emailInput.value = '';
                        submitBtn.innerHTML = originalContent;
                        submitBtn.disabled = false;
                    }, 1000);
                } else {
                    this.showToast('Please enter a valid email address', 'error');
                }
            });
        }

        // Smooth scroll to top
        const scrollToTopBtn = document.createElement('button');
        scrollToTopBtn.className = 'scroll-to-top';
        scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        this.appendChild(scrollToTopBtn);
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    showToast(message, type = 'info') {
        // Create toast container if it doesn't exist
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }

        // Create toast element
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

        // Add toast to container
        toastContainer.appendChild(toast);

        // Remove toast after 3 seconds
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 3000);
    }

    disconnectedCallback() {
        // Clean up if needed
    }
}

// Define the custom element
customElements.define('alumni-footer', Footer);

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        footerContainer.innerHTML = '<alumni-footer></alumni-footer>';
    }
});