const doctors = [
    {
        name: "Dr. Marie Dubois",
        specialty: "Médecine générale",
        email: "marie.dubois@cabinet-sugiez.ch",
        photo: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
        name: "Dr. Jean Martin",
        specialty: "Pédiatrie",
        email: "jean.martin@cabinet-sugiez.ch",
        photo: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
        name: "Dr. Sophie Laurent",
        specialty: "Cardiologie",
        email: "sophie.laurent@cabinet-sugiez.ch",
        photo: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "Dr. Lucas Bernard",
        specialty: "Orthopédie",
        email: "",
        photo: "https://randomuser.me/api/portraits/men/32.jpg"
    }
];

function renderDoctors() {
    const grid = document.getElementById('doctorsGrid');
    grid.innerHTML = '';

    doctors.forEach((doctor, index) => {
        const card = document.createElement('article');
        card.className = 'doctor-card';
        card.setAttribute('tabindex', '0');
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <img src="${doctor.photo}" alt="Photo de ${doctor.name}" class="doctor-photo" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
            <h3>${doctor.name}</h3>
            <p class="doctor-specialty">${doctor.specialty}</p>
            ${doctor.email ? `<p class="doctor-email"><a href="mailto:${doctor.email}">${doctor.email}</a></p>` : `<p class="doctor-email" style="color:#9b9b9f">Email non fourni</p>`}
        `;

        grid.appendChild(card);
    });
}

// ============================================
// NAVIGATION MOBILE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
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

// Gestion du formulaire de demande de dossiers médicaux
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

// Gestion du formulaire de rendez-vous
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
// FORMULAIRE DE CONTACT
// ============================================
// const contactForm = document.getElementById('contactForm');
//
// if (contactForm) {
//     contactForm.addEventListener('submit', async (e) => {
//         // e.preventDefault();
//
//         // Récupération des données
//         const formData = new FormData(contactForm);
//
//         // Récupération du select et remplacement de la value par le texte
//         const subjectSelect = document.getElementById('subject');
//         console.log('Subject value avant modification:', formData.get('subject'));
//         const subjectText = subjectSelect.options[subjectSelect.selectedIndex].text;
//         console.log('Subject texte:', subjectText);
//
//         // Remplacer la valeur du subject
//         formData.set('subject', subjectText);  // ENSUITE le modifier
//         console.log('Subject value après modification:', formData.get('subject'));
//
//         console.log('Action:', contactForm.action);
//         console.log('Subject envoyé:', subjectText);
//
//         try {
//             const response = await fetch(contactForm.action, {
//                 method: 'POST',
//                 body: formData,
//                 headers: {
//                     'Accept': 'application/json'
//                 }
//             });
//
//             // // todo : ajouter un temps d'attente (~1 sec)
//             // if (response.ok) {
//             //     showNotification('Message envoyé avec succès! Nous vous répondrons dans les plus brefs délais.', 'success');
//             //     contactForm.reset();
//             // } else {
//             //     showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
//             // }
//         } catch (error) {
//             showNotification('Erreur de connexion. Veuillez réessayer plus tard.', 'error');
//         }
//     });
// }



// ============================================
// SYSTÈME DE NOTIFICATION
// ============================================
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
// PERFORMANCE: LAZY LOADING IMAGES
// ============================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback pour les navigateurs plus anciens
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Site PM Sugiez chargé avec succès');

    // Vérifier si nous sommes sur mobile
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        console.log('📱 Version mobile détectée');
    }

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
    renderDoctors();
    setupScrollAnimations();
    setupSmoothScroll();

    // Écouter le scroll
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Vérifier l'état initial
})
