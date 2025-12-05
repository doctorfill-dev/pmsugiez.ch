
// ============================================
// NAVIGATION MOBILE
// ============================================
const navToggle = document.getElementById('navToggle'); // todo encore utilisé ?
const navMenu = document.getElementById('navMenu'); // todo encore utilisé ?
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu mobile
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

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
// todo : est-ce que l'effet est encore utilisé ?
const navbar = document.getElementById('navbar');
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

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================
// todo : est-ce que l'effet est encore utilisé ?
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// HIGHLIGHT ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');

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

// Gestion du formulaire de demande de dossiers médicaux todo : encore utilisé ?
const dossierForm = document.getElementById('dossierForm');
if (dossierForm) {
    dossierForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données
        const formData = new FormData(dossierForm);
        const data = Object.fromEntries(formData);

        // Simulation d'envoi (à remplacer par un vrai appel API)
        console.log('Demande de dossier médical:', data);

        // Message de confirmation
        alert('Votre demande de dossier médical a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais.');

        // Réinitialiser le formulaire
        dossierForm.reset();
    });
}

// Gestion du formulaire de rendez-vous todo : encore utilisé ?
const rdvForm = document.getElementById('rdvForm');
if (rdvForm) {
    rdvForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données
        const formData = new FormData(rdvForm);
        const data = Object.fromEntries(formData);

        // Simulation d'envoi (à remplacer par un vrai appel API)
        console.log('Demande de rendez-vous:', data);

        // Message de confirmation
        alert('Votre demande de rendez-vous a été envoyée avec succès. Nous vous contacterons rapidement pour confirmer.');

        // Réinitialiser le formulaire
        rdvForm.reset();
    });
}

// ============================================
// SYSTÈME DE NOTIFICATION
// ============================================
// todo : encore besoin du système de notification ? est-ce qu'à terme on se passe de Formspree ?
function showNotification(message, type = 'success') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Style de la notification
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        background: ${type === 'success' ? '#34c759' : '#ff3b30'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 16px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    // Style du bouton fermer
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

    // Ajouter au DOM
    document.body.appendChild(notification);

    // Fermer au clic
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Ajouter les animations CSS pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        background: var(--background-alt);
        color: var(--primary-color);
    }
`;
document.head.appendChild(style);

// ============================================
// MAJ date
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Mettre à jour l'année dans le footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
});

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Fermer le menu mobile si on passe en desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }, 250);
});

// Animation au scroll pour les cartes
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

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.spec-card, .prestation-item, .team-member, .prise-card, .insurance-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Validation des dates pour le formulaire de rendez-vous
const datePreferee = document.getElementById('datePreferee');
if (datePreferee) {
    // Définir la date minimum à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    datePreferee.setAttribute('min', today);
}

// Validation de la date de naissance
const dateNaissance = document.getElementById('dateNaissance');
if (dateNaissance) {
    // Définir la date maximum à aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    dateNaissance.setAttribute('max', today);
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // renderDoctors(); todo : supprimer car non utilisé
    // setupScrollAnimations(); todo : supprimer car non utilisé
    // setupSmoothScroll(); todo : supprimer car non utilisé

    // Écouter le scroll
    // window.addEventListener('scroll', handleHeaderScroll);
    // handleHeaderScroll(); // Vérifier l'état initial todo : supprimer car non utilisé
})

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
        this.autoplayDelay = 4000; // 4 secondes entre chaque photo

        this.init();
    }

    init() {
        // Ajouter les événements aux points de navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Démarrer le défilement automatique
        this.startAutoplay();

        // Pause au survol, reprise au départ
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }

    goToSlide(index) {
        // Arrêter l'autoplay quand l'utilisateur clique
        this.pauseAutoplay();

        // Masquer la slide actuelle
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Afficher la nouvelle slide
        this.currentIndex = index;
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        // Reprendre l'autoplay après 4 secondes de pause
        setTimeout(() => this.startAutoplay(), 4000);
    }

    nextSlide() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;

        // Masquer la slide actuelle
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Afficher la prochaine slide
        this.currentIndex = nextIndex;
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    startAutoplay() {
        if (this.autoplayInterval) return; // Déjà actif

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

// Initialiser le carrousel au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    new PhotoCarousel('bertrandCarousel');
});

// ============================================
// VIDÉO DE FOND
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Vidéo de fond uniquement sur grands écrans
    if (window.innerWidth >= 1025) {
        const heroVideo = document.querySelector('.hero-video');
        if (heroVideo && !heroVideo.src) {
            heroVideo.src = heroVideo.dataset.src;
        }
    }
});

