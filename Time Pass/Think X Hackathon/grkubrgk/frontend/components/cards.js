/**
 * Alumni Network Platform - Card Components
 * Reusable card components for various content types
 */

class CardComponents {
    constructor() {
        this.API_BASE_URL = 'http://localhost:5000/api';
    }

    /**
     * Initialize card components
     */
    init() {
        this.setupCardEventListeners();
        console.log('Card components initialized');
    }

    /**
     * Setup card event listeners
     */
    setupCardEventListeners() {
        // Card hover effects
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card');
            if (card && !card.classList.contains('no-hover')) {
                card.classList.add('hovered');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card');
            if (card && card.classList.contains('hovered')) {
                card.classList.remove('hovered');
            }
        });

        // Card click events
        document.addEventListener('click', (e) => {
            // Card action buttons
            if (e.target.closest('.card-action')) {
                e.preventDefault();
                const action = e.target.closest('.card-action').dataset.action;
                const card = e.target.closest('.card');
                this.handleCardAction(action, card);
            }

            // Card like buttons
            if (e.target.closest('.like-btn')) {
                e.preventDefault();
                this.handleLike(e.target.closest('.like-btn'));
            }

            // Card share buttons
            if (e.target.closest('.share-btn')) {
                e.preventDefault();
                this.handleShare(e.target.closest('.share-btn'));
            }

            // Card save/bookmark buttons
            if (e.target.closest('.save-btn')) {
                e.preventDefault();
                this.handleSave(e.target.closest('.save-btn'));
            }
        });
    }

    /**
     * Create alumni card
     */
    createAlumniCard(alumni) {
        return `
            <div class="alumni-card card" data-alumni-id="${alumni.id}">
                <div class="card-body text-center">
                    <div class="alumni-avatar-container mb-4">
                        <img 
                            src="${alumni.avatar || '/assets/images/default-avatar.png'}" 
                            alt="${alumni.name}"
                            class="alumni-avatar"
                            onerror="this.src='/assets/images/default-avatar.png'"
                        >
                        ${alumni.is_online ? '<span class="online-indicator"></span>' : ''}
                    </div>
                    
                    <h3 class="alumni-name font-semibold text-lg">${alumni.name}</h3>
                    
                    <div class="alumni-position text-gray-600 mb-3">
                        ${alumni.position ? `<div>${alumni.position}</div>` : ''}
                        ${alumni.company ? `<div class="text-sm">${alumni.company}</div>` : ''}
                    </div>
                    
                    <div class="alumni-meta flex justify-center gap-4 text-sm text-gray-500 mb-4">
                        ${alumni.graduation_year ? `<div><i class="fas fa-graduation-cap mr-1"></i> ${alumni.graduation_year}</div>` : ''}
                        ${alumni.location ? `<div><i class="fas fa-map-marker-alt mr-1"></i> ${alumni.location}</div>` : ''}
                    </div>
                    
                    <div class="alumni-skills mb-4">
                        ${alumni.skills && alumni.skills.length > 0 ? `
                            <div class="flex flex-wrap gap-2 justify-center">
                                ${alumni.skills.slice(0, 3).map(skill => `
                                    <span class="badge badge-secondary">${skill.trim()}</span>
                                `).join('')}
                                ${alumni.skills.length > 3 ? '<span class="badge badge-secondary">+' + (alumni.skills.length - 3) + '</span>' : ''}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="card-actions flex justify-center gap-2">
                        <button class="btn btn-outline btn-sm view-profile" data-alumni-id="${alumni.id}">
                            <i class="fas fa-eye mr-1"></i> View
                        </button>
                        <button class="btn btn-primary btn-sm connect-btn" data-alumni-id="${alumni.id}">
                            <i class="fas fa-user-plus mr-1"></i> Connect
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create job card
     */
    createJobCard(job) {
        const postedDate = new Date(job.created_at);
        const now = new Date();
        const daysAgo = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));
        const timeAgo = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;
        
        const typeBadgeColor = {
            'full-time': 'bg-blue-100 text-blue-800',
            'part-time': 'bg-green-100 text-green-800',
            'contract': 'bg-yellow-100 text-yellow-800',
            'internship': 'bg-purple-100 text-purple-800',
            'remote': 'bg-indigo-100 text-indigo-800'
        }[job.type] || 'bg-gray-100 text-gray-800';

        const experienceBadgeColor = {
            'entry': 'bg-green-100 text-green-800',
            'mid': 'bg-blue-100 text-blue-800',
            'senior': 'bg-purple-100 text-purple-800',
            'executive': 'bg-red-100 text-red-800'
        }[job.experience_level] || 'bg-gray-100 text-gray-800';

        return `
            <div class="job-card card" data-job-id="${job.id}">
                <div class="card-body">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-start gap-4">
                            <div class="company-logo w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                ${job.company_logo ? 
                                    `<img src="${job.company_logo}" alt="${job.company}" class="w-10 h-10 object-contain">` :
                                    `<i class="fas fa-building text-gray-400 text-xl"></i>`
                                }
                            </div>
                            <div>
                                <h3 class="job-title font-semibold text-lg mb-1">${job.title}</h3>
                                <div class="job-company text-gray-600">${job.company}</div>
                                <div class="job-location text-sm text-gray-500">
                                    <i class="fas fa-map-marker-alt mr-1"></i>
                                    ${job.location}
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-end gap-2">
                            <div class="text-sm text-gray-500">${timeAgo}</div>
                            <div class="flex gap-1">
                                <button class="save-btn btn btn-sm btn-outline" data-job-id="${job.id}" title="Save job">
                                    <i class="far fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="job-tags mb-4">
                        <span class="badge ${typeBadgeColor}">${this.formatJobType(job.type)}</span>
                        ${job.experience_level ? `<span class="badge ${experienceBadgeColor}">${job.experience_level}</span>` : ''}
                        ${job.salary_range ? `<span class="badge badge-secondary"><i class="fas fa-money-bill-wave mr-1"></i> ${job.salary_range}</span>` : ''}
                    </div>
                    
                    <div class="job-description text-gray-600 mb-4 line-clamp-2">
                        ${job.description.substring(0, 120)}${job.description.length > 120 ? '...' : ''}
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <div class="job-stats text-sm text-gray-500">
                            ${job.applications_count ? `<span><i class="fas fa-users mr-1"></i> ${job.applications_count} applicants</span>` : ''}
                        </div>
                        <div class="card-actions flex gap-2">
                            <button class="btn btn-outline btn-sm quick-view" data-job-id="${job.id}">
                                Quick View
                            </button>
                            <button class="btn btn-primary btn-sm apply-btn" data-job-id="${job.id}">
                                Apply Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create event card
     */
    createEventCard(event) {
        const eventDate = new Date(event.start_date);
        const now = new Date();
        const isUpcoming = eventDate > now;
        const isVirtual = event.location_type === 'virtual';
        const isHybrid = event.location_type === 'hybrid';
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = eventDate.getDate();
        const month = monthNames[eventDate.getMonth()];
        const time = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        const typeBadgeColor = {
            'networking': 'bg-blue-100 text-blue-800',
            'workshop': 'bg-green-100 text-green-800',
            'conference': 'bg-purple-100 text-purple-800',
            'social': 'bg-yellow-100 text-yellow-800',
            'career': 'bg-red-100 text-red-800',
            'webinar': 'bg-indigo-100 text-indigo-800'
        }[event.type] || 'bg-gray-100 text-gray-800';

        return `
            <div class="event-card card ${!isUpcoming ? 'past-event' : ''}" data-event-id="${event.id}">
                <div class="event-date absolute top-4 left-4 z-10">
                    <div class="bg-white rounded-lg shadow-md text-center p-2 min-w-16">
                        <div class="day text-xl font-bold text-gray-900">${day}</div>
                        <div class="month text-xs font-semibold text-gray-600 uppercase">${month}</div>
                    </div>
                </div>
                
                ${event.image ? `
                    <div class="event-image h-48 overflow-hidden">
                        <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
                    </div>
                ` : ''}
                
                <div class="card-body">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h3 class="event-title font-semibold text-lg mb-1">${event.title}</h3>
                            <div class="event-time text-sm text-gray-600">
                                <i class="far fa-clock mr-1"></i>
                                ${time} • ${eventDate.toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                        </div>
                        
                        <div class="flex flex-col items-end gap-1">
                            <span class="badge ${typeBadgeColor}">${this.formatEventType(event.type)}</span>
                            ${isVirtual ? '<span class="badge bg-indigo-100 text-indigo-800 text-xs">Virtual</span>' : ''}
                            ${isHybrid ? '<span class="badge bg-purple-100 text-purple-800 text-xs">Hybrid</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="event-location text-sm text-gray-600 mb-3">
                        <i class="fas fa-${isVirtual ? 'video' : 'map-marker-alt'} mr-1"></i>
                        ${isVirtual ? 'Online Event' : event.location}
                    </div>
                    
                    <div class="event-description text-gray-600 mb-4 line-clamp-2">
                        ${event.description.substring(0, 100)}${event.description.length > 100 ? '...' : ''}
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <div class="event-stats text-sm text-gray-500">
                            ${event.attendees_count ? `
                                <span><i class="fas fa-users mr-1"></i> ${event.attendees_count} attending</span>
                            ` : ''}
                            ${event.max_attendees ? `
                                <span class="ml-3"><i class="fas fa-user-check mr-1"></i> ${event.max_attendees - (event.attendees_count || 0)} spots left</span>
                            ` : ''}
                        </div>
                        
                        <div class="card-actions flex gap-2">
                            ${isUpcoming ? `
                                <button class="btn btn-outline btn-sm event-details" data-event-id="${event.id}">
                                    Details
                                </button>
                                ${event.is_registered ? `
                                    <button class="btn btn-success btn-sm" disabled>
                                        <i class="fas fa-check mr-1"></i> Registered
                                    </button>
                                ` : `
                                    <button class="btn btn-primary btn-sm register-btn" data-event-id="${event.id}">
                                        Register
                                    </button>
                                `}
                            ` : `
                                <button class="btn btn-outline btn-sm event-details" data-event-id="${event.id}">
                                    View Recap
                                </button>
                            `}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create story card
     */
    createStoryCard(story) {
        const publishDate = new Date(story.created_at);
        const timeAgo = this.getTimeAgo(publishDate);
        
        const categoryBadgeColor = {
            'entrepreneurship': 'bg-blue-100 text-blue-800',
            'leadership': 'bg-green-100 text-green-800',
            'innovation': 'bg-purple-100 text-purple-800',
            'philanthropy': 'bg-red-100 text-red-800',
            'career': 'bg-yellow-100 text-yellow-800',
            'research': 'bg-indigo-100 text-indigo-800'
        }[story.category] || 'bg-gray-100 text-gray-800';

        return `
            <div class="story-card card" data-story-id="${story.id}">
                ${story.featured_image ? `
                    <div class="story-image h-48 overflow-hidden">
                        <img src="${story.featured_image}" alt="${story.title}" class="w-full h-full object-cover">
                    </div>
                ` : ''}
                
                <div class="card-body">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <span class="badge ${categoryBadgeColor} mb-2">${this.formatCategory(story.category)}</span>
                            <h3 class="story-title font-semibold text-lg mb-2">${story.title}</h3>
                        </div>
                        
                        <div class="flex gap-1">
                            <button class="like-btn btn btn-sm btn-outline" data-story-id="${story.id}" title="Like">
                                <i class="far fa-heart"></i>
                                ${story.likes_count ? `<span class="ml-1">${story.likes_count}</span>` : ''}
                            </button>
                        </div>
                    </div>
                    
                    <div class="story-summary text-gray-600 mb-4 line-clamp-3">
                        ${story.summary}
                    </div>
                    
                    <div class="story-author flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <img 
                                src="${story.author_avatar || '/assets/images/default-avatar.png'}" 
                                alt="${story.author_name}"
                                class="w-10 h-10 rounded-full"
                                onerror="this.src='/assets/images/default-avatar.png'"
                            >
                            <div>
                                <div class="author-name font-medium">${story.author_name}</div>
                                <div class="author-info text-sm text-gray-500">
                                    ${story.author_position ? `${story.author_position}` : ''}
                                    ${story.graduation_year ? ` • Class of ${story.graduation_year}` : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <div class="text-sm text-gray-500">
                            <i class="far fa-clock mr-1"></i> ${timeAgo}
                            ${story.read_time ? `<span class="ml-3"><i class="far fa-eye mr-1"></i> ${story.read_time} min read</span>` : ''}
                        </div>
                        
                        <div class="card-actions">
                            <button class="btn btn-outline btn-sm read-story" data-story-id="${story.id}">
                                Read Story
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create donation card
     */
    createDonationCard(donation) {
        const donationDate = new Date(donation.created_at);
        const timeAgo = this.getTimeAgo(donationDate);
        
        const impactBadgeColor = {
            'scholarship': 'bg-blue-100 text-blue-800',
            'campus': 'bg-green-100 text-green-800',
            'research': 'bg-purple-100 text-purple-800',
            'athletics': 'bg-red-100 text-red-800',
            'general': 'bg-gray-100 text-gray-800'
        }[donation.impact_area] || 'bg-gray-100 text-gray-800';

        return `
            <div class="donation-card card" data-donation-id="${donation.id}">
                <div class="card-body">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <span class="badge ${impactBadgeColor} mb-2">${this.formatImpactArea(donation.impact_area)}</span>
                            <div class="donation-amount text-2xl font-bold text-primary mb-1">
                                $${parseFloat(donation.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>
                        
                        <div class="text-sm text-gray-500">
                            ${timeAgo}
                        </div>
                    </div>
                    
                    <div class="donor-info flex items-center gap-3 mb-4">
                        <div class="donor-avatar w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            ${donation.is_anonymous ? 
                                `<i class="fas fa-user-secret text-gray-500"></i>` :
                                `<img 
                                    src="${donation.donor_avatar || '/assets/images/default-avatar.png'}" 
                                    alt="${donation.donor_name}"
                                    class="w-full h-full rounded-full object-cover"
                                    onerror="this.src='/assets/images/default-avatar.png'"
                                >`
                            }
                        </div>
                        <div>
                            <div class="donor-name font-medium">
                                ${donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
                            </div>
                            ${donation.donor_class_year ? `
                                <div class="donor-class text-sm text-gray-500">
                                    Class of ${donation.donor_class_year}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${donation.dedication ? `
                        <div class="donation-dedication bg-gray-50 rounded-lg p-3 mb-4">
                            <div class="text-sm font-medium text-gray-700 mb-1">In dedication:</div>
                            <div class="text-gray-600 italic">"${donation.dedication}"</div>
                        </div>
                    ` : ''}
                    
                    ${donation.message ? `
                        <div class="donation-message text-gray-600 mb-4 line-clamp-2">
                            "${donation.message}"
                        </div>
                    ` : ''}
                    
                    <div class="flex justify-end">
                        <button class="like-btn btn btn-sm btn-outline" data-donation-id="${donation.id}">
                            <i class="far fa-heart mr-1"></i> Thank
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create statistics card
     */
    createStatCard(title, value, icon, color = 'primary', change = null) {
        const colorClasses = {
            'primary': 'bg-blue-100 text-blue-600',
            'success': 'bg-green-100 text-green-600',
            'warning': 'bg-yellow-100 text-yellow-600',
            'danger': 'bg-red-100 text-red-600',
            'info': 'bg-indigo-100 text-indigo-600'
        }[color] || 'bg-gray-100 text-gray-600';

        return `
            <div class="stat-card card">
                <div class="card-body">
                    <div class="flex items-center justify-between mb-4">
                        <div class="stat-icon w-12 h-12 rounded-lg ${colorClasses} flex items-center justify-center">
                            <i class="${icon} text-xl"></i>
                        </div>
                        ${change !== null ? `
                            <div class="stat-change ${change >= 0 ? 'text-green-600' : 'text-red-600'}">
                                <i class="fas fa-${change >= 0 ? 'arrow-up' : 'arrow-down'} mr-1"></i>
                                ${Math.abs(change)}%
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="stat-value text-2xl font-bold text-gray-900 mb-1">
                        ${value}
                    </div>
                    <div class="stat-title text-gray-600">
                        ${title}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create notification card
     */
    createNotificationCard(notification) {
        const notificationDate = new Date(notification.created_at);
        const timeAgo = this.getTimeAgo(notificationDate);
        
        const typeIcon = {
            'success': 'fas fa-check-circle text-green-500',
            'info': 'fas fa-info-circle text-blue-500',
            'warning': 'fas fa-exclamation-circle text-yellow-500',
            'error': 'fas fa-times-circle text-red-500',
            'event': 'fas fa-calendar-alt text-purple-500',
            'job': 'fas fa-briefcase text-indigo-500',
            'connection': 'fas fa-user-plus text-green-500'
        }[notification.type] || 'fas fa-bell text-gray-500';

        return `
            <div class="notification-card ${notification.read ? 'read' : 'unread'} p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" data-notification-id="${notification.id}">
                <div class="flex items-start gap-3">
                    <div class="notification-icon mt-1">
                        <i class="${typeIcon}"></i>
                    </div>
                    
                    <div class="flex-1">
                        <div class="notification-title font-medium mb-1">
                            ${notification.title}
                        </div>
                        <div class="notification-message text-sm text-gray-600 mb-2">
                            ${notification.message}
                        </div>
                        <div class="notification-time text-xs text-gray-500">
                            ${timeAgo}
                        </div>
                    </div>
                    
                    ${!notification.read ? `
                        <div class="unread-indicator w-2 h-2 bg-blue-500 rounded-full"></div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Create empty state card
     */
    createEmptyStateCard(title, message, icon = 'fas fa-inbox', action = null) {
        return `
            <div class="empty-state-card card">
                <div class="card-body text-center py-12">
                    <div class="empty-icon text-gray-300 text-6xl mb-6">
                        <i class="${icon}"></i>
                    </div>
                    <h3 class="empty-title text-xl font-semibold text-gray-700 mb-2">
                        ${title}
                    </h3>
                    <p class="empty-message text-gray-600 mb-6 max-w-md mx-auto">
                        ${message}
                    </p>
                    ${action ? `
                        <button class="empty-action btn btn-primary" data-action="${action.action}">
                            ${action.icon ? `<i class="${action.icon} mr-2"></i>` : ''}
                            ${action.text}
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Create loading skeleton card
     */
    createSkeletonCard(type = 'default') {
        const skeletons = {
            'alumni': `
                <div class="skeleton-card card">
                    <div class="card-body">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="skeleton-avatar w-16 h-16 rounded-full bg-gray-200 animate-pulse"></div>
                            <div class="flex-1">
                                <div class="skeleton-line h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                                <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
                            </div>
                        </div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
                    </div>
                </div>
            `,
            'job': `
                <div class="skeleton-card card">
                    <div class="card-body">
                        <div class="flex justify-between items-start mb-4">
                            <div class="flex items-center gap-4">
                                <div class="skeleton-logo w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div>
                                    <div class="skeleton-line h-4 bg-gray-200 rounded animate-pulse mb-2 w-48"></div>
                                    <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                                </div>
                            </div>
                        </div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4"></div>
                    </div>
                </div>
            `,
            'default': `
                <div class="skeleton-card card">
                    <div class="card-body">
                        <div class="skeleton-line h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-full"></div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-2/3"></div>
                        <div class="skeleton-line h-3 bg-gray-200 rounded animate-pulse mb-2 w-4/5"></div>
                    </div>
                </div>
            `
        };

        return skeletons[type] || skeletons.default;
    }

    /**
     * Handle card actions
     */
    async handleCardAction(action, card) {
        const cardId = card.dataset.id || card.dataset.alumniId || card.dataset.jobId || card.dataset.eventId || card.dataset.storyId;
        const cardType = card.classList.contains('alumni-card') ? 'alumni' :
                        card.classList.contains('job-card') ? 'job' :
                        card.classList.contains('event-card') ? 'event' :
                        card.classList.contains('story-card') ? 'story' : '';

        switch(action) {
            case 'view':
                await this.viewCardDetails(cardType, cardId);
                break;
            case 'connect':
                await this.connectAlumni(cardId);
                break;
            case 'apply':
                await this.applyJob(cardId);
                break;
            case 'register':
                await this.registerEvent(cardId);
                break;
            case 'share':
                await this.shareCard(cardType, cardId);
                break;
            case 'save':
                await this.saveCard(cardType, cardId);
                break;
        }
    }

    /**
     * View card details
     */
    async viewCardDetails(type, id) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/${type}s/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                this.showDetailsModal(type, data);
            }
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
        }
    }

    /**
     * Show details modal
     */
    showDetailsModal(type, data) {
        let modalContent = '';
        let modalTitle = '';

        switch(type) {
            case 'alumni':
                modalTitle = data.name;
                modalContent = this.createAlumniDetails(data);
                break;
            case 'job':
                modalTitle = data.title;
                modalContent = this.createJobDetails(data);
                break;
            case 'event':
                modalTitle = data.title;
                modalContent = this.createEventDetails(data);
                break;
            case 'story':
                modalTitle = data.title;
                modalContent = this.createStoryDetails(data);
                break;
        }

        // Create or update modal
        let modal = document.getElementById('detailsModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'detailsModal';
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 800px;">
                    <div class="modal-header">
                        <h3 class="modal-title text-lg font-semibold"></h3>
                        <button class="modal-close" data-modal-close>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-content"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        modal.querySelector('.modal-title').textContent = modalTitle;
        modal.querySelector('.modal-content').innerHTML = modalContent;
        modal.classList.add('active');
    }

    /**
     * Create alumni details content
     */
    createAlumniDetails(alumni) {
        return `
            <div class="alumni-details">
                <div class="flex flex-col md:flex-row gap-6 mb-6">
                    <div class="md:w-1/3">
                        <div class="alumni-avatar-large mb-4">
                            <img 
                                src="${alumni.avatar || '/assets/images/default-avatar.png'}" 
                                alt="${alumni.name}"
                                class="w-32 h-32 rounded-full mx-auto object-cover"
                            >
                        </div>
                        <div class="text-center">
                            <h2 class="text-xl font-bold mb-1">${alumni.name}</h2>
                            <div class="text-gray-600 mb-4">
                                ${alumni.position ? `<div>${alumni.position}</div>` : ''}
                                ${alumni.company ? `<div>${alumni.company}</div>` : ''}
                            </div>
                            <button class="btn btn-primary connect-btn" data-alumni-id="${alumni.id}">
                                <i class="fas fa-user-plus mr-2"></i>
                                Connect
                            </button>
                        </div>
                    </div>
                    
                    <div class="md:w-2/3">
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="info-item">
                                <div class="label text-sm text-gray-500">Graduation Year</div>
                                <div class="value font-medium">${alumni.graduation_year || 'N/A'}</div>
                            </div>
                            <div class="info-item">
                                <div class="label text-sm text-gray-500">Degree</div>
                                <div class="value font-medium">${alumni.degree || 'N/A'}</div>
                            </div>
                            <div class="info-item">
                                <div class="label text-sm text-gray-500">Location</div>
                                <div class="value font-medium">${alumni.location || 'N/A'}</div>
                            </div>
                            <div class="info-item">
                                <div class="label text-sm text-gray-500">Industry</div>
                                <div class="value font-medium">${alumni.industry || 'N/A'}</div>
                            </div>
                        </div>
                        
                        ${alumni.bio ? `
                            <div class="mb-6">
                                <h4 class="font-semibold mb-2">Bio</h4>
                                <p class="text-gray-700">${alumni.bio}</p>
                            </div>
                        ` : ''}
                        
                        ${alumni.skills && alumni.skills.length > 0 ? `
                            <div class="mb-6">
                                <h4 class="font-semibold mb-2">Skills</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${alumni.skills.map(skill => `
                                        <span class="badge badge-secondary">${skill.trim()}</span>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
                        ${alumni.linkedin ? `
                            <div class="mt-6">
                                <a href="${alumni.linkedin}" target="_blank" class="btn btn-outline">
                                    <i class="fab fa-linkedin mr-2"></i>
                                    View LinkedIn Profile
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Handle like button
     */
    async handleLike(button) {
        const id = button.dataset.storyId || button.dataset.donationId;
        const type = button.dataset.storyId ? 'story' : 'donation';
        
        try {
            const response = await fetch(`${this.API_BASE_URL}/${type}s/${id}/like`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                const icon = button.querySelector('i');
                
                if (result.liked) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    button.classList.add('liked');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    button.classList.remove('liked');
                }
                
                // Update count if exists
                const countSpan = button.querySelector('span');
                if (countSpan) {
                    countSpan.textContent = result.likes_count;
                }
            }
        } catch (error) {
            console.error('Error liking:', error);
        }
    }

    /**
     * Handle share button
     */
    async handleShare(button) {
        const url = window.location.href;
        const title = document.title;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
        }
    }

    /**
     * Handle save button
     */
    async handleSave(button) {
        const id = button.dataset.jobId;
        
        try {
            const response = await fetch(`${this.API_BASE_URL}/jobs/${id}/save`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                const icon = button.querySelector('i');
                
                if (result.saved) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    button.classList.add('saved');
                } else {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    button.classList.remove('saved');
                }
            }
        } catch (error) {
            console.error('Error saving:', error);
        }
    }

    /**
     * Format job type
     */
    formatJobType(type) {
        const types = {
            'full-time': 'Full Time',
            'part-time': 'Part Time',
            'contract': 'Contract',
            'internship': 'Internship',
            'remote': 'Remote'
        };
        return types[type] || type;
    }

    /**
     * Format event type
     */
    formatEventType(type) {
        const types = {
            'networking': 'Networking',
            'workshop': 'Workshop',
            'conference': 'Conference',
            'social': 'Social',
            'career': 'Career Fair',
            'webinar': 'Webinar'
        };
        return types[type] || type;
    }

    /**
     * Format category
     */
    formatCategory(category) {
        const categories = {
            'entrepreneurship': 'Entrepreneurship',
            'leadership': 'Leadership',
            'innovation': 'Innovation',
            'philanthropy': 'Philanthropy',
            'career': 'Career Growth',
            'research': 'Research'
        };
        return categories[category] || category;
    }

    /**
     * Format impact area
     */
    formatImpactArea(area) {
        const areas = {
            'scholarship': 'Scholarships',
            'campus': 'Campus',
            'research': 'Research',
            'athletics': 'Athletics',
            'general': 'General Fund'
        };
        return areas[area] || area;
    }

    /**
     * Get time ago string
     */
    getTimeAgo(date) {
        const now = new Date();
        const diffMs = now - date;
        const diffSec = Math.floor(diffMs / 1000);
        const diffMin = Math.floor(diffSec / 60);
        const diffHour = Math.floor(diffMin / 60);
        const diffDay = Math.floor(diffHour / 24);
        
        if (diffSec < 60) return 'Just now';
        if (diffMin < 60) return `${diffMin}m ago`;
        if (diffHour < 24) return `${diffHour}h ago`;
        if (diffDay < 7) return `${diffDay}d ago`;
        if (diffDay < 30) return `${Math.floor(diffDay / 7)}w ago`;
        if (diffDay < 365) return `${Math.floor(diffDay / 30)}mo ago`;
        return `${Math.floor(diffDay / 365)}y ago`;
    }

    /**
     * Connect to alumni
     */
    async connectAlumni(alumniId) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/alumni/${alumniId}/connect`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert('Connection request sent!');
                }
            }
        } catch (error) {
            console.error('Error connecting:', error);
        }
    }

    /**
     * Apply for job
     */
    async applyJob(jobId) {
        // This would open the job application modal or redirect
        const modal = document.getElementById('jobDetailsModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    /**
     * Register for event
     */
    async registerEvent(eventId) {
        try {
            const response = await fetch(`${this.API_BASE_URL}/events/${eventId}/register`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    alert('Successfully registered for the event!');
                }
            }
        } catch (error) {
            console.error('Error registering:', error);
        }
    }
}

// Initialize card components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const cardComponents = new CardComponents();
    cardComponents.init();
    
    // Make available globally
    window.cardComponents = cardComponents;
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CardComponents;
}