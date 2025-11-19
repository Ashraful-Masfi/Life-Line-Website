// Health Status Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize health status page
    initHealthStatusPage();
    
    // Setup form submission
    const healthForm = document.getElementById('healthForm');
    if (healthForm) {
        healthForm.addEventListener('submit', handleHealthFormSubmit);
    }
});

function initHealthStatusPage() {
    console.log('Health Status page initialized');
    
    // Add input validation
    setupInputValidation();
}

function setupInputValidation() {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.validity.rangeOverflow) {
                this.setCustomValidity('Value is too high');
            } else if (this.validity.rangeUnderflow) {
                this.setCustomValidity('Value is too low');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

function handleHealthFormSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const bloodGroup = document.getElementById('bloodGroup').value;
    const activityLevel = parseFloat(document.getElementById('activity').value);
    
    // Validate inputs
    if (!age || !gender || !weight || !height || !activityLevel) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Calculate health metrics
    const bmi = calculateBMI(weight, height);
    const bmr = calculateBMR(weight, height, age, gender);
    const dailyCalories = calculateDailyCalories(bmr, activityLevel);
    
    // Display results
    displayResults(bmi, bmr, dailyCalories, bloodGroup);
    
    // Show results container
    document.getElementById('resultsContainer').style.display = 'block';
    document.getElementById('placeholderContainer').style.display = 'none';
}

