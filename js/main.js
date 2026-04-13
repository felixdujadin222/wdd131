// ── WanderLux Travel — main.js ────────────────────────────

// ── Nav scroll effect ─────────────────────────────────────
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Mobile menu ───────────────────────────────────────────
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.nav__mobile');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });
  // close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}

// ── Active nav link ───────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ── Scroll reveal ─────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Destination data (objects + array) ────────────────────
const destinations = [
  { id: 1, name: 'Santorini, Greece',   region: 'Europe',  days: 7,  price: 2499, tag: 'Popular',  img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80', desc: 'Iconic whitewashed villages, volcanic beaches, and legendary sunsets over the caldera.' },
  { id: 2, name: 'Kyoto, Japan',        region: 'Asia',    days: 10, price: 3299, tag: 'Cultural', img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80', desc: 'Ancient temples, bamboo groves, traditional tea houses, and cherry blossoms.' },
  { id: 3, name: 'Patagonia, Chile',    region: 'Americas',days: 12, price: 4199, tag: 'Adventure',img: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', desc: 'Dramatic glaciers, towering peaks, and pristine wilderness at the end of the world.' },
  { id: 4, name: 'Amalfi Coast, Italy', region: 'Europe',  days: 8,  price: 2899, tag: 'Luxury',   img: 'https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=600&q=80', desc: 'Cliffside villages, turquoise waters, fresh seafood, and la dolce vita.' },
  { id: 5, name: 'Bali, Indonesia',     region: 'Asia',    days: 9,  price: 1999, tag: 'Popular',  img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', desc: 'Rice terraces, sacred temples, world-class surf, and spiritual retreats.' },
  { id: 6, name: 'Iceland Ring Road',   region: 'Europe',  days: 10, price: 3599, tag: 'Adventure',img: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80', desc: 'Northern lights, geysers, waterfalls, and dramatic volcanic landscapes.' },
];

// ── Render destination cards (uses template literals + array methods) ──
function renderCards(data) {
  const grid = document.getElementById('dest-grid');
  if (!grid) return;

  grid.innerHTML = data.map(d => `
    <article class="card reveal">
      <div class="card__img">
        <img src="${d.img}" alt="${d.name}" loading="lazy" width="600" height="450">
        <span class="card__badge">${d.tag}</span>
      </div>
      <div class="card__body">
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="card__meta">
          <span>&#128197; ${d.days} days</span>
          <span>&#128176; From $${d.price.toLocaleString()}</span>
          <span>&#127758; ${d.region}</span>
        </div>
      </div>
    </article>
  `).join('');

  // re-observe new cards
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── Filter destinations ───────────────────────────────────
const filterBtns = document.querySelectorAll('[data-filter]');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const region = btn.dataset.filter;
    // conditional branching
    const filtered = region === 'all'
      ? destinations
      : destinations.filter(d => d.region === region);
    renderCards(filtered);
  });
});

// initial render
renderCards(destinations);

// ── Contact form with localStorage ───────────────────────
const form = document.getElementById('contact-form');
if (form) {
  // Load saved submissions from localStorage
  function getSubmissions() {
    try {
      return JSON.parse(localStorage.getItem('wanderlux_submissions')) || [];
    } catch {
      return [];
    }
  }

  function saveSubmission(data) {
    const subs = getSubmissions();
    subs.push(data);
    localStorage.setItem('wanderlux_submissions', JSON.stringify(subs));
  }

  function renderSubmissions() {
    const panel = document.getElementById('submissions-panel');
    const list  = document.getElementById('submissions-list');
    if (!panel || !list) return;

    const subs = getSubmissions();
    if (subs.length === 0) {
      panel.style.display = 'none';
      return;
    }
    panel.style.display = 'block';
    list.innerHTML = subs.slice(-5).reverse().map(s => `
      <div class="submission-item">
        <strong>${s.name}</strong> — <span>${s.destination}</span>
        <br><span>${s.email} &bull; ${s.date}</span>
      </div>
    `).join('');
  }

  renderSubmissions();

  // Validate a single field
  function validateField(field) {
    const errEl = field.parentElement.querySelector('.field-error');
    let valid = true;

    if (field.required && !field.value.trim()) {
      if (errEl) { errEl.textContent = 'This field is required.'; errEl.classList.add('show'); }
      field.classList.add('error');
      valid = false;
    } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
      if (errEl) { errEl.textContent = 'Please enter a valid email address.'; errEl.classList.add('show'); }
      field.classList.add('error');
      valid = false;
    } else {
      if (errEl) errEl.classList.remove('show');
      field.classList.remove('error');
    }
    return valid;
  }

  // Live validation on blur
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const fields = Array.from(form.querySelectorAll('[required]'));
    const allValid = fields.every(f => validateField(f));
    if (!allValid) return;

    const data = {
      name:        form.querySelector('#name').value.trim(),
      email:       form.querySelector('#email').value.trim(),
      destination: form.querySelector('#destination').value,
      travel_date: form.querySelector('#travel-date').value,
      message:     form.querySelector('#message').value.trim(),
      date:        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };

    saveSubmission(data);
    renderSubmissions();

    // Show toast
    const toast = document.getElementById('form-toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 5000);
    }

    form.reset();
  });
}

// ── Counter animation ─────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString() + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

const statsSection = document.querySelector('.stats-bar');
if (statsSection) {
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(statsSection);
}
