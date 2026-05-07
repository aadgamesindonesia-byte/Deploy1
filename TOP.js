// BRUTAL ENTERTAIN - Interactive JavaScript
// Custom Cursor, Animations, and Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loader = document.querySelector('.loader');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500);

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        document.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: 'forwards' });
        });

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .member-card, .content-card, .social-card, .hamburger');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('hover');
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        document.body.style.cursor = 'auto';
        
        // Reset cursor for all elements
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.cursor = 'auto';
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Particle System
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 15 + 10;
        const animationDelay = Math.random() * 5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particlesContainer.appendChild(particle);
    }

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate stats numbers
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.member-card, .content-card, .about-text, .about-image').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Number Animation
    function animateNumber(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (target === 100 ? 'K+' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? 'K' : '');
            }
        }, 16);
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const particles = document.querySelector('.particles');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Glitch Effect Enhancement
    const glitchElements = document.querySelectorAll('.glitch');
    
    setInterval(() => {
        glitchElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }, 5000);

    // Member Card 3D Tilt Effect
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isTouchDevice) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Dynamic Content Loading Animation
    const contentCards = document.querySelectorAll('.content-card');
    
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    contentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        contentObserver.observe(card);
    });

    // Social Card Hover Sound Effect (Visual Feedback)
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinksArray = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Easter Egg: Konami Code
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateBrutalMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateBrutalMode() {
        document.body.style.animation = 'glitch 0.3s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
            alert('BRUTAL MODE ACTIVATED! 🔥');
        }, 1000);
    }

    // Performance: Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const particles = document.querySelectorAll('.particle');
        
        if (document.hidden) {
            particles.forEach(p => p.style.animationPlayState = 'paused');
        } else {
            particles.forEach(p => p.style.animationPlayState = 'running');
        }
    });

    // Initialize: Add visible class to hero elements immediately
    setTimeout(() => {
        document.querySelector('.hero-content').classList.add('visible');
    }, 500);
});