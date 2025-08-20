// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initProductGallery();
    initProductTabs();
    initQuantitySelector();
    initARPreview();
    initAIChatbot();
    initReviewsInteraction();
    initProductCarousel();
});

// Initialize product image gallery
function initProductGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            const imageUrl = this.getAttribute('data-image');
            if (imageUrl) {
                mainImage.src = imageUrl;
                
                // Add a subtle zoom effect
                mainImage.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    mainImage.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
}

// Initialize product tabs
function initProductTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab content
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });
    
    // Handle direct link to reviews tab
    const reviewsTab = document.getElementById('reviews-tab');
    if (reviewsTab && window.location.hash === '#reviews') {
        reviewsTab.click();
        // Smooth scroll to reviews section
        setTimeout(() => {
            document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
        }, 100);
    }
}

// Initialize quantity selector
function initQuantitySelector() {
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');
    const quantityInput = document.querySelector('.quantity-selector input');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > parseInt(quantityInput.min)) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.max)) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Validate manual input
    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        const min = parseInt(this.min);
        const max = parseInt(this.max);
        
        if (isNaN(value) || value < min) {
            this.value = min;
        } else if (value > max) {
            this.value = max;
        }
    });
    
    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-button');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            const productName = document.querySelector('.product-title').textContent;
            
            // Animate button
            this.classList.add('adding');
            this.textContent = 'Adding...';
            
            // Simulate adding to cart
            setTimeout(() => {
                this.classList.remove('adding');
                this.innerHTML = '<span class="icon">✓</span> Added to Cart';
                
                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                    const currentCount = parseInt(cartCount.textContent);
                    cartCount.textContent = currentCount + quantity;
                    
                    // Animate cart icon
                    const cartIcon = document.querySelector('.cart-icon');
                    if (cartIcon) {
                        cartIcon.classList.add('bounce');
                        setTimeout(() => {
                            cartIcon.classList.remove('bounce');
                        }, 1000);
                    }
                }
                
                // Show confirmation message
                showNotification(`${quantity} × ${productName} added to cart`);
                
                // Reset button after delay
                setTimeout(() => {
                    this.innerHTML = '<span class="icon">🛒</span> Add to Cart';
                }, 2000);
            }, 800);
        });
    }
    
    // Wishlist button
    const wishlistBtn = document.querySelector('.wishlist-button');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const isActive = this.classList.contains('active');
            
            // Update icon and style
            if (isActive) {
                this.innerHTML = '<span class="icon" style="color: #F44336;">❤</span>';
                this.style.borderColor = '#F44336';
                showNotification('Added to your wishlist');
            } else {
                this.innerHTML = '<span class="icon">❤</span>';
                this.style.borderColor = '';
                showNotification('Removed from your wishlist');
            }
        });
    }
}

