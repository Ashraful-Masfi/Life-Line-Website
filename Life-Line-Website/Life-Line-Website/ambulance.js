// Ambulance Tracking System JavaScript
class AmbulanceTracker {
    constructor() {
        this.currentAmbulance = null;
        this.trackingInterval = null;
        this.statusIndex = 0;
        this.statusTimes = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeMap();
        this.setCurrentDateTime();
    }

    setupEventListeners() {
        // Ambulance request form
        const ambulanceForm = document.getElementById('ambulanceForm');
        if (ambulanceForm) {
            ambulanceForm.addEventListener('submit', (e) => this.handleAmbulanceRequest(e));
        }

        // Emergency call button
        const emergencyBtn = document.querySelector('.emergency-btn');
        if (emergencyBtn) {
            emergencyBtn.addEventListener('click', () => this.callEmergency());
        }
    }

    initializeMap() {
        // Simple map simulation - in real implementation, you would use Google Maps or Leaflet
        const mapElement = document.getElementById('trackingMap');
        if (mapElement) {
            // This would be replaced with actual map initialization
            console.log('Map initialized');
        }
    }

    setCurrentDateTime() {
        const now = new Date();
        const requestTimeElement = document.getElementById('requestTime');
        if (requestTimeElement) {
            requestTimeElement.textContent = now.toLocaleTimeString();
        }
    }

    handleAmbulanceRequest(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            patientName: document.getElementById('patientName').value,
            emergencyType: document.getElementById('emergencyType').value,
            patientCondition: document.getElementById('patientCondition').value,
            pickupLocation: document.getElementById('pickupLocation').value,
            hospitalPreference: document.getElementById('hospitalPreference').value,
            contactNumber: document.getElementById('contactNumber').value
        };

        // Validate form
        if (!this.validateForm(formData)) {
            this.showAlert('Please fill all required fields correctly!', 'error');
            return;
        }

        // Simulate ambulance assignment
        this.assignAmbulance(formData);
        