function calculateBMI(weight, height) {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

function calculateBMR(weight, height, age, gender) {
    // Mifflin-St Jeor Equation
    if (gender === 'male') {
        return Math.round(10 * weight + 6.25 * height - 5 * age + 5);
    } else {
        return Math.round(10 * weight + 6.25 * height - 5 * age - 161);
    }
}

function calculateDailyCalories(bmr, activityLevel) {
    return Math.round(bmr * activityLevel);
}

function displayResults(bmi, bmr, dailyCalories, bloodGroup) {
    // Display BMI
    document.getElementById('bmiValue').textContent = bmi;
    const bmiCategory = getBMICategory(bmi);
    document.getElementById('bmiCategory').textContent = bmiCategory;
    document.getElementById('bmiCategory').className = `result-category ${bmiCategory.toLowerCase()}`;
    
    // Display BMR and Calories
    document.getElementById('bmrValue').textContent = bmr.toLocaleString();
    document.getElementById('caloriesValue').textContent = dailyCalories.toLocaleString();
    
    // Display health tips
    displayHealthTips(bmi, bmiCategory, bloodGroup);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

function displayHealthTips(bmi, bmiCategory, bloodGroup) {
    const tipsContainer = document.getElementById('healthTips');
    tipsContainer.innerHTML = '';
    
    let tips = [];
    
    // BMI-based tips
    switch (bmiCategory) {
        case 'Underweight':
            tips.push({
                type: 'warning',
                message: 'Consider increasing calorie intake with nutrient-dense foods'
            });
            tips.push({
                type: 'positive',
                message: 'Include protein-rich foods and strength training to build muscle'
            });
            break;
        case 'Normal weight':
            tips.push({
                type: 'positive',
                message: 'Great! Maintain your current weight with balanced diet and regular exercise'
            });
            tips.push({
                type: 'positive',
                message: 'Continue with healthy eating habits and physical activity'
            });
            break;
        case 'Overweight':
            tips.push({
                type: 'warning',
                message: 'Consider moderate weight loss through diet and exercise'
            });
            tips.push({
                type: 'positive',
                message: 'Focus on whole foods and increase daily physical activity'
            });
            break;
        case 'Obese':
            tips.push({
                type: 'warning',
                message: 'Consult with healthcare provider for weight management plan'
            });
            tips.push({
                type: 'positive',
                message: 'Start with small, sustainable changes in diet and activity level'
            });
            break;
    }
    
    // Blood group specific tips (if provided)
    if (bloodGroup) {
        tips.push({
            type: 'positive',
            message: `As blood group ${bloodGroup}, ensure regular health check-ups`
        });
    }
    
    // General health tips
    tips.push({
        type: 'positive',
        message: 'Drink at least 8 glasses of water daily'
    });
    
    tips.push({
        type: 'positive',
        message: 'Aim for 7-9 hours of quality sleep each night'
    });
    
    tips.push({
        type: 'positive',
        message: 'Include 30 minutes of moderate exercise most days'
    });
    
    // Add tips to container
    tips.forEach(tip => {
        const tipElement = document.createElement('div');
        tipElement.className = `tip-item ${tip.type}`;
        tipElement.innerHTML = `
            <strong>💡 Tip:</strong> ${tip.message}
        `;
        tipsContainer.appendChild(tipElement);
    });
}

// Additional Health Tools Functions
function showHeartRateTool() {
    const modal = createToolModal(
        'Heart Rate Monitor',
        '💓',
        `
            <div class="tool-content">
                <p>Check your heart rate by placing two fingers on your wrist or neck.</p>
                <div class="heart-rate-display">
                    <div class="pulse-animation">💗</div>
                    <h4>Normal Resting Heart Rate:</h4>
                    <ul>
                        <li>Adults: 60-100 bpm</li>
                        <li>Athletes: 40-60 bpm</li>
                        <li>Children: 70-100 bpm</li>
                    </ul>
                </div>
            </div>
        `
    );
    document.body.appendChild(modal);
}

function showIdealWeightTool() {
    const height = document.getElementById('height')?.value || 170;
    const idealWeight = calculateIdealWeight(height);
    
    const modal = createToolModal(
        'Ideal Weight Calculator',
        '📏',
        `
            <div class="tool-content">
                <p>Based on your height of ${height}cm:</p>
                <div class="weight-result">
                    <h4>Healthy Weight Range:</h4>
                    <p><strong>${idealWeight.min}kg - ${idealWeight.max}kg</strong></p>
                    <p class="note">This is a general guideline. Individual needs may vary.</p>
                </div>
            </div>
        `
    );
    document.body.appendChild(modal);
}

function showWaterIntakeTool() {
    const weight = document.getElementById('weight')?.value || 70;
    const waterIntake = calculateWaterIntake(weight);
    
    const modal = createToolModal(
        'Water Intake Calculator',
        '💧',
        `
            <div class="tool-content">
                <p>Based on your weight of ${weight}kg:</p>
                <div class="water-result">
                    <h4>Recommended Daily Water:</h4>
                    <p><strong>${waterIntake} liters per day</strong></p>
                    <p class="note">Increase intake during exercise or hot weather</p>
                </div>
            </div>
        `
    );
    document.body.appendChild(modal);
}

function showStepCounterTool() {
    const modal = createToolModal(
        'Step Counter',
        '🚶',
        `
            <div class="tool-content">
                <p>Daily step goals for health:</p>
                <div class="step-goals">
                    <div class="goal-item">
                        <strong>Sedentary:</strong> 5,000 steps
                    </div>
                    <div class="goal-item">
                        <strong>Active:</strong> 7,500 steps
                    </div>
                    <div class="goal-item">
                        <strong>Very Active:</strong> 10,000+ steps
                    </div>
                </div>
                <p class="note">Aim to gradually increase your daily steps</p>
            </div>
        `
    );
    document.body.appendChild(modal);
}

// Helper functions for tools
function calculateIdealWeight(height) {
    // Using BMI range 18.5-24.9
    const heightInMeters = height / 100;
    const minWeight = Math.round(18.5 * heightInMeters * heightInMeters);
    const maxWeight = Math.round(24.9 * heightInMeters * heightInMeters);
    return { min: minWeight, max: maxWeight };
}

function calculateWaterIntake(weight) {
    // 30-35 ml per kg of body weight
    const intake = (weight * 0.033).toFixed(1);
    return intake;
}

function createToolModal(title, icon, content) {
    const modal = document.createElement('div');
    modal.style.cssText = `
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
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 2rem; border-radius: 15px; border: 2px solid var(--health-blue); max-width: 500px; width: 90%;">
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <div style="font-size: 2.5rem;">${icon}</div>
                <h3 style="color: var(--health-blue); margin: 0;">${title}</h3>
            </div>
            ${content}
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="background: var(--health-blue); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer; width: 100%; margin-top: 1.5rem;">
                Close
            </button>
        </div>
    `;
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    return modal;
}

// Add CSS for tool animations
const toolStyles = document.createElement('style');
toolStyles.textContent = `
    .pulse-animation {
        font-size: 3rem;
        animation: heartbeat 1.5s ease-in-out infinite;
        text-align: center;
        margin: 1rem 0;
    }
    
    @keyframes heartbeat {
        0%, 50%, 100% {
            transform: scale(1);
        }
        25%, 75% {
            transform: scale(1.1);
        }
    }
    
    .goal-item, .weight-result, .water-result {
        background: rgba(0, 102, 204, 0.1);
        padding: 1rem;
        border-radius: 8px;
        margin: 0.5rem 0;
        border-left: 4px solid var(--health-blue);
    }
    
    .note {
        font-size: 0.9rem;
        color: #ccc;
        font-style: italic;
        margin-top: 1rem;
    }
`;
document.head.appendChild(toolStyles);