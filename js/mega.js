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

const grid = document.getElementById("pokemonGrid");
const genFilter = document.getElementById("genFilter");

genFilter.addEventListener("change", () => {
  const gen = genFilter.value;
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.style.display = gen === "all" || card.dataset.gen === gen ? "block" : "none";
  });
});

const popup = document.getElementById("popup");
const closeBtnPopup = document.getElementById("closeBtn");

const popupName = document.getElementById("popupName");
const hp = document.getElementById("hp");
const atk = document.getElementById("atk");
const def = document.getElementById("def");
const spatk = document.getElementById("spatk");
const spdef = document.getElementById("spdef");
const speed = document.getElementById("speed");
const ability = document.getElementById("ability");
const description = document.getElementById("description");
const types = document.getElementById("types");

const megaDescriptions = {
  "venusaur-mega": "Its flower blooms with a brilliant blue light...",
  "charizard-mega-x": "The overwhelming power that fills its entire body...",
  // ... keep all descriptions
};

const megaList = [
  ["venusaur-mega", 3, 1],
  ["charizard-mega-x", 6, 1],
  // ... keep the rest
];

megaList.forEach((pokemon) => {
  const name = pokemon[0];

  const card = document.createElement("div");
  card.className = "card";
  card.dataset.gen = pokemon[2];

  // ✅ Card without image
  card.innerHTML = `<h3>${name.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>`;

  grid.appendChild(card);

  card.onclick = () => {
    if (!card.dataset.data) return;
    const data = JSON.parse(card.dataset.data);

    popup.style.display = "flex";

    popupName.innerText = name.replace(/\b\w/g, (l) => l.toUpperCase());

    const stats = data.stats;
    hp.style.width = (stats[0].base_stat / 255) * 100 + "%";
    atk.style.width = (stats[1].base_stat / 255) * 100 + "%";
    def.style.width = (stats[2].base_stat / 255) * 100 + "%";
    spatk.style.width = (stats[3].base_stat / 255) * 100 + "%";
    spdef.style.width = (stats[4].base_stat / 255) * 100 + "%";
    speed.style.width = (stats[5].base_stat / 255) * 100 + "%";

    ability.innerText = data.abilities[0].ability.name;

    description.innerText =
      megaDescriptions[name] ||
      "Mega Evolution unlocks the Pokémon's hidden potential and greatly boosts its battle abilities.";

    types.innerHTML = "";
    data.types.forEach((t) => {
      const type = document.createElement("span");
      type.className = "type " + t.type.name;
      type.innerText = t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1);
      types.appendChild(type);
    });
  };

  const baseName = name.split("-mega")[0];
  fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`)
    .then((res) => res.json())
    .then((data) => {
      card.dataset.data = JSON.stringify(data);
    })
    .catch((error) => console.error("Error fetching data for", name, error));
});

closeBtnPopup.onclick = () => {
  popup.style.display = "none";
};