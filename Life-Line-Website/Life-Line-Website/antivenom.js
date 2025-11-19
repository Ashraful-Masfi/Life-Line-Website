// Antivenom Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAntivenomPage();
});

function initAntivenomPage() {
    console.log('Antivenom page initialized');
    loadAntivenomCenters();
    initScrollAnimations();
}

function loadAntivenomCenters() {
    const centersGrid = document.getElementById('centersGrid');
    
    const centers = [
        {
            name: "Dhaka Medical College Hospital",
            location: "Dhaka Medical College Road, Dhaka",
            contact: "+880-2-55165050",
            distance: "2.1 km",
            type: "Government Hospital",
            inventory: {
                "cobra": true,
                "krait": true,
                "viper": false,
                "sea-snake": false
            }
        },
        {
            name: "Infectious Disease Hospital",
            location: "Mohakhali, Dhaka",
            contact: "+880-2-9881891",
            distance: "4.5 km",
            type: "Specialized Hospital",
            inventory: {
                "cobra": true,
                "krait": true,
                "viper": true,
                "sea-snake": false
            }
        },
        {
            name: "Chittagong Medical College Hospital",
            location: "Chittagong",
            contact: "+880-31-657791",
            distance: "245 km",
            type: "Government Hospital",
            inventory: {
                "cobra": true,
                "krait": false,
                "viper": true,
                "sea-snake": true
            }
        },
        {
            name: "Snake Bite Treatment Center",
            location: "Savar, Dhaka",
            contact: "+880-1711-223344",
            distance: "25 km",
            type: "Specialized Center",
            inventory: {
                "cobra": true,
                "krait": true,
                "viper": true,
                "sea-snake": false
            }
        },
        {
            name: "Khulna Medical College Hospital",
            location: "Khulna",
            contact: "+880-41-720191",
            distance: "335 km",
            type: "Government Hospital",
            inventory: {
                "cobra": true,
                "krait": true,
                "viper": false,
                "sea-snake": false
            }
        },
        {
            name: "Rajshahi Medical College Hospital",
            location: "Rajshahi",
            contact: "+880-721-771308",
            distance: "240 km",
            type: "Government Hospital",
            inventory: {
                "cobra": false,
                "krait": true,
                "viper": true,
                "sea-snake": false
            }
        }
    ];
    
    centersGrid.innerHTML = '';
    
    centers.forEach((center, index) => {
        const centerCard = document.createElement('div');
        centerCard.className = 'center-card';
        centerCard.style.transitionDelay = `${index * 0.1}s`;
        centerCard.dataset.location = "dhaka"; // You can add actual location data
        centerCard.dataset.venom = JSON.stringify(center.inventory);
        
        // Generate venom types HTML
        const venomTypesHTML = Object.entries(center.inventory).map(([venom, available]) => `
            <div class="venom-item ${available ? 'available' : 'unavailable'}" data-venom="${venom}">
                <div class="venom-type">${getVenomDisplayName(venom)}</div>
                <div class="venom-status">${available ? 'Available' : 'Not Available'}</div>
            </div>
        `).join('');
        
        centerCard.innerHTML = `
            <div class="distance-badge">${center.distance}</div>
            <div class="center-header">
                <div>
                    <div class="center-name">${center.name}</div>
                    <div class="center-type">${center.type}</div>
                </div>
            </div>
            <p class="center-location">📍 ${center.location}</p>
            
            <div class="center-contact">
                <span class="contact-number">${center.contact}</span>
            </div>
            
            <div class="antivenom-inventory">
                <div class="inventory-title">Antivenom Availability:</div>
                <div class="venom-types">
                    ${venomTypesHTML}
                </div>
            </div>
        `;
        
        // Add click effect for contact
        const contactElement = centerCard.querySelector('.center-contact');
        contactElement.addEventListener('click', function() {
            simulateCall(center.contact, center.name);
        });
        
        centersGrid.appendChild(centerCard);
    });
}

function getVenomDisplayName(venom) {
    const names = {
        "cobra": "Cobra",
        "krait": "Krait", 
        "viper": "Viper",
        "sea-snake": "Sea Snake"
    };
    return names[venom] || venom;
}

function filterCenters() {
    const cityFilter = document.getElementById('cityFilter').value;
    const venomFilter = document.getElementById('venomFilter').value;
    const centerCards = document.querySelectorAll('.center-card');
    
    centerCards.forEach(card => {
        const locationMatch = cityFilter === 'all' || card.dataset.location === cityFilter;
        const venomMatch = venomFilter === 'all' || JSON.parse(card.dataset.venom)[venomFilter];
        
        if (locationMatch && venomMatch) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('animate-in'), 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.center-card, .step-card').forEach(card => {
        observer.observe(card);
    });
}

function simulateCall(phoneNumber, centerName) {
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
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid #00cc66;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🐍</div>
            <h3 style="color: #00cc66; margin-bottom: 1rem;">Calling ${centerName}</h3>
            <p style="color: #ccc; margin-bottom: 2rem; font-size: 1.2rem;">${phoneNumber}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="background: #cc0000; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
                    Close
                </button>
                <button onclick="window.open('tel:${phoneNumber}')" 
                        style="background: #00cc66; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
                    Open Dialer
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(callModal);
    
    callModal.addEventListener('click', function(e) {
        if (e.target === callModal) {
            document.body.removeChild(callModal);
        }
    });
}

// Emergency call function
document.querySelector('.emergency-alert')?.addEventListener('click', function() {
    window.open('tel:+880171176253');
});