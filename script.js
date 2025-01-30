// script.js

// Fade in sections when scrolling
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});

// Get the modal element and the image elements
const modal = document.createElement('div');
modal.id = 'image-modal';
const modalImage = document.createElement('img');
modal.appendChild(modalImage);
document.body.appendChild(modal);

// Add click event listeners to each image in the logo, template, and graphic sections
const images = document.querySelectorAll('.clickable-image');
images.forEach(image => {
    image.addEventListener('click', (e) => {
        modal.style.display = 'flex';   // Show the modal
        modalImage.src = e.target.src; // Set the source of the modal image
    });
});

// Close the modal when clicking on the overlay
modal.addEventListener('click', () => {
    modal.style.display = 'none';  // Hide the modal
});

// Close the modal when pressing the 'Escape' key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none'; // Hide the modal
    }
});
