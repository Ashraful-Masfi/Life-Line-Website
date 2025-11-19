// Emergency Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize emergency page
    initEmergencyPage();
    
    // Handle form submission
    const emergencyForm = document.getElementById('emergencyForm');
    if (emergencyForm) {
        emergencyForm.addEventListener('submit', handleEmergencySubmit);
    }
    
    // Load blood donors
    loadBloodDonors();
});

function initEmergencyPage() {
    // Add loading animation
    console.log('Emergency page initialized');
    
    // Add scroll animations
    initScrollAnimations();
}

function handleEmergencySubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    
    if (name && location) {
        // Show loading animation
        showLoading();
        
        // Simulate API call delay
        setTimeout(() => {
            // Show emergency contacts section
            document.getElementById('contactsSection').style.display = 'block';
            
            // Scroll to contacts section
            document.getElementById('contactsSection').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Hide loading
            hideLoading();
            
            // You can add actual location-based hospital finding logic here
            console.log(`Emergency request from: ${name} at ${location}`);
        }, 2000);
    }
}

function showLoading() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Searching for Help...';
    submitBtn.disabled = true;
}

function hideLoading() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Get Emergency Help';
    submitBtn.disabled = false;
}

function loadBloodDonors() {
    const donorsGrid = document.getElementById('donorsGrid');
    
    // Sample donor data
    const donors = [
        { name: 'Abdul Rahman', bloodGroup: 'A+', contact: '+880-1712-345678', emoji: '👨' },
        { name: 'Fatima Begum', bloodGroup: 'O+', contact: '+880-1812-345679', emoji: '👩' },
        { name: 'Mohammad Ali', bloodGroup: 'B+', contact: '+880-1912-345680', emoji: '👨‍💼' },
        { name: 'Ayesha Khan', bloodGroup: 'AB+', contact: '+880-1612-345681', emoji: '👩‍⚕️' },
        { name: 'Rahim Ahmed', bloodGroup: 'A-', contact: '+880-1312-345682', emoji: '👨‍🎓' },
        { name: 'Sadia Islam', bloodGroup: 'O-', contact: '+880-1412-345683', emoji: '👩‍💻' },
        { name: 'Kamal Hossain', bloodGroup: 'B-', contact: '+880-1512-345684', emoji: '👨‍🔧' },
        { name: 'Nusrat Jahan', bloodGroup: 'AB-', contact: '+880-1712-345685', emoji: '👩‍🏫' }
    ];
    
    // Clear existing content
    donorsGrid.innerHTML = '';
    
    // Add donor cards
    donors.forEach(donor => {
        const donorCard = document.createElement('div');
        donorCard.className = 'donor-card';
        donorCard.innerHTML = `
            <div class="donor-image">${donor.emoji}</div>
            <div class="donor-name">${donor.name}</div>
            <div class="donor-blood">${donor.bloodGroup}</div>
            <div class="donor-contact">${donor.contact}</div>
        `;
        
        // Add hover effect
        donorCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        donorCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        donorsGrid.appendChild(donorCard);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all panels and cards
    document.querySelectorAll('.contact-panel, .donor-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Emergency sound effect (optional)
function playEmergencySound() {
    // This would require actual sound files
    console.log('Emergency sound played');
}