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

  // Ultra Burst button
  const burstBtn = document.getElementById("burstBtn");
  const energyFill = document.getElementById("energyFill");
  const energyText = document.getElementById("energyText");
  const hero = document.querySelector(".hero");
  const mainNecrozma = document.getElementById("mainNecrozma");

  let burstActivated = false;

  burstBtn.addEventListener("click", () => {
    burstActivated = !burstActivated;

    if (burstActivated) {
      energyFill.style.width = "100%";
      energyText.textContent = "Energy Status: ULTRA BURST ACTIVATED!";
      burstBtn.textContent = "Deactivate Ultra Energy";
      hero.classList.add("burst-mode");
      mainNecrozma.style.transform = "scale(1.08)";
      mainNecrozma.style.filter = "drop-shadow(0 0 35px rgba(255,255,255,0.9))";
    } else {
      energyFill.style.width = "0%";
      energyText.textContent = "Energy Status: Dormant";
      burstBtn.textContent = "Activate Ultra Energy";
      mainNecrozma.style.transform = "scale(1)";
      mainNecrozma.style.filter = "drop-shadow(0 0 25px rgba(255,255,255,0.4))";
    }
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach((item) => {
      const top = item.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight - 100) {
        item.classList.add("show");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // Form card interactive text
  const formCards = document.querySelectorAll(".form-card");
  const formDisplay = document.getElementById("formDisplay");

  const formInfo = {
    base: {
      title: "Selected Form: Necrozma",
      text: "Necrozma is a mysterious Legendary Pokémon with the power to absorb light. Its true strength is hidden until it fuses or unleashes Ultra Burst."
    },
    dusk: {
      title: "Selected Form: Dusk Mane Necrozma",
      text: "Dusk Mane Necrozma is formed when Necrozma fuses with Solgaleo. It becomes tougher and gains tremendous physical force."
    },
    dawn: {
      title: "Selected Form: Dawn Wings Necrozma",
      text: "Dawn Wings Necrozma is formed when Necrozma fuses with Lunala. It becomes ghostly, mysterious, and extremely powerful."
    },
    ultra: {
      title: "Selected Form: Ultra Necrozma",
      text: "Ultra Necrozma is the final transformed state achieved through Ultra Burst. It radiates overwhelming light and becomes one of the strongest legendary forms ever seen."
    }
  };

  formCards.forEach((card) => {
    card.addEventListener("click", () => {
      formCards.forEach((c) => c.classList.remove("active-form"));
      card.classList.add("active-form");

      const selectedForm = card.getAttribute("data-form");
      formDisplay.innerHTML = `
        <h3>${formInfo[selectedForm].title}</h3>
        <p>${formInfo[selectedForm].text}</p>
      `;
    });
  });
});

const statSection = document.querySelector(".battle-stats-card");
const statFills = document.querySelectorAll(".stat-fill");
let statsAnimated = false;

function animateStats() {
  if (!statSection || statsAnimated) return;

  const top = statSection.getBoundingClientRect().top;
  if (top < window.innerHeight - 100) {
    statFills.forEach((fill) => {
      const finalWidth = fill.style.width;
      fill.style.width = "0";
      setTimeout(() => {
        fill.style.width = finalWidth;
      }, 150);
    });
    statsAnimated = true;
  }
}

window.addEventListener("scroll", animateStats);
animateStats();