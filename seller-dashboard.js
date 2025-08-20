// Seller Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initDashboardCharts();
    initAICatalogUpload();
    initAIInsights();
    setupDashboardEventListeners();
});

// Initialize dashboard charts and visualizations
function initDashboardCharts() {
    // This is a placeholder for actual chart implementation
    // In a real application, this would use a charting library like Chart.js
    console.log('Dashboard charts initialized');
    
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (chartPlaceholder) {
        // Create a simple visual representation of a chart
        const mockChart = document.createElement('div');
        mockChart.style.width = '100%';
        mockChart.style.height = '100%';
        mockChart.style.display = 'flex';
        mockChart.style.flexDirection = 'column';
        mockChart.style.justifyContent = 'flex-end';
        mockChart.style.alignItems = 'center';
        
        // Create mock chart bars
        const barContainer = document.createElement('div');
        barContainer.style.display = 'flex';
        barContainer.style.alignItems = 'flex-end';
        barContainer.style.justifyContent = 'space-around';
        barContainer.style.width = '90%';
        barContainer.style.height = '80%';
        
        // Generate random heights for bars
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        months.forEach(month => {
            const barHeight = 30 + Math.random() * 60; // Random height between 30-90%
            
            const barWrapper = document.createElement('div');
            barWrapper.style.display = 'flex';
            barWrapper.style.flexDirection = 'column';
            barWrapper.style.alignItems = 'center';
            barWrapper.style.width = `${100 / months.length}%`;
            
            const bar = document.createElement('div');
            bar.style.width = '60%';
            bar.style.height = `${barHeight}%`;
            bar.style.backgroundColor = '#2196F3';
            bar.style.borderRadius = '4px 4px 0 0';
            
            const label = document.createElement('div');
            label.textContent = month;
            label.style.marginTop = '8px';
            label.style.fontSize = '12px';
            label.style.color = '#666';
            
            barWrapper.appendChild(bar);
            barWrapper.appendChild(label);
            barContainer.appendChild(barWrapper);
        });
        
        // Add chart title and axes
        const chartTitle = document.createElement('div');
        chartTitle.textContent = 'Monthly Sales';
        chartTitle.style.marginBottom = '20px';
        chartTitle.style.fontWeight = 'bold';
        
        mockChart.appendChild(chartTitle);
        mockChart.appendChild(barContainer);
        
        // Replace placeholder with mock chart
        chartPlaceholder.innerHTML = '';
        chartPlaceholder.appendChild(mockChart);
    }
}

