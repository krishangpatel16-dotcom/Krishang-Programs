document.addEventListener('DOMContentLoaded', function () {
    loadGalleryImages('all');
    setupGalleryListeners();
});

// Mock Gallery Data
const GALLERY_IMAGES = [
    { id: 1, src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'reunion', title: 'Alumni Reunion 2023', date: 'Oct 15, 2023' },
    { id: 2, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'campus', title: 'Campus Main Building', date: 'Sep 01, 2022' },
    { id: 3, src: 'https://images.unsplash.com/photo-1627556592933-ffe99c1cd9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'convocation', title: 'Class of 2022 Convocation', date: 'May 20, 2022' },
    { id: 4, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'reunion', title: 'Networking Dinner', date: 'Oct 15, 2023' },
    { id: 5, src: 'https://images.unsplash.com/photo-1576267423445-807c69783d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'sports', title: 'Annual Sports Day', date: 'Feb 12, 2023' },
    { id: 6, src: 'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'campus', title: 'Library Study Session', date: 'Nov 10, 2022' },
    { id: 7, src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'convocation', title: 'Throwing Hats', date: 'May 20, 2022' },
    { id: 8, src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'sports', title: 'Inter-College Football Match', date: 'Feb 12, 2023' },
    { id: 9, src: 'https://images.unsplash.com/photo-1544531696-b8c0df111718?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', category: 'reunion', title: 'Panel Discussion', date: 'Oct 16, 2023' }
];

let currentImages = [];

function loadGalleryImages(filter) {
    const grid = document.getElementById('galleryGrid');

    // Filter images
    const images = filter === 'all'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(img => img.category === filter);

    currentImages = images;

    // Clear grid with fade out effect (if needed)
    grid.innerHTML = '';

    // Append new images with animation
    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105';
        card.onclick = () => openLightbox(index);

        card.innerHTML = `
            <img src="${img.src}" alt="${img.title}" class="w-full h-64 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 class="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${img.title}</h3>
                <p class="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${img.date}</p>
            </div>
            <div class="absolute top-2 right-2 bg-secondary-color text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ${img.category.charAt(0).toUpperCase() + img.category.slice(1)}
            </div>
        `;

        grid.appendChild(card);
    });
}

function setupGalleryListeners() {
    // Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'btn-primary');
                b.classList.add('btn-outline');
            });
            this.classList.remove('btn-outline');
            this.classList.add('active', 'btn-primary');

            // Filter images
            loadGalleryImages(this.dataset.filter);
        });
    });

    // Lightbox Controls
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') changeLightboxImage(-1);
        if (e.key === 'ArrowRight') changeLightboxImage(1);
    });

    document.getElementById('lightboxPrev').addEventListener('click', (e) => {
        e.stopPropagation();
        changeLightboxImage(-1);
    });

    document.getElementById('lightboxNext').addEventListener('click', (e) => {
        e.stopPropagation();
        changeLightboxImage(1);
    });
}

let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('hidden');
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const img = currentImages[currentLightboxIndex];
    document.getElementById('lightboxImage').src = img.src;
    document.getElementById('lightboxTitle').textContent = img.title;
    document.getElementById('lightboxDate').textContent = img.date;
}

function changeLightboxImage(direction) {
    currentLightboxIndex += direction;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentImages.length - 1;
    } else if (currentLightboxIndex >= currentImages.length) {
        currentLightboxIndex = 0;
    }

    updateLightboxContent();
}
