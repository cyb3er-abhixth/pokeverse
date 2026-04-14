window.addEventListener("DOMContentLoaded", () => {
  // ================= MENU =================
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

// ================= ELEMENTS =================
const grid = document.getElementById("pokemonGrid");
const genFilter = document.getElementById("genFilter");

const popup = document.getElementById("popup");
const closeBtnPopup = document.getElementById("closeBtn");

const popupName = document.getElementById("popupName");
const popupImg = document.getElementById("popupImg");

const hp = document.getElementById("hp");
const atk = document.getElementById("atk");
const def = document.getElementById("def");
const spatk = document.getElementById("spatk");
const spdef = document.getElementById("spdef");
const speed = document.getElementById("speed");

const ability = document.getElementById("ability");
const description = document.getElementById("description");
const types = document.getElementById("types");

// ================= IMAGE SYSTEM =================
const IMAGE_BASE_PATH = "../images/mega-evolutions/";

function formatMegaImageName(name) {
  return (
    name
      .split("-")
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join("-") + ".png"
  );
}

function getMegaImage(name) {
  return IMAGE_BASE_PATH + formatMegaImageName(name);
}

// ================= FILTER =================
genFilter.addEventListener("change", () => {
  const gen = genFilter.value;
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display =
      gen === "all" || card.dataset.gen === gen ? "block" : "none";
  });
});

// ================= DATA =================
const megaDescriptions = {
  // ===== KANTO =====
  "venusaur-mega": "Mega Venusaur gains a thick protective flower bloom that absorbs sunlight and boosts its defensive power to extreme levels.",

  "charizard-mega-x": "Mega Charizard X undergoes a rare type shift into Fire/Dragon, gaining black-blue flames and overwhelming physical power.",

  "charizard-mega-y": "Mega Charizard Y focuses on special attack, reaching extreme heat output that can rival the sun itself.",

  "blastoise-mega": "Mega Blastoise equips a massive cannon system capable of firing pressurized water blasts strong enough to pierce steel.",

  "beedrill-mega": "Mega Beedrill becomes a relentless attacker with reinforced stingers and extreme speed, striking like a swarm of blades.",

  "pidgeot-mega": "Mega Pidgeot achieves incredible aerial mastery, using powerful winds to strike enemies from extreme distances.",

  "alakazam-mega": "Mega Alakazam’s brain power becomes so advanced it can predict outcomes instantly and move before opponents react.",

  "slowbro-mega": "Mega Slowbro is fully armored by Shellder, turning into a heavily fortified tank with extreme defensive resilience.",

  "gengar-mega": "Mega Gengar merges deeper into the shadow realm, becoming a terrifying entity that drags opponents into darkness.",

  "kangaskhan-mega": "Mega Kangaskhan reveals its grown offspring, fighting in perfect sync to overwhelm opponents with coordinated attacks.",

  "pinsir-mega": "Mega Pinsir evolves into a brutal flying fighter with massive claws capable of shredding through steel.",

  "gyarados-mega": "Mega Gyarados becomes even more destructive, embodying pure rage and overwhelming aquatic power.",

  "aerodactyl-mega": "Mega Aerodactyl returns closer to its prehistoric form, becoming faster and more ferocious than ever.",

  "mewtwo-mega-x": "Mega Mewtwo X gains incredible physical strength, becoming one of the strongest fighters ever created.",

  "mewtwo-mega-y": "Mega Mewtwo Y enhances psychic power to unimaginable levels, focusing entirely on overwhelming special attack.",

  // ===== JOHTO =====
  "ampharos-mega": "Mega Ampharos awakens ancient dragon-like traits, increasing its electric output to radiant levels.",

  "steelix-mega": "Mega Steelix becomes a colossal iron serpent with nearly impenetrable defense and crushing strength.",

  "scizor-mega": "Mega Scizor sacrifices speed for overwhelming power, turning its claws into near-unbreakable cutting weapons.",

  "heracross-mega": "Mega Heracross gains immense horn strength, capable of lifting and launching massive opponents.",

  "houndoom-mega": "Mega Houndoom’s flames burn hotter and more toxic, making it a fearsome dark inferno predator.",

  "tyranitar-mega": "Mega Tyranitar becomes a walking disaster, its power so great it can reshape terrain unintentionally.",

  // ===== HOENN =====
  "sceptile-mega": "Mega Sceptile gains dragon energy in its tail and becomes a lightning-fast forest assassin.",

  "blaziken-mega": "Mega Blaziken’s speed and fire power combine into devastating martial arts attacks.",

  "swampert-mega": "Mega Swampert becomes a brute-force powerhouse capable of crushing boulders with ease.",

  "gardevoir-mega": "Mega Gardevoir bends space itself, generating miniature black holes in battle.",

  "sableye-mega": "Mega Sableye becomes nearly untouchable, using gem armor to reflect attacks.",

  "mawile-mega": "Mega Mawile’s second jaw grows massive, delivering crushing bite-force attacks.",

  "aggron-mega": "Mega Aggron becomes a pure steel fortress with unmatched defensive capability.",

  "medicham-mega": "Mega Medicham achieves perfect mind-body balance, increasing power beyond normal limits.",

  "manectric-mega": "Mega Manectric generates unstable lightning energy, moving at extreme speeds.",

  "sharpedo-mega": "Mega Sharpedo becomes a high-speed missile of destruction underwater and on land.",

  "camerupt-mega": "Mega Camerupt erupts constantly, turning its body into a living volcano.",

  "altaria-mega": "Mega Altaria becomes a cloud-like dragon of harmony and destructive sound energy.",

  "banette-mega": "Mega Banette is fueled by pure malice, becoming stronger the more it is hated.",

  "absol-mega": "Mega Absol enhances its disaster sensing ability, becoming a harbinger of unavoidable fate.",

  "glalie-mega": "Mega Glalie becomes a frozen predator with jaws capable of crushing anything.",

  "salamence-mega": "Mega Salamence gains unstoppable flight power, slicing through the sky like a weapon.",

  "metagross-mega": "Mega Metagross fuses all brains into a supercomputer-level intelligence and combat power.",

  "latias-mega": "Mega Latias gains enhanced psychic speed and healing aura abilities.",

  "latios-mega": "Mega Latios becomes a high-speed psychic attacker capable of dimensional travel.",

  "rayquaza-mega": "Mega Rayquaza transcends normal evolution and becomes one of the most powerful beings in existence.",

  // ===== KALOS =====
  "diancie-mega": "Mega Diancie becomes a radiant crystal queen capable of reflecting and amplifying light energy."
};

