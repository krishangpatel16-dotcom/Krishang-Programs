// Events Module
class EventsService {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.auth = window.AuthService;
    }

    // Get all events with filters
    async getAllEvents(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add filters to query params
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/events?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get all events error:', error);
            return { 
                success: false, 
                message: error.message || 'Failed to fetch events' 
            };
        }
    }

    // Get event by ID
    async getEventById(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event by ID error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event details' 
            };
        }
    }

    // Create event
    async createEvent(eventData) {
        try {
            const url = `${this.baseURL}/events`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(eventData)
            }};
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create event error:', error);
            return { 
                success: false, 
                message: 'Failed to create event' 
            };
        }
    }

    // Update event
    async updateEvent(eventId, eventData) {
        try {
            const url = `${this.baseURL}/events/${eventId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(eventData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update event error:', error);
            return { 
                success: false, 
                message: 'Failed to update event' 
            };
        }
    }

    // Delete event
    async deleteEvent(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete event error:', error);
            return { 
                success: false, 
                message: 'Failed to delete event' 
            };
        }
    }

    // Register for event
    async registerForEvent(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/register`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Register for event error:', error);
            return { 
                success: false, 
                message: 'Failed to register for event' 
            };
        }
    }

    // Cancel registration
    async cancelRegistration(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/register`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Cancel registration error:', error);
            return { 
                success: false, 
                message: 'Failed to cancel registration' 
            };
        }
    }

    // Get my registered events
    async getMyRegisteredEvents() {
        try {
            const url = `${this.baseURL}/events/my/registered`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get my registered events error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch registered events' 
            };
        }
    }

    // Get events created by me
    async getMyCreatedEvents() {
        try {
            const url = `${this.baseURL}/events/my/created`;
            const response = await this.auth.fetchWith
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get my created events error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch created events' 
            };
        }
    }

    // Get upcoming events
    async getUpcomingEvents(limit = 6) {
        try {
            const url = `${this.baseURL}/events/upcoming?limit=${limit}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get upcoming events error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch upcoming events' 
            };
        }
    }

    // Get featured events
    async getFeaturedEvents(limit = 3) {
        try {
            const url = `${this.baseURL}/events/featured?limit=${limit}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get featured events error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch featured events' 
            };
        }
    }

    // Add speaker to event
    async addSpeaker(eventId, speakerData) {
        try {
            const url = `${this.baseURL}/events/${eventId}/speakers`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(speakerData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add speaker error:', error);
            return { 
                success: false, 
                message: 'Failed to add speaker' 
            };
        }
    }

    // Remove speaker from event
    async removeSpeaker(eventId, speakerId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/speakers/${speakerId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Remove speaker error:', error);
            return { 
                success: false, 
                message: 'Failed to remove speaker' 
            };
        }
    }

    // Add agenda item
    async addAgendaItem(eventId, agendaItem) {
        try {
            const url = `${this.baseURL}/events/${eventId}/agenda`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(agendaItem)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add agenda item error:', error);
            return { 
                success: false, 
                message: 'Failed to add agenda item' 
            };
        }
    }

    // Update agenda item
    async updateAgendaItem(eventId, agendaId, agendaItem) {
        try {
            const url = `${this.baseURL}/events/${eventId}/agenda/${agendaId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(agendaItem)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update agenda item error:', error);
            return { 
                success: false, 
                message: 'Failed to update agenda item' 
            };
        }
    }

    // Remove agenda item
    async removeAgendaItem(eventId, agendaId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/agenda/${agendaId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Remove agenda item error:', error);
            return { 
                success: false, 
                message: 'Failed to remove agenda item' 
            };
        }
    }

    // Upload event cover image
    async uploadCoverImage(eventId, file) {
        try {
            const formData = new FormData();
            formData.append('coverImage', file);

            const url = `${this.baseURL}/events/${eventId}/upload-cover`;
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
            console.error('Upload cover image error:', error);
            return { 
                success: false, 
                message: 'Failed to upload cover image' 
            };
        }
    }

    // Get event registrations
    async getEventRegistrations(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/registrations`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event registrations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event registrations' 
            };
        }
    }

    // Update registration status
    async updateRegistrationStatus(eventId, registrationId, status) {
        try {
            const url = `${this.baseURL}/events/${eventId}/registrations/${registrationId}/status`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update registration status error:', error);
            return { 
                success: false, 
                message: 'Failed to update registration status' 
            };
        }
    }

    // Send event reminder
    async sendEventReminder(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/send-reminder`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Send event reminder error:', error);
            return { 
                success: false, 
                message: 'Failed to send event reminder' 
            };
        }
    }

    // Export event attendees
    async exportEventAttendees(eventId, format = 'csv') {
        try {
            const url = `${this.baseURL}/events/${eventId}/export-attendees?format=${format}`;
            const response = await this.auth.fetchWithAuth(url);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `event-attendees-${eventId}-${new Date().toISOString().split('T')[0]}.${format}`;
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
            console.error('Export event attendees error:', error);
            return { 
                success: false, 
                message: 'Failed to export attendees' 
            };
        }
    }

    // Get event statistics
    async getEventStats(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/stats`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event stats error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event statistics' 
            };
        }
    }

    // Check event capacity
    async checkEventCapacity(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/capacity`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Check event capacity error:', error);
            return { 
                success: false, 
                message: 'Failed to check event capacity' 
            };
        }
    }

    // Duplicate event
    async duplicateEvent(eventId, newDate) {
        try {
            const url = `${this.baseURL}/events/${eventId}/duplicate`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ newDate })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Duplicate event error:', error);
            return { 
                success: false, 
                message: 'Failed to duplicate event' 
            };
        }
    }

    // Cancel event
    async cancelEvent(eventId, reason) {
        try {
            const url = `${this.baseURL}/events/${eventId}/cancel`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ reason })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Cancel event error:', error);
            return { 
                success: false, 
                message: 'Failed to cancel event' 
            };
        }
    }

    // Search events
    async searchEvents(query, filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('search', query);
            
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/events/search?${queryParams.toString()}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Search events error:', error);
            return { 
                success: false, 
                message: 'Failed to search events' 
            };
        }
    }

    // Get event categories
    async getEventCategories() {
        try {
            const url = `${this.baseURL}/events/categories`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event categories error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event categories' 
            };
        }
    }

    // Get event recommendations
    async getEventRecommendations() {
        try {
            const url = `${this.baseURL}/events/recommendations`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event recommendations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event recommendations' 
            };
        }
    }

    // Share event
    async shareEvent(eventId, platform) {
        try {
            const url = `${this.baseURL}/events/${eventId}/share`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ platform })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Share event error:', error);
            return { 
                success: false, 
                message: 'Failed to share event' 
            };
        }
    }

    // Add event to calendar
    async addToCalendar(eventId, calendarType) {
        try {
            const url = `${this.baseURL}/events/${eventId}/add-to-calendar`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ calendarType })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add to calendar error:', error);
            return { 
                success: false, 
                message: 'Failed to add event to calendar' 
            };
        }
    }

    // Get event waitlist
    async getEventWaitlist(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/waitlist`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get event waitlist error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch event waitlist' 
            };
        }
    }

    // Join waitlist
    async joinWaitlist(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/waitlist/join`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Join waitlist error:', error);
            return { 
                success: false, 
                message: 'Failed to join waitlist' 
            };
        }
    }

    // Leave waitlist
    async leaveWaitlist(eventId) {
        try {
            const url = `${this.baseURL}/events/${eventId}/waitlist/leave`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Leave waitlist error:', error);
            return { 
                success: false, 
                message: 'Failed to leave waitlist' 
            };
        }
    }
}