// AI-assisted catalog upload functionality
function initAICatalogUpload() {
    const uploadPlaceholder = document.querySelector('.upload-placeholder');
    const productImagesInput = document.getElementById('product-images');
    const previewContainer = document.querySelector('.ai-preview');
    
    if (uploadPlaceholder && productImagesInput) {
        // Handle click on upload area
        uploadPlaceholder.addEventListener('click', function() {
            productImagesInput.click();
        });
        
        // Handle drag and drop
        uploadPlaceholder.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadPlaceholder.style.borderColor = '#2196F3';
            uploadPlaceholder.style.backgroundColor = '#E3F2FD';
        });
        
        uploadPlaceholder.addEventListener('dragleave', function() {
            uploadPlaceholder.style.borderColor = '#ccc';
            uploadPlaceholder.style.backgroundColor = '';
        });
        
        uploadPlaceholder.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadPlaceholder.style.borderColor = '#ccc';
            uploadPlaceholder.style.backgroundColor = '';
            
            if (e.dataTransfer.files.length > 0) {
                handleFileUpload(e.dataTransfer.files);
            }
        });
        
        // Handle file input change
        productImagesInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFileUpload(this.files);
            }
        });
    }
    
    // Function to handle file upload and AI processing
    function handleFileUpload(files) {
        // Show loading state
        uploadPlaceholder.innerHTML = '<div class="upload-icon">⏳</div><p>Processing your images with AI...</p>';
        
        // In a real application, this would upload the files to a server
        // and process them with AI. Here we'll simulate the process.
        setTimeout(function() {
            // Update upload area to show success
            uploadPlaceholder.innerHTML = '<div class="upload-icon" style="color: #4CAF50;">✓</div><p>Images processed successfully!</p><button class="btn secondary">Upload More</button>';
            
            // Reset the button functionality
            const uploadMoreBtn = uploadPlaceholder.querySelector('button');
            if (uploadMoreBtn) {
                uploadMoreBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent triggering the parent's click event
                    productImagesInput.click();
                });
            }
            
            // Show the AI preview section
            if (previewContainer) {
                previewContainer.style.display = 'block';
                
                // Update preview image if available
                const previewImage = previewContainer.querySelector('.preview-image');
                if (previewImage && files[0]) {
                    // In a real app, this would display the actual uploaded image
                    previewImage.innerHTML = '<p>AI-Enhanced Product Image</p>';
                    previewImage.style.backgroundColor = '#FFC107';
                }
                
                // Simulate AI generating product details
                simulateAIProductGeneration();
            }
        }, 2000);
    }
    
    // Simulate AI generating product details
    function simulateAIProductGeneration() {
        // Product names the AI might generate
        const productNames = [
            'Deluxe City Construction Truck',
            'Off-Road Monster Truck Adventure Set',
            'Emergency Rescue Fire Engine',
            'Classic Wooden Cargo Hauler',
            'Remote Control Racing Truck Pro'
        ];
        
        // Product descriptions the AI might generate
        const productDescriptions = [
            'This premium construction truck toy features realistic details, durable construction, and moving parts. Perfect for children ages 3-8 who love building and imaginative play. The truck includes a functional dump bed, rotating cab, and detailed construction elements.',
            'Take adventure off-road with this rugged monster truck set. Features oversized wheels with real suspension, detailed engine, and durable construction for indoor and outdoor play. Ideal for children who love action-packed play scenarios.',
            'Inspire heroic play with this detailed fire engine featuring extending ladder, working water cannon (no real water), flashing lights, and authentic siren sounds. Built to spark imagination and role-playing scenarios.',
            'This eco-friendly wooden truck is handcrafted from sustainable materials with non-toxic paints. Features removable cargo pieces, smooth-rolling wheels, and timeless design that will be treasured for years.',
            'Experience the thrill of remote control driving with this high-performance racing truck. Features responsive controls, durable crash-resistant body, and rechargeable battery for extended play time.'
        ];
        
        // Randomly select product details
        const randomIndex = Math.floor(Math.random() * productNames.length);
        const productName = productNames[randomIndex];
        const productDescription = productDescriptions[randomIndex];
        
        // Price ranges based on product type
        const minPrice = 19.99;
        const maxPrice = 49.99;
        const price = (minPrice + Math.random() * (maxPrice - minPrice)).toFixed(2);
        
        // Update the form fields with AI-generated content
        const nameInput = document.getElementById('product-name');
        const descriptionInput = document.getElementById('product-description');
        const priceInput = document.getElementById('product-price');
        
        if (nameInput) nameInput.value = productName;
        if (descriptionInput) descriptionInput.value = productDescription;
        if (priceInput) priceInput.value = `$${price}`;
        
        // Add typing animation effect to simulate AI thinking
        animateTyping(nameInput, productName);
        setTimeout(() => {
            animateTyping(descriptionInput, productDescription);
        }, 1000);
        setTimeout(() => {
            animateTyping(priceInput, `$${price}`);
        }, 2500);
    }
    
    // Animate typing effect for AI-generated content
    function animateTyping(element, finalText) {
        if (!element) return;
        
        element.value = '';
        let i = 0;
        
        function type() {
            if (i < finalText.length) {
                element.value += finalText.charAt(i);
                i++;
                setTimeout(type, 30 + Math.random() * 50); // Random typing speed for realism
            }
        }
        
        type();
    }
}

