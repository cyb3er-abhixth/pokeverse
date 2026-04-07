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
    if (gen === "all") {
      card.style.display = "block";
    } else if (card.dataset.gen === gen) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

const popupImg = document.getElementById("popupImg");
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
  "venusaur-mega":
    "Its flower blooms with a brilliant blue light. It fires beams that can incinerate foes.",
  "charizard-mega-x":
    "The overwhelming power that fills its entire body builds and bilds, never leaving even as it takes to the air.",
  "charizard-mega-y":
    "It boasts the largest body size of all its forms. It jets around by venting intensive heat from the ports on its body.",
  "blastoise-mega":
    "The water jets it fires from the ports in its shell are powerful enough to pierce through steel.",
  "beedrill-mega":
    "Its legs have become massive stingers. It can poison a foe just by touching it with these limbs.",
  "pidgeot-mega":
    "Its flight is majestic. Taking to the sky, this Pokémon flies at speeds exceeding 200 mph.",
  "raichu-mega-x":
    "The electric sacs on the sides of its body discharge massive amounts of electrical energy into the ground.",
  "raichu-mega-y":
    "Its fur stands on end as it generates electricity. This Pokémon never shows its cute side.",
  "clefable-mega":
    "Its power increases dramatically as its body swells with fairy energy.",
  "alakazam-mega":
    "Its brain power is enhanced with a third eye, allowing it to calculate odds of any situation instantly.",
  "victreebel-mega":
    "It evolves into a more aggressive form. The vine whip it wields is powerful enough to bind and lift large boulders.",
  "slowbro-mega":
    "The Shellder clamped to its tail is fed by the Slowbro's body, and in return, the Shellder enhances its master's mental power.",
  "gengar-mega":
    "It slips into the bodies of the living and silently waits for an opportunity to steal the lives of those who become lost in mountains.",
  "starmie-mega":
    "Its gem core glows distinctly and its movements become as precise and graceful as a professional dancer's.",
  "kangaskhan-mega":
    "The powerful mother grows to a tremendous size, while her young child becomes her shadow.",
  "pinsir-mega":
    "Its pincers grow large and impressive in strength. It becomes a formidable opponent.",
  "gyarados-mega":
    "This Pokémon's overwhelming power is evident in everything it does. It dominates the skies.",
  "aerodactyl-mega":
    "This Pokémon lives by the rule of the survival of the fittest. It mercilessly defeats any Pokémon in its path.",
  "dragonite-mega":
    "Its body is covered in metallic, hard scales. Its power is incomparable to other Pokémon.",
  "mewtwo-mega-x":
    "Its fighting power is said to increase tenfold. Its aggressive nature is enhanced as well.",
  "mewtwo-mega-y":
    "It was artificially created by science. Its psychic power is increased dramatically.",
  "meganium-mega":
    "The blooms on its back spread a pleasing aroma that enhances the abilities of its allies.",
  "feraligatr-mega":
    "Its power is said to increase to terrifying levels. It becomes a fearless brawler.",
  "ampharos-mega":
    "The luminescent power it generates is intense and is said to be visible even from the far side of a mountain.",
  "steelix-mega":
    "Its body is hard as steel. It becomes even more resistant to attacks.",
  "scizor-mega":
    "Its offensive power is maximized. Its fighting ability is said to increase exponentially.",
  "heracross-mega":
    "Its horn shines with an overwhelming sheen that suggests its unparalleled power.",
  "skarmory-mega":
    "Its armor becomes even more impenetrable. Its steel wings cut through the air.",
  "houndoom-mega":
    "Its power increases to overwhelming levels. It becomes a fearsome predator.",
  "tyranitar-mega":
    "Its power surges and overflows. An aura of primal power surrounds its form.",
  "sceptile-mega":
    "Its speed is unmatched. It darts about like a jungle's green wind.",
  "blaziken-mega":
    "Its power and fighting spirit burn as fiercely as its body temperature.",
  "swampert-mega":
    "Its power grows tremendously. It becomes an overwhelmingly powerful opponent.",
  "gardevoir-mega":
    "It can create black hole-like distortions and warp space to teleport.",
  "sableye-mega":
    "Its body becomes even more sinister as it absorbs darkness itself.",
  "mawile-mega": "Its other jaw grows huge. Its power is multiplied tenfold.",
  "aggron-mega":
    "Its body is harder than steel. It becomes an impenetrable wall of defense.",
  "medicham-mega":
    "Its psychic and fighting powers heighten dramatically. It becomes perfectly centered.",
  "manectric-mega":
    "Its muscular body glows yellow and generates powerful electric currents.",
  "sharpedo-mega":
    "Its sleek form cuts through water like a hot knife through butter.",
  "camerupt-mega":
    "Its volcanic power erupts from its body. It becomes a raging force of nature.",
  "altaria-mega":
    "It catches fire within its body and becomes a jet-like flyer.",
  "banette-mega":
    "The strength of its vindictive aura becomes absolute. It can drive anyone mad with envy.",
  "chimecho-mega":
    "Its body rings like a bell as it floats through the air gracefully.",
  "absol-mega":
    "Its horn shines with a dark light. Its power becomes more terrible than ever.",
  "glalie-mega":
    "It emerges from the ice completely transformed into a savage beast.",
  "salamence-mega":
    "It becomes a dragon of overwhelming power. Its intimidating aura is unmatched.",
  "metagross-mega":
    "Its four brains working together makes it incredibly intelligent and powerful.",
  "latias-mega":
    "Its psychic power is amplified. It becomes swift and graceful beyond compare.",
  "latios-mega":
    "Its spiritual power swells up. It soars through the skies at incredible speeds.",
  "rayquaza-mega":
    "Its power is unleashed as it rises up. Its overwhelming might is on full display.",
  "staraptor-mega":
    "Its wings become magnificent. It takes flight at unprecedented speeds.",
  "lopunny-mega":
    "Its soft fur becomes bristly and aggressive. Its fighting power reaches new heights.",
  "garchomp-mega": "Its power soars. It becomes a dragon of dragon-slayers.",
  "lucario-mega":
    "Its aura becomes a brilliant golden color. Its power and momentum increase dramatically.",
  "abomasnow-mega":
    "Snow falls around it as its power grows immense, covering the landscape in white.",
  "gallade-mega":
    "Its blade appendages grow larger and more powerful. It becomes an unstoppable swordsman.",
  "froslass-mega":
    "Its power grows dramatically. It becomes a spirit of the winter winds.",
  "heatran-mega":
    "Its volcanic power burns fiercely. It becomes a scorching titan of flame.",
  "darkrai-mega":
    "It emerges from the darkness itself, embodying nightmares made manifest.",
  "emboar-mega":
    "Its embers burn with tremendous force. It becomes a blazing warrior.",
  "excadrill-mega":
    "Its claws become diamond-hard. It drills through anything with ease.",
  "audino-mega":
    "Its healing aura sharpens and intensifies. It becomes a beacon of hope.",
  "scolipede-mega":
    "Its body length increases immensely. It becomes a venomous force of nature.",
  "scrafty-mega":
    "Its crest shines brilliantly. Its fighting spirit reaches explosive levels.",
  "eelektross-mega":
    "Its electric power surges to overwhelming levels. It becomes lightning incarnate.",
  "chandelure-mega":
    "Its sinister flame burns hotter than ever. It becomes an inferno of power.",
  "golurk-mega":
    "Its power overflows. It becomes an unstoppable colossus of strength.",
  "chesnaught-mega":
    "Its wooden armor becomes impervious. It is a fortress of nature's protection.",
  "delphox-mega":
    "Its psychic power burns like fire. It becomes mystical and powerful.",
  "greninja-mega":
    "Its movement becomes faster in sync with its heart. It becomes one with the water.",
  "pyroar-mega":
    "Its mane grows ferociously. Its power and beauty increase dramatically.",
  "floette-mega":
    "Its flower blooms magnificently. Its power reaches new heights.",
  "meowstic-mega":
    "Its psychic power is amplified. It becomes eerily graceful.",
  "malamar-mega":
    "Its sinister aura grows stronger. It becomes a deep-sea demon.",
  "barbaracle-mega": "Its appendages become even more numerous and powerful.",
  "dragalge-mega":
    "It becomes a terrifying dragon of the seas, crushing all that oppose it.",
  "hawlucha-mega":
    "Its fighting spirit burns brighter. It soars like an eagle in battle.",
  "zygarde-mega":
    "Its power collects and manifests. It becomes an avatar of order.",
  "diancie-mega":
    "Its body becomes even more crystalline and radiant with beauty.",
  "crabominable-mega":
    "Its punches become incredibly powerful. It becomes a force of nature.",
  "golisopod-mega":
    "Its armored body becomes even more imposing. It is an undefeatable warrior.",
  "drampa-mega":
    "Its draconic power continues to intensify. It becomes a true elder dragon.",
  "magearna-mega":
    "Its gears spin at maximum capacity. It reaches peak mechanical performance.",
  "zeraora-mega":
    "Its electrical power crackles with uncontrolled fury. It becomes electrocuting incarnate.",
};

