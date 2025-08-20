// Main JavaScript for Toy Truck Toys E-commerce Website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initChatbot();
    initSearchFeatures();
    initProductRecommendations();
    initARPreview();
    initLoyaltyProgram();
    
    // Add event listeners
    setupEventListeners();
});

// Chatbot functionality
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWidget = document.querySelector('.chatbot-widget');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendButton = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    // Initially hide the chatbot widget
    if (chatbotWidget) {
        chatbotWidget.style.display = 'none';
    }
    
    // Toggle chatbot visibility
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            if (chatbotWidget.style.display === 'none') {
                chatbotWidget.style.display = 'block';
                chatbotInput.focus();
            } else {
                chatbotWidget.style.display = 'none';
            }
        });
    }
    
    // Send message functionality
    if (chatbotSendButton && chatbotInput) {
        chatbotSendButton.addEventListener('click', sendChatMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    // Function to send chat message
    function sendChatMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            // Add user message to chat
            addMessageToChat('user', message);
            chatbotInput.value = '';
            
            // Simulate AI response (in a real app, this would call an AI API)
            setTimeout(function() {
                // This is where you would integrate with an actual AI service
                const aiResponse = getAIResponse(message);
                addMessageToChat('bot', aiResponse);
            }, 1000);
        }
    }
    
    // Add message to chat display
    function addMessageToChat(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const messagePara = document.createElement('p');
        messagePara.textContent = text;
        
        messageDiv.appendChild(messagePara);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom of messages
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Simulate AI responses (placeholder for actual AI integration)
    function getAIResponse(userMessage) {
        // In a real application, this would call an AI API
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return 'Hello! How can I help you find the perfect toy today?';
        } else if (lowerMessage.includes('age')) {
            return 'I can suggest age-appropriate toys. What specific age range are you looking for?';
        } else if (lowerMessage.includes('truck')) {
            return 'We have a great selection of truck toys! Would you prefer construction trucks, monster trucks, or remote-controlled trucks?';
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
            return 'Our toys range from $10 to $100. Do you have a specific budget in mind?';
        } else if (lowerMessage.includes('gift')) {
            return 'Looking for a gift? I can help! What age is the child and what are their interests?';
        } else {
            return 'I\'d be happy to help you find the perfect toy. Could you tell me more about what you\'re looking for?';
        }
    }
}

// Search features including voice and image search
function initSearchFeatures() {
    const searchInput = document.querySelector('.search-bar input');
    const voiceSearchButton = document.querySelector('.voice-search');
    const imageSearchButton = document.querySelector('.image-search');
    
    // Basic search functionality
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Voice search (simulated)
    if (voiceSearchButton) {
        voiceSearchButton.addEventListener('click', function() {
            // In a real app, this would use the Web Speech API
            alert('Voice search activated! (This is a simulation - in a real app, this would use your microphone)');
            
            // Simulate voice recognition after 2 seconds
            setTimeout(function() {
                const simulatedVoiceText = 'monster truck';
                if (searchInput) {
                    searchInput.value = simulatedVoiceText;
                    performSearch(simulatedVoiceText);
                }
            }, 2000);
        });
    }
    
    // Image search (simulated)
    if (imageSearchButton) {
        imageSearchButton.addEventListener('click', function() {
            // In a real app, this would open the camera or file picker
            alert('Image search activated! (This is a simulation - in a real app, this would use your camera or let you upload an image)');
            
            // Simulate image recognition after 2 seconds
            setTimeout(function() {
                const simulatedImageResult = 'red fire truck';
                if (searchInput) {
                    searchInput.value = simulatedImageResult;
                    performSearch(simulatedImageResult);
                }
            }, 2000);
        });
    }
    
    // Perform search (simulated)
    function performSearch(query) {
        console.log('Searching for:', query);
        alert(`Searching for "${query}"... (This is a simulation - in a real app, this would show search results)`);  
        // In a real app, this would call an API and display results
    }
}

// AI-powered product recommendations
function initProductRecommendations() {
    // This is a placeholder for actual AI recommendation engine integration
    console.log('AI product recommendations initialized');
    
    // In a real application, this would:
    // 1. Collect user browsing data
    // 2. Send to an AI recommendation service
    // 3. Display personalized product recommendations
    
    // Simulate personalized recommendations by randomly highlighting products
    const productCards = document.querySelectorAll('.product-card');
    if (productCards.length > 0) {
        // Randomly select 2 products to highlight as "recommended"
        const recommendCount = Math.min(2, productCards.length);
        const selectedIndices = new Set();
        
        while (selectedIndices.size < recommendCount) {
            const randomIndex = Math.floor(Math.random() * productCards.length);
            selectedIndices.add(randomIndex);
        }
        
        selectedIndices.forEach(index => {
            const card = productCards[index];
            const recommendedBadge = document.createElement('div');
            recommendedBadge.classList.add('recommended-badge');
            recommendedBadge.textContent = 'Recommended for You';
            recommendedBadge.style.position = 'absolute';
            recommendedBadge.style.top = '10px';
            recommendedBadge.style.right = '10px';
            recommendedBadge.style.backgroundColor = '#FF5722';
            recommendedBadge.style.color = 'white';
            recommendedBadge.style.padding = '5px 10px';
            recommendedBadge.style.borderRadius = '20px';
            recommendedBadge.style.fontSize = '0.8rem';
            recommendedBadge.style.fontWeight = 'bold';
            
            // Make sure the card has position relative for absolute positioning of the badge
            card.style.position = 'relative';
            card.appendChild(recommendedBadge);
        });
    }
}

