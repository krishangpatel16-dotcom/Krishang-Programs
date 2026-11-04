document.addEventListener('DOMContentLoaded', function () {
    loadProfileData();
    setupProfileListeners();
});

// Mock User Data (in a real app, this would come from an API)
const MOCK_USER_PROFILE = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    bio: 'Passionate software engineer with 5 years of experience in full-stack development.',
    graduationYear: 2018,
    degree: 'B.Tech',
    department: 'Computer Science',
    company: 'Tech Solutions Ltd.',
    jobTitle: 'Senior Developer',
    industry: 'Technology',
    experience: 5,
    skills: 'JavaScript, React, Node.js, Python, AWS',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe'
};

function loadProfileData() {
    // Simulate API call
    setTimeout(() => {
        const form = document.getElementById('profileForm');

        // Populate inputs
        Object.keys(MOCK_USER_PROFILE).forEach(key => {
            const input = form.elements[key];
            if (input) {
                input.value = MOCK_USER_PROFILE[key];
            }
        });

        // Update Sidebar Preview
        updateSidebarPreview();
    }, 500);
}

function updateSidebarPreview() {
    const firstName = document.querySelector('input[name="firstName"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const jobTitle = document.querySelector('input[name="jobTitle"]').value;
    const company = document.querySelector('input[name="company"]').value;

    document.getElementById('sidebarName').textContent = `${firstName} ${lastName}`;
    document.getElementById('sidebarRole').textContent = jobTitle && company ? `${jobTitle} at ${company}` : 'Alumni';
}

function setupProfileListeners() {
    const form = document.getElementById('profileForm');
    const saveBtn = document.getElementById('saveProfileBtn');

    // Live preview updates
    ['firstName', 'lastName', 'jobTitle', 'company'].forEach(field => {
        form.elements[field].addEventListener('input', updateSidebarPreview);
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Add loading state
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<div class="spinner-sm"></div> Saving...';

        // Simulate API delay
        setTimeout(() => {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Saved';
            saveBtn.classList.replace('btn-primary', 'btn-success');

            // Show toast/alert
            alert('Profile updated successfully!');

            // Reset button after 2 seconds
            setTimeout(() => {
                saveBtn.innerHTML = '<i class="fas fa-save mr-2"></i> Save Changes';
                saveBtn.classList.replace('btn-success', 'btn-primary');
            }, 2000);
        }, 1500);
    });

    // Avatar Upload
    document.getElementById('avatarInput').addEventListener('change', function (e) {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById('profilePreview').src = e.target.result;
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
}
