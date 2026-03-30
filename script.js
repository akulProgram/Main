document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile Menu ── */
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ── Contact Form ── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('hidden');
      success.classList.add('show');
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Scroll-triggered animations ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  const animTargets = '.benefit-card, .approach-step, .stat, .info-card, .audience-item, .detail-service, .spec-item, .faq-item';

  document.querySelectorAll(animTargets).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    observer.observe(el);
  });

  // Stagger children in groups
  const containers = '.benefits-grid, .approach-grid, .stats-inner, .contact-info, .audience-features, .specs-grid, .faq-list';
  document.querySelectorAll(containers).forEach(container => {
    const children = container.querySelectorAll(animTargets);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  /* ── Header scroll effect ── */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.background = window.scrollY > 50
        ? 'rgba(250, 250, 247, 0.96)'
        : 'rgba(250, 250, 247, 0.88)';
    }, { passive: true });
  }

});
