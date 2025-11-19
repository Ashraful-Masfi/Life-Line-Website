// Donor Registration JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDonorPage();
});

function initDonorPage() {
    console.log('Donor page initialized');
    
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', handleDonorRegistration);
    }
    
    setupFormValidation();
}

function setupFormValidation() {
    const ageInput = document.getElementById('age');
    const contactInput = document.getElementById('contactNumber');
    
    ageInput.addEventListener('input', function() {
        if (this.value < 18 || this.value > 65) {
            this.setCustomValidity('Age must be between 18 and 65 years');
        } else {
            this.setCustomValidity('');
        }
    });
    
    contactInput.addEventListener('input', function() {
        const phoneRegex = /^[0-9+-\s()]{10,}$/;
        if (!phoneRegex.test(this.value)) {
            this.setCustomValidity('Please enter a valid contact number');
        } else {
            this.setCustomValidity('');
        }
    });
}

function handleDonorRegistration(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        fullName: document.getElementById('fullName').value,
        fatherName: document.getElementById('fatherName').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        contactNumber: document.getElementById('contactNumber').value,
        email: document.getElementById('email').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        lastDonation: document.getElementById('lastDonation').value,
        medicalHistory: document.getElementById('medicalHistory').value
    };
    
    // Validate required fields
    if (!formData.fullName || !formData.fatherName || !formData.age || !formData.gender || 
        !formData.address || !formData.contactNumber || !formData.bloodGroup) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Registering...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showSuccessMessage(formData);
        submitBtn.innerHTML = 'Register as Donor';
        submitBtn.disabled = false;
    }, 2000);
}

function showSuccessMessage(formData) {
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
        <div style="background: var(--card-bg); padding: 3rem; border-radius: 15px; text-align: center; border: 2px solid var(--donor-red); max-width: 500px; width: 90%;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
            <h3 style="color: var(--donor-red); margin-bottom: 1rem;">Registration Successful!</h3>
            <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">
                Thank you, <strong>${formData.fullName}</strong>! You have successfully registered as a blood donor. 
                We will contact you when there is a need for your blood type (${formData.bloodGroup}).
            </p>
            <div style="background: rgba(204, 0, 0, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
                <h4 style="color: white; margin-bottom: 0.5rem;">Donor ID: DL${Date.now().toString().slice(-6)}</h4>
                <p style="color: #ccc; margin: 0;">Keep this ID for future reference</p>
            </div>
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: var(--donor-red); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer; width: 100%;">
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
    document.getElementById('donorForm').reset();
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
const donorStyles = document.createElement('style');
donorStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(donorStyles);