        // Show success message
        this.showAlert('Ambulance request received! Tracking has started.', 'success');
    }

    validateForm(formData) {
        const requiredFields = ['patientName', 'emergencyType', 'patientCondition', 'pickupLocation', 'contactNumber'];
        
        for (let field of requiredFields) {
            if (!formData[field] || formData[field].trim() === '') {
                return false;
            }
        }

        // Validate phone number (Bangladeshi format)
        const phoneRegex = /^(?:\+88|01)?\d{11}$/;
        if (!phoneRegex.test(formData.contactNumber.replace(/\s/g, ''))) {
            return false;
        }

        return true;
    }

    assignAmbulance(formData) {
        // Simulate finding nearest available ambulance
        const ambulances = this.getAvailableAmbulances();
        const nearestAmbulance = ambulances[0]; // In real app, calculate based on location
        
        this.currentAmbulance = {
            ...nearestAmbulance,
            ...formData,
            requestTime: new Date(),
            status: 'request_received'
        };

        // Update UI with ambulance details
        this.updateAmbulanceInfo();
        
        // Start tracking simulation
        this.startTracking();
        
        // Update status timeline
        this.updateStatusTimeline('request_received');
    }

    getAvailableAmbulances() {
        // Mock data - in real app, this would come from backend
        return [
            {
                id: 'AMB-001',
                number: 'DHA-AMB-1234',
                driverName: 'Abdul Karim',
                driverContact: '+8801712345678',
                type: 'AC Ambulance',
                equipment: ['Oxygen', 'First Aid', 'Stretcher'],
                currentLocation: 'Gulshan 1',
                eta: '8-12 minutes'
            },
            {
                id: 'AMB-002',
                number: 'DHA-AMB-5678',
                driverName: 'Mohammad Ali',
                driverContact: '+8801812345678',
                type: 'ICU Ambulance',
                equipment: ['Ventilator', 'Monitor', 'Oxygen'],
                currentLocation: 'Banani',
                eta: '10-15 minutes'
            }
        ];
    }

    updateAmbulanceInfo() {
        if (!this.currentAmbulance) return;

        document.getElementById('ambulanceNumber').textContent = this.currentAmbulance.number;
        document.getElementById('driverName').textContent = this.currentAmbulance.driverName;
        document.getElementById('driverContact').textContent = this.currentAmbulance.driverContact;
        document.getElementById('eta').textContent = this.currentAmbulance.eta;
    }

    startTracking() {
        // Clear any existing interval
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
        }

        // Start new tracking simulation
        this.trackingInterval = setInterval(() => {
            this.simulateAmbulanceMovement();
        }, 5000); // Update every 5 seconds

        // Update map placeholder
        this.updateMapDisplay();
    }

    simulateAmbulanceMovement() {
        if (!this.currentAmbulance) return;

        const statuses = [
            'request_received',
            'ambulance_dispatched',
            'on_the_way',
            'arrived_at_location',
            'heading_to_hospital',
            'arrived_at_hospital'
        ];

        // Move to next status
        this.statusIndex++;
        
        if (this.statusIndex >= statuses.length) {
            // Journey completed
            clearInterval(this.trackingInterval);
            this.showAlert('Ambulance has reached the hospital!', 'success');
            return;
        }

        const currentStatus = statuses[this.statusIndex];
        this.currentAmbulance.status = currentStatus;
        
        // Update ETA based on status
        this.updateETA(currentStatus);
        
        // Update status timeline
        this.updateStatusTimeline(currentStatus);
        
        // Update map
        this.updateMapDisplay();
    }

    updateETA(status) {
        const etaElement = document.getElementById('eta');
        if (!etaElement) return;

        const etaMap = {
            'request_received': '8-12 minutes',
            'ambulance_dispatched': '6-10 minutes',
            'on_the_way': '3-5 minutes',
            'arrived_at_location': '0 minutes',
            'heading_to_hospital': '7-10 minutes',
            'arrived_at_hospital': 'Arrived'
        };

        etaElement.textContent = etaMap[status] || 'Calculating...';
    }

    updateStatusTimeline(status) {
        const statusItems = document.querySelectorAll('.status-item');
        const statusTimeElements = document.querySelectorAll('.status-time');
        
        // Reset all statuses
        statusItems.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('completed');
        });

        // Activate current and previous statuses
        for (let i = 0; i <= this.statusIndex; i++) {
            if (statusItems[i]) {
                statusItems[i].classList.add('active');
                
                // Add completed class to previous statuses
                if (i < this.statusIndex) {
                    statusItems[i].classList.add('completed');
                }
                
                // Update time for current status
                if (i === this.statusIndex && statusTimeElements[i]) {
                    const now = new Date();
                    statusTimeElements[i].textContent = now.toLocaleTimeString();
                }
            }
        }
    }

    updateMapDisplay() {
        const mapElement = document.getElementById('trackingMap');
        if (!mapElement) return;

        // In real implementation, this would update actual map coordinates
        const status = this.currentAmbulance?.status || 'no_tracking';
        
        const mapContent = this.generateMapContent(status);
        mapElement.innerHTML = mapContent;
    }

    generateMapContent(status) {
        const statusIcons = {
            'request_received': '📍',
            'ambulance_dispatched': '🚑',
            'on_the_way': '🚑 →',
            'arrived_at_location': '✅',
            'heading_to_hospital': '🏥',
            'arrived_at_hospital': '🎉'
        };

        const statusMessages = {
            'request_received': 'Ambulance request received. Searching for nearest available ambulance...',
            'ambulance_dispatched': 'Ambulance dispatched! Driver is on the way to pickup location.',
            'on_the_way': 'Ambulance is on the way to your location. ETA: 3-5 minutes',
            'arrived_at_location': 'Ambulance has arrived at your location!',
            'heading_to_hospital': 'Patient picked up. Heading to hospital...',
            'arrived_at_hospital': 'Ambulance has arrived at the hospital!',
            'no_tracking': 'Ambulance location will appear here after request'
        };

        const icon = statusIcons[status] || '🗺️';
        const message = statusMessages[status] || statusMessages['no_tracking'];

        return `
            <div class="map-placeholder">
                <div class="map-icon" style="font-size: 4rem; animation: pulse 2s infinite;">${icon}</div>
                <h4>Live Tracking - ${this.getStatusText(status)}</h4>
                <p>${message}</p>
                ${status !== 'no_tracking' ? `
                    <div class="tracking-details">
                        <div class="detail-item">
                            <strong>Ambulance:</strong> ${this.currentAmbulance?.number || 'N/A'}
                        </div>
                        <div class="detail-item">
                            <strong>Driver:</strong> ${this.currentAmbulance?.driverName || 'N/A'}
                        </div>
                        <div class="detail-item">
                            <strong>Contact:</strong> ${this.currentAmbulance?.driverContact || 'N/A'}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    getStatusText(status) {
        const statusTexts = {
            'request_received': 'Request Received',
            'ambulance_dispatched': 'Ambulance Dispatched',
            'on_the_way': 'On the Way',
            'arrived_at_location': 'Arrived at Location',
            'heading_to_hospital': 'Going to Hospital',
            'arrived_at_hospital': 'Arrived at Hospital'
        };

        return statusTexts[status] || 'Live Tracking';
    }

    callEmergency() {
        // Show emergency call confirmation
        this.showAlert('Calling Emergency: 999\nPlease stay on the line...', 'emergency');
        
        // Simulate emergency call process
        setTimeout(() => {
            this.showAlert('Emergency services have been notified. Help is on the way!', 'success');
            
            // Auto-fill emergency form
            this.prefillEmergencyForm();
        }, 2000);
    }

    prefillEmergencyForm() {
        // Auto-fill form with emergency data
        document.getElementById('emergencyType').value = 'accident';
        document.getElementById('patientCondition').value = 'Emergency situation - need immediate assistance';
        
        // Focus on location field for user to complete
        document.getElementById('pickupLocation').focus();
    }

    getCurrentLocation() {
        // Show getting location message
        this.showAlert('Getting your current location...', 'info');
        
        // Simulate location detection (in real app, use Geolocation API)
        setTimeout(() => {
            const mockLocations = [
                'Gulshan 1, Dhaka',
                'Banani, Dhaka',
                'Dhanmondi 32, Dhaka',
                'Mirpur 10, Dhaka',
                'Uttara Sector 7, Dhaka'
            ];
            
            const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
            document.getElementById('pickupLocation').value = randomLocation;
            
            this.showAlert(`Location detected: ${randomLocation}`, 'success');
        }, 1500);
    }

    showAlert(message, type = 'info') {
        // Remove existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Create alert element
        const alert = document.createElement('div');
        alert.className = `custom-alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <span class="alert-icon">${this.getAlertIcon(type)}</span>
                <span class="alert-message">${message}</span>
                <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        // Add styles
        this.addAlertStyles();

        // Add to page
        document.body.appendChild(alert);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alert.parentElement) {
                alert.remove();
            }
        }, 5000);
    }

    getAlertIcon(type) {
        const icons = {
            'success': '✅',
            'error': '❌',
            'warning': '⚠️',
            'info': 'ℹ️',
            'emergency': '🚨'
        };
        return icons[type] || 'ℹ️';
    }

    addAlertStyles() {
        if (document.querySelector('#alert-styles')) return;

        const styles = `
            <style id="alert-styles">
                .custom-alert {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    min-width: 300px;
                    max-width: 500px;
                    background: #1a1a1a;
                    border-left: 4px solid #cc0000;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    animation: slideInRight 0.3s ease;
                }

                .alert-success { border-left-color: #00cc66; }
                .alert-error { border-left-color: #cc0000; }
                .alert-warning { border-left-color: #ff9900; }
                .alert-info { border-left-color: #0066cc; }
                .alert-emergency { 
                    border-left-color: #cc0000;
                    background: linear-gradient(135deg, #660000, #cc0000);
                    animation: emergencyFlash 1s infinite;
                }

                .alert-content {
                    padding: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: white;
                }

                .alert-icon {
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }

                .alert-message {
                    flex: 1;
                    line-height: 1.4;
                }

                .alert-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }

                .alert-close:hover {
                    background: rgba(255,255,255,0.1);
                }

                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                @keyframes emergencyFlash {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }

                .tracking-details {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(255,255,255,0.1);
                    border-radius: 8px;
                    text-align: left;
                }

                .detail-item {
                    margin-bottom: 0.5rem;
                    color: #ccc;
                }

                .detail-item:last-child {
                    margin-bottom: 0;
                }

                .status-item.completed .status-dot {
                    background: #00cc66 !important;
                }

                .status-item.completed .status-text {
                    color: #00cc66 !important;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Utility function to format phone numbers
    formatPhoneNumber(phone) {
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return phone;
    }

    // Emergency contact information
    getEmergencyContacts() {
        return {
            'Police': '999',
            'Fire Service': '199',
            'Ambulance': '199',
            'National Emergency Service': '999',
            'Red Crescent': '+880-2-9351265'
        };
    }
}

// Initialize the ambulance tracking system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.ambulanceTracker = new AmbulanceTracker();
});

// Global functions for HTML onclick events
function callEmergency() {
    if (window.ambulanceTracker) {
        window.ambulanceTracker.callEmergency();
    }
}

function getCurrentLocation() {
    if (window.ambulanceTracker) {
        window.ambulanceTracker.getCurrentLocation();
    }
}

// Add some utility functions for the tracking system
function simulateEmergencyTest() {
    // This function can be called from browser console for testing
    const testData = {
        patientName: 'Test Patient',
        emergencyType: 'heart-attack',
        patientCondition: 'Chest pain and breathing difficulty',
        pickupLocation: 'Gulshan 1, Dhaka',
        hospitalPreference: 'dmch',
        contactNumber: '+8801712345678'
    };

    // Auto-fill form
    document.getElementById('patientName').value = testData.patientName;
    document.getElementById('emergencyType').value = testData.emergencyType;
    document.getElementById('patientCondition').value = testData.patientCondition;
    document.getElementById('pickupLocation').value = testData.pickupLocation;
    document.getElementById('hospitalPreference').value = testData.hospitalPreference;
    document.getElementById('contactNumber').value = testData.contactNumber;

    console.log('Test data filled. You can now submit the form to test tracking.');
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AmbulanceTracker;
}