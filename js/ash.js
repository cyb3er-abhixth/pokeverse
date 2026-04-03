window.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("pokemonGrid");
  const search = document.getElementById("search");
  const typeFilter = document.getElementById("typeFilter");
  const tabs = document.querySelectorAll(".tab");

  let currentRegion = "all";

const ashPokemon = [
    // Kanto / Orange Islands
    { name: "Pikachu", region: "Kanto", ace: true, status: "On Team (Permanent Partner)", specialty: "10,000,000 Volt Thunderbolt (Z-Move) & Gigantamax" },
    { name: "Butterfree", region: "Kanto", ace: false, status: "Released", specialty: "Status-inducing powders; First caught & first released" },
    { name: "Pidgeot", region: "Kanto", ace: false, status: "At Oak's Lab (Rejoined)", specialty: "High-speed aerial combat; Reunited in series finale" },
    { name: "Bulbasaur", region: "Kanto", ace: false, status: "At Oak's Lab", specialty: "Solar Beam & Ambassador/Leader of the Lab" },
    { name: "Charizard", region: "Kanto", ace: true, status: "At Oak's Lab", specialty: "Seismic Toss & Flamethrower; Elite power-house" },
    { name: "Squirtle", region: "Kanto", ace: false, status: "With the Squirtle Squad (Officer Jenny)", specialty: "Hydro Pump & Rapid Spin" },
    { name: "Kingler", region: "Kanto", ace: false, status: "At Oak's Lab", specialty: "Crabhammer; Famous for Indigo League sweep" },
    { name: "Primeape", region: "Kanto", ace: false, status: "At Oak's Lab (Returned)", specialty: "Physical brawler; Returned from P1 training in finale" },
    { name: "Muk", region: "Kanto", ace: false, status: "At Oak's Lab", specialty: "Body Slam & physical absorption" },
    { name: "Tauros (x30)", region: "Kanto", ace: false, status: "At Oak's Lab", specialty: "Fissure & Horn Attack; Caught in Safari Zone" },
    { name: "Lapras", region: "Orange Islands", ace: false, status: "Released", specialty: "Ice Beam & Surf; Reunited briefly in Journeys" },
    { name: "Snorlax", region: "Orange Islands", ace: true, status: "At Oak's Lab", specialty: "Hyper Beam & 6-move versatility; High durability" },
    { name: "Mr. Mime (Mimey)", region: "Kanto", ace: false, status: "With Delia (Ash's Mom)", specialty: "Reflect, Light Screen, & household chores" },

    // Johto
    { name: "Heracross", region: "Johto", ace: true, status: "At Oak's Lab", specialty: "Megahorn & Sleep Talk strategy" },
    { name: "Bayleef", region: "Johto", ace: false, status: "At Oak's Lab", specialty: "Razor Leaf & Vine Whip; Highly affectionate" },
    { name: "Quilava", region: "Johto", ace: false, status: "At Oak's Lab", specialty: "Eruption & Flame Wheel; Evolved in Sinnoh" },
    { name: "Totodile", region: "Johto", ace: false, status: "At Oak's Lab", specialty: "Water Gun & energetic dancing distractions" },
    { name: "Noctowl", region: "Johto", ace: false, status: "At Oak's Lab", specialty: "Psychic-type move mastery; Shiny/Rare coloration" },
    { name: "Donphan", region: "Johto", ace: false, status: "At Oak's Lab", specialty: "Rollout & Giga Impact; Hatched as Phanpy" },

    // ⭐ Missing Johto Pokémon added:
    { name: "Larvitar", region: "Johto", ace: false, status: "Temporary Companion (Not Officially Caught)", specialty: "Telepathy bond with Ash; Rescue arc" },

    // Hoenn / Battle Frontier
    { name: "Sceptile", region: "Hoenn", ace: true, status: "At Oak's Lab", specialty: "Leaf Blade; Only Pokémon to defeat Darkrai" },
    { name: "Swellow", region: "Hoenn", ace: false, status: "At Oak's Lab", specialty: "Aerial Ace & extreme physical endurance" },
    { name: "Corphish", region: "Hoenn", ace: false, status: "At Oak's Lab", specialty: "Bubble Beam & Vice Grip; Reliable veteran" },
    { name: "Torkoal", region: "Hoenn", ace: false, status: "At Oak's Lab", specialty: "Iron Defense & Heat Wave; Highly emotional" },
    { name: "Glalie", region: "Hoenn", ace: false, status: "At Oak's Lab", specialty: "Ice Beam & Headbutt; Major Hoenn League carry" },
    { name: "Aipom", region: "Hoenn", ace: false, status: "Released (Ping Pong)", specialty: "Focus Punch; Traded to Dawn & evolved into Ambipom" },

    // Sinnoh
    { name: "Infernape", region: "Sinnoh", ace: true, status: "At Oak's Lab", specialty: "Blaze Ability & Flare Blitz mastery" },
    { name: "Torterra", region: "Sinnoh", ace: false, status: "At Oak's Lab", specialty: "Leaf Storm & Rock Climb; Tank-style battling" },
    { name: "Staraptor", region: "Sinnoh", ace: false, status: "At Oak's Lab", specialty: "Close Combat & Brave Bird" },
    { name: "Buizel", region: "Sinnoh", ace: false, status: "At Oak's Lab", specialty: "Ice Aqua Jet & competitive spirit; Traded from Dawn" },
    { name: "Gliscor", region: "Sinnoh", ace: false, status: "At Oak's Lab", specialty: "Giga Impact & X-Scissor; Mastered wind-gliding" },
    { name: "Gible", region: "Sinnoh", ace: false, status: "At Oak's Lab", specialty: "Draco Meteor & biting; First Dragon-type" },

    // Unova
    { name: "Krookodile", region: "Unova", ace: true, status: "At Oak's Lab", specialty: "Dragon Claw & Stone Edge; Wears signature sunglasses" },
    { name: "Unfezant", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Aerial Ace & Gust; Only female bird on team" },
    { name: "Oshawott", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Razor Shell & Scalchop swordplay" },
    { name: "Pignite", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Fire Pledge & physical wrestling" },
    { name: "Snivy", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Attract & Leaf Storm; Calm under pressure" },
    { name: "Scraggy", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "High Jump Kick & Headbutt; Hatched from egg" },
    { name: "Leavanny", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Energy Ball & X-Scissor; Protective nature" },
    { name: "Palpitoad", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Hydro Pump & Mud Shot; Ground/Water coverage" },
    { name: "Boldore", region: "Unova", ace: false, status: "At Oak's Lab", specialty: "Flash Cannon & Rock Blast; Sturdy defense" },

    // Kalos
    { name: "Greninja", region: "Kalos", ace: true, status: "Released (Kalos Roots)", specialty: "Battle Bond (Ash-Greninja) & Giant Water Shuriken" },
    { name: "Talonflame", region: "Kalos", ace: false, status: "At Oak's Lab", specialty: "Brave Bird & Flame Charge; High-speed scout" },
    { name: "Hawlucha", region: "Kalos", ace: false, status: "At Oak's Lab", specialty: "Flying Press & high-flying showmanship" },
    { name: "Goodra", region: "Kalos", ace: false, status: "Released (Wetlands)", specialty: "Bide & Dragon Pulse; Extreme special defense" },
    { name: "Noivern", region: "Kalos", ace: false, status: "At Oak's Lab", specialty: "Boomburst & Dragon Claw; Hatched as Noibat" },

    // Alola (Champion Team)
    { name: "Lycanroc", region: "Alola", ace: true, status: "At Kukui's Lab", specialty: "Dusk Form & Splintered Stormshards (Z-Move)" },
    { name: "Incineroar", region: "Alola", ace: false, status: "At Kukui's Lab", specialty: "Blast Burn & Darkest Lariat; Evolved from Litten" },
    { name: "Rowlet", region: "Alola", ace: false, status: "At Kukui's Lab", specialty: "Bloom Doom (Z-Move) & Decidueye-cloak disguise" },
    { name: "Melmetal", region: "Alola", ace: false, status: "At Kukui's Lab", specialty: "Double Iron Bash; Ash's first Mythical Pokémon" },
    { name: "Naganadel", region: "Alola", ace: false, status: "Released (Ultra Space)", specialty: "Dragon Pulse & Sludge Bomb; Ultra Beast" },
    { name: "Solgaleo (Nebby)", region: "Alola", ace: false, status: "Released (Wild)", specialty: "Sunsteel Strike; Legendary companion" },
    { name: "Poipole", region: "Alola", ace: false, status: "Released", specialty: "Neuroforce stinger blasts; Bonded deeply with Ash" },
    { name: "Alolan Exeggutor", region: "Alola", ace: false, status: "Temporary Companion", specialty: "Comedic tall height & Grass/Dragon typing" },

    // Journeys (World Champion Team)
    { name: "Lucario", region: "Journeys (Global)", ace: true, status: "At Oak's Lab", specialty: "Mega Evolution & Aura Sphere mastery" },
    { name: "Gengar", region: "Journeys (Global)", ace: false, status: "At Oak's Lab", specialty: "Gigantamax Form & Shadow Ball" },
    { name: "Dragonite", region: "Journeys (Global)", ace: false, status: "At Oak's Lab", specialty: "Dragon Dance & Hurricane; Extremely friendly" },
    { name: "Sirfetch'd", region: "Journeys (Global)", ace: false, status: "At Oak's Lab", specialty: "Meteor Assault & Shield/Sword combat" },
    { name: "Dracovish", region: "Journeys (Global)", ace: false, status: "At Oak's Lab", specialty: "Fishious Rend & ancient strength" }
];

  async function fetchPokemon(name) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      return await res.json();
    } catch {
      return null;
    }
  }

  function createStat(label, value) {
    return `
      <div class="stat">
        <div class="stat-label">
          <span>${label}</span>
          <span>${value}</span>
        </div>
        <div class="statBar">
          <div class="statFill" style="width:${value / 2}%"></div>
        </div>
      </div>
    `;
  }

  function createCard(data, meta) {
    const types = data.types.map(t => t.type.name);
    const hp = data.stats[0].base_stat;
    const atk = data.stats[1].base_stat;
    const def = data.stats[2].base_stat;

    const card = document.createElement("div");
    card.className = "pokemonCard";
    if (meta.ace) card.classList.add("ace");

    card.innerHTML = `
      ${meta.ace ? `<div class="badge">ACE</div>` : ""}

      <img src="${data.sprites.other['official-artwork'].front_default}">
      <h2>${data.name.toUpperCase()}</h2>

      <div class="types">
        ${types.map(t => `<span class="type ${t}">${t}</span>`).join("")}
      </div>

      <div class="stats">
        ${createStat("HP", hp)}
        ${createStat("ATK", atk)}
        ${createStat("DEF", def)}
      </div>

      <div class="power">⚡ Power: ${hp + atk + def}</div>

      <div class="status"><strong>Status:</strong> ${meta.status}</div>
      <div class="specialty"><strong>Specialty:</strong> ${meta.specialty}</div>
    `;

    return card;
  }

  async function render() {
    grid.innerHTML = "Loading...";

    const query = search.value.toLowerCase();
    const type = typeFilter.value;

    grid.innerHTML = "";

    for (const p of ashPokemon) {
      if (currentRegion !== "all" && p.region.toLowerCase() !== currentRegion) continue;
      if (!p.name.toLowerCase().includes(query)) continue;

      const data = await fetchPokemon(p.name);
      if (!data) continue;

      const types = data.types.map(t => t.type.name);
      if (type !== "all" && !types.includes(type)) continue;

      const card = createCard(data, p);
      grid.appendChild(card);
    }
  }

  /* EVENTS */
  search.addEventListener("input", render);
  typeFilter.addEventListener("change", render);

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      currentRegion = tab.dataset.region;
      render();
    });
  });

  render();
});
