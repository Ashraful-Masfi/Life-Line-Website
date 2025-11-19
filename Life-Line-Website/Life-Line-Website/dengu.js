// Dengue Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDenguePage();
});

function initDenguePage() {
    console.log('Dengue page initialized');
    loadTestingCenters();
    initScrollAnimations();
    updateLiveStats();
}

function loadTestingCenters() {
    const centersGrid = document.getElementById('centersGrid');
    
    const centers = [
        {
            name: "Dhaka Medical College Hospital",
            location: "Dhaka Medical College Road, Dhaka",
            contact: "+880-2-55165050",
            distance: "2.1 km",
            type: "Government Hospital",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": true,
                "complete": true
            },
            hours: "24/7",
            waitTime: "1-2 hours"
        },
        {
            name: "Institute of Epidemiology Disease Control & Research",
            location: "Mohakhali, Dhaka",
            contact: "+880-2-9881891",
            distance: "4.5 km",
            type: "Research Institute",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": true,
                "complete": true
            },
            hours: "9:00 AM - 5:00 PM",
            waitTime: "30 minutes"
        },
        {
            name: "Apollo Hospitals Dhaka",
            location: "Bashundhara, Dhaka",
            contact: "+880-2-8431661",
            distance: "5.8 km",
            type: "Private Hospital",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": true,
                "complete": true
            },
            hours: "24/7",
            waitTime: "15-30 minutes"
        },
        {
            name: "Infectious Disease Hospital",
            location: "Mohakhali, Dhaka",
            contact: "+880-2-9881892",
            distance: "4.3 km",
            type: "Specialized Hospital",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": true,
                "complete": true
            },
            hours: "24/7",
            waitTime: "45 minutes"
        },
        {
            name: "Chittagong Medical College Hospital",
            location: "Chittagong",
            contact: "+880-31-657791",
            distance: "245 km",
            type: "Government Hospital",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": true,
                "complete": true
            },
            hours: "24/7",
            waitTime: "2-3 hours"
        },
        {
            name: "Popular Diagnostic Center",
            location: "Dhanmondi, Dhaka",
            contact: "+880-2-9122560",
            distance: "3.7 km",
            type: "Diagnostic Center",
            tests: {
                "ns1": true,
                "igg": true,
                "malaria": false,
                "complete": true
            },
            hours: "8:00 AM - 10:00 PM",
            waitTime: "20 minutes"
        }
    ];
    
    centersGrid.innerHTML = '';
    
    centers.forEach((center, index) => {
        const centerCard = document.createElement('div');
        centerCard.className = 'center-card';
        centerCard.style.transitionDelay = `${index * 0.1}s`;
        centerCard.dataset.district = "dhaka";
        centerCard.dataset.tests = JSON.stringify(center.tests);
        
        // Generate tests HTML
        const testsHTML = Object.entries(center.tests).map(([test, available]) => `
            <div class="test-item ${available ? 'available' : 'unavailable'}" data-test="${test}">
                <div class="test-name">${getTestDisplayName(test)}</div>
                <div class="test-status">${available ? 'Available' : 'Not Available'}</div>
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
            
            <div class="center-info">
                <div class="info-item">
                    <strong>Hours:</strong> ${center.hours}
                </div>
                <div class="info-item">
                    <strong>Wait Time:</strong> <span class="wait-time">${center.waitTime}</span>
                </div>
            </div>
            
            <div class="center-contact">
                <span class="contact-number">${center.contact}</span>
            </div>
            
            <div class="test-availability">
                <div class="availability-title">Available Tests:</div>
                <div class="tests-grid">
                    ${testsHTML}
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

function getTestDisplayName(test) {
    const names = {
        "ns1": "NS1 Antigen",
        "igg": "IgG/IgM",
        "malaria": "Malaria Test",
        "complete": "Complete Blood"
    };
    return names[test] || test;
}

function filterTestingCenters() {
    const districtFilter = document.getElementById('districtFilter').value;
    const testType = document.getElementById('testType').value;
    const centerCards = document.querySelectorAll('.center-card');
    
    centerCards.forEach(card => {
        const districtMatch = districtFilter === 'all' || card.dataset.district === districtFilter;
        const testMatch = testType === 'all' || JSON.parse(card.dataset.tests)[testType];
        
        if (districtMatch && testMatch) {
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

    document.querySelectorAll('.center-card, .area-card, .prevention-card').forEach(card => {
        observer.observe(card);
    });
}

function updateLiveStats() {
    // Simulate live data updates
    setInterval(() => {
        const stats = document.querySelectorAll('.stat');
        if (stats.length > 0) {
            const newCases = Math.floor(Math.random() * 50) + 200;
            const highRiskAreas = Math.floor(Math.random() * 3) + 10;
            
            stats[0].textContent = `📈 ${newCases} New Cases Today`;
            stats[1].textContent = `🎯 High Risk Areas: ${highRiskAreas}`;
        }
    }, 30000); // Update every 30 seconds
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
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid #cc0000;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🦠</div>
            <h3 style="color: #cc0000; margin-bottom: 1rem;">Calling ${centerName}</h3>
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
    
    .wait-time {
        color: #ff9900;
        font-weight: bold;
    }
    
    .area-card {
        position: relative;
        overflow: hidden;
    }
    
    .area-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(204, 0, 0, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .area-card:hover::before {
        left: 100%;
    }
    
    .prevention-card {
        position: relative;
        overflow: hidden;
    }
    
    .prevention-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 153, 0, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .prevention-card:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(additionalStyles);