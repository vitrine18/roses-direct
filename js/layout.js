document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LOAD HEADER
  ========================= */

  fetch("/partials/header.html")
    .then(res => res.text())
    .then(html => {

      const headerContainer = document.getElementById("site-header");

      if (headerContainer) {
        headerContainer.innerHTML = html;
      }

      /* =========================
         MOBILE MENU
      ========================= */

      const openBtn = document.getElementById("open-menu");
      const closeBtn = document.getElementById("close-menu");
      const mobileMenu = document.getElementById("mobile-menu");
      const overlay = document.getElementById("overlay");

      const openMenu = () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("menu-open");
      };

      const closeMenu = () => {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("menu-open");
      };

      if (openBtn) {
        openBtn.addEventListener("click", openMenu);
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
      }

      if (overlay) {
        overlay.addEventListener("click", closeMenu);
      }

      /* =========================
         CLOSE MENU ON LINK CLICK
      ========================= */

      document.querySelectorAll("#mobile-menu a").forEach(link => {
        link.addEventListener("click", closeMenu);
      });

      /* =========================
         PRODUCTS DROPDOWN MOBILE
      ========================= */

      const productsToggle = document.getElementById("products-toggle");
      const productsMenu = document.getElementById("products-menu");

      if (productsToggle && productsMenu) {

        productsToggle.addEventListener("click", () => {
          productsMenu.classList.toggle("hidden");
        });

      }

      /* =========================
         ACTIVE LINK
      ========================= */

      const currentPath = window.location.pathname;

      document.querySelectorAll(".main-nav a").forEach(link => {

        const linkPath = new URL(link.href).pathname;

        if (linkPath === currentPath) {
          link.classList.add("active-link");
        }

      });

    });

  /* =========================
     LOAD FOOTER
  ========================= */

  fetch("/partials/footer.html")
    .then(res => res.text())
    .then(html => {

      const footerContainer = document.getElementById("site-footer");

      if (footerContainer) {
        footerContainer.innerHTML = html;
      }

    });

});