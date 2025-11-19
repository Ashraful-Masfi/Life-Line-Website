// Awareness Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initAwarenessPage();
});

function initAwarenessPage() {
    console.log('Awareness page initialized');
    initScrollAnimations();
    startTipsCarousel();
}

function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.topic-card').forEach(card => {
        observer.observe(card);
    });
}

// Topic details data
const topicDetails = {
    hygiene: {
        title: "Personal Hygiene Practices",
        description: "Maintaining good personal hygiene is essential for preventing the spread of diseases and infections.",
        points: [
            "Wash hands frequently with soap and water for at least 20 seconds",
            "Take daily baths or showers to keep skin clean",
            "Brush teeth twice daily and floss regularly",
            "Keep nails trimmed and clean",
            "Wear clean clothes and change underwear daily",
            "Cover mouth and nose when coughing or sneezing",
            "Avoid touching face with unwashed hands"
        ]
    },
    nutrition: {
        title: "Balanced Nutrition & Healthy Diet",
        description: "A balanced diet provides essential nutrients for optimal health and disease prevention.",
        points: [
            "Eat a variety of fruits and vegetables daily",
            "Include whole grains in your diet",
            "Choose lean protein sources",
            "Limit processed and sugary foods",
            "Stay hydrated with water throughout the day",
            "Control portion sizes to maintain healthy weight",
            "Limit salt and saturated fat intake"
        ]
    },
    exercise: {
        title: "Physical Activity Guidelines",
        description: "Regular exercise improves cardiovascular health, strength, and mental wellbeing.",
        points: [
            "Aim for 150 minutes of moderate exercise weekly",
            "Include strength training twice a week",
            "Take walking breaks if you have a sedentary job",
            "Stretch before and after exercise",
            "Choose activities you enjoy to stay motivated",
            "Gradually increase intensity and duration",
            "Listen to your body and rest when needed"
        ]
    },
    mental: {
        title: "Mental Wellness Strategies",
        description: "Mental health is as important as physical health for overall wellbeing.",
        points: [
            "Practice mindfulness and meditation daily",
            "Maintain social connections with friends and family",
            "Get adequate sleep (7-9 hours per night)",
            "Set realistic goals and priorities",
            "Take breaks and practice self-care",
            "Seek professional help when needed",
            "Limit screen time and social media use"
        ]
    },
    prevention: {
        title: "Disease Prevention Measures",
        description: "Preventive healthcare can significantly reduce the risk of many diseases.",
        points: [
            "Get recommended vaccinations on schedule",
            "Schedule regular health check-ups",
            "Practice safe food handling and preparation",
            "Use mosquito nets and repellents in endemic areas",
            "Avoid close contact with sick individuals",
            "Practice safe sex and use protection",
            "Get screened for common diseases based on age and risk"
        ]
    },
    firstaid: {
        title: "Basic First Aid Knowledge",
        description: "Knowing basic first aid can save lives in emergency situations.",
        points: [
            "Learn CPR and basic life support",
            "Know how to stop bleeding with direct pressure",
            "Learn to recognize signs of stroke and heart attack",
            "Know how to treat burns and scalds",
            "Learn the Heimlich maneuver for choking",
            "Keep a well-stocked first aid kit at home",
            "Know emergency contact numbers"
        ]
    }
};

function showTopicDetail(topic) {
    const detail = topicDetails[topic];
    if (!detail) return;

    const detailContent = document.getElementById('detailContent');
    detailContent.innerHTML = `
        <h2>${detail.title}</h2>
        <p>${detail.description}</p>
        <div class="detail-points">
            ${detail.points.map(point => `
                <div class="detail-point">
                    <strong>✓</strong> ${point}
                </div>
            `).join('')}
        </div>
        <div class="additional-info">
            <h4>Additional Resources:</h4>
            <p>For more detailed information, consult with healthcare professionals or visit authorized health websites.</p>
        </div>
    `;

    document.getElementById('detailSection').style.display = 'block';
    document.querySelector('.topics-section').style.display = 'none';
    
    // Scroll to detail section
    document.getElementById('detailSection').scrollIntoView({ behavior: 'smooth' });
}

function hideTopicDetail() {
    document.getElementById('detailSection').style.display = 'none';
    document.querySelector('.topics-section').style.display = 'block';
    document.querySelector('.topics-section').scrollIntoView({ behavior: 'smooth' });
}

// Tips Carousel
let currentTip = 0;

function startTipsCarousel() {
    setInterval(nextTip, 5000); // Auto-advance every 5 seconds
}

function showTip(index) {
    const tips = document.querySelectorAll('.tip-slide');
    tips.forEach(tip => tip.classList.remove('active'));
    tips[index].classList.add('active');
    currentTip = index;
}

function nextTip() {
    const tips = document.querySelectorAll('.tip-slide');
    currentTip = (currentTip + 1) % tips.length;
    showTip(currentTip);
}

function prevTip() {
    const tips = document.querySelectorAll('.tip-slide');
    currentTip = (currentTip - 1 + tips.length) % tips.length;
    showTip(currentTip);
}