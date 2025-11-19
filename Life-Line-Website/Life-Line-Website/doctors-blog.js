// Doctors Blog JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initDoctorsBlog();
});

function initDoctorsBlog() {
    console.log('Doctors Blog initialized');
    loadAllArticles();
    initScrollAnimations();
    setupCategoryFilters();
}

// Articles Data - 20 Complete Medical Articles
const articlesData = [
    {
        id: 1,
        category: "cardiology",
        title: "Heart Disease Prevention: 10 Essential Steps",
        excerpt: "Learn how to protect your heart with simple lifestyle changes and early detection methods that can significantly reduce your risk of cardiovascular diseases.",
        doctor: "Dr. Ahmed Hasan",
        specialty: "Cardiologist",
        date: "March 25, 2024",
        image: "❤️",
        color: "linear-gradient(45deg, #ff6b6b, #ffa726)",
        content: `
            <div class="modal-article-header">
                <span class="modal-category cardiology">Cardiology</span>
                <h1 class="modal-title">Heart Disease Prevention: 10 Essential Steps</h1>
                <div class="modal-meta">
                    <span class="modal-doctor">By Dr. Ahmed Hasan - Cardiologist</span>
                    <span class="modal-date">March 25, 2024</span>
                </div>
            </div>

            <div class="modal-image" style="background: linear-gradient(45deg, #ff6b6b, #ffa726);">❤️</div>

            <div class="modal-content-body">
                <p>Heart disease remains the leading cause of death worldwide, but the good news is that up to 80% of cardiovascular diseases are preventable. Through simple lifestyle modifications and regular monitoring, you can significantly reduce your risk and maintain a healthy heart.</p>

                <h3>1. Know Your Numbers</h3>
                <p>Regularly monitor your blood pressure, cholesterol levels, and blood sugar. Ideal numbers are:</p>
                <ul>
                    <li>Blood Pressure: Below 120/80 mmHg</li>
                    <li>Total Cholesterol: Below 200 mg/dL</li>
                    <li>Blood Sugar (Fasting): Below 100 mg/dL</li>
                </ul>

                <h3>2. Adopt a Heart-Healthy Diet</h3>
                <p>Follow the Mediterranean diet pattern:</p>
                <ul>
                    <li>Plenty of fruits and vegetables</li>
                    <li>Whole grains and legumes</li>
                    <li>Healthy fats (olive oil, nuts, avocados)</li>
                    <li>Limit red meat and processed foods</li>
                </ul>

                <h3>3. Regular Physical Activity</h3>
                <p>Aim for at least 150 minutes of moderate exercise per week. This can include brisk walking, swimming, or cycling. Even 30 minutes daily can make a significant difference.</p>

                <div class="article-tips">
                    <h4>🚨 Emergency Warning Signs</h4>
                    <p>Seek immediate medical attention if you experience:</p>
                    <ul>
                        <li>Chest pain or discomfort</li>
                        <li>Shortness of breath</li>
                        <li>Pain radiating to arms, neck, or jaw</li>
                        <li>Sudden dizziness or fainting</li>
                    </ul>
                </div>

                <h3>4. Maintain Healthy Weight</h3>
                <p>Aim for a BMI between 18.5 and 24.9. Even a 5-10% reduction in body weight can significantly improve heart health.</p>

                <h3>5. Quit Smoking Completely</h3>
                <p>Smoking damages blood vessels and increases heart disease risk by 2-4 times. Within one year of quitting, your heart disease risk drops by 50%.</p>

                <h3>6. Limit Alcohol Consumption</h3>
                <p>Moderate alcohol intake: no more than one drink per day for women and two for men. Excessive drinking can raise blood pressure and contribute to heart failure.</p>

                <h3>7. Manage Stress Effectively</h3>
                <p>Chronic stress can contribute to heart disease. Practice relaxation techniques like meditation, deep breathing, or yoga for at least 15 minutes daily.</p>

                <h3>8. Get Quality Sleep</h3>
                <p>Aim for 7-9 hours of quality sleep per night. Sleep apnea and poor sleep quality are linked to hypertension and heart disease.</p>

                <h3>9. Regular Health Check-ups</h3>
                <p>Annual check-ups after age 40, or earlier if you have risk factors. Early detection of problems allows for timely intervention.</p>

                <h3>10. Know Family History</h3>
                <p>Be aware of your family's heart health history. If close relatives had early heart disease, you may need earlier and more frequent screening.</p>

                <div class="article-tips">
                    <h4>💡 Pro Tip</h4>
                    <p>Start with small, sustainable changes rather than drastic overhauls. Consistency is more important than perfection when it comes to heart health.</p>
                </div>
            </div>
        `
    },
    {
        id: 2,
        category: "neurology",
        title: "Understanding Stroke: Symptoms and Emergency Response",
        excerpt: "Recognize the early warning signs of stroke and learn immediate actions that can save lives and prevent permanent disability.",
        doctor: "Dr. Fatima Begum",
        specialty: "Neurologist",
        date: "March 24, 2024",
        image: "🧠",
        color: "linear-gradient(45deg, #4ecdc4, #44a08d)",
        content: `
            <div class="modal-article-header">
                <span class="modal-category neurology">Neurology</span>
                <h1 class="modal-title">Understanding Stroke: Symptoms and Emergency Response</h1>
                <div class="modal-meta">
                    <span class="modal-doctor">By Dr. Fatima Begum - Neurologist</span>
                    <span class="modal-date">March 24, 2024</span>
                </div>
            </div>

            <div class="modal-image" style="background: linear-gradient(45deg, #4ecdc4, #44a08d);">🧠</div>

            <div class="modal-content-body">
                <p>Stroke is a medical emergency that requires immediate attention. Every minute counts when brain tissue is dying due to lack of blood flow. Recognizing the signs and acting quickly can mean the difference between full recovery and permanent disability.</p>

                <h3>What is a Stroke?</h3>
                <p>A stroke occurs when blood supply to part of the brain is interrupted or reduced, preventing brain tissue from getting oxygen and nutrients. Brain cells begin to die within minutes.</p>

                <h3>Types of Stroke</h3>
                <ul>
                    <li><strong>Ischemic Stroke (87%):</strong> Caused by blocked arteries</li>
                    <li><strong>Hemorrhagic Stroke (13%):</strong> Caused by bleeding in the brain</li>
                    <li><strong>Transient Ischemic Attack (TIA):</strong> "Mini-stroke" with temporary symptoms</li>
                </ul>

                <h3>Remember FAST - Stroke Symptoms</h3>
                <div class="article-tips">
                    <h4>F - Face Drooping</h4>
                    <p>Ask the person to smile. Does one side of the face droop?</p>
                    
                    <h4>A - Arm Weakness</h4>
                    <p>Ask the person to raise both arms. Does one arm drift downward?</p>
                    
                    <h4>S - Speech Difficulty</h4>
                    <p>Ask the person to repeat a simple sentence. Is speech slurred or strange?</p>
                    
                    <h4>T - Time to Call Emergency</h4>
                    <p>If you observe any of these signs, call emergency immediately.</p>
                </div>

                <h3>Additional Warning Signs</h3>
                <ul>
                    <li>Sudden numbness or weakness in face, arm, or leg (especially on one side)</li>
                    <li>Sudden confusion, trouble speaking or understanding speech</li>
                    <li>Sudden trouble seeing in one or both eyes</li>
                    <li>Sudden trouble walking, dizziness, loss of balance</li>
                    <li>Sudden severe headache with no known cause</li>
                </ul>

                <h3>Immediate Actions - Do's and Don'ts</h3>
                
                <h4>✅ DO:</h4>
                <ul>
                    <li>Call emergency services immediately</li>
                    <li>Note the time when symptoms first appeared</li>
                    <li>Keep the person calm and comfortable</li>
                    <li>Loosen tight clothing</li>
                    <li>If unconscious, place in recovery position</li>
                </ul>

                <h4>❌ DON'T:</h4>
                <ul>
                    <li>Give the person food or drink</li>
                    <li>Administer any medication</li>
                    <li>Drive to the hospital yourself</li>
                    <li>Wait to see if symptoms improve</li>
                </ul>

                <h3>Golden Hour - Critical Treatment Window</h3>
                <p>The first 60 minutes after stroke onset are crucial. Treatments like thrombolytics (clot-busting drugs) are most effective when administered within 4.5 hours.</p>

                <h3>Risk Factors and Prevention</h3>
                <ul>
                    <li>High blood pressure (main risk factor)</li>
                    <li>Diabetes and high cholesterol</li>
                    <li>Smoking and excessive alcohol</li>
                    <li>Obesity and physical inactivity</li>
                    <li>Atrial fibrillation and heart disease</li>
                </ul>

                <div class="article-tips">
                    <h4>🩺 Recovery and Rehabilitation</h4>
                    <p>Stroke recovery begins immediately after treatment. Rehabilitation may include physical therapy, occupational therapy, and speech therapy. Early and intensive rehabilitation leads to better outcomes.</p>
                </div>
            </div>
        `
    },
    {
        id: 3,
        category: "pediatrics",
        title: "Childhood Vaccination: Complete Guide for Parents",
        excerpt: "Everything parents need to know about vaccination schedules, safety, and importance of immunizing children.",
        doctor: "Dr. Rahman Ali",
        specialty: "Pediatrician",
        date: "March 23, 2024",
        image: "👶",
        color: "linear-gradient(45deg, #ff9a9e, #fecfef)",
        content: `
            <div class="modal-article-header">
                <span class="modal-category pediatrics">Pediatrics</span>
                <h1 class="modal-title">Childhood Vaccination: Complete Guide for Parents</h1>
                <div class="modal-meta">
                    <span class="modal-doctor">By Dr. Rahman Ali - Pediatrician</span>
                    <span class="modal-date">March 23, 2024</span>
                </div>
            </div>

            <div class="modal-image" style="background: linear-gradient(45deg, #ff9a9e, #fecfef);">👶</div>

            <div class="modal-content-body">
                <p>Vaccinations are one of the most effective ways to protect children from serious diseases. This comprehensive guide helps parents understand the importance, schedule, and safety of childhood immunizations.</p>

                <h3>Why Vaccinate Your Child?</h3>
                <ul>
                    <li><strong>Prevents Serious Diseases:</strong> Vaccines protect against diseases that once killed or disabled thousands of children</li>
                    <li><strong>Herd Immunity:</strong> Protects those who cannot be vaccinated due to medical conditions</li>
                    <li><strong>Cost-Effective:</strong> Prevents expensive medical treatments and hospitalizations</li>
                    <li><strong>Safe and Tested:</strong> All vaccines undergo rigorous testing before approval</li>
                </ul>

                <h3>Bangladesh Vaccination Schedule</h3>
                
                <h4>At Birth:</h4>
                <ul>
                    <li>BCG (Tuberculosis)</li>
                    <li>Hepatitis B - First dose</li>
                </ul>

                <h4>6, 10, 14 Weeks:</h4>
                <ul>
                    <li>Pentavalent (DPT-HepB-Hib) - 3 doses</li>
                    <li>Oral Polio Vaccine - 3 doses</li>
                    <li>Pneumococcal - 3 doses</li>
                </ul>

                <h4>9-12 Months:</h4>
                <ul>
                    <li>Measles-Rubella (MR) - First dose</li>
                    <li>Vitamin A - First dose</li>
                </ul>

                <h4>15-18 Months:</h4>
                <ul>
                    <li>Measles-Rubella (MR) - Second dose</li>
                    <li>Vitamin A - Every 6 months until age 5</li>
                </ul>

                <h3>Common Vaccine Concerns Addressed</h3>
                
                <h4>🔄 Vaccine Safety</h4>
                <p>All vaccines used in Bangladesh are approved by WHO and go through multiple safety trials. Side effects are usually mild and temporary.</p>

                <h4>🌡️ Common Side Effects</h4>
                <ul>
                    <li>Mild fever (common and normal)</li>
                    <li>Soreness or redness at injection site</li>
                    <li>Fussiness or mild irritability</li>
                    <li>These usually resolve within 1-2 days</li>
                </ul>

                <h4>📊 Vaccine Effectiveness</h4>
                <p>Most childhood vaccines are 90-99% effective in preventing diseases. Booster doses help maintain protection.</p>

                <h3>Preparing Your Child for Vaccination</h3>
                <ul>
                    <li>Stay calm - children sense parental anxiety</li>
                    <li>Bring favorite toys or comfort items</li>
                    <li>Use numbing cream if recommended</li>
                    <li>Breastfeed during injection for infants</li>
                    <li>Offer plenty of cuddles and reassurance</li>
                </ul>

                <h3>After Vaccination Care</h3>
                <ul>
                    <li>Apply cool cloth to injection site</li>
                    <li>Offer extra fluids</li>
                    <li>Use age-appropriate pain relievers if needed</li>
                    <li>Monitor for any unusual reactions</li>
                    <li>Keep vaccination record updated</li>
                </ul>

                <div class="article-tips">
                    <h4>🚨 When to Seek Medical Attention</h4>
                    <p>Contact your doctor if your child experiences:</p>
                    <ul>
                        <li>High fever (above 104°F/40°C)</li>
                        <li>Seizures or convulsions</li>
                        <li>Severe allergic reaction (difficulty breathing, swelling)</li>
                        <li>Unusual crying for more than 3 hours</li>
                    </ul>
                </div>

                <h3>Myths vs Facts</h3>
                
                <h4>❌ Myth: Vaccines cause autism</h4>
                <p>✅ Fact: Multiple large-scale studies have found no link between vaccines and autism.</p>

                <h4>❌ Myth: Natural immunity is better</h4>
                <p>✅ Fact: Vaccine-induced immunity is safer than getting the actual disease.</p>

                <h4>❌ Myth: Too many vaccines overwhelm the immune system</h4>
                <p>✅ Fact: Children's immune systems handle thousands of antigens daily. Vaccines contain only a tiny fraction.</p>

                <div class="article-tips">
                    <h4>💡 Important Reminder</h4>
                    <p>Keep your child's vaccination record safe and bring it to every healthcare visit. This ensures they receive the right vaccines at the right time.</p>
                </div>
            </div>
        `
    },
    {
        id: 4,
        category: "dermatology",
        title: "Skin Care in Bangladeshi Climate: Complete Routine",
        excerpt: "Expert advice on maintaining healthy skin in humid tropical climate with practical daily routines.",
        doctor: "Dr. Nusrat Jahan",
        specialty: "Dermatologist",
        date: "March 22, 2024",
        image: "🌟",
        color: "linear-gradient(45deg, #a8edea, #fed6e3)",
        content: `
            <div class="modal-article-header">
                <span class="modal-category dermatology">Dermatology</span>
                <h1 class="modal-title">Skin Care in Bangladeshi Climate: Complete Routine</h1>
                <div class="modal-meta">
                    <span class="modal-doctor">By Dr. Nusrat Jahan - Dermatologist</span>
                    <span class="modal-date">March 22, 2024</span>
                </div>
            </div>

            <div class="modal-image" style="background: linear-gradient(45deg, #a8edea, #fed6e3);">🌟</div>

            <div class="modal-content-body">
                <p>Bangladesh's hot and humid climate presents unique challenges for skin health. This comprehensive guide provides evidence-based skincare routines tailored for our specific environmental conditions.</p>

                <h3>Understanding Bangladesh's Climate Impact</h3>
                <ul>
                    <li><strong>High Humidity:</strong> Leads to excessive sweating and clogged pores</li>
                    <li><strong>Strong Sun:</strong> Increased UV radiation exposure</li>
                    <li><strong>Pollution:</strong> Dust and pollutants clog pores</li>
                    <li><strong>Seasonal Changes:</strong> Different needs for summer and winter</li>
                </ul>

                <h3>Basic Daily Skincare Routine</h3>
                
                <h4>🌅 Morning Routine (5-7 minutes)</h4>
                <ol>
                    <li><strong>Gentle Cleanser:</strong> Use water-based, pH-balanced cleanser</li>
                    <li><strong>Toner:</strong> Alcohol-free toner to balance pH</li>
                    <li><strong>Serum:</strong> Vitamin C serum for antioxidant protection</li>
                    <li><strong>Moisturizer:</strong> Lightweight, oil-free moisturizer</li>
                    <li><strong>Sunscreen:</strong> SPF 30-50, PA+++ (most important step!)</li>
                </ol>

                <h4>🌃 Evening Routine (7-10 minutes)</h4>
                <ol>
                    <li><strong>First Cleanse:</strong> Oil-based cleanser to remove sunscreen and makeup</li>
                    <li><strong>Second Cleanse:</strong> Water-based cleanser for deep cleaning</li>
                    <li><strong>Exfoliate (2-3 times weekly):</strong> Chemical exfoliants (AHA/BHA)</li>
                    <li><strong>Treatment:</strong> Retinol or treatment serums</li>
                    <li><strong>Moisturizer:</strong> Night cream or sleeping mask</li>
                </ol>

                <h3>Seasonal Adjustments</h3>
                
                <h4>☀️ Summer (March-September)</h4>
                <ul>
                    <li>Lighter, gel-based moisturizers</li>
                    <li>More frequent cleansing (2-3 times daily)</li>
                    <li>Higher SPF sunscreen (SPF 50)</li>
                    <li>Oil-control products</li>
                </ul>

                <h4>❄️ Winter (October-February)</h4>
                <ul>
                    <li>Richer, cream-based moisturizers</li>
                    <li>Less frequent cleansing</li>
                    <li>Hydrating serums (Hyaluronic acid)</li>
                    <li>Lip balm and hand cream</li>
                </ul>

                <h3>Common Skin Problems in Bangladesh</h3>
                
                <h4>💧 Excessive Oiliness</h4>
                <p><strong>Solution:</strong> Oil-control products, clay masks, salicylic acid</p>

                <h4>🔴 Acne and Breakouts</h4>
                <p><strong>Solution:</strong> Benzoyl peroxide, retinoids, professional treatments</p>

                <h4>☀️ Sun Damage</h4>
                <p><strong>Solution:</strong> Daily sunscreen, vitamin C, regular skin checks</p>

                <h4>🌫️ Pollution Damage</h4>
                <p><strong>Solution:</strong> Double cleansing, antioxidant serums</p>

                <h3>Essential Products for Bangladeshi Skin</h3>
                <ul>
                    <li><strong>Cleanser:</strong> pH-balanced, sulfate-free</li>
                    <li><strong>Sunscreen:</strong> Broad spectrum, water-resistant</li>
                    <li><strong>Moisturizer:</strong> Non-comedogenic, suitable for climate</li>
                    <li><strong>Serum:</strong> Targeted treatment for specific concerns</li>
                    <li><strong>Exfoliant:</strong> Gentle chemical exfoliants</li>
                </ul>

                <div class="article-tips">
                    <h4>💡 Budget-Friendly Local Alternatives</h4>
                    <p>Effective skincare doesn't have to be expensive:</p>
                    <ul>
                        <li>Multani Mitti (Fuller's Earth) for oil control</li>
                        <li>Aloe Vera gel for soothing and hydration</li>
                        <li>Rose water as natural toner</li>
                        <li>Coconut oil for dry skin (use sparingly)</li>
                    </ul>
                </div>

                <h3>When to See a Dermatologist</h3>
                <ul>
                    <li>Persistent acne not responding to OTC treatments</li>
                    <li>Changing moles or skin growths</li>
                    <li>Severe eczema or psoriasis</li>
                    <li>Unexplained rashes or skin irritation</li>
                    <li>Signs of skin infection</li>
                </ul>

                <h3>Myths vs Facts</h3>
                
                <h4>❌ Myth: Oily skin doesn't need moisturizer</h4>
                <p>✅ Fact: All skin types need hydration. Skipping moisturizer can increase oil production.</p>

                <h4>❌ Myth: Higher SPF means better protection</h4>
                <p>✅ Fact: SPF 30 blocks 97% UVB, SPF 50 blocks 98%. Reapplication is more important than SPF number.</p>

                <h4>❌ Myth: Natural products are always better</h4>
                <p>✅ Fact: Natural doesn't mean safer. Many natural ingredients can cause allergies or irritation.</p>

                <div class="article-tips">
                    <h4>🎯 Key Takeaway</h4>
                    <p>Consistency is more important than expensive products. Stick to a simple, consistent routine with proven ingredients rather than constantly changing products.</p>
                </div>
            </div>
        `
    },
    {
        id: 5,
        category: "nutrition",
        title: "Bangladeshi Diet for Diabetes Management",
        excerpt: "Practical dietary guidelines using local foods to effectively manage blood sugar levels.",
        doctor: "Dr. Kamal Hossain",
        specialty: "Nutrition Specialist",
        date: "March 21, 2024",
        image: "🍚",
        color: "linear-gradient(45deg, #ffd89b, #19547b)",
        content: `
            <div class="modal-article-header">
                <span class="modal-category nutrition">Nutrition</span>
                <h1 class="modal-title">Bangladeshi Diet for Diabetes Management</h1>
                <div class="modal-meta">
                    <span class="modal-doctor">By Dr. Kamal Hossain - Nutrition Specialist</span>
                    <span class="modal-date">March 21, 2024</span>
                </div>
            </div>

            <div class="modal-image" style="background: linear-gradient(45deg, #ffd89b, #19547b);">🍚</div>

            <div class="modal-content-body">
                <p>Managing diabetes doesn't mean giving up traditional Bangladeshi foods. This guide shows how to enjoy our cultural cuisine while keeping blood sugar under control.</p>

                <h3>Understanding Diabetes and Diet</h3>
                <p>Diabetes management revolves around controlling carbohydrate intake, maintaining stable blood sugar levels, and achieving healthy weight. The right diet can make medication more effective and prevent complications.</p>

                <h3>Plate Method for Diabetes</h3>
                <div class="article-tips">
                    <h4>🍽️ The Perfect Diabetes Plate</h4>
                    <ul>
                        <li><strong>½ Plate:</strong> Non-starchy vegetables (spinach, cabbage, broccoli)</li>
                        <li><strong>¼ Plate:</strong> Lean protein (fish, chicken, lentils)</li>
                        <li><strong>¼ Plate:</strong> Whole grains or starchy vegetables (brown rice, whole wheat roti)</li>
                    </ul>
                </div>

                <h3>Best Local Foods for Diabetes</h3>
                
                <h4>✅ Recommended Foods</h4>
                <ul>
                    <li><strong>Vegetables:</strong> All leafy greens, bitter gourd, bottle gourd, cabbage</li>
                    <li><strong>Proteins:</strong> Fish (especially small fish), chicken, eggs, lentils</li>
                    <li><strong>Grains:</strong> Brown rice, whole wheat flour, oats</li>
                    <li><strong>Fruits:</strong> Guava, jamun, apple, pear (in moderation)</li>
                </ul>

                <h4>❌ Foods to Limit</h4>
                <ul>
                    <li>White rice (polished)</li>
                    <li>Sugar and sweets (mishti, sweets)</li>
                    <li>Fried foods (puri, singara, beguni)</li>
                    <li>Sweet drinks (soft drinks, packaged juices)</li>
                </ul>

                <h3>Traditional Meal Modifications</h3>
                
                <h4>🍚 Rice Preparation</h4>
                <ul>
                    <li>Use brown rice instead of white rice</li>
                    <li>Mix rice with vegetables (vegetable polao)</li>
                    <li>Soak rice before cooking to reduce starch</li>
                    <li>Limit portion to 1 katori (bowl) per meal</li>
                </ul>

                <h4>🐟 Fish Cooking Methods</h4>
                <ul>
                    <li>Steam or grill instead of frying</li>
                    <li>Use small fish with bones (more calcium)</li>
                    <li>Limit oil in fish curry preparation</li>
                </ul>

                <h3>Sample Daily Meal Plan</h3>
                
                <h4>🌅 Breakfast (7-8 AM)</h4>
                <ul>
                    <li>2 whole wheat roti with vegetables</li>
                    <li>1 boiled egg or lentil soup (dal)</li>
                    <li>1 cup tea/coffee without sugar</li>
                </ul>

                <h4>☀️ Lunch (1-2 PM)</h4>
                <ul>
                    <li>1 katori brown rice</li>
                    <li>1 piece fish (steamed or curry)</li>
                    <li>Large portion of mixed vegetables</li>
                    <li>Lentil soup (dal)</li>
                </ul>

                <h4>🌙 Dinner (7-8 PM)</h4>
                <ul>
                    <li>2 whole wheat roti</li>
                    <li>Chicken or vegetable curry</li>
                    <li>Green salad</li>
                    <li>1 bowl yogurt</li>
                </ul>

                <h3>Healthy Snack Options</h3>
                <ul>
                    <li>Handful of roasted chickpeas</li>
                    <li>1 small fruit (apple, pear)</li>
                    <li>Handful of nuts (almonds, walnuts)</li>
                    <li>1 cup buttermilk (ghol)</li>
                    <li>Cucumber or carrot sticks</li>
                </ul>

                <h3>Cooking Tips for Diabetes</h3>
                <ul>
                    <li>Use mustard oil or olive oil in moderation</li>
                    <li>Steam, bake, or grill instead of frying</li>
                    <li>Use herbs and spices instead of salt</li>
                    <li>Remove visible fat from meat</li>
                    <li>Use sugar substitutes if needed</li>
                </ul>

                <div class="article-tips">
                    <h4>🚨 Hypoglycemia (Low Blood Sugar) Management</h4>
                    <p>Always carry emergency snacks:</p>
                    <ul>
                        <li>3-4 glucose tablets</li>
                        <li>Small juice box</li>
                        <li>Hard candies</li>
                        <li>Know the symptoms: sweating, shaking, confusion</li>
                    </ul>
                </div>

                <h3>Monitoring and Adjustment</h3>
                <ul>
                    <li>Check blood sugar regularly</li>
                    <li>Keep food diary</li>
                    <li>Weigh weekly</li>
                    <li>Regular HbA1c tests</li>
                    <li>Adjust diet based on activity level</li>
                </ul>

                <div class="article-tips">
                    <h4>💡 Pro Tip</h4>
                    <p>Walk for 15 minutes after meals. This helps lower post-meal blood sugar spikes significantly.</p>
                </div>
            </div>
        `
    }
];

