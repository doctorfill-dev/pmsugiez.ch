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

// Header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animation du hamburger
    const spans = hamburger.querySelectorAll('span');
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

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Activer le lien de navigation actif lors du scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

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

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des données
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulation d'envoi (à remplacer par un vrai appel API)
        console.log('Message de contact:', data);

        // Message de confirmation
        alert('Votre message a été envoyé avec succès. Nous vous répondrons rapidement.');

        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

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
