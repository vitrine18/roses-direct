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

const openBtn = document.getElementById("fd-mobile-menu-toggle");
const closeBtn = document.getElementById("fd-mobile-menu-close");
const mobileMenu = document.getElementById("fd-mobile-menu");

const openMenu = () => {
  if (!mobileMenu || !openBtn) return;

  mobileMenu.classList.add("is-open");

  openBtn.setAttribute("aria-expanded", "true");
  openBtn.setAttribute("aria-label", "Close menu");

  document.body.classList.add("menu-open");
};

const closeMenu = () => {
  if (!mobileMenu || !openBtn) return;

  mobileMenu.classList.remove("is-open");

  openBtn.setAttribute("aria-expanded", "false");
  openBtn.setAttribute("aria-label", "Open menu");

  document.body.classList.remove("menu-open");
};

if (openBtn) {
  openBtn.addEventListener("click", openMenu);
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeMenu);
}


/* =========================
   CLOSE MENU ON LINK CLICK
========================= */

document.querySelectorAll("#fd-mobile-menu a").forEach(link => {
  link.addEventListener("click", closeMenu);
});


/* =========================
   PRODUCTS DROPDOWN MOBILE
========================= */

const productsToggle = document.getElementById("fd-products-toggle");
const productsMenu = document.getElementById("fd-products-menu");

if (productsToggle && productsMenu) {

  productsToggle.addEventListener("click", () => {

    const isOpen = productsToggle.classList.toggle("is-open");

    productsMenu.classList.toggle("is-open");

    productsToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });

}


/* =========================
   ACTIVE LINK
========================= */

const currentPath = window.location.pathname;

document.querySelectorAll(".fd-nav a, .fd-mobile-nav a").forEach(link => {

  const linkPath = new URL(link.href).pathname;

  if (linkPath === currentPath) {
    link.classList.add("active-link");
  }

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