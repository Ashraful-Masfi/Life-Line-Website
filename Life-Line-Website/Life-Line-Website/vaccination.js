// Vaccination Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initVaccinationPage();
});

function initVaccinationPage() {
    console.log('Vaccination page initialized');
    loadVaccinationCenters();
    initScrollAnimations();
    setupVaccineFilters();
}

function loadVaccinationCenters() {
    const centersGrid = document.getElementById('centersGrid');
    
    const centers = [
        {
            name: "Dhaka Medical College Hospital",
            location: "Dhaka Medical College Road, Dhaka",
            contact: "+880-2-55165060",
            distance: "2.1 km",
            type: "government",
            vaccines: {
                "covid": true,
                "flu": true,
                "hepatitis": true,
                "mmr": true,
                "typhoid": true,
                "rabies": true
            },
            hours: "8:00 AM - 8:00 PM",
            fee: "Free"
        },
        {
            name: "Bangabandhu Sheikh Mujib Medical University",
            location: "Shahbag, Dhaka",
            contact: "+880-2-55165070",
            distance: "3.2 km",
            type: "government",
            vaccines: {
                "covid": true,
                "flu": true,
                "hepatitis": true,
                "mmr": false,
                "typhoid": true,
                "rabies": true
            },
            hours: "24/7",
            fee: "Free"
        },
        {
            name: "Apollo Hospitals Dhaka",
            location: "Bashundhara, Dhaka",
            contact: "+880-2-8431661",
            distance: "5.8 km",
            type: "private",
            vaccines: {
                "covid": true,
                "flu": true,
                "hepatitis": true,
                "mmr": true,
                "typhoid": true,
                "rabies": true
            },
            hours: "24/7",
            fee: "Paid"
        },
        {
            name: "Urban Primary Health Care Center",
            location: "Mirpur, Dhaka",
            contact: "+880-2-9001122",
            distance: "4.5 km",
            type: "clinic",
            vaccines: {
                "covid": true,
                "flu": true,
                "hepatitis": true,
                "mmr": false,
                "typhoid": true,
                "rabies": false
            },
            hours: "9:00 AM - 5:00 PM",
            fee: "Free"
        },
        {
            name: "Chittagong Medical College Hospital",
            location: "Chittagong",
            contact: "+880-31-657791",
            distance: "245 km",
            type: "government",
            vaccines: {
                "covid": true,
                "flu": true,
                "hepatitis": true,
                "mmr": true,
                "typhoid": true,
                "rabies": true
            },
            hours: "24/7",
            fee: "Free"
        },
        {
            name: "COVID-19 Vaccination Camp",
            location: "Farmgate, Dhaka",
            contact: "+880-1711-334455",
            distance: "3.8 km",
            type: "camp",
            vaccines: {
                "covid": true,
                "flu": false,
                "hepatitis": false,
                "mmr": false,
                "typhoid": false,
                "rabies": false
            },
            hours: "10:00 AM - 4:00 PM",
            fee: "Free"
        }
    ];
    
    centersGrid.innerHTML = '';
    
    centers.forEach((center, index) => {
        const centerCard = document.createElement('div');
        centerCard.className = 'center-card';
        centerCard.style.transitionDelay = `${index * 0.1}s`;
        centerCard.dataset.type = center.type;
        centerCard.dataset.vaccines = JSON.stringify(center.vaccines);
        
        // Generate vaccines HTML
        const vaccinesHTML = Object.entries(center.vaccines).map(([vaccine, available]) => `
            <div class="vaccine-item ${available ? 'available' : 'unavailable'}" data-vaccine="${vaccine}">
                <div class="vaccine-name">${getVaccineDisplayName(vaccine)}</div>
                <div class="vaccine-status">${available ? 'Available' : 'Not Available'}</div>
            </div>
        `).join('');
        
        centerCard.innerHTML = `
            <div class="distance-badge">${center.distance}</div>
            <div class="center-header">
                <div>
                    <div class="center-name">${center.name}</div>
                    <div class="center-type">${getCenterTypeName(center.type)}</div>
                </div>
            </div>
            <p class="center-location">📍 ${center.location}</p>
            
            <div class="center-info">
                <div class="info-item">
                    <strong>Hours:</strong> ${center.hours}
                </div>
                <div class="info-item">
                    <strong>Fee:</strong> <span class="fee ${center.fee.toLowerCase()}">${center.fee}</span>
                </div>
            </div>
            
            <div class="center-contact">
                <span class="contact-number">${center.contact}</span>
            </div>
            
            <div class="vaccine-availability">
                <div class="availability-title">Available Vaccines:</div>
                <div class="vaccines-grid">
                    ${vaccinesHTML}
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

function getVaccineDisplayName(vaccine) {
    const names = {
        "covid": "COVID-19",
        "flu": "Influenza",
        "hepatitis": "Hepatitis B",
        "mmr": "MMR",
        "typhoid": "Typhoid",
        "rabies": "Rabies"
    };
    return names[vaccine] || vaccine;
}

function getCenterTypeName(type) {
    const names = {
        "government": "Government Hospital",
        "private": "Private Hospital",
        "clinic": "Health Clinic",
        "camp": "Vaccination Camp"
    };
    return names[type] || type;
}

function setupVaccineFilters() {
    const vaccineCards = document.querySelectorAll('.vaccine-card');
    
    vaccineCards.forEach(card => {
        card.addEventListener('click', function() {
            const vaccineType = this.dataset.vaccine;
            document.getElementById('vaccineType').value = vaccineType;
            filterCenters();
        });
    });
}

function filterCenters() {
    const centerType = document.getElementById('centerType').value;
    const vaccineType = document.getElementById('vaccineType').value;
    const centerCards = document.querySelectorAll('.center-card');
    
    centerCards.forEach(card => {
        const typeMatch = centerType === 'all' || card.dataset.type === centerType;
        const vaccineMatch = vaccineType === 'all' || JSON.parse(card.dataset.vaccines)[vaccineType];
        
        if (typeMatch && vaccineMatch) {
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

    document.querySelectorAll('.center-card, .vaccine-card, .timeline-item').forEach(card => {
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
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid #0066cc;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">💉</div>
            <h3 style="color: #0066cc; margin-bottom: 1rem;">Calling ${centerName}</h3>
            <p style="color: #ccc; margin-bottom: 2rem; font-size: 1.2rem;">${phoneNumber}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.closest('div').parentElement.remove()" 
                        style="background: #cc0000; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
                    Close
                </button>
                <button onclick="window.open('tel:${phoneNumber}')" 
                        style="background: #0066cc; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
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

// Add CSS for additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .center-info {
        background: #2a2a2a;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
    }
    
    .info-item {
        color: #ccc;
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
    }
    
    .info-item:last-child {
        margin-bottom: 0;
    }
    
    .fee.free {
        color: #00cc66;
        font-weight: bold;
    }
    
    .fee.paid {
        color: #ff9900;
        font-weight: bold;
    }
    
    .vaccine-card {
        position: relative;
        overflow: hidden;
    }
    
    .vaccine-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .vaccine-card:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(additionalStyles);