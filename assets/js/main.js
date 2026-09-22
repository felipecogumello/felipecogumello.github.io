/* ============================================
   MAIN.JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // ============================================
  // 1. SLIDER DE LOGOS — DUAS LINHAS OPOSTAS
  // ============================================
  startLogoSlider();

  // ============================================
  // 2. CARREGAR DEPOIMENTOS DO JSON
  // ============================================
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  if (testimonialsContainer) {
    fetch('assets/data/testimonials.json')
      .then(response => response.json())
      .then(testimonials => {
        testimonials.forEach(testimonial => {
          const card = document.createElement('div');
          card.className = 'testimonial-card';

          const avatarHTML = testimonial.image
            ? `<img src="${testimonial.image}" alt="${testimonial.author}" class="testimonial-avatar-large">`
            : `<div class="testimonial-avatar-placeholder">👤</div>`;

          card.innerHTML = `
            <div class="testimonial-header">
              ${avatarHTML}
              <div class="testimonial-info">
                <div class="testimonial-author-name">${testimonial.author}</div>
                <div class="testimonial-author-role">${testimonial.role}</div>
                <div class="testimonial-author-company">${testimonial.company}</div>
              </div>
            </div>
            <div class="testimonial-text">"${testimonial.text}"</div>
          `;

          testimonialsContainer.appendChild(card);
        });
      })
      .catch(error => console.log('Depoimentos não carregados:', error));
  }

  // ============================================
  // 3. SMOOTH SCROLL PARA LINKS INTERNOS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================
  // 4. FADE IN ANIMATION AO FAZER SCROLL
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa apenas cards estáticos. Os .logo-item ficam de fora
  // porque já estão em movimento contínuo via marquee; aplicar fade-in
  // neles conflita com a animação do track.
  document.querySelectorAll(
    '.service-card, .case-card, .link-block, .testimonial-card, .creative-block'
  ).forEach(el => {
    observer.observe(el);
  });

  // ============================================
  // 5. SCROLL INDICATOR NA NAVBAR
  // ============================================
  window.addEventListener('scroll', function() {
    let currentSection = '';

    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // ============================================
  // 6. MENU MOBILE TOGGLE
  // ============================================
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarMenu = document.getElementById('navbarMenu');

  if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
    });

    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
      });
    });
  }
});


// ============================================
// SLIDER DE LOGOS — DUAS LINHAS OPOSTAS
// ============================================
function startLogoSlider() {
  const track1 = document.getElementById('logosTrack1');
  const track2 = document.getElementById('logosTrack2');

  if (!track1 || !track2) {
    console.warn('[Logos] Elementos logosTrack1/logosTrack2 não encontrados no DOM.');
    return;
  }

  // 25 logos confirmadas no repositório (assets/logos/trampos/)
  const logos = [
    'aldeia.png',
    'bossa.png',
    'celta.png',
    'exati.png',
    'fantastica-startups.png',
    'fazenda.png',
    'frantic.png',
    'fretefy.png',
    'gestran.png',
    'gondolas.png',
    'herospark.png',
    'impulso.png',
    'lutoprev.png',
    'maieutics.png',
    'market4u.png',
    'ora.png',
    'pontomais.png',
    'preambulo.png',
    'premme.png',
    'rmfc.png',
    'salarustica.png',
    'targettrust.png',
    'traktor.png',
    'vispe.png',
    'weon.png'
  ];

  // Divide em duas linhas: 13 + 12 (total 25)
  const half = Math.ceil(logos.length / 2);
  const line1 = logos.slice(0, half);
  const line2 = logos.slice(half);

  // Preenche um track com 3 repetições para o loop contínuo
  // (o @keyframes marquee usa translateX(-33.333%), então precisamos
  //  de 3x o conteúdo para o loop não "pular")
  function populateTrack(track, items) {
    for (let repeat = 0; repeat < 3; repeat++) {
      items.forEach(logo => {
        const item = document.createElement('div');
        item.className = 'logo-item';

        const altText = logo.replace('.png', '').replace(/-/g, ' ');
        item.innerHTML = `<img src="assets/logos/trampos/${logo}" alt="${altText}" loading="lazy">`;

        track.appendChild(item);
      });
    }
  }

  populateTrack(track1, line1);
  populateTrack(track2, line2);
}