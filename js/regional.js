window.addEventListener("DOMContentLoaded", () => {
  // Menu toggle
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeBtn = document.querySelector("span.close");
  const overlay = document.querySelector("span.overlay");
  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    closeBtn.classList.toggle("active");
    overlay.classList.toggle("active");
  }
  if (menuIcon) menuIcon.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);
  if (overlay) overlay.addEventListener("click", toggleMenu);
});

// Pokémon List (same as your array with region property)
const pokemonList = [
  { name: "rattata-alola", region: "alola" },
  { name: "raticate-alola", region: "alola" },
  { name: "raichu-alola", region: "alola" },
  { name: "sandshrew-alola", region: "alola" },
  { name: "sandslash-alola", region: "alola" },
  { name: "vulpix-alola", region: "alola" },
  { name: "ninetales-alola", region: "alola" },
  { name: "diglett-alola", region: "alola" },
  { name: "dugtrio-alola", region: "alola" },
  { name: "meowth-alola", region: "alola" },
  { name: "persian-alola", region: "alola" },
  { name: "geodude-alola", region: "alola" },
  { name: "graveler-alola", region: "alola" },
  { name: "golem-alola", region: "alola" },
  { name: "grimer-alola", region: "alola" },
  { name: "muk-alola", region: "alola" },
  { name: "exeggutor-alola", region: "alola" },
  { name: "marowak-alola", region: "alola" },

  { name: "meowth-galar", region: "galar" },
  { name: "ponyta-galar", region: "galar" },
  { name: "rapidash-galar", region: "galar" },
  { name: "slowpoke-galar", region: "galar" },
  { name: "slowbro-galar", region: "galar" },
  { name: "slowking-galar", region: "galar" },
  { name: "farfetchd-galar", region: "galar" },
  { name: "weezing-galar", region: "galar" },
  { name: "mr-mime-galar", region: "galar" },
  { name: "corsola-galar", region: "galar" },
  { name: "zigzagoon-galar", region: "galar" },
  { name: "lickitung-galar", region: "galar" },
  { name: "cursola", region: "galar" },
  { name: "runerigus", region: "galar" },

  { name: "wooper-hisui", region: "hisui" },
  { name: "typhlosion-hisui", region: "hisui" },
  { name: "samurott-hisui", region: "hisui" },
  { name: "lilligant-hisui", region: "hisui" },
  { name: "sneasel-hisui", region: "hisui" },
  { name: "qwilfish-hisui", region: "hisui" },
  { name: "overqwil", region: "hisui" },
  { name: "basculin-white-striped", region: "hisui" },
  { name: "sneasler", region: "hisui" },
  { name: "basculegion", region: "hisui" },
  { name: "ursaluna", region: "hisui" },
  { name: "wyrdeer", region: "hisui" },
  { name: "kleavor", region: "hisui" },

  { name: "wooper-paldea", region: "paldea" },
  { name: "girafarig-paldea", region: "paldea" },
  { name: "farigiraf", region: "paldea" },
  { name: "tauros-paldea-combat", region: "paldea" },
  { name: "tauros-paldea-blaze", region: "paldea" },
  { name: "tauros-paldea-aqua", region: "paldea" },
];

// DOM Elements
const pokemonGrid = document.getElementById("pokemonGrid");
const searchInput = document.getElementById("search");
const filterRegion = document.getElementById("regionFilter");
const modal = document.getElementById("popup");
const modalClose = document.getElementById("closeBtn");
const modalImg = document.getElementById("popupImg");
const modalName = document.getElementById("popupName");
const modalTypes = document.getElementById("popupTypes");
const modalAbilities = document.getElementById("popupAbilities");
const modalStats = document.getElementById("popupStats");

// Helpers
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getSpriteUrl(name) {
  return `../images/pokedex/${name}.png`;
}
function fallbackSprite(name) {
  const baseName = name.split("-")[0];
  return `../images/pokedex/${baseName}.png`;
}

// Render Pokémon
function renderPokemon(list) {
  pokemonGrid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("pokemonCard");
    card.innerHTML = `<img src="${getSpriteUrl(p.name)}" onerror="this.src='${fallbackSprite(p.name)}'" alt="${p.name}"><h3>${capitalize(p.name.replace(/-/g, " "))}</h3>`;
    card.addEventListener("click", () => openModal(p));
    pokemonGrid.appendChild(card);
  });
}

// Modal (local-only, no fetch)
async function openModal(p) {
  modal.style.display = "flex";
  modalName.textContent = capitalize(p.name.replace(/-/g, " "));

  modalImg.src = getSpriteUrl(p.name);
  modalImg.onerror = () => (modalImg.src = fallbackSprite(p.name));

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
    const data = await res.json();

    // TYPES
    modalTypes.innerHTML = data.types
      .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
      .join("");

    // ABILITIES
    modalAbilities.innerHTML = `
            <h4>Abilities</h4>
            ${data.abilities.map((a) => `<p>${a.ability.name}</p>`).join("")}
        `;

    // STATS
    modalStats.innerHTML = `
            <h4>Stats</h4>
            ${data.stats
              .map(
                (s) => `
                <div class="stat">
                    <div class="stat-label">
                        <span>${s.stat.name}</span>
                        <span>${s.base_stat}</span>
                    </div>
                    <div class="statBar">
                        <div class="statFill" style="width:${s.base_stat / 2}%"></div>
                    </div>
                </div>
            `,
              )
              .join("")}
        `;
  } catch (err) {
    console.error(err);
    modalTypes.innerHTML = "<p>⚠️ Data not found</p>";
  }
}

modalClose.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

// Search & Filter
function filterPokemon() {
  const query = searchInput.value.toLowerCase();
  const region = filterRegion.value.toLowerCase();
  const filtered = pokemonList.filter(
    (p) => p.name.includes(query) && (region === "all" || p.region === region),
  );
  renderPokemon(filtered);
}
searchInput.addEventListener("input", filterPokemon);
filterRegion.addEventListener("change", filterPokemon);

// Initial Render
renderPokemon(pokemonList);
