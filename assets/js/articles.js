// Données fictives pour exemple
const ARTICLES = [
  {
    id: 1,
    title: "Premiers pas dans la poussière",
    image: "/assets/image/1.jpg",
    desc: "Notre arrivée dans la maison, les premières découvertes et les surprises du chantier.",
    date: "2025-03-12",
    cat: "etapes"
  },
  {
    id: 2,
    title: "Pourquoi rénover l'ancien ?",
    image: "/assets/image/2.jpg",
    desc: "Réflexions sur le sens de la rénovation et ce que l'ancien nous apporte.",
    date: "2025-03-18",
    cat: "reflexions"
  },
  {
    id: 3,
    title: "Partenariat avec Maison&Co",
    image: "/assets/image/3.jpg",
    desc: "Retour sur notre collaboration avec un fournisseur local de matériaux.",
    date: "2025-03-25",
    cat: "partenariats"
  },
  {
    id: 4,
    title: "Démolition : mode d'emploi",
    image: "/assets/image/4.jpg",
    desc: "Comment aborder la démolition sans stress et en toute sécurité.",
    date: "2025-04-02",
    cat: "etapes"
  },
  {
    id: 5,
    title: "Rénover en couple : nos astuces",
    image: "/assets/image/5.jpeg",
    desc: "Les clés pour garder le sourire et avancer ensemble malgré les galères.",
    date: "2025-04-10",
    cat: "reflexions"
  },
  {
    id: 6,
    title: "Partenariat : outils pro à l'essai",
    image: "/assets/image/6.jpg",
    desc: "Test de nouveaux outils et retour d'expérience sur le matériel pro.",
    date: "2025-04-18",
    cat: "partenariats"
  },
  {
    id: 7,
    title: "Avant/Après : la cuisine",
    image: "/assets/image/7.jpg",
    desc: "Transformation de la cuisine, photos et conseils pour réussir son chantier.",
    date: "2025-04-25",
    cat: "etapes"
  }
];

const ARTICLES_PER_LOAD = 6;
let currentCategory = "all";
let currentSearch = "";
let displayedCount = 0;
let filteredArticles = [];

function filterArticles() {
  filteredArticles = ARTICLES.filter(a => {
    const matchCat = currentCategory === "all" || a.cat === currentCategory;
    const matchSearch = !currentSearch || (a.title + a.desc).toLowerCase().includes(currentSearch.toLowerCase());
    return matchCat && matchSearch;
  });
  return filteredArticles;
}

function renderArticles(reset = false) {
  const list = document.getElementById("articles-list");
  if (reset) {
    displayedCount = 0;
    list.innerHTML = "";
  }
  
  const filtered = filterArticles();
  const articlesToShow = filtered.slice(displayedCount, displayedCount + ARTICLES_PER_LOAD);
  
  articlesToShow.forEach(a => {
    const card = document.createElement('div');
    card.className = 'article-card';
    card.innerHTML = `
      <div class="article-img-wrapper">
        <img class="article-img" src="${a.image}" alt="${a.title}" />
        ${a.cat === 'partenariats' ? '<span class="article-label">Partenariat</span>' : ''}
      </div>
      <div class="article-content">
        <div class="article-date">${new Date(a.date).toLocaleDateString('fr-FR')}</div>
        <div class="article-title">${a.title}</div>
        <div class="article-desc">${a.desc}</div>
        <a class="article-link" href="/article-${a.id}.html">Lire l'article</a>
      </div>
    `;
    list.appendChild(card);
  });
  
  displayedCount += articlesToShow.length;
  updateLoadingState(filtered.length);
}

function updateLoadingState(total) {
  const pag = document.getElementById("pagination");
  if (displayedCount >= total) {
    pag.innerHTML = '<p style="text-align:center;color:var(--muted);padding:1rem">Tous les articles sont affichés</p>';
  } else {
    pag.innerHTML = '<p style="text-align:center;color:var(--muted);padding:1rem">Faites défiler pour charger plus d\'articles...</p>';
  }
}

function setupFilters() {
  document.querySelectorAll('.articles-categories button').forEach(btn => {
    btn.addEventListener('click', e => {
      document.querySelectorAll('.articles-categories button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.cat;
      renderArticles(true);
    });
  });
  document.querySelector('.articles-search').addEventListener('input', e => {
    currentSearch = e.target.value;
    renderArticles(true);
  });
}

function setupInfiniteScroll() {
  let isLoading = false;
  
  window.addEventListener('scroll', () => {
    if (isLoading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Charge plus d'articles quand l'utilisateur est à 200px du bas
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      const filtered = filterArticles();
      if (displayedCount < filtered.length) {
        isLoading = true;
        renderArticles(false);
        setTimeout(() => { isLoading = false; }, 300);
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', function(){
  setupFilters();
  setupInfiniteScroll();
  renderArticles(true);
});
