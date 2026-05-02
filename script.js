/* ============================================
   Uniflow Tech — Main JS
   ============================================ */

// ---- Mobile nav toggle ----
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.getElementById('nav-links');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

// Close nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// ---- Sticky nav shadow on scroll ----
const navWrapper = document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navWrapper?.classList.add('nav-scrolled');
  } else {
    navWrapper?.classList.remove('nav-scrolled');
  }
}, { passive: true });

// ---- Contact form validation ----
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Show success (no backend — swap for real submit when ready)
      form.classList.add('hidden');
      successMsg?.classList.remove('hidden');
    }
  });

  // Clear errors on input
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => clearError(field));
  });
}

function validateForm() {
  let valid = true;

  const name    = document.getElementById('name');
  const email   = document.getElementById('email');
  const clinic  = document.getElementById('clinic');
  const message = document.getElementById('message');

  if (!name.value.trim()) {
    showError(name, 'name-error', 'Please enter your name.');
    valid = false;
  }

  if (!email.value.trim()) {
    showError(email, 'email-error', 'Please enter your email address.');
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    showError(email, 'email-error', 'Please enter a valid email address.');
    valid = false;
  }

  if (!clinic.value.trim()) {
    showError(clinic, 'clinic-error', 'Please enter your clinic or hospital name.');
    valid = false;
  }

  if (!message.value.trim()) {
    showError(message, 'message-error', 'Please tell us how we can help.');
    valid = false;
  }

  return valid;
}

function showError(field, errorId, msg) {
  field.classList.add('error');
  const el = document.getElementById(errorId);
  if (el) el.textContent = msg;
}

function clearError(field) {
  field.classList.remove('error');
  const errorId = field.id + '-error';
  const el = document.getElementById(errorId);
  if (el) el.textContent = '';
}

// ---- Scroll-in animations ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .benefit-card, .stat-item, .hero-headline, .hero-ctas'
).forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible, .hero-headline, .hero-ctas').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// visible class triggers animation
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);
