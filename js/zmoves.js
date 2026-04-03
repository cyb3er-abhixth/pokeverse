window.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.querySelector("span.close");
  const overlay = document.querySelector("span.overlay");

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    closeBtn.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  menuIcon.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);
});

const zmovesGrid = document.getElementById("zmovesGrid");
const searchInput = document.getElementById("searchPokemon");
const filterCategory = document.getElementById("filterCategory");
const filterType = document.getElementById("filterType");
const filterPower = document.getElementById("filterPower");

let zmoves = [];

// ✅ Complete list of valid PokéAPI Z-Moves
const zMoveNames = [
  "breakneck-blitz--physical",
  "all-out-pummeling--physical",
  "supersonic-skystrike--physical",
  "acid-downpour--physical",
  "tectonic-rage--physical",
  "continental-crush--physical",
  "savage-spin-out--physical",
  "never-ending-nightmare--physical",
  "corkscrew-crash--physical",
  "inferno-overdrive--physical",
  "hydro-vortex--physical",
  "bloom-doom--physical",
  "gigavolt-havoc--physical",
  "shattered-psyche--physical",
  "subzero-slammer--physical",
  "devastating-drake--physical",
  "black-hole-eclipse--physical",
  "twinkle-tackle--physical",
  "catastropika",
  "sinister-arrow-raid",
  "malicious-moonsault",
  "oceanic-operetta",
  "guardian-of-alola",
  "soul-stealing-7-star-strike",
  "stoked-sparksurfer",
  "pulverizing-pancake",
  "extreme-evoboost",
  "genesis-supernova",
  "light-that-burns-the-sky",
  "searing-sunraze-smash",
  "menacing-moonraze-maelstrom",
  "lets-snuggle-forever",
  "splintered-stormshards",
  "clangorous-soulblaze",
  "zippy-zap",
  "splishy-splash",
  "floaty-fall",
  "pika-papow",
  "bouncy-bubble",
  "buzzy-buzz",
  "sizzly-slide",
  "glitzy-glow",
  "baddy-bad",
  "sappy-seed",
  "freezy-frost",
  "sparkly-swirl",
  "veevee-volley",
  "thousand-arrows",
  "thousand-waves",
  "origin-pulse",
  "dragon-ascent",
  "photon-geyser",
  "10-000-000-volt-thunderbolt",
  "mind-blown",
  "plasma-fists",
  "core-enforcer",
];

// Category mapping for Z-Moves
const zMoveCategories = {
  // Standard Z-Moves (Physical/Special variants)
  "breakneck-blitz--physical": "standard",
  "all-out-pummeling--physical": "standard",
  "supersonic-skystrike--physical": "standard",
  "acid-downpour--physical": "standard",
  "tectonic-rage--physical": "standard",
  "continental-crush--physical": "standard",
  "savage-spin-out--physical": "standard",
  "never-ending-nightmare--physical": "standard",
  "corkscrew-crash--physical": "standard",
  "inferno-overdrive--physical": "standard",
  "hydro-vortex--physical": "standard",
  "bloom-doom--physical": "standard",
  "gigavolt-havoc--physical": "standard",
  "shattered-psyche--physical": "standard",
  "subzero-slammer--physical": "standard",
  "devastating-drake--physical": "standard",
  "black-hole-eclipse--physical": "standard",
  "twinkle-tackle--physical": "standard",

  // Signature/Unique Z-Moves
  catastropika: "signature",
  "sinister-arrow-raid": "signature",
  "malicious-moonsault": "signature",
  "oceanic-operetta": "signature",
  "guardian-of-alola": "signature",
  "soul-stealing-7-star-strike": "signature",
  "stoked-sparksurfer": "signature",
  "pulverizing-pancake": "signature",
  "extreme-evoboost": "signature",
  "genesis-supernova": "signature",
  "light-that-burns-the-sky": "signature",
  "searing-sunraze-smash": "signature",
  "menacing-moonraze-maelstrom": "signature",
  "lets-snuggle-forever": "signature",
  "splintered-stormshards": "signature",
  "clangorous-soulblaze": "signature",

  // Let's Go Pikachu/Eevee Z-Moves
  "zippy-zap": "lets-go",
  "splishy-splash": "lets-go",
  "floaty-fall": "lets-go",
  "pika-papow": "lets-go",
  "bouncy-bubble": "lets-go",
  "buzzy-buzz": "lets-go",
  "sizzly-slide": "lets-go",
  "glitzy-glow": "lets-go",
  "baddy-bad": "lets-go",
  "sappy-seed": "lets-go",
  "freezy-frost": "lets-go",
  "sparkly-swirl": "lets-go",
  "veevee-volley": "lets-go",

  // Legendary/Other
  "thousand-arrows": "legendary",
  "thousand-waves": "legendary",
  "origin-pulse": "legendary",
  "dragon-ascent": "legendary",
  "photon-geyser": "legendary",
  "10-000-000-volt-thunderbolt": "legendary",
  "mind-blown": "legendary",
  "plasma-fists": "legendary",
  "core-enforcer": "legendary",
};

