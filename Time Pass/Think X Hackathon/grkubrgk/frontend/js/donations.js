// Donations Module
class DonationsService {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.auth = window.AuthService;
    }

    // Create donation
    async createDonation(donationData) {
        try {
            const url = `${this.baseURL}/donations`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(donationData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create donation error:', error);
            return { 
                success: false, 
                message: 'Failed to process donation' 
            };
        }
    }

    // Get all donations (admin only)
    async getAllDonations(filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add filters to query params
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/donations?${queryParams.toString()}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get all donations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donations' 
            };
        }
    }

    // Get my donations
    async getMyDonations() {
        try {
            const url = `${this.baseURL}/donations/my`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get my donations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch your donations' 
            };
        }
    }

    // Get donation by ID
    async getDonationById(donationId) {
        try {
            const url = `${this.baseURL}/donations/${donationId}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get donation by ID error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donation details' 
            };
        }
    }

    // Get donation statistics
    async getDonationStats() {
        try {
            const url = `${this.baseURL}/donations/stats`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get donation stats error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donation statistics' 
            };
        }
    }

    // Resend donation receipt
    async resendReceipt(donationId) {
        try {
            const url = `${this.baseURL}/donations/${donationId}/resend-receipt`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Resend receipt error:', error);
            return { 
                success: false, 
                message: 'Failed to resend receipt' 
            };
        }
    }

    // Update donation status (admin only)
    async updateDonationStatus(donationId, status) {
        try {
            const url = `${this.baseURL}/donations/${donationId}/status`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update donation status error:', error);
            return { 
                success: false, 
                message: 'Failed to update donation status' 
            };
        }
    }

    // Get donation purposes
    async getDonationPurposes() {
        try {
            const url = `${this.baseURL}/donations/purposes`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get donation purposes error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donation purposes' 
            };
        }
    }

    // Get top donors
    async getTopDonors(limit = 10) {
        try {
            const url = `${this.baseURL}/donations/top-donors?limit=${limit}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get top donors error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch top donors' 
            };
        }
    }

    // Get donation campaigns
    async getDonationCampaigns() {
        try {
            const url = `${this.baseURL}/donations/campaigns`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get donation campaigns error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donation campaigns' 
            };
        }
    }

    // Create donation campaign (admin only)
    async createDonationCampaign(campaignData) {
        try {
            const url = `${this.baseURL}/donations/campaigns`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(campaignData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create donation campaign error:', error);
            return { 
                success: false, 
                message: 'Failed to create donation campaign' 
            };
        }
    }

    // Get campaign details
    async getCampaignDetails(campaignId) {
        try {
            const url = `${this.baseURL}/donations/campaigns/${campaignId}`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get campaign details error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch campaign details' 
            };
        }
    }

    // Donate to campaign
    async donateToCampaign(campaignId, donationData) {
        try {
            const url = `${this.baseURL}/donations/campaigns/${campaignId}/donate`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(donationData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Donate to campaign error:', error);
            return { 
                success: false, 
                message: 'Failed to donate to campaign' 
            };
        }
    }

    // Update campaign (admin only)
    async updateCampaign(campaignId, campaignData) {
        try {
            const url = `${this.baseURL}/donations/campaigns/${campaignId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(campaignData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update campaign error:', error);
            return { 
                success: false, 
                message: 'Failed to update campaign' 
            };
        }
    }

    // Delete campaign (admin only)
    async deleteCampaign(campaignId) {
        try {
            const url = `${this.baseURL}/donations/campaigns/${campaignId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Delete campaign error:', error);
            return { 
                success: false, 
                message: 'Failed to delete campaign' 
            };
        }
    }

    // Get recurring donations
    async getRecurringDonations() {
        try {
            const url = `${this.baseURL}/donations/recurring`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get recurring donations error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch recurring donations' 
            };
        }
    }

    // Setup recurring donation
    async setupRecurringDonation(donationData) {
        try {
            const url = `${this.baseURL}/donations/recurring/setup`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(donationData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Setup recurring donation error:', error);
            return { 
                success: false, 
                message: 'Failed to setup recurring donation' 
            };
        }
    }

    // Cancel recurring donation
    async cancelRecurringDonation(recurringDonationId) {
        try {
            const url = `${this.baseURL}/donations/recurring/${recurringDonationId}/cancel`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'DELETE'
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Cancel recurring donation error:', error);
            return { 
                success: false, 
                message: 'Failed to cancel recurring donation' 
            };
        }
    }

    // Update recurring donation
    async updateRecurringDonation(recurringDonationId, updateData) {
        try {
            const url = `${this.baseURL}/donations/recurring/${recurringDonationId}`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'PUT',
                body: JSON.stringify(updateData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Update recurring donation error:', error);
            return { 
                success: false, 
                message: 'Failed to update recurring donation' 
            };
        }
    }

    // Get donation impact stories
    async getImpactStories() {
        try {
            const url = `${this.baseURL}/donations/impact-stories`;
            const response = await fetch(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get impact stories error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch impact stories' 
            };
        }
    }

    // Add impact story (admin only)
    async addImpactStory(storyData) {
        try {
            const url = `${this.baseURL}/donations/impact-stories`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify(storyData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Add impact story error:', error);
            return { 
                success: false, 
                message: 'Failed to add impact story' 
            };
        }
    }

    // Export donation data (admin only)
    async exportDonationData(format = 'csv', filters = {}) {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('format', format);
            
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== '' && value !== null) {
                    queryParams.append(key, value);
                }
            });
            
            const url = `${this.baseURL}/donations/export?${queryParams.toString()}`;
            const response = await this.auth.fetchWithAuth(url);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `donations-export-${new Date().toISOString().split('T')[0]}.${format}`;
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
            console.error('Export donation data error:', error);
            return { 
                success: false, 
                message: 'Failed to export donation data' 
            };
        }
    }

    // Get donation certificates
    async getDonationCertificates() {
        try {
            const url = `${this.baseURL}/donations/certificates`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get donation certificates error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch donation certificates' 
            };
        }
    }

    // Generate donation certificate
    async generateCertificate(donationId) {
        try {
            const url = `${this.baseURL}/donations/${donationId}/certificate`;
            const response = await this.auth.fetchWithAuth(url);
            
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `donation-certificate-${donationId}.pdf`;
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
            console.error('Generate certificate error:', error);
            return { 
                success: false, 
                message: 'Failed to generate certificate' 
            };
        }
    }

    // Get tax deduction information
    async getTaxDeductionInfo(year) {
        try {
            const url = `${this.baseURL}/donations/tax-info${year ? `?year=${year}` : ''}`;
            const response = await this.auth.fetchWithAuth(url);
            const data = await response.json();
            
            return data;
        } catch (error) {
            console.error('Get tax deduction info error:', error);
            return { 
                success: false, 
                message: 'Failed to fetch tax deduction information' 
            };
        }
    }

    // Request tax statement
    async requestTaxStatement(year) {
        try {
            const url = `${this.baseURL}/donations/tax-statement`;
            const response = await this.auth.fetchWithAuth(url, {
                method: 'POST',
                body: JSON.stringify({ year })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Request tax statement error:', error);
            return { 
                success: false, 
                message: 'Failed to request tax statement' 
            };
        }
    }
}

// Create singleton instance
const donationsService = new DonationsService();

// Export for use in other modules
window.DonationsService = donationsService;

// Utility functions for donations portal
window.renderDonationsPortal = async function(filters = {}) {
    const container = document.getElementById('donationsPortal');
    if (!container) return;

    // Check if user is authenticated
    if (!window.AuthService.isAuthenticated()) {
        container.innerHTML = `
            <div class="auth-required">
                <i class="fas fa-lock"></i>
                <h3>Authentication Required</h3>
                <p>Please login to view and manage your donations</p>
                <a href="login.html" class="btn btn-primary">Login</a>
                <a href="register.html" class="btn btn-secondary">Register</a>
            </div>
        `;
        return;
    }

    // Show loading state
    container.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>Loading donations...</p>
        </div>
    `;

    try {
        const result = await donationsService.getMyDonations();
        
        if (result.success) {
            if (!result.data || result.data.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-hand-holding-heart"></i>
                        <h3>No donations yet</h3>
                        <p>Make your first donation to support your alma mater!</p>
                        <button class="btn btn-primary" onclick="showDonationModal()">
                            <i class="fas fa-donate"></i> Make a Donation
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = `
                <div class="donations-header">
                    <div class="donations-summary">
                        <div class="summary-card">
                            <h4>Total Donated</h4>
                            <h2>$${result.summary?.totalAmount?.toLocaleString() || '0'}</h2>
                        </div>
                        <div class="summary-card">
                            <h4>Total Donations</h4>
                            <h2>${result.summary?.totalDonations || 0}</h2>
                        </div>
                        <div class="summary-card">
                            <h4>Last Donation</h4>
                            <h2>$${result.data[0]?.amount?.toLocaleString() || '0'}</h2>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="showDonationModal()">
                        <i class="fas fa-plus"></i> New Donation
                    </button>
                </div>
                
                <div class="donations-list">
                    ${result.data.map(donation => `
                        <div class="donation-card" data-donation-id="${donation._id}">
                            <div class="donation-header">
                                <div class="donation-info">
                                    <h4>$${donation.amount.toLocaleString()} ${donation.currency}</h4>
                                    <span class="donation-purpose ${donation.purpose}">
                                        ${donation.purpose.charAt(0).toUpperCase() + donation.purpose.slice(1)}
                                    </span>
                                </div>
                                <div class="donation-status ${donation.status}">
                                    ${donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                                </div>
                            </div>
                            
                            <div class="donation-details">
                                <div class="detail-item">
                                    <i class="fas fa-calendar"></i>
                                    <span>${new Date(donation.createdAt).toLocaleDateString()}</span>
                                </div>
                                ${donation.specificPurpose ? `
                                    <div class="detail-item">
                                        <i class="fas fa-bullseye"></i>
                                        <span>${donation.specificPurpose}</span>
                                    </div>
                                ` : ''}
                                <div class="detail-item">
                                    <i class="fas fa-credit-card"></i>
                                    <span>${donation.paymentMethod.replace('_', ' ')}</span>
                                </div>
                            </div>
                            
                            ${donation.message ? `
                                <div class="donation-message">
                                    <p>"${donation.message}"</p>
                                </div>
                            ` : ''}
                            
                            <div class="donation-footer">
                                <div class="donation-actions">
                                    <button class="btn btn-outline btn-small" onclick="viewDonationReceipt('${donation._id}')">
                                        <i class="fas fa-receipt"></i> Receipt
                                    </button>
                                    ${donation.status === 'completed' ? `
                                        <button class="btn btn-outline btn-small" onclick="generateCertificate('${donation._id}')">
                                            <i class="fas fa-award"></i> Certificate
                                        </button>
                                    ` : ''}
                                    ${!donation.receiptSent && donation.status === 'completed' ? `
                                        <button class="btn btn-outline btn-small" onclick="resendReceipt('${donation._id}')">
                                            <i class="fas fa-paper-plane"></i> Resend
                                        </button>
                                    ` : ''}
                                </div>
                                ${donation.isAnonymous ? `
                                    <span class="anonymous-badge">
                                        <i class="fas fa-user-secret"></i> Anonymous
                                    </span>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;

            // Render pagination if available
            if (result.pagination && result.pagination.pages > 1) {
                renderDonationsPagination(result.pagination);
            }
        } else {
            container.innerHTML = `
                <div class="error-state">
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Error loading donations</h3>
                    <p>${result.message}</p>
                    <button class="btn btn-primary" onclick="renderDonationsPortal(${JSON.stringify(filters)})">
                        Try Again
                    </button>
                </div>
            `;
        }
    } catch (error) {
        console.error('Render donations portal error:', error);
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Network Error</h3>
                <p>Failed to load donations. Please check your connection.</p>
                <button class="btn btn-primary" onclick="renderDonationsPortal(${JSON.stringify(filters)})">
                    Try Again
                </button>
            </div>
        `;
    }
};

window.showDonationModal = function(campaignId = null) {
    // Check if user is authenticated
    if (!window.AuthService.isAuthenticated()) {
        window.location.href = 'login.html?redirect=donate.html';
        return;
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Make a Donation</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="donationForm">
                    <div class="form-group">
                        <label for="donationAmount" class="form-label">Donation Amount</label>
                        <div class="amount-options">
                            ${[50, 100, 250, 500, 1000, 5000].map(amount => `
                                <button type="button" class="amount-option" onclick="setDonationAmount(${amount})">
                                    $${amount}
                                </button>
                            `).join('')}
                        </div>
                        <div class="custom-amount">
                            <input type="number" id="donationAmount" class="form-control" 
                                   min="1" step="0.01" placeholder="Enter custom amount" required>
                            <span class="currency">USD</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="donationPurpose" class="form-label">Donation Purpose</label>
                        <select id="donationPurpose" class="form-control" required>
                            <option value="">Select a purpose</option>
                            <option value="scholarship">Scholarship Fund</option>
                            <option value="infrastructure">Infrastructure Development</option>
                            <option value="research">Research & Innovation</option>
                            <option value="event">Events & Programs</option>
                            <option value="general">General Fund</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="specificPurpose" class="form-label">Specific Purpose (Optional)</label>
                        <input type="text" id="specificPurpose" class="form-control" 
                               placeholder="E.g., Merit Scholarship 2024">
                    </div>
                    
                    <div class="form-group">
                        <label for="paymentMethod" class="form-label">Payment Method</label>
                        <select id="paymentMethod" class="form-control" required>
                            <option value="">Select payment method</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="upi">UPI</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="donationMessage" class="form-label">Message (Optional)</label>
                        <textarea id="donationMessage" class="form-control" rows="3" 
                                  placeholder="Add a personal message with your donation..."></textarea>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="isAnonymous">
                        <label for="isAnonymous" class="form-check-label">
                            Make this donation anonymous
                        </label>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="recurringDonation">
                        <label for="recurringDonation" class="form-check-label">
                            Make this a monthly recurring donation
                        </label>
                    </div>
                    
                    <div id="recurringOptions" class="hidden">
                        <div class="form-group">
                            <label for="recurringDuration" class="form-label">Duration</label>
                            <select id="recurringDuration" class="form-control">
                                <option value="3">3 months</option>
                                <option value="6">6 months</option>
                                <option value="12">1 year</option>
                                <option value="0">Until cancelled</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="donation-summary">
                        <h4>Donation Summary</h4>
                        <div class="summary-item">
                            <span>Amount:</span>
                            <span id="summaryAmount">$0.00</span>
                        </div>
                        <div class="summary-item">
                            <span>Processing fee:</span>
                            <span id="summaryFee">$0.00</span>
                        </div>
                        <div class="summary-total">
                            <span>Total:</span>
                            <span id="summaryTotal">$0.00</span>
                        </div>
                    </div>
                    
                    <div class="form-group form-check">
                        <input type="checkbox" id="donationTerms" required>
                        <label for="donationTerms" class="form-check-label">
                            I agree to the donation terms and conditions
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="processDonation()">
                    <i class="fas fa-lock"></i> Secure Donation
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Setup event listeners
    setupDonationFormListeners();
};

window.setDonationAmount = function(amount) {
    const amountInput = document.getElementById('donationAmount');
    amountInput.value = amount;
    updateDonationSummary();
};

window.setupDonationFormListeners = function() {
    const amountInput = document.getElementById('donationAmount');
    const recurringCheckbox = document.getElementById('recurringDonation');
    const recurringOptions = document.getElementById('recurringOptions');

    // Update summary when amount changes
    amountInput.addEventListener('input', updateDonationSummary);

    // Show/hide recurring options
    recurringCheckbox.addEventListener('change', function() {
        if (this.checked) {
            recurringOptions.classList.remove('hidden');
        } else {
            recurringOptions.classList.add('hidden');
        }
    });
};

window.updateDonationSummary = function() {
    const amount = parseFloat(document.getElementById('donationAmount').value) || 0;
    const fee = amount * 0.029 + 0.30; // Example: 2.9% + $0.30
    const total = amount + fee;

    document.getElementById('summaryAmount').textContent = `$${amount.toFixed(2)}`;
    document.getElementById('summaryFee').textContent = `$${fee.toFixed(2)}`;
    document.getElementById('summaryTotal').textContent = `$${total.toFixed(2)}`;
};

window.processDonation = async function() {
    const form = document.getElementById('donationForm');
    const amount = parseFloat(document.getElementById('donationAmount').value);
    const purpose = document.getElementById('donationPurpose').value;
    const specificPurpose = document.getElementById('specificPurpose').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const message = document.getElementById('donationMessage').value;
    const isAnonymous = document.getElementById('isAnonymous').checked;
    const isRecurring = document.getElementById('recurringDonation').checked;
    const recurringDuration = isRecurring ? document.getElementById('recurringDuration').value : null;
    const agreeTerms = document.getElementById('donationTerms').checked;

    // Validation
    if (!amount || amount < 1) {
        showToast('Please enter a valid donation amount', 'error');
        return;
    }

    if (!purpose) {
        showToast('Please select a donation purpose', 'error');
        return;
    }

    if (!paymentMethod) {
        showToast('Please select a payment method', 'error');
        return;
    }

    if (!agreeTerms) {
        showToast('Please agree to the terms and conditions', 'error');
        return;
    }

    const donationData = {
        amount: amount,
        purpose: purpose,
        specificPurpose: specificPurpose || undefined,
        paymentMethod: paymentMethod,
        message: message || undefined,
        isAnonymous: isAnonymous,
        currency: 'USD'
    };

    if (isRecurring) {
        donationData.recurring = {
            interval: 'monthly',
            duration: recurringDuration ? parseInt(recurringDuration) : 0
        };
    }

    try {
        const result = isRecurring 
            ? await donationsService.setupRecurringDonation(donationData)
            : await donationsService.createDonation(donationData);

        if (result.success) {
            showToast('Donation processed successfully! Thank you for your generosity.', 'success');
            
            // Close modal
            const modal = document.querySelector('.modal.show');
            if (modal) modal.remove();
            
            // Refresh donations list
            renderDonationsPortal();
            
            // Show receipt/download options
            if (!isRecurring && result.data) {
                setTimeout(() => {
                    showDonationSuccessModal(result.data);
                }, 1000);
            }
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to process donation. Please try again.', 'error');
    }
};

window.showDonationSuccessModal = function(donation) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🎉 Donation Successful!</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h4>Thank you for your generous donation!</h4>
                    <p>Your contribution will make a significant impact.</p>
                </div>
                
                <div class="donation-details-success">
                    <div class="detail-row">
                        <span>Transaction ID:</span>
                        <strong>${donation.transactionId}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Amount:</span>
                        <strong>$${donation.amount} ${donation.currency}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Date:</span>
                        <strong>${new Date(donation.createdAt).toLocaleDateString()}</strong>
                    </div>
                    <div class="detail-row">
                        <span>Purpose:</span>
                        <strong>${donation.purpose.charAt(0).toUpperCase() + donation.purpose.slice(1)}</strong>
                    </div>
                </div>
                
                <div class="success-actions">
                    <button class="btn btn-primary" onclick="viewDonationReceipt('${donation._id}')">
                        <i class="fas fa-receipt"></i> View Receipt
                    </button>
                    <button class="btn btn-outline" onclick="generateCertificate('${donation._id}')">
                        <i class="fas fa-award"></i> Download Certificate
                    </button>
                    <button class="btn btn-outline" onclick="shareDonation('${donation._id}')">
                        <i class="fas fa-share-alt"></i> Share
                    </button>
                </div>
                
                <div class="next-steps">
                    <h5>Next Steps:</h5>
                    <ul>
                        <li>Receipt will be emailed to you shortly</li>
                        <li>Tax certificate available at year-end</li>
                        <li>Impact report will be shared quarterly</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Close
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window.viewDonationReceipt = async function(donationId) {
    try {
        const result = await donationsService.getDonationById(donationId);
        if (result.success) {
            const donation = result.data;
            
            const modal = document.createElement('div');
            modal.className = 'modal show';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Donation Receipt</h3>
                        <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="receipt">
                            <div class="receipt-header">
                                <h4>Government Engineering College</h4>
                                <p>Official Donation Receipt</p>
                            </div>
                            
                            <div class="receipt-body">
                                <div class="receipt-row">
                                    <span>Receipt No:</span>
                                    <span>${donation.transactionId}</span>
                                </div>
                                <div class="receipt-row">
                                    <span>Date:</span>
                                    <span>${new Date(donation.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div class="receipt-row">
                                    <span>Donor:</span>
                                    <span>${donation.isAnonymous ? 'Anonymous Donor' : `${window.AuthService.getCurrentUser()?.firstName} ${window.AuthService.getCurrentUser()?.lastName}`}</span>
                                </div>
                                <div class="receipt-row">
                                    <span>Amount:</span>
                                    <span>$${donation.amount} ${donation.currency}</span>
                                </div>
                                <div class="receipt-row">
                                    <span>Purpose:</span>
                                    <span>${donation.purpose.charAt(0).toUpperCase() + donation.purpose.slice(1)}</span>
                                </div>
                                ${donation.specificPurpose ? `
                                    <div class="receipt-row">
                                        <span>Specific Purpose:</span>
                                        <span>${donation.specificPurpose}</span>
                                    </div>
                                ` : ''}
                                <div class="receipt-row">
                                    <span>Payment Method:</span>
                                    <span>${donation.paymentMethod.replace('_', ' ')}</span>
                                </div>
                                <div class="receipt-row">
                                    <span>Status:</span>
                                    <span class="status-${donation.status}">${donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}</span>
                                </div>
                            </div>
                            
                            <div class="receipt-footer">
                                <p>This receipt acknowledges your generous donation to Government Engineering College.</p>
                                <p>For tax purposes, this donation is tax-deductible as per applicable laws.</p>
                                <div class="signature">
                                    <p>Authorized Signature</p>
                                    <p>Alumni Association Treasurer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                            Close
                        </button>
                        <button class="btn btn-primary" onclick="printReceipt()">
                            <i class="fas fa-print"></i> Print
                        </button>
                        <button class="btn btn-primary" onclick="downloadReceipt()">
                            <i class="fas fa-download"></i> Download PDF
                        </button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to load receipt', 'error');
    }
};

window.printReceipt = function() {
    window.print();
};

window.downloadReceipt = async function() {
    // This would generate a PDF receipt
    showToast('PDF receipt generation initiated', 'info');
};

window.generateCertificate = async function(donationId) {
    try {
        const result = await donationsService.generateCertificate(donationId);
        if (result.success) {
            showToast('Certificate downloaded successfully', 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to generate certificate', 'error');
    }
};

window.resendReceipt = async function(donationId) {
    if (!confirm('Resend receipt email?')) return;

    try {
        const result = await donationsService.resendReceipt(donationId);
        if (result.success) {
            showToast('Receipt resent successfully', 'success');
        } else {
            showToast(result.message, 'error');
        }
    } catch (error) {
        showToast('Failed to resend receipt', 'error');
    }
};

window.shareDonation = function(donationId) {
    const url = window.location.origin + '/pages/donate.html?donation=' + donationId;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Your Donation</h3>
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="share-options">
                    <button class="share-option" onclick="shareDonationToPlatform('${donationId}', 'linkedin')">
                        <i class="fab fa-linkedin"></i>
                        <span>LinkedIn</span>
                    </button>
                    <button class="share-option" onclick="shareDonationToPlatform('${donationId}', 'twitter')">
                        <i class="fab fa-twitter"></i>
                        <span>Twitter</span>
                    </button>
                    <button class="share-option" onclick="shareDonationToPlatform('${donationId}', 'facebook')">
                        <i class="fab fa-facebook"></i>
                        <span>Facebook</span>
                    </button>
                </div>
                
                <div class="share-message">
                    <label class="form-label">Custom Message:</label>
                    <textarea id="shareMessage" class="form-control" rows="3">
I just made a donation to support my alma mater! Join me in making a difference.
                    </textarea>
                </div>
                
                <div class="form-group form-check">
                    <input type="checkbox" id="hideAmount" checked>
                    <label for="hideAmount" class="form-check-label">
                        Hide donation amount
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="this.parentElement.parentElement.parentElement.remove()">
                    Cancel
                </button>
                <button class="btn btn-primary" onclick="copyDonationShareLink('${donationId}')">
                    <i class="fas fa-copy"></i> Copy Link
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
};

window.shareDonationToPlatform = async function(donationId, platform) {
    const message = document.getElementById('shareMessage')?.value || 
                   'I just made a donation to support my alma mater!';
    const hideAmount = document.getElementById('hideAmount')?.checked || false;
    
    let shareUrl = '';
    const url = window.location.origin + '/pages/donate.html';
    
    switch(platform) {
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(message)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(message)}`;
            break;
    }
    
    window.open(shareUrl, '_blank');
};

window.copyDonationShareLink = function(donationId) {
    const url = window.location.origin + '/pages/donate.html?donation=' + donationId;
    copyToClipboard(url);
};

// Initialize donations portal on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('donationsPortal')) {
        renderDonationsPortal();
    }

    // Load donation campaigns on donate page
    if (document.getElementById('donationCampaigns')) {
        loadDonationCampaigns();
    }

    // Load donation stats on dashboard
    if (document.getElementById('donationStats')) {
        loadDonationStats();
    }
});