// (rest will fallback automatically)

// ================= MEGA LIST =================
const megaList = [
  ["venusaur-mega", 3, 1],
  ["charizard-mega-x", 6, 1],
  ["charizard-mega-y", 6, 1],
  ["blastoise-mega", 9, 1],
  ["alakazam-mega", 65, 1],
  ["gengar-mega", 94, 1],
  ["kangaskhan-mega", 115, 1],
  ["pinsir-mega", 127, 1],
  ["gyarados-mega", 130, 1],
  ["aerodactyl-mega", 142, 1],
  ["mewtwo-mega-x", 150, 1],
  ["mewtwo-mega-y", 150, 1],

  ["ampharos-mega", 181, 2],
  ["steelix-mega", 208, 2],
  ["scizor-mega", 212, 2],
  ["heracross-mega", 214, 2],
  ["houndoom-mega", 229, 2],
  ["tyranitar-mega", 248, 2],

  ["sceptile-mega", 254, 3],
  ["blaziken-mega", 257, 3],
  ["swampert-mega", 260, 3],
  ["gardevoir-mega", 282, 3],
  ["sableye-mega", 302, 3],
  ["mawile-mega", 303, 3],
  ["aggron-mega", 306, 3],
  ["medicham-mega", 308, 3],
  ["manectric-mega", 310, 3],
  ["sharpedo-mega", 319, 3],
  ["camerupt-mega", 323, 3],
  ["altaria-mega", 334, 3],
  ["banette-mega", 354, 3],
  ["absol-mega", 359, 3],
  ["glalie-mega", 362, 3],
  ["salamence-mega", 373, 3],
  ["metagross-mega", 376, 3],
  ["latias-mega", 380, 3],
  ["latios-mega", 381, 3],
  ["rayquaza-mega", 384, 3],

  ["lopunny-mega", 428, 4],
  ["garchomp-mega", 445, 4],
  ["lucario-mega", 448, 4],
  ["abomasnow-mega", 460, 4],
  ["gallade-mega", 475, 4],
  ["audino-mega", 531, 5],
  ["diancie-mega", 719, 6],
];

