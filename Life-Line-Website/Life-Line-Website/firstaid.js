// First Aid Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize first aid page
    initFirstAidPage();
    
    // Load categories and procedures
    loadCategories();
    loadProcedures();
    
    // Setup search functionality
    setupSearch();
});

function initFirstAidPage() {
    console.log('First Aid page initialized');
    
    // Add scroll animations
    initScrollAnimations();
}

function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    const categories = [
        {
            icon: "❤️",
            name: "Cardiac Emergency",
            description: "Heart attack, CPR procedures",
            type: "cardiac"
        },
        {
            icon: "🩸",
            name: "Bleeding & Wounds",
            description: "Stop bleeding, wound care",
            type: "bleeding"
        },
        {
            icon: "🔥",
            name: "Burns & Scalds",
            description: "Thermal and chemical burns",
            type: "burns"
        },
        {
            icon: "🤕",
            name: "Fractures & Sprains",
            description: "Bone injuries and joint sprains",
            type: "fractures"
        },
        {
            icon: "😵",
            name: "Choking",
            description: "Airway obstruction help",
            type: "choking"
        },
        {
            icon: "🐍",
            name: "Poisoning & Bites",
            description: "Snake bites, poisoning",
            type: "poisoning"
        },
        {
            icon: "💫",
            name: "Fainting & Shock",
            description: "Unconsciousness treatment",
            type: "fainting"
        },
        {
            icon: "🌡️",
            name: "Heat & Cold",
            description: "Heat stroke, hypothermia",
            type: "temperature"
        }
    ];
    
    // Clear existing content
    categoriesGrid.innerHTML = '';
    
    // Add category cards
    categories.forEach((category, index) => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.style.transitionDelay = `${index * 0.1}s`;
        categoryCard.dataset.type = category.type;
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-desc">${category.description}</div>
        `;
        
        // Add click event to filter procedures
        categoryCard.addEventListener('click', function() {
            filterProcedures(this.dataset.type);
            
            // Update active state
            document.querySelectorAll('.category-card').forEach(card => {
                card.style.borderColor = 'transparent';
            });
            this.style.borderColor = 'var(--firstaid-green)';
        });
        
        categoriesGrid.appendChild(categoryCard);
    });
}

function loadProcedures() {
    const proceduresContainer = document.getElementById('proceduresContainer');
    
    const procedures = [
        {
            type: "cardiac",
            icon: "❤️",
            title: "CPR (Cardiopulmonary Resuscitation)",
            steps: [
                "Check responsiveness - tap shoulder and shout 'Are you okay?'",
                "Call emergency services (999) or ask someone to call",
                "Place heel of hand on center of chest, other hand on top",
                "Push hard and fast - 100-120 compressions per minute",
                "Give 2 rescue breaths after every 30 compressions",
                "Continue until help arrives or person starts breathing"
            ],
            warning: "Only perform CPR if you are trained. Untrained persons should do hands-only CPR."
        },
        {
            type: "bleeding",
            icon: "🩸",
            title: "Severe Bleeding Control",
            steps: [
                "Wear gloves to protect from blood-borne diseases",
                "Apply direct pressure on the wound with clean cloth",
                "Elevate the injured area above heart level",
                "Add more dressing if blood soaks through",
                "Apply pressure to pressure points if bleeding continues",
                "Keep victim calm and lying down"
            ],
            warning: "Do not remove embedded objects. Apply pressure around the object."
        },
        {
            type: "choking",
            icon: "😵",
            title: "Adult Choking Treatment",
            steps: [
                "Ask 'Are you choking?' - if they can cough, encourage coughing",
                "Stand behind person, wrap arms around their waist",
                "Make fist, place thumb side against upper abdomen",
                "Grab fist with other hand, give quick upward thrusts",
                "Continue until object is expelled or person becomes unconscious",
                "Call emergency services if choking persists"
            ],
            warning: "For pregnant or obese persons, perform chest thrusts instead of abdominal thrusts."
        },
        {
            type: "burns",
            icon: "🔥",
            title: "Burn First Aid",
            steps: [
                "Cool the burn under cool running water for 10-20 minutes",
                "Remove jewelry or tight clothing near burned area",
                "Cover burn with sterile non-stick dressing",
                "Do not apply ice, butter, or ointments",
                "Give pain reliever if available and needed",
                "Seek medical help for serious burns"
            ],
            warning: "Do not break blisters. For chemical burns, brush off dry chemicals before flushing with water."
        },
        {
            type: "fractures",
            icon: "🤕",
            title: "Fracture Management",
            steps: [
                "Keep the injured area still and supported",
                "Apply ice pack wrapped in cloth to reduce swelling",
                "Elevate the injured limb if possible",
                "Make a splint with available materials (boards, magazines)",
                "Check for circulation beyond injury site",
                "Seek immediate medical attention"
            ],
            warning: "Do not try to straighten or realign the broken bone."
        },
        {
            type: "fainting",
            icon: "💫",
            title: "Fainting Response",
            steps: [
                "Lay person flat on their back, elevate legs 12 inches",
                "Loosen tight clothing around neck and waist",
                "Check breathing and pulse",
                "Ensure fresh air circulation",
                "Do not give anything to eat or drink until fully alert",
                "Keep person lying down for 10-15 minutes after waking"
            ],
            warning: "If person doesn't wake within one minute, call emergency services immediately."
        }
    ];
    
    // Clear existing content
    proceduresContainer.innerHTML = '';
    
    // Add procedure cards
    procedures.forEach((procedure, index) => {
        const procedureCard = document.createElement('div');
        procedureCard.className = 'procedure-card';
        procedureCard.style.transitionDelay = `${index * 0.2}s`;
        procedureCard.dataset.type = procedure.type;
        
        const stepsHTML = procedure.steps.map((step, stepIndex) => `
            <div class="step">
                <div class="step-number">${stepIndex + 1}</div>
                <div class="step-content">${step}</div>
            </div>
        `).join('');
        
        procedureCard.innerHTML = `
            <div class="procedure-header">
                <div class="procedure-icon">${procedure.icon}</div>
                <h3 class="procedure-title">${procedure.title}</h3>
            </div>
            <div class="procedure-steps">
                ${stepsHTML}
            </div>
            <div class="warning">
                <strong>⚠️ Important:</strong> ${procedure.warning}
            </div>
        `;
        
        proceduresContainer.appendChild(procedureCard);
    });
}

function filterProcedures(type) {
    const procedureCards = document.querySelectorAll('.procedure-card');
    
    procedureCards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
            setTimeout(() => card.classList.add('animate-in'), 100);
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
    
    // Scroll to procedures section
    document.querySelector('.procedures-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function setupSearch() {
    const searchInput = document.getElementById('firstAidSearch');
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
    const searchTerm = document.getElementById('firstAidSearch').value.toLowerCase();
    const procedureCards = document.querySelectorAll('.procedure-card');
    const categoryCards = document.querySelectorAll('.category-card');
    
    let foundAny = false;
    
    // Search in procedures
    procedureCards.forEach(card => {
        const procedureTitle = card.querySelector('.procedure-title').textContent.toLowerCase();
        const procedureSteps = card.querySelector('.procedure-steps').textContent.toLowerCase();
        
        if (procedureTitle.includes(searchTerm) || procedureSteps.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('animate-in');
            foundAny = true;
        } else {
            card.style.display = 'none';
            card.classList.remove('animate-in');
        }
    });
    
    // Search in categories
    categoryCards.forEach(card => {
        const categoryName = card.querySelector('.category-name').textContent.toLowerCase();
        const categoryDesc = card.querySelector('.category-desc').textContent.toLowerCase();
        
        if (categoryName.includes(searchTerm) || categoryDesc.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('animate-in');
            foundAny = true;
            
            // Highlight matching category
            card.style.borderColor = 'var(--firstaid-green)';
        } else {
            card.style.display = 'block'; // Keep categories visible
            card.style.borderColor = 'transparent';
        }
    });
    
    // Show all if no search term
    if (!searchTerm) {
        procedureCards.forEach(card => {
            card.style.display = 'block';
            card.classList.add('animate-in');
        });
        categoryCards.forEach(card => {
            card.style.borderColor = 'transparent';
        });
    }
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

    // Observe all cards
    document.querySelectorAll('.category-card, .procedure-card').forEach(card => {
        observer.observe(card);
    });
}

// Emergency contact function
function showEmergencyContact() {
    const emergencyModal = document.createElement('div');
    emergencyModal.style.cssText = `
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
    
    emergencyModal.innerHTML = `
        <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid var(--firstaid-green); max-width: 400px;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🚨</div>
            <h3 style="color: var(--firstaid-green); margin-bottom: 1rem;">Emergency Contacts</h3>
            <div style="color: #ccc; text-align: left; margin-bottom: 2rem;">
                <p>📞 <strong>National Emergency:</strong> 999</p>
                <p>🏥 <strong>Ambulance Service:</strong> +880-1711-234567</p>
                <p>🚓 <strong>Police Help:</strong> 999</p>
                <p>🚒 <strong>Fire Service:</strong> +880-2-7116622</p>
            </div>
            <button onclick="this.closest('div').style.display='none'" 
                    style="background: var(--firstaid-green); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer; width: 100%;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(emergencyModal);
    
    // Close modal when clicking outside
    emergencyModal.addEventListener('click', function(e) {
        if (e.target === emergencyModal) {
            document.body.removeChild(emergencyModal);
        }
    });
}

// Add emergency contact button to header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.firstaid-header .container');
    const emergencyBtn = document.createElement('button');
    emergencyBtn.textContent = 'Emergency Contacts';
    emergencyBtn.className = 'emergency-btn';
    emergencyBtn.style.cssText = `
        background: var(--warning-orange);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        margin-top: 1rem;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    emergencyBtn.addEventListener('click', showEmergencyContact);
    emergencyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(255, 153, 0, 0.4)';
    });
    emergencyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
    
    header.appendChild(emergencyBtn);
});