async function loadDonationCampaigns() {
    try {
        const result = await donationsService.getDonationCampaigns();
        if (result.success && result.data.length > 0) {
            const container = document.getElementById('donationCampaigns');
            container.innerHTML = result.data.map(campaign => `
                <div class="campaign-card">
                    <div class="campaign-image">
                        <img src="${campaign.image || '../assets/images/default-campaign.jpg'}" 
                             alt="${campaign.title}">
                    </div>
                    <div class="campaign-content">
                        <h4>${campaign.title}</h4>
                        <p>${campaign.description}</p>
                        
                        <div class="campaign-progress">
                            <div class="progress">
                                <div class="progress-bar" 
                                     style="width: ${(campaign.raised / campaign.goal * 100)}%">
                                </div>
                            </div>
                            <div class="progress-stats">
                                <span>$${campaign.raised.toLocaleString()} raised</span>
                                <span>$${campaign.goal.toLocaleString()} goal</span>
                            </div>
                        </div>
                        
                        <div class="campaign-details">
                            <span><i class="fas fa-users"></i> ${campaign.donorsCount} donors</span>
                            <span><i class="fas fa-clock"></i> ${calculateDaysLeft(campaign.endDate)} days left</span>
                        </div>
                        
                        <button class="btn btn-primary" onclick="donateToCampaign('${campaign._id}')">
                            Donate Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Load donation campaigns error:', error);
    }
}

async function loadDonationStats() {
    try {
        const result = await donationsService.getDonationStats();
        if (result.success) {
            const container = document.getElementById('donationStats');
            container.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-card">
                        <i class="fas fa-hand-holding-usd"></i>
                        <h3>$${result.data.totalAmount?.toLocaleString() || '0'}</h3>
                        <p>Total Raised</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-users"></i>
                        <h3>${result.data.totalDonors || '0'}</h3>
                        <p>Total Donors</p>
                    </div>
                    <div class="stat-card">
                        <i class="fas fa-chart-line"></i>
                        <h3>${result.data.monthlyGrowth || '0'}%</h3>
                        <p>Monthly Growth</p>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Load donation stats error:', error);
    }
}

function calculateDaysLeft(endDate) {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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