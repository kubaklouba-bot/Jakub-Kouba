/* ─────────────────────────────────────────────
   NAV — active state + mobile toggle
───────────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-links a');
const menuBtn  = document.querySelector('.nav-menu-btn');
const navList  = document.querySelector('.nav-links');

// Set active nav link based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Mobile menu toggle
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navList.classList.toggle('open');
    menuBtn.textContent = navList.classList.contains('open') ? '[ close ]' : '[ menu ]';
  });
}

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => navList.classList.remove('open'));
});

/* ─────────────────────────────────────────────
   WORK GRID — filter
───────────────────────────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const workCards  = document.querySelectorAll('.work-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    workCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ─────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────── */
const backTop = document.querySelector('.footer-back-top');
if (backTop) {
  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ─────────────────────────────────────────────
   CONTACT FORM — basic validation
───────────────────────────────────────────── */
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Replace this with your actual form handling (Formspree, Netlify Forms, etc.)
    const btn = contactForm.querySelector('.btn-submit');
    btn.textContent = 'sent —';
    btn.style.background = 'var(--text-muted)';
    setTimeout(() => {
      btn.textContent = 'send message →';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
