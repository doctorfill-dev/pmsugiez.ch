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

    doctors.forEach(doctor => {
        const card = document.createElement('article');
        card.className = 'doctor-card';
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
            <img src="${doctor.photo}" alt="Photo de ${doctor.name}" class="doctor-photo" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/150';">
            <h3>${doctor.name}</h3>
            <p class="doctor-specialty">${doctor.specialty}</p>
            ${doctor.email ? `<p class="doctor-email"><a href="mailto:${doctor.email}">${doctor.email}</a></p>` : `<p class="doctor-email" style="color:#9b9b9f">Email non fourni</p>`}
        `;

        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderDoctors);
