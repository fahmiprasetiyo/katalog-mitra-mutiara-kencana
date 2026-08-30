// Halaman kategori: baca URL, tampilkan produk, search, dan filter sub-kategori

const params = new URLSearchParams(window.location.search);
const categorySlug = params.get("kategori") || "souvenir-atk";

const titleEl = document.getElementById("category-title");
const descEl = document.getElementById("category-desc");
const breadcrumbEl = document.getElementById("breadcrumb-current");
const filterGroupEl = document.getElementById("filter-group");
const searchInputEl = document.getElementById("search-input");
const productGridEl = document.getElementById("product-grid");
const toolbarEl = filterGroupEl.closest(".toolbar");

let activeSubCategory = "semua";
let searchKeyword = "";

const currentCategory = CATEGORIES.find((item) => item.slug === categorySlug);

if (currentCategory) {
  document.title = `${currentCategory.name} — CV Mitra Mutiara Kencana`;
  titleEl.textContent = currentCategory.name;
  descEl.textContent = currentCategory.description;
  breadcrumbEl.textContent = currentCategory.name;
} else {
  titleEl.textContent = "Kategori tidak ditemukan";
  descEl.textContent = "Periksa kembali tautan kategori.";
}

const categoryProducts = PRODUCTS.filter((product) => product.kategori === categorySlug);

// Ambil sub-kategori unik yang valid (abaikan placeholder kosong)
const subCategories = [];
categoryProducts.forEach((product) => {
  const sub = product.subKategori;
  const isPlaceholder = !sub || String(sub).startsWith("[");

  if (!isPlaceholder && !subCategories.includes(sub)) {
    subCategories.push(sub);
  }
});

// Sembunyikan filter jika kategori memintanya, atau hanya ada 1 sub-kategori unik
const shouldShowSubCategoryFilter =
  !currentCategory?.hideSubCategoryFilter && subCategories.length > 1;

// Sebagian kategori (sewa) tidak menampilkan harga di card grid
const hidePriceOnCard = Boolean(currentCategory?.hidePriceOnCard);

const renderFilters = () => {
  if (!shouldShowSubCategoryFilter) {
    activeSubCategory = "semua";
    filterGroupEl.innerHTML = "";
    filterGroupEl.hidden = true;
    toolbarEl?.classList.add("toolbar--search-only");
    return;
  }

  filterGroupEl.hidden = false;
  toolbarEl?.classList.remove("toolbar--search-only");

  const buttons = ["Semua", ...subCategories]
    .map((label) => {
      const value = label.toLowerCase() === "semua" ? "semua" : label;
      const isActive = activeSubCategory === value;
      const className = isActive ? "filter-btn filter-btn--active" : "filter-btn";

      return `<button class="${className}" type="button" data-sub="${value}">${label}</button>`;
    })
    .join("");

  filterGroupEl.innerHTML = buttons;
};

const renderProducts = () => {
  const filtered = categoryProducts.filter((product) => {
    const matchSub =
      activeSubCategory === "semua" || product.subKategori === activeSubCategory;
    const matchSearch = product.nama.toLowerCase().includes(searchKeyword);
    return matchSub && matchSearch;
  });

  if (filtered.length === 0) {
    productGridEl.innerHTML = `<p class="empty-state">Produk tidak ditemukan. Coba kata kunci atau filter lain.</p>`;
    return;
  }

  productGridEl.innerHTML = filtered
    .map((product) => {
      // Kalau gambar berupa array, pakai gambar pertama sebagai thumbnail
      const thumbnail = getProductImages(product)[0] || "";

      // Sebagian kategori sengaja tidak menampilkan harga di card,
      // harga tetap muncul di halaman detail
      const priceHtml = hidePriceOnCard
        ? ""
        : `<p class="product-card__price">
            ${product.harga}${
              product.satuan && !String(product.satuan).startsWith("[")
                ? `<span class="product-card__unit"> / ${product.satuan}</span>`
                : ""
            }
          </p>`;

      return `
      <article class="product-card">
        <img class="product-card__image" src="${thumbnail}" alt="${product.nama}" />
        <div class="product-card__body">
          <span class="product-card__tag">${product.subKategori}</span>
          <h2 class="product-card__title">${product.nama}</h2>
          ${priceHtml}
          <a class="btn btn--primary" href="detail.html?id=${product.id}">Lihat Detail</a>
        </div>
      </article>
    `;
    })
    .join("");
};

if (shouldShowSubCategoryFilter) {
  filterGroupEl.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) {
      return;
    }

    activeSubCategory = button.dataset.sub;
    renderFilters();
    renderProducts();
  });
}

searchInputEl.addEventListener("input", (event) => {
  searchKeyword = event.target.value.trim().toLowerCase();
  renderProducts();
});

renderFilters();
renderProducts();
