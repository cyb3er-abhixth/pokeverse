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

const grid = document.getElementById("pokedexGrid");
const searchInput = document.getElementById("searchPokemon");
const typeFilter = document.getElementById("typeFilter");
const loading = document.getElementById("loading");

let offset = 0;
const limit = 100;
let allPokemon = [];
const maxPokemon = 1025; // stop loading after this
let isLoading = false; // to prevent multiple simultaneous loads

const typeIcons = {
  fire: "🔥",
  water: "💧",
  grass: "🌿",
  electric: "⚡",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "🌍",
  flying: "🕊️",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "⚙️",
  fairy: "✨",
  normal: "⚪",
};

// Load types for filter
async function loadTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  data.results.forEach((type) => {
    const option = document.createElement("option");
    option.value = type.name;
    option.textContent = type.name.toUpperCase();
    typeFilter.appendChild(option);
  });
}

// Fetch Pokémon batch
async function loadPokemonBatch() {
    // Stop if already loading or reached max Pokémon
	if (isLoading || offset >= maxPokemon) {
		loading.style.display = "none"; // hide loading if max reached
		return;
    }

    isLoading = true;
    loading.style.display = "block";

    // Adjust the limit if the remaining Pokémon are fewer than your batch size
    const batchLimit = Math.min(limit, maxPokemon - offset);

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${batchLimit}`);
    const data = await res.json();

    const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
    const batch = await Promise.all(promises);

    batch.forEach(p => allPokemon.push(p));
    renderPokemon(batch);

    offset += batchLimit;
    loading.style.display = "none";
    isLoading = false;
}

// Render Pokémon cards
function renderPokemon(list) {
  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = `pokemon-card ${p.types[0].type.name}`;
    card.dataset.name = p.name;
    card.dataset.img = p.sprites.other["official-artwork"].front_default;
    card.dataset.type = p.types.map((t) => t.type.name).join(", ");
    card.dataset.hp = p.stats[0].base_stat;
    card.dataset.attack = p.stats[1].base_stat;
    card.dataset.defense = p.stats[2].base_stat;
    card.dataset.spAtk = p.stats[3].base_stat;
    card.dataset.spDef = p.stats[4].base_stat;
    card.dataset.speed = p.stats[5].base_stat;

    const types = p.types
      .map((t) => `${typeIcons[t.type.name]} ${t.type.name.toUpperCase()}`)
      .join(" ");

    card.innerHTML = `
            <img src="${p.sprites.other["official-artwork"].front_default}">
            <h3>#${String(p.id).padStart(3, "0")} ${capitalize(p.name)}</h3>
            <div class="type">${types}</div>
        `;

    card.addEventListener("click", () => showModal(p));
    grid.appendChild(card);
  });
}

// Modal
const modal = document.getElementById("pokedexModal");
const closeModal = document.querySelector(".closeModal");

function showModal(p) {
  modal.style.display = "flex";
  document.getElementById("modalImg").src =
    p.sprites.other["official-artwork"].front_default;
  document.getElementById("modalName").textContent = capitalize(p.name);
  document.getElementById("modalType").textContent =
    "Type: " + p.types.map((t) => t.type.name).join(", ");
  document.getElementById("statHP").style.width = p.stats[0].base_stat + "%";
  document.getElementById("statAttack").style.width =
    p.stats[1].base_stat + "%";
  document.getElementById("statDefense").style.width =
    p.stats[2].base_stat + "%";
  document.getElementById("statSpAtk").style.width = p.stats[3].base_stat + "%";
  document.getElementById("statSpDef").style.width = p.stats[4].base_stat + "%";
  document.getElementById("statSpeed").style.width = p.stats[5].base_stat + "%";

  document.getElementById("modalHW").textContent =
    `Height: ${p.height / 10} m | Weight: ${p.weight / 10} kg`;

  const abilityBox = document.getElementById("abilities");
  abilityBox.innerHTML = "";

  p.abilities.forEach((a) => {
    const span = document.createElement("span");
    span.textContent = capitalize(a.ability.name);
    span.style.margin = "4px";
    span.style.padding = "4px 10px";
    span.style.background = "#eee";
    span.style.borderRadius = "10px";
    abilityBox.appendChild(span);
  });

  loadDescription(p.id);

  // Evolution
  showEvolution(p.id);
}

closeModal.addEventListener("click", () => (modal.style.display = "none"));

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Infinite scroll
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    loadPokemonBatch();
  }
});

// Search
searchInput.addEventListener("input", filterPokemon);
typeFilter.addEventListener("change", filterPokemon);

function filterPokemon() {
  const query = searchInput.value.toLowerCase();
  const type = typeFilter.value;

  grid.innerHTML = "";

  const filtered = allPokemon.filter((p) => {
    const matchName = p.name.toLowerCase().includes(query);
    const matchNumber = p.id.toString().includes(query);
    const matchType = p.types.some((t) => t.type.name === type);

    return (
      (query === "" || matchName || matchNumber) && (type === "" || matchType)
    );
  });

  if (filtered.length === 0) {
    document.getElementById("noResults").style.display = "block";
  } else {
    document.getElementById("noResults").style.display = "none";
    renderPokemon(filtered);
  }
}

// Evolution
async function showEvolution(id) {
  const evoContainer = document.getElementById("evolutionTree");
  evoContainer.innerHTML = "Loading...";

  try {
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`,
    );
    const speciesData = await speciesRes.json();

    const evoRes = await fetch(speciesData.evolution_chain.url);
    const evoData = await evoRes.json();

    evoContainer.innerHTML = "";

    const evolutions = [];

    function traverse(chain) {
      evolutions.push(chain.species.name);

      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((e) => traverse(e));
      }
    }

    traverse(evoData.chain);

    for (let i = 0; i < evolutions.length; i++) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${evolutions[i]}`,
      );
      const data = await res.json();

      const img = document.createElement("img");
      img.src = data.sprites.other["official-artwork"].front_default;

      evoContainer.appendChild(img);

      if (i < evolutions.length - 1) {
        const arrow = document.createElement("span");
        arrow.textContent = " > ";
        arrow.style.fontSize = "22px";
        evoContainer.appendChild(arrow);
      }
    }
  } catch (e) {
    evoContainer.innerHTML = "No evolution data";
  }
}

async function loadDescription(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  const data = await res.json();

  const entry = data.flavor_text_entries.find((e) => e.language.name === "en");

  if (entry) {
    document.getElementById("modalDescription").textContent =
      entry.flavor_text.replace(/\f/g, " ");
  }
}
// Init
loadTypes();
loadPokemonBatch();
