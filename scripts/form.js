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

const features = [
  { id: "feat1", name: "easySetup",       label: "Easy Setup" },
  { id: "feat2", name: "reliability",     label: "Reliability" },
  { id: "feat3", name: "battery",         label: "Long Battery Life" },
  { id: "feat4", name: "appIntegration",  label: "App Integration" },
  { id: "feat5", name: "durability",      label: "Durability" },
  { id: "feat6", name: "value",           label: "Value for Money" },
  { id: "feat7", name: "performance",     label: "Performance" },
  { id: "feat8", name: "design",          label: "Sleek Design" }
];

// Populate products
const productSelect = document.getElementById("product");

products.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p.id;
  opt.textContent = p.name;
  productSelect.appendChild(opt);
});

// Populate features
const featuresGroup = document.getElementById("featuresGroup");

features.forEach(f => {
  const div = document.createElement("div");
  div.className = "checkbox-item";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = f.id;
  input.name = f.name;
  input.value = f.label;

  const label = document.createElement("label");
  label.htmlFor = f.id;
  label.textContent = f.label;

  div.appendChild(input);
  div.appendChild(label);

  featuresGroup.appendChild(div);
});

document.getElementById("lastModified").textContent = document.lastModified;