// AR/3D preview functionality
function initARPreview() {
    // This is a placeholder for actual AR integration
    console.log('AR preview functionality initialized');
    
    // In a real application, this would integrate with WebXR or a 3D library like Three.js
    // For now, we'll just add a simulated AR preview button to product cards
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const productInfo = card.querySelector('.product-info');
        if (productInfo) {
            const arButton = document.createElement('button');
            arButton.classList.add('btn', 'ar-preview');
            arButton.textContent = '🔍 View in 3D/AR';
            arButton.style.backgroundColor = '#9C27B0';
            arButton.style.color = 'white';
            arButton.style.width = '100%';
            arButton.style.marginTop = '0.5rem';
            
            arButton.addEventListener('click', function(e) {
                e.preventDefault();
                simulateARPreview(card.querySelector('h3').textContent);
            });
            
            productInfo.appendChild(arButton);
        }
    });
    
    // Simulate AR preview
    function simulateARPreview(productName) {
        alert(`AR Preview for ${productName} (This is a simulation - in a real app, this would launch an AR experience)`);  
    }
}

// Loyalty program gamification
function initLoyaltyProgram() {
    // This is a placeholder for actual loyalty program functionality
    console.log('Loyalty program initialized');
    
    // In a real application, this would track user actions and award points
    // For now, we'll just add a simulated points display
    
    const userControls = document.querySelector('.user-controls');
    if (userControls) {
        const pointsDisplay = document.createElement('div');
        pointsDisplay.classList.add('loyalty-points');
        pointsDisplay.innerHTML = '🏆 <span>250</span> points';
        pointsDisplay.style.backgroundColor = '#FFC107';
        pointsDisplay.style.color = '#333';
        pointsDisplay.style.padding = '5px 10px';
        pointsDisplay.style.borderRadius = '20px';
        pointsDisplay.style.fontSize = '0.9rem';
        pointsDisplay.style.fontWeight = 'bold';
        pointsDisplay.style.cursor = 'pointer';
        
        pointsDisplay.addEventListener('click', function() {
            alert('Loyalty Program: You have 250 points! You\'re at the "Delivery Pro" level. Earn 100 more points to reach "Rescue Hero"!');
        });
        
        userControls.appendChild(pointsDisplay);
    }
}

// Set up general event listeners
function setupEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Simulate adding to cart
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            alert(`Added to cart: ${productName} - ${productPrice}`);
            
            // In a real app, this would update the cart state and UI
        });
    });
    
    // Category navigation
    const categoryLinks = document.querySelectorAll('.category-card');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.querySelector('h3').textContent;
            alert(`Navigating to category: ${category} (This is a simulation - in a real app, this would show category products)`);
        });
    });
    
    // Seller registration
    const sellerRegButton = document.querySelector('.seller-info .btn');
    if (sellerRegButton) {
        sellerRegButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Seller Registration Form (This is a simulation - in a real app, this would show a registration form)');
        });
    }
    
    // Loyalty program registration
    const loyaltyRegButton = document.querySelector('.loyalty-info .btn');
    if (loyaltyRegButton) {
        loyaltyRegButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Loyalty Program Registration (This is a simulation - in a real app, this would show a registration form)');
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert(`Thank you for subscribing with ${emailInput.value}! (This is a simulation - in a real app, this would subscribe you to the newsletter)`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive navigation for mobile
function initMobileNavigation() {
    const header = document.querySelector('.header');
    const mainNav = document.querySelector('.main-nav');
    
    if (header && mainNav) {
        // Create mobile menu toggle button
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.classList.add('mobile-menu-toggle');
        mobileMenuToggle.innerHTML = '☰';
        mobileMenuToggle.style.display = 'none';
        mobileMenuToggle.style.background = 'none';
        mobileMenuToggle.style.border = 'none';
        mobileMenuToggle.style.fontSize = '1.5rem';
        mobileMenuToggle.style.cursor = 'pointer';
        
        header.querySelector('.container').insertBefore(mobileMenuToggle, mainNav);
        
        // Toggle menu visibility on click
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.style.display = mainNav.style.display === 'none' || mainNav.style.display === '' ? 'block' : 'none';
        });
        
        // Handle responsive behavior
        function handleResponsive() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.style.display = 'block';
                mainNav.style.display = 'none';
            } else {
                mobileMenuToggle.style.display = 'none';
                mainNav.style.display = 'block';
            }
        }
        
        // Initial call and window resize listener
        handleResponsive();
        window.addEventListener('resize', debounce(handleResponsive, 250));
    }
}

// Call mobile navigation initialization
initMobileNavigation();