// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initContactPage();
});

function initContactPage() {
    console.log('Contact page initialized');
    
    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackSubmit);
    }
    
    initScrollAnimations();
    setupFAQ();
    setupPriorityStyling();
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.info-card').forEach(card => {
        observer.observe(card);
    });
}

function setupFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function setupPriorityStyling() {
    const prioritySelect = document.getElementById('feedbackPriority');
    
    prioritySelect.addEventListener('change', function() {
        // Remove previous priority classes
        this.classList.remove('priority-low', 'priority-normal', 'priority-high', 'priority-urgent');
        
        // Add new priority class
        this.classList.add(`priority-${this.value}`);
    });
}

function handleFeedbackSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('feedbackName').value,
        email: document.getElementById('feedbackEmail').value,
        subject: document.getElementById('feedbackSubject').value,
        message: document.getElementById('feedbackMessage').value,
        priority: document.getElementById('feedbackPriority').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showFeedbackSuccess(formData);
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
    }, 2000);
}

function showFeedbackSuccess(formData) {
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
    
    const getResponseTime = (priority) => {
        switch(priority) {
            case 'urgent': return 'within 1 hour';
            case 'high': return 'within 4 hours';
            case 'normal': return 'within 24 hours';
            case 'low': return 'within 48 hours';
            default: return 'within 24 hours';
        }
    };
    
    successModal.innerHTML = `
        <div style="background: var(--card-bg); padding: 3rem; border-radius: 15px; text-align: center; border: 2px solid var(--contact-blue); max-width: 500px; width: 90%;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
            <h3 style="color: var(--contact-blue); margin-bottom: 1rem;">Message Sent Successfully!</h3>
            <p style="color: #ccc; margin-bottom: 2rem; line-height: 1.6;">
                Thank you, <strong>${formData.name}</strong>! Your ${formData.subject} has been received. 
                We will respond to your message ${getResponseTime(formData.priority)}.
            </p>
            <div style="background: rgba(0, 102, 204, 0.1); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
                <h4 style="color: white; margin-bottom: 0.5rem;">Reference ID: RF${Date.now().toString().slice(-6)}</h4>
                <p style="color: #ccc; margin: 0;">Keep this ID for future reference</p>
            </div>
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: var(--contact-blue); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer; width: 100%;">
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
    document.getElementById('feedbackForm').reset();
    
    // Reset priority styling
    const prioritySelect = document.getElementById('feedbackPriority');
    prioritySelect.classList.remove('priority-low', 'priority-normal', 'priority-high', 'priority-urgent');
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

// Add CSS for priority styling and animations
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .priority-low { border-left: 4px solid #00cc66 !important; }
    .priority-normal { border-left: 4px solid #0066cc !important; }
    .priority-high { border-left: 4px solid #ff9900 !important; }
    .priority-urgent { border-left: 4px solid #cc0000 !important; }
    
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(contactStyles);