// Check if coming from new.html and apply zoom-in transition
if (document.referrer.includes('new.html') || sessionStorage.getItem('fromNewPage') === 'true') {
    document.body.classList.add('page-transition');
    sessionStorage.removeItem('fromNewPage');
}

// Initialize all functionality after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with mobile optimizations
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            const isMobile = window.innerWidth <= 768;
            AOS.init({
                duration: isMobile ? 600 : 800,
                offset: isMobile ? 50 : 100,
                once: true,
                delay: 0,
                easing: 'ease-out-cubic',
                disable: isMobile ? false : false, // Keep enabled but optimized
                useClassNames: false,
                disableMutationObserver: false
            });
        } else {
            // Retry if AOS hasn't loaded yet
            setTimeout(initAOS, 100);
        }
    }
    initAOS();

    // Typing Animation
    let typingInitialized = false;
    function initTyping() {
        if (typingInitialized) return;
        typingInitialized = true;
        
        const typingText = document.querySelector('.typing-text');
        if (!typingText) return;
        
        const words = ['Full Stack Developer', 'Data Analyst', 'Problem Solver', 'Tech Enthusiast'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 200;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 100;
            } else {
                typingText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 200;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingDelay = 500;
            }

            setTimeout(type, typingDelay);
        }

        type();
    }
    initTyping();
    
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.getAttribute('data-theme') === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('active');
                if (mobileMenu) mobileMenu.classList.remove('active');
            }
        });
    });

    // Navbar Scroll Effect (optimized for mobile)
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    if (navbar) {
        function updateNavbar() {
            const currentScroll = window.pageYOffset;

            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                ticking = false;
                return;
            }

            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    // Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            console.log('Form submitted:', formData);

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.disabled = true;

            contactForm.reset();

            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Skill Progress Animation
    const skillCards = document.querySelectorAll('.skill-card');

    const animateSkills = () => {
        skillCards.forEach(card => {
            const progress = card.querySelector('.skill-progress');
            if (progress) {
                const width = progress.style.width;
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = width;
                }, 200);
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: window.innerWidth <= 768 ? 0.3 : 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid) {
        observer.observe(skillsGrid);
    }
});
