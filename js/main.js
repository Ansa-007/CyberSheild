// Main JavaScript for Phishing Awareness Training

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initLoadingScreen();
    initNavigation();
    initBackToTop();
    initScrollAnimations();
    initProgressBar();
    
    // Add any additional initialization here
    
    // Log that the main script has loaded
    console.log('Main script initialized');
});

// Initialize loading screen
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after page is fully loaded
    window.addEventListener('load', function() {
        // Add fade-out class to trigger the fade-out animation
        loadingScreen.classList.add('fade-out');
        
        // Remove loading screen from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    });
}

// Initialize navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when a nav item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 991) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            // Add active class to clicked nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Highlight active section in navigation
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                navItems.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to corresponding nav item
                const activeNavItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    });
}


// Initialize back to top button
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            gsap.to(window, { scrollTo: 0, duration: 1, ease: 'power2.inOut' });
        });
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Check if elements are in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.8) &&
            rect.bottom >= (window.innerHeight * 0.2)
        );
    }
    
    // Add visible class to elements in viewport
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Check on resize (in case layout changes)
    window.addEventListener('resize', handleScrollAnimation);
}

// Initialize progress bar
function initProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrolled = (window.scrollY / documentHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}


// Function to show phishing examples (called from HTML)
function showExample(type) {
    let title, content;
    
    switch(type) {
        case 'email':
            title = 'Suspicious Email Example';
            content = `
                <div class="email-example">
                    <div class="email-header">
                        <p><strong>From:</strong> support@yourbank.com <span class="fake-address">(actually from: support@y0urbank.biz)</span></p>
                        <p><strong>Subject:</strong> Urgent: Your Account Has Been Compromised!</p>
                    </div>
                    <div class="email-body">
                        <p>Dear Valued Customer,</p>
                        <p>We've detected unusual activity on your account. To secure your account, please click the link below immediately to verify your information.</p>
                        <p><a href="#" class="phishing-link">https://yourbank.secure-login.com</a> (actually points to malicious site)</p>
                        <p>If you do not take action within 24 hours, your account will be suspended.</p>
                        <p>Best regards,<br>Security Team</p>
                    </div>
                </div>
                <div class="red-flags">
                    <h4>Red Flags:</h4>
                    <ul>
                        <li>Generic greeting instead of your name</li>
                        <li>Urgent call to action creating panic</li>
                        <li>Suspicious sender email address</li>
                        <li>Link doesn't match the legitimate bank's domain</li>
                        <li>Threat of account suspension if immediate action isn't taken</li>
                    </ul>
                </div>
            `;
            break;
            
        case 'link':
            title = 'Fake Link Example';
            content = `
                <div class="link-example">
                    <p>Hover over links to see their actual destination before clicking.</p>
                    <div class="link-display">
                        <p>What you see: <span class="safe">https://www.paypal.com/account/verify</span></p>
                        <p>Actual destination: <span class="danger">https://www.paypa1.com.hacker.ru/steal-info</span></p>
                    </div>
                    <div class="tips">
                        <h4>Tips to spot fake links:</h4>
                        <ul>
                            <li>Check for misspellings in the domain name (e.g., paypa1.com instead of paypal.com)</li>
                            <li>Look for hyphens or numbers in the domain that seem out of place</li>
                            <li>Be cautious of shortened URLs (bit.ly, tinyurl.com, etc.) as they can hide the real destination</li>
                            <li>When in doubt, type the website address directly into your browser</li>
                        </ul>
                    </div>
                </div>
            `;
            break;
            
        case 'urgent':
            title = 'Urgent Request Example';
            content = `
                <div class="urgent-example">
                    <div class="alert alert-danger">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h4>URGENT: Your subscription will be renewed for $299.99 in 24 hours!</h4>
                        <p>Click here to cancel: <a href="#" class="phishing-link">www.service-update.com/cancel</a></p>
                    </div>
                    <div class="red-flags">
                        <h4>Why this is suspicious:</h4>
                        <ul>
                            <li>Creates a false sense of urgency to pressure you into acting quickly</li>
                            <li>Uses alarming language and threats of unexpected charges</li>
                            <li>Generic message that could apply to any service</li>
                            <li>Link goes to a different domain than the legitimate service</li>
                            <li>No specific information about your account or subscription</li>
                        </ul>
                    </div>
                    <div class="what-to-do">
                        <h4>What to do instead:</h4>
                        <ol>
                            <li>Don't click any links in the message</li>
                            <li>If you're concerned, log in to your account directly (not through the email link)</li>
                            <li>Contact the company's official customer support using a phone number or email from their official website</li>
                            <li>Check your account settings for any suspicious activity</li>
                        </ol>
                    </div>
                </div>
            `;
            break;
            
        default:
            title = 'Example';
            content = 'Example content not found.';
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'phishing-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="button close-button">Close</button>
            </div>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add close functionality
    const closeButtons = modal.querySelectorAll('.close-modal, .close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        });
    });
    
    // Close when clicking outside modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }
    });
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .phishing-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .phishing-modal .modal-content {
            background: white;
            border-radius: 8px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
            position: relative;
            animation: modalFadeIn 0.3s ease;
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .phishing-modal .modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            background: white;
            z-index: 10;
        }
        
        .phishing-modal .modal-header h3 {
            margin: 0;
            color: var(--primary-color);
        }
        
        .phishing-modal .close-modal {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: var(--gray-color);
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: var(--transition);
        }
        
        .phishing-modal .close-modal:hover {
            background: #f5f5f5;
            color: var(--danger-color);
        }
        
        .phishing-modal .modal-body {
            padding: 20px;
        }
        
        .phishing-modal .modal-footer {
            padding: 15px 20px;
            border-top: 1px solid #eee;
            display: flex;
            justify-content: flex-end;
        }
        
        .email-example {
            border: 1px solid #ddd;
            border-radius: 5px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .email-header {
            background: #f5f5f5;
            padding: 15px;
            border-bottom: 1px solid #ddd;
            font-family: monospace;
            font-size: 14px;
        }
        
        .email-body {
            padding: 20px;
            background: white;
            font-family: Arial, sans-serif;
        }
        
        .phishing-link {
            color: #d32f2f;
            text-decoration: underline;
        }
        
        .red-flags {
            background: #fff8f8;
            border-left: 4px solid #f44336;
            padding: 15px;
            margin: 20px 0;
        }
        
        .red-flags h4 {
            color: #d32f2f;
            margin-top: 0;
        }
        
        .red-flags ul {
            margin-bottom: 0;
        }
        
        .fake-address {
            color: #f44336;
            font-style: italic;
        }
        
        .link-display {
            background: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-family: monospace;
            font-size: 14px;
        }
        
        .safe {
            color: #4caf50;
        }
        
        .danger {
            color: #f44336;
            text-decoration: underline;
        }
        
        .alert {
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }
        
        .alert-danger {
            background: #ffebee;
            border-left: 4px solid #f44336;
        }
        
        .alert i {
            margin-right: 10px;
            font-size: 24px;
            color: #f44336;
        }
        
        .what-to-do {
            background: #e8f5e9;
            border-left: 4px solid #4caf50;
            padding: 15px;
            margin-top: 20px;
        }
        
        .what-to-do h4 {
            color: #2e7d32;
            margin-top: 0;
        }
        
        @media (max-width: 768px) {
            .phishing-modal .modal-content {
                max-height: 85vh;
            }
            
            .phishing-modal .modal-body {
                padding: 15px;
            }
            
            .email-header, .email-body, .link-display {
                font-size: 13px;
                padding: 10px;
            }
            
            .alert {
                flex-direction: column;
                align-items: flex-start;
            }
            
            .alert i {
                margin-bottom: 10px;
            }
        }
    `;
    
    document.head.appendChild(style);
}
