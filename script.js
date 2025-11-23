// Smooth scrolling is handled by CSS scroll-behavior: smooth

// Navbar background on scroll
// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    lastScroll = window.pageYOffset;

    if (!ticking) {
        window.requestAnimationFrame(() => {
            if (lastScroll > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
                navbar.style.boxShadow = 'none';
            }
            ticking = false;
        });

        ticking = true;
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 3000);
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .project-card, .testimonial-card, .experience-card, .approach-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Pause testimonial carousel on hover
const testimonialTrack = document.querySelector('.testimonial-track');

if (testimonialTrack) {
    testimonialTrack.addEventListener('mouseenter', () => {
        testimonialTrack.style.animationPlayState = 'paused';
    });

    testimonialTrack.addEventListener('mouseleave', () => {
        testimonialTrack.style.animationPlayState = 'running';
    });
}

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
const gridBg = document.querySelector('.grid-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (gridBg && scrolled < hero.offsetHeight) {
        gridBg.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.1}px)`;
    }
});

// Cursor trail effect (optional - can be removed if too much)
const createCursorTrail = () => {
    let dots = [];
    let mouse = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Dot {
        constructor() {
            this.x = mouse.x;
            this.y = mouse.y;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.life = 50;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life--;
            this.size *= 0.96;
        }
    }

    function animate() {
        // Create new dots less frequently
        if (Math.random() < 0.1) {
            dots.push(new Dot());
        }

        // Update and filter dots
        dots = dots.filter(dot => {
            dot.update();
            return dot.life > 0 && dot.size > 0.1;
        });

        requestAnimationFrame(animate);
    }

    // Uncomment to enable cursor trail
    // animate();
};

// Initialize cursor trail (commented out by default)
// createCursorTrail();

// Add loading animation
// Add loading animation
window.addEventListener('load', () => {
    // Ensure body is visible if it was hidden
    document.body.style.opacity = '1';
});

// Tech stack icons animation
const techIcons = document.querySelectorAll('.tech-icons span');
techIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.1}s`;
    icon.style.animation = 'fadeIn 0.5s ease forwards';
});

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.project-image').style.transform = 'scale(1.05)';
        this.querySelector('.project-image').style.transition = 'transform 0.5s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.querySelector('.project-image').style.transform = 'scale(1)';
    });
});

// Form input animations
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Add active state to navigation
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Console message for developers
console.log('%c👋 Hi there, developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #a0a0a0;');
console.log('%cContact: dev.johnmwendwa@gmail.com', 'font-size: 12px; color: #667eea;');
