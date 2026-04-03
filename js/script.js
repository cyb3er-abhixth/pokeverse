window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("pokedexGrid");
  const modal = document.getElementById("pokedexModal");
  const closeModal = document.querySelector(".closeModal");
  const searchInput = document.getElementById("searchPokemon");

  // mobile menu
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.querySelector("span.overlay");
  const closeBtn = document.querySelector("span.close");

  function toggleMenu() {
    mobileMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    closeBtn.classList.toggle("active");
  }
  menuIcon.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  closeModal.addEventListener("click", () => (modal.style.display = "none"));

  let offset = 1,
    limit = 50,
    loading = false;

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  async function loadBatch() {
    if (loading) return;
    loading = true;
    for (let i = offset; i < offset + limit; i++) {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await res.json();

      const card = document.createElement("div");
      card.classList.add("pokemon-card");
      card.dataset.name = capitalize(data.name);
      card.dataset.types = data.types
        .map((t) => capitalize(t.type.name))
        .join(" / ");
      card.dataset.img = data.sprites.other["official-artwork"].front_default;
      card.dataset.number = `#${String(i).padStart(3, "0")}`;

      // stats
      const stats = {};
      data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));
      card.dataset.hp = stats.hp;
      card.dataset.attack = stats.attack;
      card.dataset.defense = stats.defense;
      card.dataset.special = stats["special-attack"];
      card.dataset.speed = stats.speed;

      card.innerHTML = `
        <img src="${card.dataset.img}">
        <h3>${card.dataset.number} ${card.dataset.name}</h3>
        <div class="stats">
          <div><span style="width:${stats.hp}%"></span></div>
          <div><span style="width:${stats.attack}%"></span></div>
        </div>
      `;

      grid.appendChild(card);
    }
    offset += limit;
    loading = false;
  }
  loadBatch();

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      loadBatch();
    }
  });

  grid.addEventListener("click", async (e) => {
    const card = e.target.closest(".pokemon-card");
    if (!card) return;

    document.getElementById("modalName").innerText = card.dataset.name;
    document.getElementById("modalImg").src = card.dataset.img;
    document.getElementById("modalType").innerText =
      "Type: " + card.dataset.types;

    document.getElementById("statHP").innerText = card.dataset.hp;
    document.getElementById("statAttack").innerText = card.dataset.attack;
    document.getElementById("statDefense").innerText = card.dataset.defense;
    document.getElementById("statSpecial").innerText = card.dataset.special;
    document.getElementById("statSpeed").innerText = card.dataset.speed;

    document.getElementById("modalDescription").innerText =
      `This Pokémon is #${card.dataset.number} and is of type ${card.dataset.types}.`;

    // evolution
    const evoContainer = document.getElementById("evolutionTree");
    evoContainer.innerHTML = "";

    try {
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${parseInt(card.dataset.number.substring(1))}`,
      );
      const speciesData = await speciesRes.json();
      const evoChainRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoChainRes.json();

      function extract(chain) {
        let arr = [chain.species.name];
        if (chain.evolves_to[0]) arr = arr.concat(extract(chain.evolves_to[0]));
        return arr;
      }
      const evoNames = extract(evoData.chain);

      evoNames.forEach(async (nm) => {
        const r = await fetch(`https://pokeapi.co/api/v2/pokemon/${nm}`);
        const d = await r.json();
        const img = d.sprites.other["official-artwork"].front_default;
        const imgEl = document.createElement("img");
        imgEl.src = img;
        evoContainer.appendChild(imgEl);
      });
    } catch (err) {}

    modal.style.display = "flex";
  });

  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    document.querySelectorAll(".pokemon-card").forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const types = card.dataset.types.toLowerCase();
      const num = card.dataset.number.toLowerCase();
      card.style.display =
        name.includes(q) || types.includes(q) || num.includes(q)
          ? "block"
          : "none";
    });
  });
});
