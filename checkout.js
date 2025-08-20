// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initCheckoutFlow();
    initPaymentTabs();
    initPromoCode();
    initAIChatbot();
    createPlaceholderSVGs();
});

// Initialize checkout flow
function initCheckoutFlow() {
    const saveShippingBtn = document.getElementById('save-shipping');
    const savePaymentBtn = document.getElementById('save-payment');
    const placeOrderBtn = document.getElementById('place-order');
    
    const shippingSection = document.querySelector('.shipping-section .section-content');
    const paymentSection = document.querySelector('.payment-section .section-content');
    const reviewSection = document.querySelector('.review-section .section-content');
    
    const editShippingBtn = document.getElementById('edit-shipping');
    const editPaymentBtn = document.getElementById('edit-payment');
    const editReviewBtn = document.getElementById('edit-review');
    
    // Shipping section
    if (saveShippingBtn) {
        saveShippingBtn.addEventListener('click', function() {
            // Validate shipping form
            const shippingForm = document.querySelector('.shipping-section form');
            const requiredFields = shippingSection.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.parentNode.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    }
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (!isValid) {
                // Scroll to first error
                const firstError = shippingSection.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                }
                return;
            }
            
            // Proceed to payment section
            shippingSection.classList.add('disabled');
            paymentSection.classList.remove('disabled');
            editShippingBtn.disabled = false;
            editPaymentBtn.disabled = false;
            
            // Update review section with shipping info
            updateReviewShipping();
            
            // Scroll to payment section
            const paymentSectionEl = document.querySelector('.payment-section');
            paymentSectionEl.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Payment section
    if (savePaymentBtn) {
        savePaymentBtn.addEventListener('click', function() {
            // Validate payment form based on selected payment method
            const activeTab = document.querySelector('.payment-tab.active');
            const paymentMethod = activeTab ? activeTab.getAttribute('data-tab') : null;
            let isValid = true;
            
            if (paymentMethod === 'card') {
                const cardFields = document.querySelectorAll('#card-tab [required]');
                cardFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
            } else if (paymentMethod === 'upi') {
                const upiId = document.getElementById('upi-id');
                if (upiId && !upiId.value.trim()) {
                    isValid = false;
                    upiId.classList.add('error');
                } else if (upiId) {
                    upiId.classList.remove('error');
                }
            } else if (paymentMethod === 'cod') {
                const codConfirm = document.querySelector('input[name="cod-confirm"]');
                if (codConfirm && !codConfirm.checked) {
                    isValid = false;
                    codConfirm.classList.add('error');
                } else if (codConfirm) {
                    codConfirm.classList.remove('error');
                }
            }
            
            if (!isValid) {
                return;
            }
            
            // Proceed to review section
            paymentSection.classList.add('disabled');
            reviewSection.classList.remove('disabled');
            editPaymentBtn.disabled = false;
            editReviewBtn.disabled = false;
            
            // Update review section with payment info
            updateReviewPayment(paymentMethod);
            
            // Scroll to review section
            const reviewSectionEl = document.querySelector('.review-section');
            reviewSectionEl.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Edit buttons
    if (editShippingBtn) {
        editShippingBtn.addEventListener('click', function() {
            shippingSection.classList.remove('disabled');
            paymentSection.classList.add('disabled');
            reviewSection.classList.add('disabled');
            
            // Scroll to shipping section
            const shippingSectionEl = document.querySelector('.shipping-section');
            shippingSectionEl.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (editPaymentBtn) {
        editPaymentBtn.addEventListener('click', function() {
            paymentSection.classList.remove('disabled');
            reviewSection.classList.add('disabled');
            
            // Scroll to payment section
            const paymentSectionEl = document.querySelector('.payment-section');
            paymentSectionEl.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Place order button
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            // Show loading state
            this.textContent = 'Processing...';
            this.disabled = true;
            
            // Simulate order processing
            setTimeout(() => {
                // Show confirmation modal
                const modal = document.getElementById('order-confirmation-modal');
                if (modal) {
                    // Update confirmation details
                    const emailEl = document.getElementById('confirmation-email');
                    const addressEl = document.getElementById('confirmation-address');
                    const paymentEl = document.getElementById('confirmation-payment');
                    const deliveryEl = document.getElementById('estimated-delivery');
                    
                    // Get user email
                    const userEmail = document.getElementById('email');
                    if (emailEl && userEmail) {
                        emailEl.textContent = userEmail.value || 'your@email.com';
                    }
                    
                    // Get shipping address
                    const address = document.getElementById('address');
                    const city = document.getElementById('city');
                    const state = document.getElementById('state');
                    const zip = document.getElementById('zip');
                    
                    if (addressEl && address && city && state && zip) {
                        const stateText = state.options[state.selectedIndex]?.text || '';
                        addressEl.textContent = `${address.value}, ${city.value}, ${stateText} ${zip.value}`;
                    }
                    
                    // Get payment method
                    const activeTab = document.querySelector('.payment-tab.active');
                    const paymentMethod = activeTab ? activeTab.getAttribute('data-tab') : null;
                    
                    if (paymentEl && paymentMethod) {
                        let paymentText = '';
                        
                        if (paymentMethod === 'card') {
                            const cardNumber = document.getElementById('card-number');
                            if (cardNumber) {
                                const last4 = cardNumber.value.slice(-4);
                                paymentText = `Credit Card ending in ${last4}`;
                            } else {
                                paymentText = 'Credit Card';
                            }
                        } else if (paymentMethod === 'upi') {
                            paymentText = 'UPI Payment';
                        } else if (paymentMethod === 'wallet') {
                            const selectedWallet = document.querySelector('input[name="wallet"]:checked');
                            if (selectedWallet) {
                                const walletValue = selectedWallet.value;
                                if (walletValue === 'paypal') {
                                    paymentText = 'PayPal';
                                } else if (walletValue === 'applepay') {
                                    paymentText = 'Apple Pay';
                                } else if (walletValue === 'amazonpay') {
                                    paymentText = 'Amazon Pay';
                                }
                            } else {
                                paymentText = 'Digital Wallet';
                            }
                        } else if (paymentMethod === 'cod') {
                            paymentText = 'Cash on Delivery';
                        }
                        
                        paymentEl.textContent = paymentText;
                    }
                    
                    // Calculate estimated delivery date
                    if (deliveryEl) {
                        const shippingMethod = document.querySelector('input[name="shipping"]:checked');
                        const isExpress = shippingMethod && shippingMethod.value === 'express';
                        
                        const today = new Date();
                        let minDays = isExpress ? 1 : 3;
                        let maxDays = isExpress ? 2 : 5;
                        
                        // Add business days
                        const minDate = addBusinessDays(today, minDays);
                        const maxDate = addBusinessDays(today, maxDays);
                        
                        // Format dates
                        const options = { month: 'long', day: 'numeric' };
                        const minDateStr = minDate.toLocaleDateString('en-US', options);
                        const maxDateStr = maxDate.toLocaleDateString('en-US', options);
                        
                        deliveryEl.textContent = `${minDateStr} - ${maxDateStr}`;
                    }
                    
                    // Show modal
                    modal.style.display = 'flex';
                    
                    // Add close modal functionality
                    const closeBtn = modal.querySelector('.close-modal');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', function() {
                            modal.style.display = 'none';
                        });
                    }
                    
                    // Close modal when clicking outside content
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            modal.style.display = 'none';
                        }
                    });
                }
                
                // Reset button state
                this.textContent = 'Place Order';
                this.disabled = false;
            }, 2000);
        });
    }
    
    // Helper function to update review shipping info
    function updateReviewShipping() {
        const reviewShippingAddress = document.getElementById('review-shipping-address');
        if (!reviewShippingAddress) return;
        
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const state = document.getElementById('state');
        const zip = document.getElementById('zip');
        const country = document.getElementById('country');
        const shippingMethod = document.querySelector('input[name="shipping"]:checked');
        
        if (firstName && lastName && address && city && state && zip && country) {
            const stateText = state.options[state.selectedIndex]?.text || '';
            const countryText = country.options[country.selectedIndex]?.text || '';
            const shippingText = shippingMethod ? 
                (shippingMethod.value === 'express' ? 'Express Shipping (1-2 days)' : 'Standard Shipping (3-5 days)') : 
                'Standard Shipping';
            
            reviewShippingAddress.innerHTML = `
                <p><strong>${firstName.value} ${lastName.value}</strong></p>
                <p>${address.value}</p>
                <p>${city.value}, ${stateText} ${zip.value}</p>
                <p>${countryText}</p>
                <p class="shipping-method"><strong>Shipping Method:</strong> ${shippingText}</p>
            `;
        }
    }
    
    // Helper function to update review payment info
    function updateReviewPayment(paymentMethod) {
        const reviewPaymentMethod = document.getElementById('review-payment-method');
        if (!reviewPaymentMethod) return;
        
        let paymentHTML = '';
        
        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('card-number');
            const cardName = document.getElementById('card-name');
            
            if (cardNumber && cardName) {
                // Mask card number except last 4 digits
                const last4 = cardNumber.value.slice(-4);
                const maskedNumber = `•••• •••• •••• ${last4}`;
                
                paymentHTML = `
                    <p><strong>Credit Card</strong></p>
                    <p>${maskedNumber}</p>
                    <p>${cardName.value}</p>
                `;
            }
        } else if (paymentMethod === 'upi') {
            const upiId = document.getElementById('upi-id');
            const selectedUpiApp = document.querySelector('input[name="upi-app"]:checked');
            
            let upiAppText = 'UPI';
            if (selectedUpiApp) {
                if (selectedUpiApp.value === 'gpay') {
                    upiAppText = 'Google Pay';
                } else if (selectedUpiApp.value === 'phonepe') {
                    upiAppText = 'PhonePe';
                } else if (selectedUpiApp.value === 'paytm') {
                    upiAppText = 'Paytm';
                }
            }
            
            paymentHTML = `
                <p><strong>${upiAppText}</strong></p>
                <p>${upiId ? upiId.value : 'UPI ID'}</p>
            `;
        } else if (paymentMethod === 'wallet') {
            const selectedWallet = document.querySelector('input[name="wallet"]:checked');
            
            let walletText = 'Digital Wallet';
            if (selectedWallet) {
                if (selectedWallet.value === 'paypal') {
                    walletText = 'PayPal';
                } else if (selectedWallet.value === 'applepay') {
                    walletText = 'Apple Pay';
                } else if (selectedWallet.value === 'amazonpay') {
                    walletText = 'Amazon Pay';
                }
            }
            
            paymentHTML = `
                <p><strong>${walletText}</strong></p>
                <p>You'll be redirected to complete payment after placing your order.</p>
            `;
        } else if (paymentMethod === 'cod') {
            paymentHTML = `
                <p><strong>Cash on Delivery</strong></p>
                <p>Pay with cash when your order is delivered.</p>
                <p>COD fee: ₹40</p>
            `;
        }
        
        reviewPaymentMethod.innerHTML = paymentHTML;
    }
    
    // Helper function to add business days to a date
    function addBusinessDays(date, days) {
        const result = new Date(date);
        let addedDays = 0;
        
        while (addedDays < days) {
            result.setDate(result.getDate() + 1);
            const dayOfWeek = result.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip weekends
                addedDays++;
            }
        }
        
        return result;
    }
}

