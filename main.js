/* =============================================================
   main.js — Dra. Gianne Lima Brito LP
============================================================= */

// ---------- Nav scroll effect --------------------------------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ---------- Smooth anchor scroll (fallback for older Safari) -
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ---------- Scroll animations --------------------------------
const animEls = document.querySelectorAll(
  '.problem__item, .process__step, .condition-card, .treatment-item, .testimonial-card, .doctor__highlight'
);

animEls.forEach((el, i) => {
  el.classList.add('animate');
  const delay = (i % 4) + 1;
  el.classList.add(`animate-delay-${delay}`);
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animEls.forEach(el => observer.observe(el));

// Also animate section headers
document.querySelectorAll('.section-label, .section-title, .section-sub').forEach(el => {
  el.classList.add('animate');
  observer.observe(el);
});

// ---------- FAQ toggle icon (extra polish) -------------------
document.querySelectorAll('.faq__item').forEach(item => {
  item.addEventListener('toggle', () => {
    const icon = item.querySelector('.faq__icon');
    icon.textContent = item.open ? '×' : '+';
  });
});

// ---------- Active nav highlight on scroll ------------------
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(s => navObserver.observe(s));
