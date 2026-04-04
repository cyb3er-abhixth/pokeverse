window.addEventListener("DOMContentLoaded", () => {
  // Menu toggle (same as zmoves)
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

