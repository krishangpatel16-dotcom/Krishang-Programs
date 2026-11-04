document.addEventListener('DOMContentLoaded', function() {
    loadMentors();
    loadStats();
    setupEventListeners();
});

// Mock Data
const MOCK_MENTORS = [
    {
        id: '1',
        user: {
            firstName: 'Sarah',
            lastName: 'Jhonson',
            profilePicture: 'https://randomuser.me/api/portraits/women/44.jpg',
            graduationYear: 2015
        },
        expertise: ['Leadership', 'Marketing', 'Public Speaking'],
        currentPosition: 'CMO',
        company: 'TechGrowth Inc.',
        industry: 'Marketing',
        matchScore: 95
    },
    {
        id: '2',
        user: {
            firstName: 'Michael',
            lastName: 'Chen',
            profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
            graduationYear: 2012
        },
        expertise: ['Software Architecture', 'Cloud Computing', 'Mentorship'],
        currentPosition: 'Principal Engineer',
        company: 'CloudSystems',
        industry: 'Technology',
        matchScore: 88
    },
    {
        id: '3',
        user: {
            firstName: 'Amara',
            lastName: 'Patel',
            profilePicture: 'https://randomuser.me/api/portraits/women/68.jpg',
            graduationYear: 2018
        },
        expertise: ['Product Management', 'UX Design', 'Agile'],
        currentPosition: 'Senior PM',
        company: 'InnovateX',
        industry: 'Product',
        matchScore: 92
    }
];

function loadMentors() {
    const grid = document.getElementById('mentorsGrid');
    const loading = document.getElementById('mentorsLoading');
    const empty = document.getElementById('mentorsEmpty');
    const countEl = document.getElementById('totalMentors');

    loading.style.display = 'block';
    grid.style.display = 'none';
    empty.style.display = 'none';

    // Simulate API delay
    setTimeout(() => {
        loading.style.display = 'none';
        
        if (MOCK_MENTORS.length > 0) {
            grid.innerHTML = MOCK_MENTORS.map(mentor => createMentorCard(mentor)).join('');
            grid.style.display = 'grid';
            countEl.textContent = MOCK_MENTORS.length;
        } else {
            empty.classList.remove('hidden');
            empty.style.display = 'block';
            countEl.textContent = '0';
        }
    }, 800);
}

function createMentorCard(mentor) {
    return `
        <div class="alumni-card">
            <div class="alumni-header">
                <div class="alumni-avatar">
                    <img src="${mentor.user.profilePicture}" alt="${mentor.user.firstName}">
                </div>
                <div class="alumni-info">
                    <h3>${mentor.user.firstName} ${mentor.user.lastName}</h3>
                    <p class="alumni-role">${mentor.currentPosition}</p>
                    <p class="alumni-company">${mentor.company}</p>
                </div>
            </div>
            <div class="alumni-body">
                <div class="alumni-details">
                    <span><i class="fas fa-graduation-cap"></i> Class of ${mentor.user.graduationYear}</span>
                    <span><i class="fas fa-briefcase"></i> ${mentor.industry}</span>
                </div>
                <div class="mentor-expertise mt-3">
                    <h4 class="text-sm font-semibold mb-2">Expertise</h4>
                    <div class="flex flex-wrap gap-2">
                        ${mentor.expertise.map(exp => `<span class="badge badge-secondary text-xs">${exp}</span>`).join('')}
                    </div>
                </div>
            </div>
            <div class="alumni-footer mt-4">
                <button class="btn btn-outline btn-sm w-full" onclick="openRequestModal('${mentor.id}', '${mentor.user.firstName}')">
                    Request Mentorship
                </button>
            </div>
        </div>
    `;
}

function loadStats() {
    // Mock stats
    document.getElementById('totalMentors').textContent = '45';
    document.getElementById('activeMentorships').textContent = '12';
    document.getElementById('successfulMatches').textContent = '89';
}

function openRequestModal(mentorId, mentorName) {
    const modal = document.getElementById('requestMentorModal');
    document.getElementById('mentorId').value = mentorId;
    modal.classList.add('active');
}

function setupEventListeners() {
    // Modal Closers
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = btn.closest('.modal');
            modal.classList.remove('active');
        });
    });

    // Become a Mentor Modal
    document.getElementById('beAMentorBtn')?.addEventListener('click', () => {
        document.getElementById('becomeMentorModal').classList.add('active');
    });

    // Forms
    document.getElementById('requestMentorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate API call
        alert('Mentorship request sent successfully!');
        document.getElementById('requestMentorModal').classList.remove('active');
    });

    document.getElementById('becomeMentorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate API call
        alert('You have successfully registered as a mentor!');
        document.getElementById('becomeMentorModal').classList.remove('active');
    });
}