const megaStats = {
  // ===== KANTO =====
  "venusaur-mega": { hp: 80, atk: 100, def: 123, spatk: 122, spdef: 120, speed: 80 },
  "charizard-mega-x": { hp: 78, atk: 130, def: 111, spatk: 130, spdef: 85, speed: 100 },
  "charizard-mega-y": { hp: 78, atk: 104, def: 78, spatk: 159, spdef: 115, speed: 100 },
  "blastoise-mega": { hp: 79, atk: 103, def: 120, spatk: 135, spdef: 115, speed: 78 },

  "beedrill-mega": { hp: 65, atk: 150, def: 40, spatk: 15, spdef: 80, speed: 145 },
  "pidgeot-mega": { hp: 83, atk: 80, def: 80, spatk: 135, spdef: 80, speed: 121 },
  "alakazam-mega": { hp: 55, atk: 50, def: 65, spatk: 175, spdef: 105, speed: 150 },
  "slowbro-mega": { hp: 95, atk: 75, def: 180, spatk: 130, spdef: 80, speed: 30 },
  "gengar-mega": { hp: 60, atk: 65, def: 80, spatk: 170, spdef: 95, speed: 130 },
  "kangaskhan-mega": { hp: 105, atk: 125, def: 100, spatk: 60, spdef: 100, speed: 100 },
  "pinsir-mega": { hp: 65, atk: 155, def: 120, spatk: 65, spdef: 90, speed: 105 },
  "gyarados-mega": { hp: 95, atk: 155, def: 109, spatk: 70, spdef: 130, speed: 81 },
  "aerodactyl-mega": { hp: 80, atk: 135, def: 85, spatk: 70, spdef: 95, speed: 150 },
  "mewtwo-mega-x": { hp: 106, atk: 190, def: 100, spatk: 154, spdef: 100, speed: 130 },
  "mewtwo-mega-y": { hp: 106, atk: 150, def: 70, spatk: 194, spdef: 120, speed: 140 },

  // ===== JOHTO =====
  "ampharos-mega": { hp: 90, atk: 95, def: 105, spatk: 165, spdef: 110, speed: 45 },
  "steelix-mega": { hp: 75, atk: 125, def: 230, spatk: 55, spdef: 95, speed: 30 },
  "scizor-mega": { hp: 70, atk: 150, def: 140, spatk: 65, spdef: 100, speed: 75 },
  "heracross-mega": { hp: 80, atk: 185, def: 115, spatk: 40, spdef: 105, speed: 75 },
  "houndoom-mega": { hp: 75, atk: 90, def: 90, spatk: 140, spdef: 90, speed: 115 },
  "tyranitar-mega": { hp: 100, atk: 164, def: 150, spatk: 95, spdef: 120, speed: 71 },

  // ===== HOENN =====
  "sceptile-mega": { hp: 70, atk: 110, def: 75, spatk: 145, spdef: 85, speed: 145 },
  "blaziken-mega": { hp: 80, atk: 160, def: 80, spatk: 130, spdef: 80, speed: 100 },
  "swampert-mega": { hp: 100, atk: 150, def: 110, spatk: 95, spdef: 110, speed: 70 },

  "gardevoir-mega": { hp: 68, atk: 85, def: 65, spatk: 165, spdef: 135, speed: 100 },
  "sableye-mega": { hp: 50, atk: 85, def: 125, spatk: 85, spdef: 115, speed: 20 },
  "mawile-mega": { hp: 50, atk: 105, def: 125, spatk: 55, spdef: 95, speed: 50 },
  "aggron-mega": { hp: 70, atk: 140, def: 230, spatk: 60, spdef: 80, speed: 50 },
  "medicham-mega": { hp: 60, atk: 100, def: 85, spatk: 80, spdef: 85, speed: 100 },
  "manectric-mega": { hp: 70, atk: 75, def: 80, spatk: 135, spdef: 80, speed: 135 },
  "sharpedo-mega": { hp: 70, atk: 140, def: 70, spatk: 110, spdef: 65, speed: 105 },
  "camerupt-mega": { hp: 70, atk: 120, def: 100, spatk: 145, spdef: 105, speed: 20 },
  "altaria-mega": { hp: 75, atk: 110, def: 110, spatk: 110, spdef: 105, speed: 80 },
  "banette-mega": { hp: 64, atk: 165, def: 75, spatk: 93, spdef: 83, speed: 75 },
  "absol-mega": { hp: 65, atk: 150, def: 60, spatk: 115, spdef: 60, speed: 115 },
  "glalie-mega": { hp: 80, atk: 120, def: 80, spatk: 120, spdef: 80, speed: 100 },
  "salamence-mega": { hp: 95, atk: 145, def: 130, spatk: 120, spdef: 90, speed: 120 },
  "metagross-mega": { hp: 80, atk: 145, def: 150, spatk: 105, spdef: 110, speed: 110 },
  "latias-mega": { hp: 80, atk: 100, def: 120, spatk: 140, spdef: 150, speed: 110 },
  "latios-mega": { hp: 80, atk: 130, def: 100, spatk: 160, spdef: 120, speed: 110 },
  "rayquaza-mega": { hp: 105, atk: 180, def: 100, spatk: 180, spdef: 100, speed: 115 },

  // ===== KALOS / OTHER =====
  "diancie-mega": { hp: 50, atk: 160, def: 110, spatk: 160, spdef: 110, speed: 110 }
};

