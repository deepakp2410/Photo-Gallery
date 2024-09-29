const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const uploadImage = document.getElementById('uploadImage');
const uploadBtn = document.getElementById('uploadBtn');
const categorySelect = document.getElementById('categorySelect');

// Sample images data
const images = [
    { src: 'nature1.jpg', category: 'nature' },
    { src: 'architecture1.jpg', category: 'architecture' },
    { src: 'animals1.jpg', category: 'animals' },
    { src: 'nature2.jpg', category: 'nature' },
    { src: 'architecture2.jpg', category: 'architecture' }
];

// Function to display images based on category
function displayImages(category) {
    gallery.innerHTML = '';
    const filteredImages = category === 'all' ? images : images.filter(img => img.category === category);

    filteredImages.forEach(img => {
        const imgElement = document.createElement('div');
        imgElement.className = 'gallery-item';
        imgElement.innerHTML = `<img src="${img.src}" alt="${img.category}" data-category="${img.category}">`;
        imgElement.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });
        gallery.appendChild(imgElement);
    });
}

// Initial display
displayImages('all');

// Category filter event
document.querySelectorAll('.category-filter button').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        displayImages(category);
    });
});

// Lightbox close
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Image upload
uploadBtn.addEventListener('click', () => {
    const file = uploadImage.files[0];
    const category = categorySelect.value;

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const newImg = { src: e.target.result, category };
            images.push(newImg);
            displayImages(category);
        };
        reader.readAsDataURL(file);
    }
});