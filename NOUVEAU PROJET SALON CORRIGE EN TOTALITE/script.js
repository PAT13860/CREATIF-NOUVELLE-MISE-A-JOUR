/* ======  ====================================================
   js/script.js
   Rôle : slider automatique, menu burger, bandeau cookies,
          parallaxe mobile-friendly et animations d'apparition
   Modern JS (let / const) + commentaires ligne par ligne
   ========================================================== */



/* ----------------------------------------------------------
    BANDEAU COOKIES (RGPD)
   - Stocke le choix dans localStorage sous la clé 'creatif_cookies'
   - Valeurs possibles : 'accepted' ou 'declined'
---------------------------------------------------------- */

const COOKIE_KEY = 'creatif_cookies';
const cookieBanner = document.getElementById('cookie-banner');
const acceptBtn    = document.getElementById('accept-cookies');
const declineBtn   = document.getElementById('decline-cookies');
const manageBtn    = document.getElementById('manage-cookies');
const storedConsent = localStorage.getItem(COOKIE_KEY);

// --- Affichage initial ---
if (cookieBanner) {
  cookieBanner.style.display = storedConsent ? 'none' : 'flex';
  cookieBanner.setAttribute('aria-hidden', !!storedConsent);
}
if (storedConsent && manageBtn) manageBtn.style.display = 'block';

// --- Fonction utilitaire pour enregistrer le choix ---
const setConsent = (value) => {
  localStorage.setItem(COOKIE_KEY, value);
  if (cookieBanner) {
    cookieBanner.style.display = 'none';
    cookieBanner.setAttribute('aria-hidden', 'true');
  }
  if (manageBtn) manageBtn.style.display = 'block';
};

// --- Gestion des boutons ---
acceptBtn?.addEventListener('click', () => setConsent('accepted'));
declineBtn?.addEventListener('click', () => setConsent('declined'));
manageBtn?.addEventListener('click', () => {
  if (cookieBanner) {
    cookieBanner.style.display = 'flex';
    cookieBanner.setAttribute('aria-hidden', 'false');
  }
  manageBtn.style.display = 'none';
});

/* ----------------------------------------------------------
   SLIDER AUTOMATIQUE SIMPLE
   - Fait défiler les éléments .slide dans .slider
   - Animation fluide sans bibliothèque externe
---------------------------------------------------------- */

// Sélectionne toutes les diapositives du slider
const slides = [...document.querySelectorAll('.slider .slide')];

// Si aucune slide n’est trouvée, on arrête le script
if (!slides.length) return;

// Positionne chaque slide horizontalement les unes à la suite des autres
slides.forEach((s, i) => s.style.transform = `translateX(${i * 100}%)`);

// Initialise l’index de la slide active à 0
let i = 0;

// Lance une boucle automatique toutes les 4,5 secondes (4500 ms)
setInterval(() => {
  // Passe à la slide suivante, et revient à la première à la fin
  i = (i + 1) % slides.length;

  // Déplace toutes les slides selon l’index actif
  slides.forEach((s, j) => {
    s.style.transform = `translateX(${(j - i) * 100}%)`;
  });
}, 4500);


  /* ----------------------------------------------------------
    3–6) INTERACTIONS GLOBALES SIMPLIFIÉES
   - Menu burger responsive
   - Effet parallaxe fluide
   - Apparition des sections (IntersectionObserver)
---------------------------------------------------------- */

//  MENU BURGER
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links, nav');

if (burger && nav) {
  burger.onclick = () => {
    nav.classList.toggle('open');
    burger.classList.toggle('active');
    burger.textContent = burger.classList.contains('active') ? '✖' : '☰';
  };
}

//  PARALLAXE
const parallax = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () =>
  parallax.forEach(el => {
    const s = +el.dataset.speed || 0.3;
    el.style.transform = `translateY(${scrollY * s}px)`;
  }),
  { passive: true }
);

//  ANIMATIONS D’APPARITION
const io = new IntersectionObserver(e =>
  e.forEach(x => x.isIntersecting && x.target.classList.add('visible')),
  { threshold: 0.15 }
);
document.querySelectorAll('section').forEach(sec => io.observe(sec));

//  MESSAGE CONSOLE
console.log('%cCréa’Tif — site local prêt', 'color:#c09f7e;font-weight:bold;');