const megaList = [
  ["venusaur-mega", 3, 1],
  ["charizard-mega-x", 6, 1],
  ["charizard-mega-y", 6, 1],
  ["blastoise-mega", 9, 1],
  ["beedrill-mega", 15, 1],
  ["pidgeot-mega", 18, 1],
  ["raichu-mega-x", 26, 1],
  ["raichu-mega-y", 26, 1],
  ["clefable-mega", 36, 1],
  ["alakazam-mega", 65, 1],
  ["victreebel-mega", 71, 1],
  ["slowbro-mega", 80, 1],
  ["gengar-mega", 94, 1],
  ["starmie-mega", 121, 1],
  ["kangaskhan-mega", 115, 1],
  ["pinsir-mega", 127, 1],
  ["gyarados-mega", 130, 1],
  ["aerodactyl-mega", 142, 1],
  ["dragonite-mega", 149, 1],
  ["mewtwo-mega-x", 150, 1],
  ["mewtwo-mega-y", 150, 1],
  ["meganium-mega", 154, 2],
  ["feraligatr-mega", 160, 2],
  ["ampharos-mega", 181, 2],
  ["steelix-mega", 208, 2],
  ["scizor-mega", 212, 2],
  ["heracross-mega", 214, 2],
  ["skarmory-mega", 227, 2],
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
  ["chimecho-mega", 358, 3],
  ["absol-mega", 359, 3],
  ["glalie-mega", 362, 3],
  ["salamence-mega", 373, 3],
  ["metagross-mega", 376, 3],
  ["latias-mega", 380, 3],
  ["latios-mega", 381, 3],
  ["rayquaza-mega", 384, 3],
  ["staraptor-mega", 398, 4],
  ["lopunny-mega", 428, 4],
  ["garchomp-mega", 445, 4],
  ["lucario-mega", 448, 4],
  ["abomasnow-mega", 460, 4],
  ["gallade-mega", 475, 4],
  ["froslass-mega", 478, 4],
  ["heatran-mega", 485, 4],
  ["darkrai-mega", 491, 4],
  ["emboar-mega", 500, 5],
  ["excadrill-mega", 530, 5],
  ["audino-mega", 531, 5],
  ["scolipede-mega", 545, 5],
  ["scrafty-mega", 560, 5],
  ["eelektross-mega", 604, 5],
  ["chandelure-mega", 609, 5],
  ["golurk-mega", 623, 5],
  ["chesnaught-mega", 652, 6],
  ["delphox-mega", 655, 6],
  ["greninja-mega", 658, 6],
  ["pyroar-mega", 668, 6],
  ["floette-mega", 670, 6],
  ["meowstic-mega", 678, 6],
  ["malamar-mega", 687, 6],
  ["barbaracle-mega", 689, 6],
  ["dragalge-mega", 691, 6],
  ["hawlucha-mega", 701, 6],
  ["zygarde-mega", 718, 6],
  ["diancie-mega", 719, 6],
  ["crabominable-mega", 740, 7],
  ["golisopod-mega", 768, 7],
  ["drampa-mega", 780, 7],
  ["magearna-mega", 801, 7],
  ["zeraora-mega", 807, 7],
];

megaList.forEach((pokemon) => {
  const name = pokemon[0];
  const id = pokemon[1];

  const card = document.createElement("div");
  card.className = "card";
  card.dataset.gen = pokemon[2];

  card.innerHTML = `
    <img src="../images/pokedex/MEGA EVOLUTIONS/${name}.png">
    <h3>${name.replace(/\b\w/g, (l) => l.toUpperCase())}</h3>
  `;

  grid.appendChild(card);

  card.onclick = () => {
    if (card.dataset.data) {
      const data = JSON.parse(card.dataset.data);

      popup.style.display = "flex";

      popupImg.src = `../images/pokedex/MEGA EVOLUTIONS/${name}.png`;
      popupName.innerText = name
        .replace(/\b\w/g, (l) => l.toUpperCase());

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
        type.innerText =
          t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1);
        types.appendChild(type);
      })
      }
    };

    const baseName = name.split("-mega")[0];

    fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`)
    .then((res) => res.json())
    .then((data) => {
      card.dataset.data = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error fetching data for", name, error);
    });
});

closeBtn.onclick = () => {
  popup.style.display = "none";
};
