//// Blood Bank Page JavaScript
// document.addEventListener('DOMContentLoaded', function() {
//     // Initialize blood bank page
//     initBloodBankPage();
    
//     // Load blood banks data
//     loadBloodBanks();
    
//     // Setup filter functionality
//     setupBloodFilter();
// });

// function initBloodBankPage() {
//     console.log('Blood Bank page initialized');
    
//     // Add scroll animations
//     initScrollAnimations();
// }

// function loadBloodBanks() {
//     const bloodbanksGrid = document.getElementById('bloodbanksGrid');
    
//     // Sample blood bank data for Bangladesh
//     const bloodBanks = [
//         {
//             name: "Bangladesh Red Crescent Blood Bank",
//             location: "Motijheel, Dhaka",
//             contact: "+880-2-9563851",
//             distance: "2.1 km",
//             inventory: {
//                 "A+": true, "A-": false, "B+": true, "B-": true,
//                 "O+": true, "O-": false, "AB+": true, "AB-": false
//             }
//         },
//         {
//             name: "Dhaka Medical College Blood Bank",
//             location: "Dhaka Medical College, Dhaka",
//             contact: "+880-2-55165010",
//             distance: "2.5 km",
//             inventory: {
//                 "A+": true, "A-": true, "B+": false, "B-": true,
//                 "O+": true, "O-": true, "AB+": false, "AB-": true
//             }
//         },
//         {
//             name: "Square Hospitals Blood Bank",
//             location: "Panthapath, Dhaka",
//             contact: "+880-2-8144401",
//             distance: "4.2 km",
//             inventory: {
//                 "A+": true, "A-": true, "B+": true, "B-": true,
//                 "O+": true, "O-": true, "AB+": true, "AB-": true
//             }
//         },
//         {
//             name: "Apollo Hospitals Blood Center",
//             location: "Bashundhara, Dhaka",
//             contact: "+880-2-8431662",
//             distance: "5.8 km",
//             inventory: {
//                 "A+": true, "A-": false, "B+": true, "B-": false,
//                 "O+": true, "O-": true, "AB+": true, "AB-": false
//             }
//         },
//         {
//             name: "Chittagong Blood Bank",
//             location: "Agrabad, Chittagong",
//             contact: "+880-31-610277",
//             distance: "245 km",
//             inventory: {
//                 "A+": true, "A-": true, "B+": false, "B-": true,
//                 "O+": false, "O-": true, "AB+": true, "AB-": false
//             }
//         },
//         {
//             name: "BIRDEM Hospital Blood Bank",
//             location: "Shahbag, Dhaka",
//             contact: "+880-2-9661551",
//             distance: "3.3 km",
//             inventory: {
//                 "A+": true, "A-": false, "B+": true, "B-": true,
//                 "O+": true, "O-": false, "AB+": false, "AB-": true
//             }
//         }
//     ];
    
//     // Clear existing content
//     bloodbanksGrid.innerHTML = '';
    
//     // Add blood bank cards
//     bloodBanks.forEach((bank, index) => {
//         const bankCard = document.createElement('div');
//         bankCard.className = 'bloodbank-card';
//         bankCard.style.transitionDelay = `${index * 0.1}s`;
//         bankCard.dataset.inventory = JSON.stringify(bank.inventory);
        
//         // Generate blood group HTML
//         const bloodGroupsHTML = Object.entries(bank.inventory).map(([group, available]) => `
//             <div class="blood-group-item ${available ? 'available' : 'unavailable'}" data-group="${group}">
//                 <div class="group-type">${group}</div>
//                 <div class="group-status">${available ? 'Available' : 'Low'}</div>
//             </div>
//         `).join('');
        
//         bankCard.innerHTML = `
//             <div class="distance-badge">${bank.distance}</div>
//             <h3 class="bloodbank-name">${bank.name}</h3>
//             <p class="bloodbank-location">📍 ${bank.location}</p>
            
//             <div class="bloodbank-contact">
//                 <span class="contact-number">${bank.contact}</span>
//             </div>
            
//             <div class="blood-inventory">
//                 <div class="inventory-title">Blood Group Availability:</div>
//                 <div class="blood-groups-grid">
//                     ${bloodGroupsHTML}
//                 </div>
//             </div>
//         `;
        
//         // Add click effect for contact
//         const contactElement = bankCard.querySelector('.bloodbank-contact');
//         contactElement.addEventListener('click', function() {
//             simulateCall(bank.contact, bank.name);
//         });
        
//         bloodbanksGrid.appendChild(bankCard);
//     });
// }

// function setupBloodFilter() {
//     const bloodButtons = document.querySelectorAll('.blood-btn');
    
//     bloodButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // Remove active class from all buttons
//             bloodButtons.forEach(btn => btn.classList.remove('active'));
            
//             // Add active class to clicked button
//             this.classList.add('active');
            
//             // Filter blood banks
//             const selectedGroup = this.dataset.group;
//             filterBloodBanks(selectedGroup);
//         });
//     });
// }

// function filterBloodBanks(bloodGroup) {
//     const bloodbankCards = document.querySelectorAll('.bloodbank-card');
    
//     bloodbankCards.forEach(card => {
//         if (bloodGroup === 'all') {
//             card.style.display = 'block';
//             card.classList.add('animate-in');
//         } else {
//             const inventory = JSON.parse(card.dataset.inventory);
//             if (inventory[bloodGroup]) {
//                 card.style.display = 'block';
//                 card.classList.add('animate-in');
//             } else {
//                 card.style.display = 'none';
//             }
//         }
//     });
// }

// function initScrollAnimations() {
//     const observerOptions = {
//         threshold: 0.1,
//         rootMargin: '0px 0px -50px 0px'
//     };

//     const observer = new IntersectionObserver(function(entries) {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 entry.target.classList.add('animate-in');
//             }
//         });
//     }, observerOptions);

//     // Observe all blood bank cards
//     document.querySelectorAll('.bloodbank-card').forEach(card => {
//         observer.observe(card);
//     });
// }

// function simulateCall(phoneNumber, bankName) {
//     // Create calling modal
//     const callModal = document.createElement('div');
//     callModal.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background: rgba(0, 0, 0, 0.8);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         z-index: 1000;
//         backdrop-filter: blur(10px);
//     `;
    
//     callModal.innerHTML = `
//         <div style="background: #1a1a1a; padding: 2rem; border-radius: 15px; text-align: center; border: 2px solid #cc0000;">
//             <div style="font-size: 4rem; margin-bottom: 1rem;">🩸</div>
//             <h3 style="color: #cc0000; margin-bottom: 1rem;">Calling ${bankName}</h3>
//             <p style="color: #ccc; margin-bottom: 2rem; font-size: 1.2rem;">${phoneNumber}</p>
//             <div style="display: flex; gap: 1rem; justify-content: center;">
//                 <button onclick="this.closest('div').style.display='none'" 
//                         style="background: #cc0000; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
//                     Close
//                 </button>
//                 <button onclick="window.open('tel:${phoneNumber}')" 
//                         style="background: #00cc66; color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; cursor: pointer;">
//                     Open Dialer
//                 </button>
//             </div>
//         </div>
//     `;
    
//     document.body.appendChild(callModal);
    
//     // Close modal when clicking outside
//     callModal.addEventListener('click', function(e) {
//         if (e.target === callModal) {
//             document.body.removeChild(callModal);
//         }
//     });
// }

// // Emergency call function
// document.querySelector('.emergency-btn')?.addEventListener('click', function() {
//     window.open('tel:+880171125663');
// });