// Utility: categorize power
function powerCategory(power) {
  if (power <= 80) return "low";
  if (power <= 120) return "medium";
  return "high";
}

// Fetch Z-Moves from PokéAPI
async function fetchZMoves() {
  try {
    const movePromises = zMoveNames.map((name) =>
      fetch(`https://pokeapi.co/api/v2/move/${name}`)
        .then((res) => {
          if (!res.ok) {
            console.warn(`Move not found: ${name}`);
            return null;
          }
          return res.json();
        })
        .catch((err) => {
          console.warn(`Error fetching ${name}:`, err);
          return null;
        }),
    );

    const allMoves = await Promise.all(movePromises);

    zmoves = allMoves
      .filter((m) => m !== null)
      .map((m) => ({
        name: m.name.replace(/-/g, " ").replace(/ physical| special/gi, ""),
        type: m.type.name,
        power: m.power || 0,
        pp: m.pp,
        effect:
          m.effect_entries.find((e) => e.language.name === "en")?.effect ||
          "No effect info",
        category: zMoveCategories[m.name] || "legendary",
        baseMove: "Varies", // Optional manual mapping if you want
      }));

    console.log(`Loaded ${zmoves.length} out of ${zMoveNames.length} Z-Moves`);
    populateTypeFilter();
    displayZMoves(zmoves);
  } catch (err) {
    console.error(err);
    zmovesGrid.innerHTML =
      "<p style='text-align:center'>Failed to load Z-Moves.</p>";
  }
}

// Populate type filter dynamically
function populateTypeFilter() {
  const types = [...new Set(zmoves.map((z) => z.type))].sort();
  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    filterType.appendChild(option);
  });
}

// Display Z-Moves
function displayZMoves(list) {
  zmovesGrid.innerHTML = "";
  if (!list.length) {
    zmovesGrid.innerHTML = "<p style='text-align:center'>No Z-Moves found.</p>";
    return;
  }

  list.forEach((z) => {
    const card = document.createElement("div");
    card.className = "zmoves-card";
    card.innerHTML = `
            <h2>${capitalize(z.name)}</h2>
            <p><strong>Type:</strong> ${capitalize(z.type)}</p>
            <p><strong>Power:</strong> ${z.power}</p>
            <p><strong>Effect:</strong> ${z.effect}</p>
        `;
    zmovesGrid.appendChild(card);
  });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter logic
function applyFilters() {
  let filtered = zmoves;

  const searchVal = searchInput.value.toLowerCase();
  if (searchVal) {
    filtered = filtered.filter((z) => z.name.toLowerCase().includes(searchVal));
  }

  const categoryVal = filterCategory.value;
  if (categoryVal) {
    filtered = filtered.filter((z) => z.category === categoryVal);
  }

  const typeVal = filterType.value;
  if (typeVal) {
    filtered = filtered.filter((z) => z.type === typeVal);
  }

  const powerVal = filterPower.value;
  if (powerVal) {
    filtered = filtered.filter((z) => powerCategory(z.power) === powerVal);
  }

  displayZMoves(filtered);
}

// Event listeners
searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);
filterType.addEventListener("change", applyFilters);
filterPower.addEventListener("change", applyFilters);

// Start
fetchZMoves();
