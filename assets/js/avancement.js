// Données des étapes - pourront être remplacées par un appel API
const STEPS = [
  {
    id: 1,
    title: "Obtention du DPE actuel",
    status: "done", // done, ongoing, todo
    date: "2025-02-15",
    dateType: "completed", // completed, planned
    description: "Diagnostic de performance énergétique réalisé par un professionnel certifié.",
    photos: ["/assets/image/1.jpg", "/assets/image/2.jpg"]
  },
  {
    id: 2,
    title: "Chiffrage des travaux",
    status: "done",
    date: "2025-03-01",
    dateType: "completed",
    description: "Estimation complète des coûts : matériaux, main-d'œuvre et imprévus.",
    photos: ["/assets/image/devis.png"]
  },
  {
    id: 3,
    title: "Demande de prêt bancaire",
    status: "ongoing",
    date: "2025-03-10",
    dateType: "completed",
    description: "Constitution et dépôt du dossier auprès de la banque.",
    photos: []
  },
  {
    id: 4,
    title: "Accord de prêt",
    status: "todo",
    date: "2025-04-15",
    dateType: "planned",
    description: "Validation du financement et signature de l'offre de prêt.",
    photos: []
  },
  {
    id: 5,
    title: "Début des travaux - Phase 1",
    status: "todo",
    date: "2025-05-01",
    dateType: "planned",
    description: "Démarrage de la première phase : démolition et gros œuvre.",
    photos: []
  },
  {
    id: 6,
    title: "Isolation et électricité",
    status: "todo",
    date: "2025-06-15",
    dateType: "planned",
    description: "Installation de l'isolation thermique et refonte complète de l'électricité.",
    photos: []
  },
  {
    id: 7,
    title: "Plomberie et chauffage",
    status: "todo",
    date: "2025-07-20",
    dateType: "planned",
    description: "Mise en place du nouveau système de chauffage et rénovation de la plomberie.",
    photos: []
  },
  {
    id: 8,
    title: "Finitions intérieures",
    status: "todo",
    date: "2025-09-01",
    dateType: "planned",
    description: "Peintures, revêtements de sol et pose de la cuisine.",
    photos: []
  },
  {
    id: 9,
    title: "Obtention du DPE final",
    status: "todo",
    date: "2025-10-15",
    dateType: "planned",
    description: "Nouveau diagnostic pour valider l'amélioration énergétique.",
    photos: []
  }
];

function calculateProgress() {
  const done = STEPS.filter(s => s.status === 'done').length;
  const ongoing = STEPS.filter(s => s.status === 'ongoing').length;
  const todo = STEPS.filter(s => s.status === 'todo').length;
  const percentage = Math.round((done / STEPS.length) * 100);
  
  return { done, ongoing, todo, percentage };
}

function updateProgressBar() {
  const { done, ongoing, todo, percentage } = calculateProgress();
  
  const progressBar = document.getElementById('progress-bar');
  const progressBarContainer = progressBar.parentElement;
  
  progressBar.style.width = `${percentage}%`;
  progressBar.textContent = `${percentage}%`;
  progressBarContainer.setAttribute('aria-valuenow', percentage);
  
  document.getElementById('stat-done').textContent = done;
  document.getElementById('stat-ongoing').textContent = ongoing;
  document.getElementById('stat-todo').textContent = todo;
}

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  
  STEPS.forEach(step => {
    const item = document.createElement('div');
    item.className = `timeline-item ${step.status}`;
    
    const statusLabel = {
      done: 'Terminée',
      ongoing: 'En cours',
      todo: 'À venir'
    }[step.status];
    
    const dateLabel = step.dateType === 'completed' ? 'Réalisée le' : 'Prévue le';
    const formattedDate = new Date(step.date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    let photosHTML = '';
    if (step.photos && step.photos.length > 0) {
      photosHTML = '<div class="timeline-photos">' +
        step.photos.map(photo => `<img src="${photo}" alt="Photo de l'étape ${step.title}" class="timeline-photo" data-photo="${photo}" />`).join('') +
        '</div>';
    }
    
    item.innerHTML = `
      <span class="timeline-status ${step.status}">${statusLabel}</span>
      <h3 class="timeline-title">${step.title}</h3>
      <div class="timeline-date">${dateLabel} ${formattedDate}</div>
      <p class="timeline-desc">${step.description}</p>
      ${photosHTML}
    `;
    
    timeline.appendChild(item);
  });
  
  // Setup lightbox pour les photos
  setupLightbox();
}

function renderNextSteps() {
  const nextStepsList = document.getElementById('next-steps-list');
  const nextSteps = STEPS.filter(s => s.status === 'todo' || s.status === 'ongoing')
    .slice(0, 3); // Les 3 prochaines étapes
  
  if (nextSteps.length === 0) {
    nextStepsList.innerHTML = '<p style="color:var(--muted)">Aucune étape à venir pour le moment.</p>';
    return;
  }
  
  nextSteps.forEach(step => {
    const item = document.createElement('div');
    item.className = 'next-step-item';
    
    const formattedDate = new Date(step.date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    item.innerHTML = `
      <h3 class="next-step-title">${step.title}</h3>
      <div class="next-step-date">📅 ${formattedDate}</div>
      <p class="next-step-desc">${step.description}</p>
    `;
    
    nextStepsList.appendChild(item);
  });
}

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  
  document.querySelectorAll('.timeline-photo').forEach(photo => {
    photo.addEventListener('click', () => {
      lightboxImg.src = photo.dataset.photo;
      lightboxImg.alt = photo.alt;
      lightbox.classList.add('active');
    });
  });
  
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
  
  // Fermeture au clavier (Escape)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      lightbox.classList.remove('active');
    }
  });
}

// Hamburger menu (réutilisé du main.js)
function setupMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if(toggle && menu){
    toggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      menu.classList.toggle('open');
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setupMenu();
  updateProgressBar();
  renderTimeline();
  renderNextSteps();
});