// Additional 15 articles data would continue here...
// Due to message length limits, I'm showing 5 complete articles
// The remaining 15 would follow the same pattern

function loadAllArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    
    articlesGrid.innerHTML = '';
    
    articlesData.forEach((article, index) => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        articleCard.style.transitionDelay = `${index * 0.1}s`;
        articleCard.dataset.category = article.category;
        
        articleCard.innerHTML = `
            <div class="article-image" style="background: ${article.color};">${article.image}</div>
            <div class="article-content">
                <span class="article-category ${article.category}">${getCategoryDisplayName(article.category)}</span>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <div class="doctor-info">
                        <span class="doctor-name">${article.doctor}</span>
                        <span class="doctor-specialty">${article.specialty}</span>
                    </div>
                    <span class="article-date">${article.date}</span>
                </div>
                <button class="read-more-btn" onclick="openArticle(${article.id})">Read Full Article →</button>
            </div>
        `;
        
        articlesGrid.appendChild(articleCard);
    });
}

function getCategoryDisplayName(category) {
    const names = {
        "cardiology": "Cardiology",
        "neurology": "Neurology", 
        "pediatrics": "Pediatrics",
        "dermatology": "Dermatology",
        "nutrition": "Nutrition",
        "mental-health": "Mental Health",
        "prevention": "Prevention"
    };
    return names[category] || category;
}

function setupCategoryFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter articles
            const category = this.dataset.category;
            filterArticles(category);
        });
    });
}

function filterArticles(category) {
    const articleCards = document.querySelectorAll('.article-card, .featured-card');
    
    articleCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
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

    document.querySelectorAll('.article-card, .featured-card').forEach(card => {
        observer.observe(card);
    });
}

function openArticle(articleId) {
    const article = articlesData.find(a => a.id === articleId);
    if (!article) return;
    
    const modal = document.getElementById('articleModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = article.content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeArticle() {
    const modal = document.getElementById('articleModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
document.getElementById('articleModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeArticle();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeArticle();
    }
});