// ================= CREATE CARDS =================
megaList.forEach(([name, id, gen]) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.gen = gen;

  const imgSrc = getMegaImage(name);

  card.innerHTML = `
    <img src="${imgSrc}" alt="${name}" 
      onerror="this.src='../images/mega-evolutions/default.png'">
    <h3>${name.replace(/\b\w/g, l => l.toUpperCase())}</h3>
  `;

  grid.appendChild(card);

  // ================= FETCH DATA (STATS ONLY) =================
  const baseName = name.split("-mega")[0];

  fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`)
    .then(res => res.json())
    .then(data => {
      card.dataset.data = JSON.stringify(data);
    })
    .catch(err => console.error("Error loading:", name, err));

  // ================= CLICK EVENT =================
  card.onclick = () => {
    if (!card.dataset.data) return;

    const data = JSON.parse(card.dataset.data);

    popup.style.display = "flex";
    popupName.innerText = name.replace(/\b\w/g, l => l.toUpperCase());

    // IMAGE (LOCAL ONLY)
    popupImg.src = getMegaImage(name);

    // ================= STATS =================
    const stats = data.stats;

    hp.style.width = (stats[0].base_stat / 255) * 100 + "%";
    atk.style.width = (stats[1].base_stat / 255) * 100 + "%";
    def.style.width = (stats[2].base_stat / 255) * 100 + "%";
    spatk.style.width = (stats[3].base_stat / 255) * 100 + "%";
    spdef.style.width = (stats[4].base_stat / 255) * 100 + "%";
    speed.style.width = (stats[5].base_stat / 255) * 100 + "%";

    // ================= ABILITY =================
    ability.innerText = data.abilities[0].ability.name;

    // ================= DESCRIPTION =================
    description.innerText =
      megaDescriptions[name] ||
      "Mega Evolution unlocks hidden potential and drastically boosts battle performance.";

    // ================= TYPES =================
    types.innerHTML = "";
    data.types.forEach(t => {
      const type = document.createElement("span");
      type.className = "type " + t.type.name;
      type.innerText =
        t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1);
      types.appendChild(type);
    });
  };
});

// ================= CLOSE POPUP =================
closeBtnPopup.onclick = () => {
  popup.style.display = "none";
};