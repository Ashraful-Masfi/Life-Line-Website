// Main JavaScript for Life Line Website

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations on scroll
    initScrollAnimations();
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe service panels for animation
    document.querySelectorAll('.service-panel').forEach(panel => {
        observer.observe(panel);
    });
}

// Emergency button functionality
function handleEmergency() {
    // Additional emergency functionality can be added here
    console.log('Emergency button clicked');
    // Redirect to emergency page is handled by HTML link
}


// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .service-panel {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .service-panel.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    body.loaded .hero-section {
        animation: pageLoad 1s ease-out;
    }
    
    @keyframes pageLoad {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);