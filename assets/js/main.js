/* ============================================
   MAIN.JS REFATORADO
   Carrega logos, depoimentos, slider, interações
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
      logoItem.innerHTML = `<img src="/assets/logos/trampos/${logo}" alt="Logo">`;
      logosSlider.appendChild(logoItem);
    });

    // Slider automático (loop infinito)
    startLogoSlider();
  }

  // ============================================
  // 2. CARREGAR DEPOIMENTOS DO JSON
  // ============================================
  fetch('/assets/data/testimonials.json')
    .then(response => response.json())
    .then(testimonials => {
      const testimonialsContainer = document.getElementById('testimonialsContainer');
      
      testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        // Avatar (se tiver imagem) ou placeholder
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

  // ============================================
  // 3. SMOOTH SCROLL PARA LINKS INTERNOS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
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
  // 5. HOVER EFFECT NOS CARDS
  // ============================================
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--color-cta)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = 'var(--color-border)';
    });
  });

  // ============================================
  // 6. SCROLL INDICATOR NA NAVBAR
  // ============================================
  window.addEventListener('scroll', function() {
    let currentSection = '';

    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ============================================
  // 7. LAZY LOADING DE IMAGENS
  // ============================================
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

});

// ============================================
// SLIDER DE LOGOS (Autoplay)
// ============================================
function startLogoSlider() {
  const slider = document.getElementById('logosSlider');
  
  if (!slider) return;

  let scrollPosition = 0;
  const scrollSpeed = 2; // pixels por frame
  const sliderWidth = slider.scrollWidth;
  const containerWidth = slider.clientWidth;

  // Duplicar logos para efeito loop infinito
  const originalItems = Array.from(slider.querySelectorAll('.logo-item'));
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    slider.appendChild(clone);
  });

  function autoScroll() {
    scrollPosition += scrollSpeed;
    slider.scrollLeft = scrollPosition;

    // Reset ao chegar no final
    if (scrollPosition >= sliderWidth) {
      scrollPosition = 0;
    }

    requestAnimationFrame(autoScroll);
  }

  autoScroll();

  // Pausar ao hover (pausa smoothly)
  slider.addEventListener('mouseenter', function() {
    // Pode adicionar lógica para pausar se quiser
  });

  slider.addEventListener('mouseleave', function() {
    // Retoma após mouse sair
  });
}

// ============================================
// UTILITY: AddClass para links ativos
// ============================================
const style = document.createElement('style');
style.textContent = `
  .navbar-menu a.active {
    color: var(--color-text);
    border-bottom-color: var(--color-cta);
  }

  @media (max-width: 768px) {
    .logos-slider {
      overflow-x: auto;
      scroll-behavior: smooth;
    }

    .logo-item {
      flex: 0 0 120px;
      height: 120px;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// ANALYTICS BÁSICO (Google Analytics Integration)
// ============================================
function trackEvent(eventName, eventData = {}) {
  // Se tiver Google Analytics configurado depois, usar isso
  console.log('Event:', eventName, eventData);
}

// Rastrear cliques em CTAs
document.querySelectorAll('[href*="wa.me"], [href*="entr.ai"]').forEach(link => {
  link.addEventListener('click', function() {
    trackEvent('CTA_Click', {
      cta: this.textContent,
      url: this.href
    });
  });
});