// Initialize payment tabs
function initPaymentTabs() {
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const paymentContents = document.querySelectorAll('.payment-tab-content');
    
    if (paymentTabs.length === 0 || paymentContents.length === 0) return;
    
    paymentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab
            paymentTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            paymentContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Credit card input formatting
    const cardNumberInput = document.getElementById('card-number');
    const expiryInput = document.getElementById('expiry');
    const cvvInput = document.getElementById('cvv');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Add spaces after every 4 digits
            if (value.length > 0) {
                value = value.match(/.{1,4}/g).join(' ');
            }
            
            // Update input value
            this.value = value;
        });
    }
    
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');
            
            // Format as MM/YY
            if (value.length > 0) {
                if (value.length > 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
            }
            
            // Update input value
            this.value = value;
        });
    }
    
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            // Remove non-digits
            this.value = this.value.replace(/\D/g, '');
        });
    }
}

// Initialize promo code functionality
function initPromoCode() {
    const promoInput = document.getElementById('promo');
    const applyPromoBtn = document.querySelector('.apply-promo');
    const discountRow = document.querySelector('.total-row.discount');
    const grandTotalValue = document.querySelector('.grand-total .total-value');
    const aiPromoSuggestion = document.querySelector('.ai-promo-suggestion');
    
    if (!promoInput || !applyPromoBtn || !discountRow || !grandTotalValue) return;
    
    applyPromoBtn.addEventListener('click', function() {
        const promoCode = promoInput.value.trim().toUpperCase();
        
        if (promoCode === 'NEWTRUCK10') {
            // Calculate 10% discount
            const subtotalText = document.querySelector('.total-row:first-child .total-value').textContent;
            const subtotal = parseFloat(subtotalText.replace(/[^\d.]/g, ''));
            const discount = subtotal * 0.1;
            
            // Update discount row
            discountRow.querySelector('.total-value').textContent = `-$${discount.toFixed(2)}`;
            discountRow.classList.remove('hidden');
            
            // Update grand total
            const taxText = document.querySelector('.total-row:nth-child(3) .total-value').textContent;
            const tax = parseFloat(taxText.replace(/[^\d.]/g, ''));
            const newTotal = subtotal + tax - discount;
            grandTotalValue.textContent = `$${newTotal.toFixed(2)}`;
            
            // Show success message
            showNotification('Promo code applied successfully!');
            
            // Hide AI suggestion
            if (aiPromoSuggestion) {
                aiPromoSuggestion.style.display = 'none';
            }
        } else if (promoCode === '') {
            showNotification('Please enter a promo code');
        } else {
            showNotification('Invalid promo code. Try NEWTRUCK10 for 10% off!');
        }
    });
    
    // Apply promo code on Enter key
    promoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyPromoBtn.click();
        }
    });
    
    // AI suggestion click
    if (aiPromoSuggestion) {
        aiPromoSuggestion.addEventListener('click', function() {
            promoInput.value = 'NEWTRUCK10';
            applyPromoBtn.click();
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
            if (lowerMessage.includes('order') && lowerMessage.includes('arrive')) {
                responseText = 'Your order will be delivered within 3-5 business days with standard shipping, or 1-2 business days with express shipping. You can track your order status from your account dashboard after placing the order.';
            } else if (lowerMessage.includes('gift') && lowerMessage.includes('wrap')) {
                responseText = 'Yes, we offer gift wrapping for ₹299 per item. You can select this option on the product page before adding items to your cart. We offer several wrapping paper designs and can include a personalized message card.';
            } else if (lowerMessage.includes('change') && lowerMessage.includes('address')) {
                responseText = 'You can change your shipping address during checkout before placing your order. If you\'ve already placed your order, please contact our customer support immediately, and we\'ll try to update it if the order hasn\'t been processed yet.';
            } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
                responseText = 'We accept credit/debit cards (Visa, Mastercard, American Express), UPI payments, digital wallets (PayPal, Apple Pay, Amazon Pay), and cash on delivery. All payment information is securely processed and encrypted.';
            } else if (lowerMessage.includes('discount') || lowerMessage.includes('coupon') || lowerMessage.includes('promo')) {
                responseText = 'You can use the code NEWTRUCK10 for 10% off your order! Just enter it in the promo code field in the order summary section. We also offer special discounts for first-time customers and during seasonal sales.';
            } else if (lowerMessage.includes('cancel') || lowerMessage.includes('cancellation')) {
                responseText = 'Orders can be cancelled within 1 hour of placing them. After that, if the order has not been shipped, you can request cancellation by contacting customer support. Once shipped, you\'ll need to initiate a return process after receiving the items.';
            } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
                responseText = 'We offer a 30-day return policy for most items. Products must be in original condition with packaging. Once we receive and inspect the returned items, refunds are typically processed within 5-7 business days to your original payment method.';
            } else {
                responseText = 'I can help you with your checkout process! Do you have questions about shipping, payment methods, or need assistance with your order? Feel free to ask anything specific about your purchase.';
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
                chatInput.value = 'When will my order arrive?';
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
    
    // Help options
    const helpOptions = document.querySelectorAll('.help-option');
    if (helpOptions.length > 0) {
        helpOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Open chatbot if it's the AI assistant option
                if (this.querySelector('.help-text').textContent.includes('AI Assistant')) {
                    chatbotContainer.classList.add('open');
                    chatInput.focus();
                    
                    // Simulate a specific question based on the help option
                    setTimeout(() => {
                        sendMessage('I need help with my checkout');
                    }, 500);
                } else {
                    // For other help options, show a notification
                    const helpType = this.querySelector('.help-text').textContent;
                    showNotification(`${helpType} would connect you with our support team in a real implementation.`);
                }
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
    if (document.querySelector('svg#placeholder-product-1') && 
        document.querySelector('svg#placeholder-product-2')) return;
    
    // Create placeholder SVGs for product images
    const svgPlaceholders = [
        { id: 'placeholder-product-1', color: '#FFC107', type: 'truck' },
        { id: 'placeholder-product-2', color: '#F44336', type: 'truck' }
    ];
    
    svgPlaceholders.forEach(placeholder => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('id', placeholder.id);
        svg.setAttribute('width', '100');
        svg.setAttribute('height', '100');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.style.display = 'none';
        
        // Background
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '100');
        rect.setAttribute('height', '100');
        rect.setAttribute('fill', placeholder.color);
        svg.appendChild(rect);
        
        if (placeholder.type === 'truck') {
            // Simple truck shape
            const truck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            if (placeholder.id === 'placeholder-product-1') {
                truck.setAttribute('d', 'M20,70 L20,50 L40,50 L50,40 L80,40 L80,70 Z');
                truck.setAttribute('fill', '#FFE082');
                truck.setAttribute('stroke', '#FFA000');
            } else {
                truck.setAttribute('d', 'M15,65 L25,45 L45,45 L55,35 L75,35 L85,45 L85,65 Z');
                truck.setAttribute('fill', '#FFCDD2');
                truck.setAttribute('stroke', '#D32F2F');
            }
            
            truck.setAttribute('stroke-width', '2');
            
            // Wheels
            const wheel1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            wheel1.setAttribute('cx', '30');
            wheel1.setAttribute('cy', '70');
            wheel1.setAttribute('r', placeholder.id === 'placeholder-product-1' ? '8' : '10');
            wheel1.setAttribute('fill', '#424242');
            
            const wheel2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            wheel2.setAttribute('cx', '70');
            wheel2.setAttribute('cy', '70');
            wheel2.setAttribute('r', placeholder.id === 'placeholder-product-1' ? '8' : '10');
            wheel2.setAttribute('fill', '#424242');
            
            svg.appendChild(truck);
            svg.appendChild(wheel1);
            svg.appendChild(wheel2);
        }
        
        document.body.appendChild(svg);
    });
}