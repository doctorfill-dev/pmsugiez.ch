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

// Intersection Observer pour les animations au scroll
function setupScrollAnimations() {
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

    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.contact-item, .section-header');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scroll pour les ancres
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
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
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderDoctors();
    setupScrollAnimations();
    setupSmoothScroll();

    // Écouter le scroll
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Vérifier l'état initial
});
