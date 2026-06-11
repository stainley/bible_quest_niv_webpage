// ── Scroll reveal ──────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ── Animated counters ──────────────────────────────────────
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(document.getElementById('stat1'), 500);
      animateCounter(document.getElementById('stat2'), 12);
      animateCounter(document.getElementById('stat3'), 365);
      animateCounter(document.getElementById('stat4'), 10);
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsSection = document.querySelector('.stats-grid');
if (statsSection) statsObs.observe(statsSection);

// ── Nav scroll effect ──────────────────────────────────────
const nav = document.querySelector('.nav-bar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.background = 'rgba(15, 23, 42, 0.98)';
    nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = 'rgba(15, 23, 42, 0.88)';
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ── Mobile nav ─────────────────────────────────────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '68px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(15,23,42,0.98)';
  navLinks.style.padding = '16px 24px 24px';
  navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  navLinks.style.backdropFilter = 'blur(20px)';
  hamburger.setAttribute('aria-expanded', !isOpen);
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.style.display = 'none';
  });
});
