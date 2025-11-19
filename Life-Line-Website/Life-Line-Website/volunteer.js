// Volunteer Registration JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initVolunteerPage();
});

function initVolunteerPage() {
    console.log('Volunteer page initialized');
    
    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerRegistration);
    }
    
    initScrollAnimations();
    setupInterestSelection();
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.opportunity-card, .benefit-card').forEach(card => {
        observer.observe(card);
    });
}

function setupInterestSelection() {
    const interestOptions = document.querySelectorAll('.interest-option');
    
    interestOptions.forEach(option => {
        option.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            if (checkbox.checked) {
                this.style.background = 'rgba(0, 204, 102, 0.2)';
                this.style.borderColor = 'var(--volunteer-green)';
            } else {
                this.style.background = '#2a2a2a';
                this.style.borderColor = '#444';
            }
        });
    });
}

function handleVolunteerRegistration(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('volunteerName').value,
        age: document.getElementById('volunteerAge').value,
        email: document.getElementById('volunteerEmail').value,
        phone: document.getElementById('volunteerPhone').value,
        address: document.getElementById('volunteerAddress').value,
        occupation: document.getElementById('volunteerOccupation').value,
        availability: document.getElementById('volunteerAvailability').value,
        skills: document.getElementById('volunteerSkills').value
    };
    
    // Get selected interests
    const selectedInterests = [];
    document.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
        selectedInterests.push(checkbox.value);
    });
    
    formData.interests = selectedInterests;
    
    // Validate form
    if (!formData.name || !formData.age || !formData.email || !formData.phone || 
        !formData.address || !formData.availability || selectedInterests.length === 0) {
        showNotification('Please fill in all required fields and select at least one interest area', 'error');
        return;
    }
    
    if (formData.age < 16) {
        showNotification('Volunteers must be at least 16 years old', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showVolunteerSuccess(formData);
        submitBtn.innerHTML = 'Join as Volunteer';
        submitBtn.disabled = false;
    }, 2000);
}

function showVolunteerSuccess(formData) {
    const successModal = document.createElement('div');
    successModal.style.cssText = `
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
    
    successModal.innerHTML = `
        <div style="background: var(--card-bg); padding: 3rem; border-radius: 15px; text-align: center; border: 2px solid var(--volunteer-green); max-width: 500px; width: 90%;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="color: var(--volunteer-green); margin-bottom: 1rem;">Welcome to Our Team!</h3>
            <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">
                Thank you, <strong>${formData.name}</strong>! Your volunteer application has been received successfully. 
                Our team will contact you within 2-3 business days for orientation and training.
            </p>
            <div style="background: rgba(0, 204, 102, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
                <h4 style="color: white; margin-bottom: 0.5rem;">Volunteer ID: VL${Date.now().toString().slice(-6)}</h4>
                <p style="color: #ccc; margin: 0;">Keep this ID for future reference</p>
            </div>
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: var(--volunteer-green); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer; width: 100%;">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
        }
    });
    
    // Reset form
    document.getElementById('volunteerForm').reset();
    
    // Reset interest options styling
    document.querySelectorAll('.interest-option').forEach(option => {
        option.style.background = '#2a2a2a';
        option.style.borderColor = '#444';
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#cc0000' : '#00cc66'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS for animations
const volunteerStyles = document.createElement('style');
volunteerStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(volunteerStyles);