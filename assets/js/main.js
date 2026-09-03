/* ============================================
   MAIN.JS - Interações Globais
   Sem dependências, puro vanilla JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================
  // SMOOTH SCROLL para links internos
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
  // FADE IN ANIMATION ao entrar na viewport
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

  // Aplicar fade-in em cards e seções
  document.querySelectorAll('.service-card, .case-card, .link-block, .testimonial').forEach(el => {
    observer.observe(el);
  });

  // ============================================
  // HOVER EFFECT em cards de serviço
  // ============================================
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.borderColor = 'var(--color-text)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.borderColor = 'var(--color-border)';
    });
  });

  // ============================================
  // SCROLL INDICATOR (ativa nav links baseado no scroll)
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

    // Atualizar nav links ativos
    document.querySelectorAll('.navbar-menu a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === currentSection) {
        link.classList.add('active');
      }
    });
  });

  // ============================================
  // FORMULÁRIO DE CONTATO (se existir)
  // ============================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Enviar email via mailto
      const subject = `Nova mensagem de ${name}`;
      const body = `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`;
      
      window.location.href = `mailto:felipecogumello@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // ============================================
  // COPIAR EMAIL PARA CLIPBOARD
  // ============================================
  document.querySelectorAll('.copy-email').forEach(el => {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const email = 'felipecogumello@gmail.com';
      
      navigator.clipboard.writeText(email).then(() => {
        // Feedback visual
        const originalText = this.textContent;
        this.textContent = '✓ Copiado!';
        
        setTimeout(() => {
          this.textContent = originalText;
        }, 2000);
      });
    });
  });

  // ============================================
  // LAZY LOADING DE IMAGENS
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

  // ============================================
  // MOBILE MENU TOGGLE (se aplicável)
  // ============================================
  const mobileMenuButton = document.getElementById('mobile-menu-btn');
  const navbar = document.querySelector('.navbar-menu');

  if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function() {
      navbar.classList.toggle('active');
      this.classList.toggle('active');
    });
  }

  // ============================================
  // DARK MODE TOGGLE (Opcional - Futuro)
  // ============================================
  // Pode ser ativado depois se necessário

});

// ============================================
// UTILITY: Adicionar classe 'active' a links de navegação
// ============================================
const style = document.createElement('style');
style.textContent = `
  .navbar-menu a.active {
    color: var(--color-text);
    border-bottom-color: var(--color-accent);
  }
`;
document.head.appendChild(style);