// Initialize AR/3D preview
function initARPreview() {
    const arViewBtn = document.querySelector('.ar-view-button');
    const view3DBtn = document.querySelector('.view-3d-button');
    const arModal = document.getElementById('ar-preview-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    
    if (!arViewBtn || !view3DBtn || !arModal || !closeModalBtn) return;
    
    // Open modal
    function openARModal() {
        arModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add fade-in animation
        arModal.style.opacity = '0';
        setTimeout(() => {
            arModal.style.opacity = '1';
        }, 10);
    }
    
    // Close modal
    function closeARModal() {
        arModal.style.opacity = '0';
        setTimeout(() => {
            arModal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
    
    arViewBtn.addEventListener('click', openARModal);
    view3DBtn.addEventListener('click', openARModal);
    closeModalBtn.addEventListener('click', closeARModal);
    
    // Close modal when clicking outside content
    arModal.addEventListener('click', function(e) {
        if (e.target === arModal) {
            closeARModal();
        }
    });
    
    // AR controls functionality
    const arControls = document.querySelectorAll('.ar-control-button');
    const arPlaceholder = document.querySelector('.ar-placeholder-content');
    
    if (arControls.length > 0 && arPlaceholder) {
        let rotation = 0;
        let scale = 1;
        
        arControls.forEach((control, index) => {
            control.addEventListener('click', function() {
                // Simulate 3D controls
                switch(index) {
                    case 0: // Rotate left
                        rotation -= 45;
                        break;
                    case 1: // Rotate right
                        rotation += 45;
                        break;
                    case 2: // Zoom in
                        scale = Math.min(scale + 0.2, 2);
                        break;
                    case 3: // Zoom out
                        scale = Math.max(scale - 0.2, 0.6);
                        break;
                    case 4: // Reset
                        rotation = 0;
                        scale = 1;
                        break;
                }
                
                arPlaceholder.style.transform = `rotate(${rotation}deg) scale(${scale})`;
            });
        });
    }
    
    // AR device button
    const arDeviceBtn = document.querySelector('.ar-device-button');
    if (arDeviceBtn) {
        arDeviceBtn.addEventListener('click', function() {
            // In a real app, this would launch AR experience
            alert('AR functionality would launch on a real device. This is a simulation.');
        });
    }
}

// Initialize AI chatbot
function initAIChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbotBtn = document.querySelector('.close-chatbot');
    const chatInput = document.querySelector('.chatbot-input input');
    const sendMessageBtn = document.querySelector('.send-message');
    const voiceInputBtn = document.querySelector('.voice-input');
    const chatMessages = document.querySelector('.chatbot-messages');
    const suggestionChips = document.querySelectorAll('.suggestion-chip');
    
    if (!chatbotToggle || !chatbotContainer) return;
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.classList.toggle('open');
        if (chatbotContainer.classList.contains('open')) {
            chatInput.focus();
        }
    });
    
    // Close chatbot
    if (closeChatbotBtn) {
        closeChatbotBtn.addEventListener('click', function() {
            chatbotContainer.classList.remove('open');
        });
    }
    
    // Send message function
    function sendMessage(messageText) {
        if (!messageText.trim()) return;
        
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.innerHTML = `
            <div class="message-content">
                <p>${messageText}</p>
            </div>
        `;
        chatMessages.appendChild(userMessage);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'message bot typing';
        typingIndicator.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response after delay
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Add AI response based on user message
            let responseText = '';
            
            // Simple pattern matching for demo purposes
            const lowerMessage = messageText.toLowerCase();
            if (lowerMessage.includes('age') || lowerMessage.includes('old')) {
                responseText = 'The Deluxe City Construction Truck is designed for children ages 3-8 years. It has small parts, so it\'s not suitable for children under 3 years due to choking hazards.';
            } else if (lowerMessage.includes('durable') || lowerMessage.includes('strong')) {
                responseText = 'Yes, this truck is extremely durable! It\'s made with die-cast metal body and high-quality ABS plastic components that can withstand rough play. Many customers mention its sturdiness in their reviews.';
            } else if (lowerMessage.includes('battery') || lowerMessage.includes('batteries')) {
                responseText = 'Yes, the truck requires 2 AAA batteries (included) to power the sound effects like engine sounds, horn, and backup beeper. The battery compartment is located on the bottom of the truck.';
            } else if (lowerMessage.includes('delivery') || lowerMessage.includes('shipping')) {
                responseText = 'We offer free standard shipping (3-5 business days) for all orders over $25. Express shipping (1-2 business days) is available for $4.99. You can see more details in the Shipping & Returns tab below the product description.';
            } else if (lowerMessage.includes('discount') || lowerMessage.includes('coupon')) {
                responseText = 'You can use the code NEWTRUCK10 for an additional 10% off this product! Also, if you sign up for our newsletter, you\'ll receive a 15% discount code for your next purchase.';
            } else {
                responseText = 'Thank you for your question! This construction truck features a functional dump bed, rotating cab, and realistic engine sounds. It\'s made of durable die-cast metal and high-quality plastic. Is there anything specific you\'d like to know about its features, dimensions, or compatibility with other toys?';
            }
            
            const botMessage = document.createElement('div');
            botMessage.className = 'message bot';
            botMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${responseText}</p>
                </div>
            `;
            chatMessages.appendChild(botMessage);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
    
    // Send message on button click
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', function() {
            sendMessage(chatInput.value);
        });
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage(this.value);
            }
        });
    }
    
    // Voice input button
    if (voiceInputBtn) {
        voiceInputBtn.addEventListener('click', function() {
            // In a real app, this would activate speech recognition
            this.classList.add('listening');
            
            // Simulate voice recognition
            setTimeout(() => {
                this.classList.remove('listening');
                chatInput.value = 'Is this truck suitable for a 4-year-old?';
                chatInput.focus();
                
                // Show notification
                showNotification('Voice input captured');
            }, 2000);
        });
    }
    
    // Suggestion chips
    if (suggestionChips.length > 0) {
        suggestionChips.forEach(chip => {
            chip.addEventListener('click', function() {
                sendMessage(this.textContent);
            });
        });
    }
}

// Initialize reviews interaction
function initReviewsInteraction() {
    const helpfulButtons = document.querySelectorAll('.helpful-button');
    const reviewSort = document.getElementById('review-sort');
    const filterButtons = document.querySelectorAll('.filter-button');
    const loadMoreBtn = document.querySelector('.load-more-reviews');
    const writeReviewBtn = document.querySelector('.write-review-button');
    
    // Helpful buttons
    if (helpfulButtons.length > 0) {
        helpfulButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Extract current count
                const countMatch = this.textContent.match(/\d+/);
                const currentCount = countMatch ? parseInt(countMatch[0]) : 0;
                
                // Update count and style
                if (!this.classList.contains('selected')) {
                    this.textContent = this.textContent.replace(/\d+/, currentCount + 1);
                    this.classList.add('selected');
                    
                    // Disable other button in the pair
                    const siblingButton = this.nextElementSibling || this.previousElementSibling;
                    if (siblingButton && siblingButton.classList.contains('helpful-button')) {
                        siblingButton.disabled = true;
                    }
                }
            });
        });
    }
    
    // Review sorting
    if (reviewSort) {
        reviewSort.addEventListener('change', function() {
            // In a real app, this would sort the reviews
            showNotification(`Reviews sorted by: ${this.options[this.selectedIndex].text}`);
        });
    }
    
    // Filter buttons
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // In a real app, this would filter the reviews
                showNotification(`Reviews filtered by: ${this.textContent}`);
            });
        });
    }
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            
            // Simulate loading more reviews
            setTimeout(() => {
                this.textContent = 'No more reviews to load';
                this.disabled = true;
                showNotification('All reviews have been loaded');
            }, 1500);
        });
    }
    
    // Write review button
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', function() {
            // In a real app, this would open a review form
            alert('In a complete implementation, this would open a review form where you can rate and review the product.');
        });
    }
}

// Initialize product carousel
function initProductCarousel() {
    const carousel = document.querySelector('.product-carousel');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    // In a real implementation, this would handle carousel sliding
    // For this demo, we'll just simulate the effect
    
    let currentPosition = 0;
    const totalItems = carousel.children.length;
    const visibleItems = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
    const maxPosition = Math.max(0, totalItems - visibleItems);
    
    // Update carousel position
    function updateCarousel() {
        const itemWidth = carousel.offsetWidth / visibleItems;
        const translateX = -currentPosition * itemWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
        carousel.style.transition = 'transform 0.3s ease';
        
        // Update button states
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition >= maxPosition;
        
        prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
        nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
    
    // Initialize button states
    updateCarousel();
    
    // Previous button
    prevBtn.addEventListener('click', function() {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });
    
    // Next button
    nextBtn.addEventListener('click', function() {
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Recalculate visible items
        const newVisibleItems = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
        
        if (newVisibleItems !== visibleItems) {
            // Reset position if needed
            currentPosition = 0;
            updateCarousel();
        }
    });
    
    // Quick view buttons
    const quickViewButtons = document.querySelectorAll('.quick-view');
    if (quickViewButtons.length > 0) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productName = this.closest('.product-card').querySelector('.product-name').textContent;
                alert(`Quick view for ${productName} would open a modal with product details.`);
            });
        });
    }
    
    // Add to cart buttons in carousel
    const carouselAddToCartButtons = carousel.querySelectorAll('.add-to-cart-button');
    if (carouselAddToCartButtons.length > 0) {
        carouselAddToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                
                // Animate button
                this.textContent = 'Adding...';
                
                // Simulate adding to cart
                setTimeout(() => {
                    this.textContent = 'Added';
                    
                    // Update cart count
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        const currentCount = parseInt(cartCount.textContent);
                        cartCount.textContent = currentCount + 1;
                        
                        // Animate cart icon
                        const cartIcon = document.querySelector('.cart-icon');
                        if (cartIcon) {
                            cartIcon.classList.add('bounce');
                            setTimeout(() => {
                                cartIcon.classList.remove('bounce');
                            }, 1000);
                        }
                    }
                    
                    // Show confirmation message
                    showNotification(`${productName} added to cart`);
                    
                    // Reset button after delay
                    setTimeout(() => {
                        this.textContent = 'Add to Cart';
                    }, 1500);
                }, 800);
            });
        });
    }
}

// Utility function to show notifications
function showNotification(message) {
    // Check if notification container exists, create if not
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
            }
            .notification {
                background-color: #333;
                color: white;
                padding: 12px 20px;
                border-radius: 4px;
                margin-top: 10px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                transform: translateX(100%);
                opacity: 0;
                transition: all 0.3s ease;
                max-width: 300px;
            }
            .notification.show {
                transform: translateX(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notificationContainer.appendChild(notification);
    
    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

// Create placeholder SVGs for demo purposes
function createPlaceholderSVGs() {
    // Check if placeholders already exist
    if (document.querySelector('svg#placeholder-truck')) return;
    
    // Create placeholder SVGs
    const svgPlaceholders = [
        { id: 'placeholder-truck', color: '#FFC107' },
        { id: 'placeholder-truck-side', color: '#2196F3' },
        { id: 'placeholder-truck-back', color: '#4CAF50' },
        { id: 'placeholder-truck-top', color: '#F44336' },
        { id: 'review-photo-placeholder', color: '#9E9E9E' }
    ];
    
    svgPlaceholders.forEach(placeholder => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', placeholder.id);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 200 200');
        svg.style.display = 'none';
        
        // Create a simple truck shape or placeholder rectangle
        if (placeholder.id.includes('truck')) {
            // Simple truck shape
            const truck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            truck.setAttribute('d', 'M40,140 L40,100 L80,100 L100,80 L160,80 L160,140 Z');
            truck.setAttribute('fill', placeholder.color);
            truck.setAttribute('stroke', '#333');
            truck.setAttribute('stroke-width', '4');
            
            // Wheels
            const wheel1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            wheel1.setAttribute('cx', '60');
            wheel1.setAttribute('cy', '140');
            wheel1.setAttribute('r', '15');
            wheel1.setAttribute('fill', '#333');
            
            const wheel2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            wheel2.setAttribute('cx', '140');
            wheel2.setAttribute('cy', '140');
            wheel2.setAttribute('r', '15');
            wheel2.setAttribute('fill', '#333');
            
            svg.appendChild(truck);
            svg.appendChild(wheel1);
            svg.appendChild(wheel2);
        } else {
            // Simple placeholder rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', '20');
            rect.setAttribute('y', '20');
            rect.setAttribute('width', '160');
            rect.setAttribute('height', '160');
            rect.setAttribute('rx', '10');
            rect.setAttribute('fill', placeholder.color);
            
            svg.appendChild(rect);
        }
        
        document.body.appendChild(svg);
    });
}

// Call this function to create SVG placeholders
createPlaceholderSVGs();