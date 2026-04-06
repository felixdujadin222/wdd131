// ── Product Data ──
const products = [
  { id: "prod-001", name: "SmartHome Hub Pro" },
  { id: "prod-002", name: "UltraClean Air Purifier" },
  { id: "prod-003", name: "SoundWave Earbuds X" },
  { id: "prod-004", name: "PowerBoost Solar Charger" },
  { id: "prod-005", name: "VisionCam Security System" },
  { id: "prod-006", name: "CoolBreeze Smart Thermostat" },
  { id: "prod-007", name: "LuminaRing LED Desk Lamp" },
  { id: "prod-008", name: "StepTrack Fitness Band" }
];

// ── Feature Labels ──
const featureLabels = {
  easySetup:      "Easy Setup",
  reliability:    "Reliability",
  battery:        "Long Battery Life",
  appIntegration: "App Integration",
  durability:     "Durability",
  value:          "Value for Money",
  performance:    "Performance",
  design:         "Sleek Design"
};

// ── Last Modified ──
document.getElementById("lastModified").textContent = document.lastModified;

// ── Review Counter (localStorage) ──
let count = parseInt(localStorage.getItem('reviewCount') || '0', 10);
count += 1;
localStorage.setItem('reviewCount', count);
document.getElementById('reviewCount').textContent = count;

// ── Helper Functions ──

// Get product name from ID
function getProductName(id) {
  const found = products.find(p => p.id === id);
  return found ? found.name : null;
}

// Build star rating
function buildStars(n) {
  n = parseInt(n, 10);
  if (isNaN(n)) return `<span class="empty">Not rated</span>`;
  return `<span class="stars">${'★'.repeat(n)}${'☆'.repeat(5 - n)}</span> (${n}/5)`;
}

// Create row UI
function row(label, content) {
  return `
    <div class="review-row">
      <div class="row-label">${label}</div>
      <div class="row-value">${content}</div>
    </div>
  `;
}

// Format date nicely
function formatDate(dateStr) {
  if (!dateStr) return `<span class="empty">Not provided</span>`;
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ── Get URL Parameters ──
const params = new URLSearchParams(window.location.search);
const grid = document.getElementById('reviewGrid');

let html = "";

// ── Product ──
const productVal = getProductName(params.get('product'));
html += row(
  "Product",
  productVal
    ? `<strong>${productVal}</strong>`
    : `<span class="empty">Not provided</span>`
);

// ── Rating ──
html += row(
  "Rating",
  buildStars(params.get('rating'))
);

// ── Installation Date ──
html += row(
  "Installed",
  formatDate(params.get('installDate'))
);

// ── Features ──
const selectedFeatures = Object.keys(featureLabels).filter(key => params.get(key));

if (selectedFeatures.length > 0) {
  const tags = selectedFeatures
    .map(key => `<span class="feature-tag">${featureLabels[key]}</span>`)
    .join("");

  html += row(
    "Features",
    `<div class="features-list">${tags}</div>`
  );
} else {
  html += row(
    "Features",
    `<span class="empty">None selected</span>`
  );
}

// ── Review Text ──
const review = params.get('review');
html += row(
  "Review",
  review && review.trim()
    ? `<em>${review.trim()}</em>`
    : `<span class="empty">No written review</span>`
);

// ── Username ──
const username = params.get('username');
html += row(
  "Reviewer",
  username && username.trim()
    ? username.trim()
    : `<span class="empty">Anonymous</span>`
);

// ── Render to Page ──
grid.innerHTML = html;