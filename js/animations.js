// GSAP Animations for Phishing Awareness Training

document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Set default animation properties
    gsap.defaults({ ease: 'power2.out' });
    
    // Initialize animations
    initHeroAnimations();
    initSectionAnimations();
    initScrollAnimations();
    initInteractiveElements();
    
    // Log that animations are initialized
    console.log('GSAP animations initialized');
});

// Hero section animations
function initHeroAnimations() {
    // Hero text animation
    const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: 'back.out(1.2)' } });
    
    heroTl.from('.hero h1', { 
        y: 50, 
        opacity: 0, 
        duration: 1,
        ease: 'power3.out'
    })
    .from('.hero .subtitle', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8 
    }, '-=0.5')
    .from('.cta-button', { 
        y: 30, 
        opacity: 0, 
        duration: 0.8 
    }, '-=0.4')
    .from('.scroll-indicator', { 
        y: 20, 
        opacity: 0, 
        duration: 0.8 
    }, '-=0.3');
    
    // Background elements animation
    gsap.to('.hero::before', {
        backgroundPosition: '50% 50%',
        duration: 30,
        repeat: -1,
        ease: 'none'
    });
}

// Section entrance animations
function initSectionAnimations() {
    // Animate section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
        
        // Animate the underline
        gsap.from(title + '::after', {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            scaleX: 0,
            transformOrigin: 'left center',
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.3
        });
    });
    
    // Animate cards in recognition section
    gsap.utils.toArray('.recognition-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'back.out(1.2)'
        });
    });
    
    // Animate tactic cards with staggered animation
    gsap.utils.toArray('.tactic-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Animate practice items with staggered animation
    gsap.utils.toArray('.practice-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power2.out'
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Parallax effect for sections
    gsap.utils.toEach('.section', (section, i) => {
        const bg = section.querySelector('.section-bg');
        if (bg) {
            gsap.to(bg, {
                y: (i % 2 === 0) ? '30%' : '-30%',
                scrollTrigger: {
                    trigger: section,
                    scrub: 1
                }
            });
        }
    });
    
    // Fade in/out navigation on scroll
    const nav = document.querySelector('.main-nav');
    if (nav) {
        let lastScroll = 0;
        const navbarHeight = nav.offsetHeight;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.style.transform = 'translateY(0)';
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > navbarHeight) {
                // Scrolling down
                gsap.to(nav, { y: -navbarHeight, duration: 0.3 });
            } else {
                // Scrolling up
                gsap.to(nav, { y: 0, duration: 0.3 });
            }
            
            lastScroll = currentScroll;
        });
    }
}

// Interactive elements animations
function initInteractiveElements() {
    // Button hover effects
    const buttons = document.querySelectorAll('button, .button, .info-button');
    
    buttons.forEach(button => {
        // Skip if button has no-text class or is a quiz option
        if (button.classList.contains('no-text') || button.closest('.quiz-options')) {
            return;
        }
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        });
        
        // Click animation
        button.addEventListener('mousedown', () => {
            gsap.to(button, { 
                scale: 0.95, 
                duration: 0.1 
            });
        });
        
        button.addEventListener('mouseup', () => {
            gsap.to(button, { 
                scale: 1, 
                duration: 0.2 
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, { 
                scale: 1, 
                duration: 0.2 
            });
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.recognition-card, .tactic-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        });
    });
    
    // Quiz option hover effects
    const quizOptions = document.querySelectorAll('.quiz-option');
    
    quizOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            if (!option.classList.contains('selected') && 
                !option.classList.contains('correct') && 
                !option.classList.contains('incorrect')) {
                gsap.to(option, {
                    backgroundColor: '#f0f4ff',
                    borderColor: '#4361ee',
                    duration: 0.2
                });
            }
        });
        
        option.addEventListener('mouseleave', () => {
            if (!option.classList.contains('selected') && 
                !option.classList.contains('correct') && 
                !option.classList.contains('incorrect')) {
                gsap.to(option, {
                    backgroundColor: '#f8f9fa',
                    borderColor: 'transparent',
                    duration: 0.2
                });
            }
        });
    });
}

// Smooth scroll to section
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: {
                        y: target,
                        offsetY: 80 // Adjust for fixed nav
                    },
                    duration: 1,
                    ease: 'power2.inOut'
                });
            }
        });
    });

    // Make the hero scroll indicator clickable
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            gsap.to(window, {
                scrollTo: {
                    y: '#phishing-recognition',
                    offsetY: 80
                },
                duration: 1.2,
                ease: 'power3.inOut'
            });
        });
    }
}

// Call the setup function after initializing other animations
document.addEventListener('DOMContentLoaded', setupSmoothScrolling);

// Animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initial check in case elements are already in view
animateOnScroll();

// Helper function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add animation to modal when shown
document.addEventListener('showModal', function(e) {
    const modal = e.detail.modal;
    
    gsap.from(modal, {
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'back.out(1.2)'
    });
});
