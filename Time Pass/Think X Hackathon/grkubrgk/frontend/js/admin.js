document.addEventListener('DOMContentLoaded', function () {
    setupTabNavigation();
    loadDashboardStats();
});

function setupTabNavigation() {
    const tabs = document.querySelectorAll('[data-tab]');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = tab.dataset.tab;

            // Update Tab Styles
            tabs.forEach(t => {
                t.classList.remove('bg-blue-50', 'text-secondary-color');
                t.classList.add('text-gray-600', 'hover:bg-gray-50');
            });
            tab.classList.remove('text-gray-600', 'hover:bg-gray-50');
            tab.classList.add('bg-blue-50', 'text-secondary-color');

            // Show Content
            contents.forEach(content => {
                if (content.id === `${targetId}-tab`) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
}

function loadDashboardStats() {
    // This function would typically fetch real-time stats from an API
    console.log('Admin dashboard stats loaded');
}

// Function to handle approving a user
function approveUser(userId) {
    if (confirm('Are you sure you want to approve this user?')) {
        // API call to approve user
        alert('User approved successfully');
        // Refresh table
    }
}

// Function to handle banning a user
function banUser(userId) {
    if (confirm('Are you sure you want to ban this user?')) {
        // API call to ban user
        alert('User banned successfully');
        // Refresh table
    }
}
