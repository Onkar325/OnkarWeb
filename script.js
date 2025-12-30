// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Smooth Parallax movement for the scattered layer
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;
    let currentX = mouseX;
    let currentY = mouseY;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateParallax() {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        
        const moveX = (currentX - window.innerWidth / 2) * 0.15;
        const moveY = (currentY - window.innerHeight / 2) * 0.15;
        
        const bgLayer = document.getElementById('bg-layer');
        if (bgLayer) {
            bgLayer.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
        
        requestAnimationFrame(animateParallax);
    }
    animateParallax();

    // Create floating particles
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (10 + Math.random() * 20) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 30000);
    }

    // Create particles periodically
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle();
            setInterval(createParticle, 3000);
        }, i * 200);
    }

    // Button click animation
    const btnStart = document.querySelector('.btn-start');
    const floatingImages = document.querySelectorAll('.floating-img');

    if (btnStart) {
        btnStart.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(0, 0, 0, 0.2)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });

        // Smooth scroll on button click (if needed for navigation)
        btnStart.addEventListener('click', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            
            // Mark that we're coming from new.html
            sessionStorage.setItem('fromNewPage', 'true');
            
            // Add zoom-out effect to body
            document.body.classList.add('zoom-out');
            
            // Navigate to create.html after zoom animation
            setTimeout(() => {
                window.location.href = '../onkar/create.html';
            }, 600);
        });
    }

    // Add subtle glow effect on hover for images
    floatingImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 50px rgba(255, 255, 255, 0.2), 0 15px 35px rgba(0,0,0,0.5)';
        });
        img.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.4)';
        });
    });
});

