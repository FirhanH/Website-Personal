// ===========================
// Smooth Scrolling Navigation
// ===========================
document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const primaryBtn = document.querySelector('.primary-btn');

    // ===========================
    // Smooth scroll to section
    // ===========================
    function scrollToSection(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // ===========================
    // Primary button scroll
    // ===========================
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectSection = document.querySelector('#project');

            if (projectSection) {
                const offsetTop = projectSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ===========================
    // Active Navigation on Scroll
    // ===========================
    function setActiveNav() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // ===========================
    // Mobile Menu Toggle
    // ===========================
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.addEventListener('click', function(e) {
            if (
                !navMenu.contains(e.target) &&
                !mobileMenuToggle.contains(e.target)
            ) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===========================
    // Scroll Animations
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.service-card, .skill-card, .project-card, .about-text, .about-image-wrapper, .contact-form-wrapper, .contact-illustration'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // ===========================
    // Navbar Background on Scroll
    // ===========================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });

    // ===========================
    // Project Links (FIXED DUPLICATE)
    // ===========================
    const projectLinks = document.querySelectorAll('.project-link');

    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(
                'Project clicked:',
                this.closest('.project-card')
                    .querySelector('.project-title')
                    .textContent
            );
        });
    });

    // ===========================
    // View Resume Button
    // ===========================
    const viewResumeBtn = document.querySelector('.view-resume-btn');

    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', function() {
            console.log('View Resume clicked');
            alert('Resume download functionality would be implemented here.');
        });
    }

    // ===========================
    // Social Links Analytics
    // ===========================
    const socialLinks = document.querySelectorAll(
        '.social-links a, .social-footer-links a'
    );

    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.getAttribute('aria-label') || 'Social';
            console.log(`${platform} link clicked`);
        });
    });

    // ===========================
    // Parallax Effect for Background Blobs
    // ===========================
    const bgBlobs = document.querySelectorAll('.bg-blob');

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;

        bgBlobs.forEach((blob, index) => {
            const speed = 0.5 + index * 0.2;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===========================
    // Performance: Lazy Load Images
    // ===========================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===========================
    // Skill Cards Stagger Animation
    // ===========================
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    // ===========================
    // Service Cards Hover Effect
    // ===========================
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition =
                'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // ===========================
    // Initialize on Load
    // ===========================
    setActiveNav();

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // ===========================
    // Keyboard Navigation
    // ===========================
    document.addEventListener('keydown', function(e) {
        if (
            e.key === 'Escape' &&
            navMenu.classList.contains('active')
        ) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });

    // ===========================
    // Smooth Scroll for Anchor Links
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('nav-link')) {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(
                    this.getAttribute('href')
                );
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // ===========================
    // Ripple Effect
    // ===========================
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        const rippleEffect =
            button.getElementsByClassName('ripple')[0];

        if (rippleEffect) {
            rippleEffect.remove();
        }

        button.appendChild(ripple);
    }

    const buttons = document.querySelectorAll(
        '.primary-btn, .submit-btn, .view-resume-btn'
    );

    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });

    const style = document.createElement('style');
    style.innerHTML = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c👋 Welcome to Firhan Hafiansyah\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2F80ED;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #4A5568;');