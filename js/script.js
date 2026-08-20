// Fungsi bersama: menu mobile, tahun footer, dan highlight menu aktif

const setupMobileNav = () => {
  const toggleButton = document.querySelector(".nav__toggle");
  const nav = document.getElementById("main-nav");

  if (!toggleButton || !nav) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });
};

const setupFooterYear = () => {
  const yearNodes = document.querySelectorAll("[data-year]");
  const year = new Date().getFullYear();

  yearNodes.forEach((node) => {
    node.textContent = year;
  });
};

const highlightActiveNav = () => {
  const links = document.querySelectorAll(".nav__link");
  const currentUrl = window.location.pathname.split("/").pop() || "index.html";
  const currentSearch = window.location.search;

  links.forEach((link) => {
    const href = link.getAttribute("href");
    const isCategoryPage = currentUrl === "kategori.html";
    const matchesCategory = isCategoryPage && currentSearch && href.includes(currentSearch);
    const matchesPage = href === currentUrl || (currentUrl === "" && href === "index.html");

    link.classList.remove("nav__link--active");

    if (matchesCategory || (matchesPage && !href.includes("?kategori="))) {
      link.classList.add("nav__link--active");
    }
  });
};

setupMobileNav();
setupFooterYear();
highlightActiveNav();
