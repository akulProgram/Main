/* ── Theme: apply saved preference BEFORE paint ── */
(function() {
  const saved = localStorage.getItem('ias-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

document.addEventListener('DOMContentLoaded', () => {

  /* ── Theme Toggle ── */
  const themeBtn = document.getElementById('themeToggle');

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  function updateHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const scrolled = window.scrollY > 50;
    if (isDark()) {
      header.style.background = scrolled
        ? 'rgba(10, 13, 8, 0.95)'
        : 'rgba(10, 13, 8, 0.85)';
    } else {
      header.style.background = scrolled
        ? 'rgba(250, 250, 247, 0.96)'
        : 'rgba(250, 250, 247, 0.88)';
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (isDark()) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('ias-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('ias-theme', 'dark');
      }
      updateHeaderScroll();
    });
  }

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

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

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

  const containers = '.benefits-grid, .approach-grid, .stats-inner, .contact-info, .audience-features, .specs-grid, .faq-list';
  document.querySelectorAll(containers).forEach(container => {
    const children = container.querySelectorAll(animTargets);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.06}s`;
    });
  });

  /* ── Header scroll effect ── */
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

});
