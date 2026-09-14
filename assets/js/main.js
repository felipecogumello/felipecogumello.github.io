/* ============================================
   MAIN.JS REFATORADO E CORRIGIDO
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // 1. CARREGAR LOGOS DE EMPRESAS
  // ============================================
  const logos = [
    'aldeia.png',
    'maieutics.png',
    'frantic.png',
    'ora.png',
    'traktor.png',
    'fantastica-startups.png',
    'herospark.png',
    'impulso.png',
    'exati.png'
  ];

  const logosSlider = document.getElementById('logosSlider');
  
  if (logosSlider) {
    logos.forEach(logo => {
      const logoItem = document.createElement('div');
      logoItem.className = 'logo-item';
      logoItem.innerHTML = `<img src="assets/logos/trampos/${logo}" alt="Logo Marca">`;
      logosSlider.appendChild(logoItem);
    });

    startLogoSlider();
  }

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

  document.querySelectorAll('.service-card, .case-card, .link-block, .testimonial-card, .creative-block, .logo-item').forEach(el => {
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
// 7. SLIDER DE LOGOS (Autoplay Continuo)
// ============================================
function startLogoSlider() {
  const slider = document.getElementById('logosSlider');
  if (!slider) return;

  slider.style.overflowX = 'hidden';
  slider.style.whiteSpace = 'nowrap';

  const originalItems = Array.from(slider.querySelectorAll('.logo-item'));
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    slider.appendChild(clone);
  });

  let scrollPosition = 0;
  const scrollSpeed = 0.8;

  function autoScroll() {
    scrollPosition += scrollSpeed;
    if (scrollPosition >= slider.scrollWidth / 2) {
      scrollPosition = 0;
    }
    slider.scrollLeft = scrollPosition;
    requestAnimationFrame(autoScroll);
  }

  requestAnimationFrame(autoScroll);
}