// ============================================
// NAVIGATION MOBILE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');

// Toggle menu mobile
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Animation du bouton hamburger
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fermer le menu mobile au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// ============================================
// HIGHLIGHT ACTIVE NAV LINK
// ============================================
function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
document.addEventListener('DOMContentLoaded', highlightNavigation);

// ============================================
// MAJ DATE DU FOOTER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// ============================================
// VIDÉO DE FOND
// ============================================
// ============================================
// VIDÉO DE FOND
// ============================================
function updateHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    const source = video.querySelector('source');
    if (!source) return;

    const isDesktop = window.innerWidth >= 1025;

    if (isDesktop) {
        // Lazy-load : on ne met la vraie source que sur desktop
        if (!source.src) {
            const dataSrc = source.dataset.src;
            if (dataSrc) {
                source.src = dataSrc;
                video.load();
            }
        }

        // Lancer la lecture (muted + playsinline → autoplay ok)
        video.play().catch(() => {
            // Si l’autoplay échoue, on ne casse rien
        });
    } else {
        // Mobile / tablette : on arrête tout pour les perfs
        video.pause();

        if (source.src) {
            source.removeAttribute('src');
            video.load(); // libère le buffer
        }
    }
}

document.addEventListener('DOMContentLoaded', updateHeroVideo);

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }

        // Mettre à jour la vidéo de fond
        updateHeroVideo();
    }, 250);
});

// ============================================
// ANIMATIONS AU SCROLL (cartes principales)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.team-card, .service-card, .horaires-card, .info-box, .info-box-secondary, .contact-card, .contact-form-container'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// CARROUSEL AUTOMATIQUE - DR. BERTRAND CURTY
// ============================================
class PhotoCarousel {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.dots = this.container.querySelectorAll('.dot');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.autoplayDelay = 4000; // 4 secondes

        this.init();
    }

    init() {
        // Clic sur les points
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Autoplay
        this.startAutoplay();

        // Pause au survol
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        this.pauseAutoplay();

        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        setTimeout(() => this.startAutoplay(), 4000);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        this.currentIndex = nextIndex;
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    startAutoplay() {
        if (this.autoplayInterval) return;

        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel('bertrandCarousel');
});