// Create singleton instance
const eventsService = new EventsService();

// Export for use in other modules
window.EventsService = eventsService;

// Utility functions for events portal
window.renderEventsPortal = async function(filters = {}) {
    const container = document.getElementById('eventsPortal');
    if (!container) return;

    // Show loading state
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading events...</p>
        </div>
    `;

    try {
        const result = await eventsService.getAllEvents(filters);
        
        if (result.success) {
            if (result.data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-calendar-times"></i>
                        <h3>No events found</h3>
                        <p>Try adjusting your filters or check back later</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = result.data.map(event => `
                <div class="event-listing" data-event-id="${event._id}">
                    <div class="event-image">
                        <img src="${event.coverImage || '../assets/images/default-event.jpg'}" 
                             alt="${event.title}">
                        <div class="event-date-badge">
                            <span class="event-day">${new Date(event.date).getDate()}</span>
                            <span class="event-month">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                        </div>
                        ${event.isVirtual ? `
                            <span class="event-virtual-badge">
                                <i class="fas fa-video"></i> Virtual
                            </span>
                        ` : ''}
                    </div>
                    
                    <div class="event-content">
                        <div class="event-header">
                            <h3 class="event-title">
                                <a href="event-details.html?id=${event._id}">${event.title}</a>
                            </h3>
                            <span class="event-type ${event.eventType.toLowerCase()}">
                                ${event.eventType.replace('_', ' ')}
                            </span>
                        </div>
                        
                        <div class="event-meta">
                            <div class="event-meta-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${event.location}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${formatEventDate(event.date)}</span>
                            </div>
                            <div class="event-meta-item">
                                <i class="fas fa-users"></i>
                                <span>${event.registeredCount || 0} registered</span>
                            </div>
                        </div>
                        
                        <p class="event-description">${event.description.substring(0, 150)}...</p>
                        
                        <div class="event-footer">
                            <div class="event-actions">
                                ${event.isRegistered ? `
                                    <button class="btn btn-success btn-small" disabled>
                                        <i class="fas fa-check-circle"></i> Registered
                                    </button>
                                    <button class="btn btn-outline btn-small" onclick="cancelRegistration('${event._id}')">
                                        <i class="fas fa-times"></i> Cancel
                                    </button>
                                ` : `
                                    <button class="btn btn-primary btn-small" onclick="registerForEventModal('${event._id}')">
                                        <i class="fas fa-calendar-plus"></i> Register
                                    </button>
                                `}
                                <button class="btn btn-outline btn-small" onclick="shareEvent('${event._id}')">
                                    <i class="fas fa-share-alt"></i> Share
                                </button>
                            </div>
                            
                            ${event.maxAttendees ? `
                                <div class="event-capacity">
                                    <div class="capacity-bar">
                                        <div class="capacity-fill" 
                                             style="width: ${calculateCapacityPercent(event.registeredCount || 0, event.maxAttendees)}%">
                                        </div>
                                    </div>
                                    <span class="capacity-text">
                                        ${event.availableSpots} spots left
                                    </span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `).join('');

            // Render pagination if available
            if (result.pagination && result.pagination.pages > 1) {
                renderEventsPagination(result.pagination);
            }
        } else {
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error loading events</h3>
                    <p>${result.message}</p>
                    <button class="btn btn-primary" onclick="renderEventsPortal(${JSON.stringify(filters)})">
                        Try Again
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Render events portal error:', error);
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Network Error</h3>
                <p>Failed to load events. Please check your connection.</p>
                <button class="btn btn-primary" onclick="renderEventsPortal(${JSON.stringify(filters)})">
                    Try Again
                </button>
            </div>
        `;
    }
};

window.formatEventDate = function(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Format time
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    
    // Check if it's today, tomorrow, or another day
    if (date.toDateString() === now.toDateString()) {
        return `Today at ${time}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow at ${time}`;
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    }
};

window.calculateCapacityPercent = function(registered, max) {
    if (!max || max === 0) return 0;
    return Math.min((registered / max) * 100, 100);
};

window.renderEventsPagination = function(pagination) {
    const container = document.getElementById('eventsPagination');
    if (!container || !pagination) return;

    const { page, pages, total } = pagination;
    
    let paginationHTML = `
        <div class="pagination">
            <button class="pagination-btn ${page === 1 ? 'disabled' : ''}" 
                    ${page === 1 ? 'disabled' : 'onclick="changeEventsPage(' + (page - 1) + ')"'}>
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
            <button class="pagination-btn" onclick="changeEventsPage(1)">1</button>
            ${startPage > 2 ? '<span class="pagination-ellipsis">...</span>' : ''}
        `;
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button class="pagination-btn ${i === page ? 'active' : ''}" 
                    onclick="changeEventsPage(${i})">
                ${i}
            </button>
        `;
    }

    if (endPage < pages) {
        paginationHTML += `
            ${endPage < pages - 1 ? '<span class="pagination-ellipsis">...</span>' : ''}
            <button class="pagination-btn" onclick="changeEventsPage(${pages})">${pages}</button>
        `;
    }

    paginationHTML += `
            </div>
            
            <button class="pagination-btn ${page === pages ? 'disabled' : ''}" 
                    ${page === pages ? 'disabled' : 'onclick="changeEventsPage(' + (page + 1) + ')"'}>
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>
        
        <div class="pagination-info">
            Showing page ${page} of ${pages} (${total} total events)
        </div>
    `;

    container.innerHTML = paginationHTML;
};

