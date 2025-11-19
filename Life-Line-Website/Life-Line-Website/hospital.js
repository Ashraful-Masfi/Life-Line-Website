// Hospital Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hospital page
    initHospitalPage();
    
    // Load hospitals data
    loadHospitals();
    
    // Setup search functionality
    setupSearch();
});

function initHospitalPage() {
    console.log('Hospital page initialized');
    
    // Add scroll animations
    initScrollAnimations();
}

function loadHospitals() {
    const hospitalsGrid = document.getElementById('hospitalsGrid');
    
    // Sample hospital data for Bangladesh
    const hospitals = [
        {
            name: "Dhaka Medical College Hospital",
            location: "Dhaka",
            contact: "+880-2-55165000",
            distance: "2.5 km",
            emoji: "🏥",
            features: ["Emergency", "ICU", "Surgery", "Cardiology"]
        },
        {
            name: "Bangabandhu Sheikh Mujib Medical University",
            location: "Shahbag, Dhaka",
            contact: "+880-2-55165001",
            distance: "3.2 km",
            emoji: "🎓",
            features: ["Research", "Specialized", "Teaching", "Emergency"]
        },
        {
            name: "Apollo Hospitals Dhaka",
            location: "Bashundhara, Dhaka",
            contact: "+880-2-8431661",
            distance: "5.8 km",
            emoji: "🌟",
            features: ["International", "ICU", "Surgery", "Cardiology"]
        },
        {
            name: "Square Hospitals Ltd",
            location: "Panthapath, Dhaka",
            contact: "+880-2-8144400",
            distance: "4.1 km",
            emoji: "⭐",
            features: ["Multi-specialty", "Emergency", "ICU", "Modern"]
        },
        {
            name: "Ibn Sina Hospital",
            location: "Dhanmondi, Dhaka",
            contact: "+880-2-9122560",
            distance: "3.7 km",
            emoji: "🕌",
            features: ["General", "Emergency", "Surgery", "ICU"]
        },
        {
            name: "Labaid Specialized Hospital",
            location: "Dhanmondi, Dhaka",
            contact: "+880-2-9676351",
            distance: "3.9 km",
            emoji: "💊",
            features: ["Cardiac", "Neurology", "Emergency", "ICU"]
        },
        {
            name: "United Hospital Limited",
            location: "Gulshan, Dhaka",
            contact: "+880-2-8836000",
            distance: "6.5 km",
            emoji: "🌐",
            features: ["International", "Luxury", "Emergency", "Specialized"]
        },
        {
            name: "Chittagong Medical College Hospital",
            location: "Chittagong",
            contact: "+880-31-657791",
            distance: "245 km",
            emoji: "🌊",
            features: ["Government", "Emergency", "Teaching", "General"]
        },
        {
            name: "Mymensingh Medical College Hospital",
            location: "Mymensingh",
            contact: "+880-91-66765",
            distance: "120 km",
            emoji: "🏛️",
            features: ["Government", "Emergency", "Teaching", "General"]
        }
    ];
    
    // Clear existing content
    hospitalsGrid.innerHTML = '';
    
    // Add hospital cards
    hospitals.forEach((hospital, index) => {
        const hospitalCard = document.createElement('div');
        hospitalCard.className = 'hospital-card';
        hospitalCard.style.transitionDelay = `${index * 0.1}s`;
        
        hospitalCard.innerHTML = `
            <div class="hospital-image">
                ${hospital.emoji}
                <div class="distance-badge">${hospital.distance}</div>
            </div>
            <div class="hospital-info">
                <h3 class="hospital-name">${hospital.name}</h3>
                <p class="hospital-location">📍 ${hospital.location}</p>
                <div class="hospital-contact">
                    <span class="contact-number">${hospital.contact}</span>
                </div>
                <div class="hospital-features">
                    ${hospital.features.map(feature => 
                        `<span class="feature-tag">${feature}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        // Add click effect
        hospitalCard.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Simulate calling functionality
            simulateCall(hospital.contact, hospital.name);
        });
        
        hospitalsGrid.appendChild(hospitalCard);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('hospitalSearch');
    const searchBtn = document.querySelector('.search-btn');
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function performSearch() {
    const searchTerm = document.getElementById('hospitalSearch').value.toLowerCase();
    const hospitalCards = document.querySelectorAll('.hospital-card');
    
    hospitalCards.forEach(card => {
        const hospitalName = card.querySelector('.hospital-name').textContent.toLowerCase();
        const hospitalLocation = card.querySelector('.hospital-location').textContent.toLowerCase();
        
        if (hospitalName.includes(searchTerm) || hospitalLocation.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('animate-in');
        } else {
            card.style.display = 'none';
        }
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
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all hospital cards
    document.querySelectorAll('.hospital-card').forEach(card => {
        observer.observe(card);
    });
}

function simulateCall(phoneNumber, hospitalName) {
    // Create calling modal
    const callModal = document.createElement('div');
    callModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(10px);
    `;
    
    callModal.innerHTML = `
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid #0066cc;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">📞</div>
            <h3 style="color: #0066cc; margin-bottom: 1rem;">Calling ${hospitalName}</h3>
            <p style="color: #ccc; margin-bottom: 2rem; font-size: 1.2rem;">${phoneNumber}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('div').style.display='none'" 
                        style="background: #cc0000; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
                    End Call
                </button>
                <button onclick="window.open('tel:${phoneNumber}')" 
                        style="background: #00cc66; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
                    Open Dialer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(callModal);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(callModal)) {
            document.body.removeChild(callModal);
        }
    }, 5000);
}

// Filter hospitals by city
function filterByCity(city) {
    const hospitalCards = document.querySelectorAll('.hospital-card');
    
    hospitalCards.forEach(card => {
        const hospitalLocation = card.querySelector('.hospital-location').textContent.toLowerCase();
        
        if (city === 'all' || hospitalLocation.includes(city.toLowerCase())) {
            card.style.display = 'block';
            card.classList.add('animate-in');
        } else {
            card.style.display = 'none';
        }
    });
}