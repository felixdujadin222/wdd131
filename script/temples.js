document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  const yearSpan = document.getElementById("year");
  const currentYear = new Date().getFullYear();
  if (yearSpan) {
    yearSpan.textContent = currentYear;
  }

  // Set last modified date if applicable
  const lastModifiedSpan = document.getElementById("lastModified");
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }

  // Toggle mobile navigation with hamburger and 'X' close symbol
  const menuButton = document.getElementById("menu-button");
  const nav = document.getElementById("primary-nav");

  if (menuButton && nav) {
    // Initialize button symbol to hamburger
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.addEventListener("click", () => {
      nav.classList.toggle("hide");

      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));

      if (nav.classList.contains("hide")) {
        menuButton.textContent = "☰"; // hamburger icon
      } else {
        menuButton.textContent = "✖"; // close icon
      }
    });
  }
});

