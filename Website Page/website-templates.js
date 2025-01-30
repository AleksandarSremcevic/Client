document.addEventListener('DOMContentLoaded', function() {
    const templateCards = document.querySelectorAll('.template-card');
    const examples = document.querySelectorAll('.example');
    const templateExamplesSection = document.getElementById('template-examples');

    templateCards.forEach(card => {
        card.addEventListener('click', function() {
            const templateType = this.getAttribute('data-template');
            examples.forEach(example => {
                if (example.classList.contains(templateType)) {
                    example.style.display = 'block';
                } else {
                    example.style.display = 'none';
                }
            });
            templateExamplesSection.style.display = 'block';
            // Scroll to the template examples section on mobile
            if (window.innerWidth <= 768) {
                templateExamplesSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});