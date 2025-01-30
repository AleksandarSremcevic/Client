document.addEventListener("DOMContentLoaded", function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');

    document.querySelectorAll('.design-image').forEach(img => {
        img.addEventListener('click', function() {
            lightbox.style.display = 'block';
            lightboxImg.src = this.src;
        });
    });

    close.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Create and animate rainbow balls
    if (window.innerWidth >= 1025) {
        for (let i = 0; i < 5; i++) {
            const leftBall = document.createElement('div');
            leftBall.classList.add('rainbow-ball', 'left');
            document.body.appendChild(leftBall);

            const rightBall = document.createElement('div');
            rightBall.classList.add('rainbow-ball', 'right');
            document.body.appendChild(rightBall);
        }
    }
});