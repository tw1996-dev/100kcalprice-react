document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#main-nav .navigation-link');

    navLinks.forEach(link => {
        link.addEventListener('touchstart', function(event) {
            // Check if it's likely a mobile device based on screen width
            if (window.innerWidth <= 768) {
                // Apply the hover effect
                this.classList.add('mobile-hover-active');

                // Remove the hover effect after 1 second
                setTimeout(() => {
                    this.classList.remove('mobile-hover-active');
                }, 1000); // 1000 milliseconds = 1 second
            }
        });
    });
});