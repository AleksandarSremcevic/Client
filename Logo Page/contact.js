document.addEventListener("DOMContentLoaded", function() {
    const serviceType = document.getElementById("service-type");
    const detailsType = document.getElementById("details-type");

    const detailsOptions = {
        logo: ["Simple", "Lettermark/Wordmark", "Emblem", "3D", "Mascot"],
        website: ["Landing Page", "E-commerce", "Portfolio", "Blog", "Corporate"],
        "graphic-design": ["Flyer", "Brochure", "Poster", "Social Media", "Business Card"]
    };

    // Update details dropdown based on service selected
    serviceType.addEventListener("change", function() {
        const selectedService = serviceType.value;
        detailsType.innerHTML = '<option value="">--Please choose an option--</option>';
        if (selectedService && detailsOptions[selectedService]) {
            detailsOptions[selectedService].forEach(option => {
                const opt = document.createElement("option");
                opt.value = option.toLowerCase();
                opt.textContent = option;
                detailsType.appendChild(opt);
            });
        }
    });

    // Handle form submission
    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const service = serviceType.options[serviceType.selectedIndex].text;
        const details = detailsType.options[detailsType.selectedIndex].text;

        const subject = `New Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nService: ${service}\nDetails: ${details}`;
        const mailtoLink = `mailto:uxwebalex@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Open the mailto link
        window.location.href = mailtoLink;
    });
});