// AI insights functionality
function initAIInsights() {
    // This is a placeholder for actual AI insights integration
    console.log('AI insights initialized');
    
    // In a real application, this would fetch insights from an AI service
    // For now, we'll just add some visual enhancements
    
    const insightItems = document.querySelectorAll('.insight-item');
    if (insightItems.length > 0) {
        // Add hover effect to insights
        insightItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f5f5f5';
                this.style.borderRadius = '10px';
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.transform = '';
            });
        });
    }
}

// Set up dashboard event listeners
function setupDashboardEventListeners() {
    // Date range selector
    const dateRangeSelect = document.getElementById('date-range');
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', function() {
            // In a real app, this would update the dashboard data based on the selected date range
            console.log('Date range changed to:', this.value);
            alert(`Dashboard data updated for ${this.value}`);
            
            // Simulate updating the stats
            updateStatsForDateRange(this.value);
        });
    }
    
    // Save product button
    const saveProductBtn = document.querySelector('.preview-actions .primary');
    if (saveProductBtn) {
        saveProductBtn.addEventListener('click', function() {
            const productName = document.getElementById('product-name').value;
            alert(`Product "${productName}" saved successfully!`);
            
            // In a real app, this would save the product to the database
            // and redirect to the product listing page or clear the form
        });
    }
    
    // Edit details button
    const editDetailsBtn = document.querySelector('.preview-actions .secondary');
    if (editDetailsBtn) {
        editDetailsBtn.addEventListener('click', function() {
            // Toggle the AI-generated class to indicate manual editing
            const aiGeneratedFields = document.querySelectorAll('.ai-generated');
            aiGeneratedFields.forEach(field => {
                field.classList.toggle('ai-generated');
                
                // Toggle the AI badge visibility
                const badge = field.nextElementSibling;
                if (badge && badge.classList.contains('ai-badge')) {
                    badge.style.display = badge.style.display === 'none' ? 'inline-block' : 'none';
                }
            });
            
            // Update button text
            this.textContent = this.textContent === 'Edit Details' ? 'Use AI Suggestions' : 'Edit Details';
        });
    }
    
    // Dashboard navigation
    const navItems = document.querySelectorAll('.dashboard-nav li a');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.parentElement.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.parentElement.classList.add('active');
            
            // In a real app, this would navigate to the corresponding dashboard section
            alert(`Navigating to ${this.textContent} section`);
        });
    });
}

// Update stats based on selected date range
function updateStatsForDateRange(dateRange) {
    // This is a simulation of updating stats based on date range
    // In a real app, this would fetch data from the server
    
    const statValues = document.querySelectorAll('.stat-value');
    const statChanges = document.querySelectorAll('.stat-change');
    
    // Generate random stats based on date range
    const multiplier = dateRange === 'Last 7 days' ? 1 :
                      dateRange === 'Last 30 days' ? 4 :
                      dateRange === 'Last 90 days' ? 12 : 52;
    
    // Update each stat with a random value
    if (statValues.length > 0) {
        // Sales value
        const salesBase = 3000;
        const salesValue = (salesBase * multiplier + Math.random() * salesBase).toFixed(0);
        statValues[0].textContent = `$${salesValue}`;
        
        // Orders value
        const ordersBase = 40;
        const ordersValue = Math.floor(ordersBase * multiplier + Math.random() * ordersBase);
        statValues[1].textContent = ordersValue;
        
        // Views value
        const viewsBase = 800;
        const viewsValue = Math.floor(viewsBase * multiplier + Math.random() * viewsBase);
        statValues[2].textContent = viewsValue.toLocaleString();
        
        // Rating value - keep this relatively stable
        const ratingBase = 4.7;
        const ratingValue = (ratingBase + (Math.random() * 0.4 - 0.2)).toFixed(1);
        statValues[3].textContent = `${ratingValue}/5`;
    }
    
    // Update change percentages
    if (statChanges.length > 0) {
        statChanges.forEach(change => {
            // Generate random change percentage between -10% and +30%
            const changeValue = (Math.random() * 40 - 10).toFixed(1);
            const isPositive = changeValue > 0;
            
            change.textContent = `${isPositive ? '+' : ''}${changeValue}% from last period`;
            change.className = `stat-change ${isPositive ? 'positive' : 'negative'}`;
        });
    }
}