window.changeEventsPage = function(newPage) {
    const currentFilters = window.currentEventsFilters || {};
    currentFilters.page = newPage;
    window.currentEventsFilters = currentFilters;
    renderEventsPortal(currentFilters);
};

window.registerForEventModal = async function(eventId) {
    // Check if user is authenticated
    if (!window.AuthService.isAuthenticated()) {
        window.location.href = 'login.html?redirect=event-details.html?id=' + eventId;
        return;
    }

    // Get event details first
    const eventResult = await eventsService.getEventById(eventId);
    if (!eventResult.success) {
        showToast('Failed to load event details', 'error');
        return;
    }

    const event = eventResult.data;
    
    // Check if already registered
    if (event.isRegistered) {
        showToast('You are already registered for this event', 'info');
        return;
    }

    // Check if event is at capacity
    if (event.maxAttendees && event.registeredCount >= event.maxAttendees) {
        showToast('This event is at full capacity', 'error');
        return;
    }

    // Check if registration deadline has passed
    if (event.registrationDeadline && new Date(event.registrationDeadline) < new Date()) {
        showToast('Registration deadline has passed', 'error');
        return;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Register for: ${event.title}</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="event-registration-info">
                    <div class="info-item">
                        <i class="fas fa-calendar"></i>
                        <span>${formatEventDate(event.date)}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                    ${event.registrationFee && event.registrationFee.amount > 0 ? `
                        <div class="info-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>Registration Fee: $${event.registrationFee.amount} ${event.registrationFee.currency}</span>
                        </div>
                    ` : ''}
                </div>
                
                <form id="eventRegistrationForm">
                    <div class="form-group">
                        <label for="numAttendees" class="form-label">Number of Attendees</label>
                        <select id="numAttendees" class="form-control">
                            ${Array.from({length: 5}, (_, i) => i + 1).map(num => `
                                <option value="${num}">${num} ${num === 1 ? 'person' : 'people'}</option>
                            `).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="specialRequirements" class="form-label">Special Requirements</label>
                        <textarea id="specialRequirements" class="form-control" rows="3" 
                                  placeholder="Any dietary restrictions, accessibility needs, or other requirements..."></textarea>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="receiveUpdates" checked>
                        <label for="receiveUpdates" class="form-check-label">
                            Receive event updates and reminders
                        </label>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="agreeTerms" required>
                        <label for="agreeTerms" class="form-check-label">
                            I agree to the event terms and conditions
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="submitEventRegistration('${eventId}')">
                    Complete Registration
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window.submitEventRegistration = async function(eventId) {
    const form = document.getElementById('eventRegistrationForm');
    const numAttendees = document.getElementById('numAttendees').value;
    const specialRequirements = document.getElementById('specialRequirements').value;
    const receiveUpdates = document.getElementById('receiveUpdates').checked;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (!agreeTerms) {
        showToast('Please agree to the terms and conditions', 'error');
        return;
    }

    try {
        const result = await eventsService.registerForEvent(eventId);
        if (result.success) {
            showToast('Successfully registered for the event!', 'success');
            
            // Close modal
            const modal = document.querySelector('.modal.show');
            if (modal) modal.remove();
            
            // Update UI
            const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
            if (eventCard) {
                const actionsDiv = eventCard.querySelector('.event-actions');
                actionsDiv.innerHTML = `
                    <button class="btn btn-success btn-small" disabled>
                        <i class="fas fa-check-circle"></i> Registered
                    </button>
                    <button class="btn btn-outline btn-small" onclick="cancelRegistration('${eventId}')">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                `;
                
                // Update capacity display
                const capacityText = eventCard.querySelector('.capacity-text');
                if (capacityText) {
                    const currentText = capacityText.textContent;
                    const match = currentText.match(/(\d+)/);
                    if (match) {
                        const currentSpots = parseInt(match[1]);
                        const newSpots = Math.max(0, currentSpots - 1);
                        capacityText.textContent = `${newSpots} spots left`;
                        
                        // Update capacity bar
                        const capacityFill = eventCard.querySelector('.capacity-fill');
                        if (capacityFill) {
                            const currentWidth = parseFloat(capacityFill.style.width);
                            capacityFill.style.width = `${Math.min(currentWidth + (100 / parseInt(eventCard.dataset.maxCapacity || 100)), 100)}%`;
                        }
                    }
                }
            }
            
            // Send confirmation email (optional)
            if (receiveUpdates) {
                // This would be handled by the backend
                console.log('User opted in for event updates');
            }
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to register for event', 'error');
    }
};

window.cancelRegistration = async function(eventId) {
    if (!confirm('Are you sure you want to cancel your registration?')) {
        return;
    }

    try {
        const result = await eventsService.cancelRegistration(eventId);
        if (result.success) {
            showToast('Registration cancelled successfully', 'success');
            
            // Update UI
            const eventCard = document.querySelector(`[data-event-id="${eventId}"]`);
            if (eventCard) {
                const actionsDiv = eventCard.querySelector('.event-actions');
                actionsDiv.innerHTML = `
                    <button class="btn btn-primary btn-small" onclick="registerForEventModal('${eventId}')">
                        <i class="fas fa-calendar-plus"></i> Register
                    </button>
                `;
                
                // Update capacity display
                const capacityText = eventCard.querySelector('.capacity-text');
                if (capacityText) {
                    const currentText = capacityText.textContent;
                    const match = currentText.match(/(\d+)/);
                    if (match) {
                        const currentSpots = parseInt(match[1]);
                        const newSpots = currentSpots + 1;
                        capacityText.textContent = `${newSpots} spots left`;
                        
                        // Update capacity bar
                        const capacityFill = eventCard.querySelector('.capacity-fill');
                        if (capacityFill) {
                            const currentWidth = parseFloat(capacityFill.style.width);
                            capacityFill.style.width = `${Math.max(currentWidth - (100 / parseInt(eventCard.dataset.maxCapacity || 100)), 0)}%`;
                        }
                    }
                }
            }
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to cancel registration', 'error');
    }
};

window.shareEvent = function(eventId) {
    // Get current URL
    const url = window.location.origin + '/pages/event-details.html?id=' + eventId;
    const eventTitle = document.querySelector(`[data-event-id="${eventId}"] .event-title a`).textContent;
    
    // Create share modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Event</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="share-options">
                    <button class="share-option" onclick="shareEventToPlatform('${eventId}', 'linkedin')">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option" onclick="shareEventToPlatform('${eventId}', 'twitter')">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" onclick="shareEventToPlatform('${eventId}', 'facebook')">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </button>
                    <button class="share-option" onclick="shareEventToPlatform('${eventId}', 'email')">
                        <i class="fas fa-envelope"></i>
                        <span>Email</span>
                    </button>
                    <button class="share-option" onclick="shareEventToPlatform('${eventId}', 'whatsapp')">
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
                
                <div class="add-to-calendar">
                    <label class="form-label">Add to calendar:</label>
                    <div class="calendar-options">
                        <button class="btn btn-outline btn-small" onclick="addEventToCalendar('${eventId}', 'google')">
                            <i class="fab fa-google"></i> Google Calendar
                        </button>
                        <button class="btn btn-outline btn-small" onclick="addEventToCalendar('${eventId}', 'outlook')">
                            <i class="fab fa-microsoft"></i> Outlook
                        </button>
                        <button class="btn btn-outline btn-small" onclick="addEventToCalendar('${eventId}', 'apple')">
                            <i class="fab fa-apple"></i> Apple Calendar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window.shareEventToPlatform = async function(eventId, platform) {
    const url = window.location.origin + '/pages/event-details.html?id=' + eventId;
    const eventTitle = document.querySelector(`[data-event-id="${eventId}"] .event-title a`).textContent;
    
    let shareUrl = '';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`Check out this event: ${eventTitle}`)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${encodeURIComponent(`Check out this event: ${url}`)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(`${eventTitle} - ${url}`)}`;
            break;
    }
    
    window.open(shareUrl, '_blank');
};

window.addEventToCalendar = async function(eventId, calendarType) {
    try {
        const result = await eventsService.addToCalendar(eventId, calendarType);
        if (result.success) {
            showToast(`Event added to ${calendarType} calendar`, 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to add event to calendar', 'error');
    }
};

// Initialize events portal on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('eventsPortal')) {
        // Get filters from URL
        const urlParams = new URLSearchParams(window.location.search);
        const filters = {
            search: urlParams.get('search') || '',
            eventType: urlParams.get('type') || '',
            isVirtual: urlParams.get('virtual') || '',
            upcomingOnly: urlParams.get('upcoming') || 'true',
            page: parseInt(urlParams.get('page') || '1'),
            limit: parseInt(urlParams.get('limit') || '20')
        };

        window.currentEventsFilters = filters;
        renderEventsPortal(filters);

        // Set up filter form
        const filterForm = document.getElementById('eventsFilterForm');
        if (filterForm) {
            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(filterForm);
                const newFilters = {
                    search: formData.get('search') || '',
                    eventType: formData.get('eventType') || '',
                    isVirtual: formData.get('isVirtual') || '',
                    upcomingOnly: formData.get('upcomingOnly') || 'true',
                    page: 1,
                    limit: 20
                };
                window.currentEventsFilters = newFilters;
                renderEventsPortal(newFilters);
            });
        }

        // Set up search input
        const searchInput = document.getElementById('eventsSearchInput');
        const searchBtn = document.getElementById('eventsSearchBtn');
        
        if (searchInput && searchBtn) {
            const handleSearch = () => {
                const filters = window.currentEventsFilters || {};
                filters.search = searchInput.value.trim();
                filters.page = 1;
                window.currentEventsFilters = filters;
                renderEventsPortal(filters);
            };
            
            searchBtn.addEventListener('click', handleSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }
    }

    // Load upcoming events on dashboard
    if (document.getElementById('dashboardEvents')) {
        loadUpcomingEvents();
    }
});

async function loadUpcomingEvents() {
    try {
        const result = await eventsService.getUpcomingEvents(3);
        if (result.success && result.data.length > 0) {
            const container = document.getElementById('dashboardEvents');
            container.innerHTML = result.data.map(event => `
                <div class="event-card-small">
                    <div class="event-date-small">
                        <span class="event-day-small">${new Date(event.date).getDate()}</span>
                        <span class="event-month-small">${new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    </div>
                    <div class="event-content-small">
                        <h4>${event.title}</h4>
                        <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                        <p><i class="fas fa-clock"></i> ${new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        <a href="events.html?id=${event._id}" class="btn btn-link">View Details</a>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Load upcoming events error:', error);
    }
}

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