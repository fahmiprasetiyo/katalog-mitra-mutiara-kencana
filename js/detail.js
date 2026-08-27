// Halaman detail: baca ID dari URL, lalu tampilkan data produk

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const rootEl = document.getElementById("detail-root");

const product = PRODUCTS.find((item) => item.id === productId);
const category = product
  ? CATEGORIES.find((item) => item.slug === product.kategori)
  : null;

if (!product) {
  rootEl.innerHTML = `
    <p class="empty-state">
      Produk tidak ditemukan.
      <a href="index.html">Kembali ke beranda</a>
    </p>
  `;
} else {
  document.title = `${product.nama} — CV Mitra Mutiara Kencana`;

  const waMessage = encodeURIComponent(
    `Halo CV Mitra Mutiara Kencana, saya ingin memesan produk: ${product.nama}`
  );
  const waLink = `https://wa.me/${COMPANY.whatsapp}?text=${waMessage}`;

  // Pecah deskripsi per paragraf (dipisah baris kosong)
  const descriptionHtml = String(product.deskripsi)
    .split(/\n\s*\n/)
    .map((paragraph) => `<p class="detail__desc">${paragraph.trim()}</p>`)
    .join("");

  const hasSpec =
    Array.isArray(product.spesifikasi) && product.spesifikasi.length > 0;
  const specListHtml = hasSpec
    ? `<h2 class="detail__spec-title">Spesifikasi</h2>
      <ul class="detail__spec-list">
        ${product.spesifikasi.map((item) => `<li>${item}</li>`).join("")}
      </ul>`
    : `<p class="detail__desc">Spesifikasi belum tersedia.</p>`;

  const satuanHtml =
    product.satuan && !String(product.satuan).startsWith("[")
      ? `<span class="product-card__unit"> / ${product.satuan}</span>`
      : "";

  rootEl.innerHTML = `
    <p class="breadcrumb">
      <a href="index.html">Beranda</a> /
      <a href="kategori.html?kategori=${product.kategori}">${category ? category.name : "Kategori"}</a> /
      ${product.nama}
    </p>
    <article class="detail">
      <img class="detail__image" src="${product.gambar}" alt="${product.nama}" />
      <div class="detail__body">
        <p class="detail__tag">${product.subKategori}</p>
        <h1 class="detail__title">${product.nama}</h1>
        <p class="detail__price">${product.harga}${satuanHtml}</p>
        <div class="detail__tabs">
          <div class="detail__tab-list" role="tablist">
            <button class="detail__tab detail__tab--active" type="button" data-tab="deskripsi">Deskripsi</button>
            <button class="detail__tab" type="button" data-tab="spesifikasi">Spesifikasi</button>
          </div>
          <div class="detail__tab-panel detail__tab-panel--active" data-panel="deskripsi">
            ${descriptionHtml}
          </div>
          <div class="detail__tab-panel" data-panel="spesifikasi">
            ${specListHtml}
          </div>
        </div>
        <a class="btn btn--cta" href="${waLink}" target="_blank" rel="noopener noreferrer">Pesan via WhatsApp</a>
      </div>
    </article>
  `;

  const tabButtons = rootEl.querySelectorAll(".detail__tab");
  const tabPanels = rootEl.querySelectorAll(".detail__tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;

      tabButtons.forEach((item) => item.classList.remove("detail__tab--active"));
      tabPanels.forEach((panel) => panel.classList.remove("detail__tab-panel--active"));

      button.classList.add("detail__tab--active");
      const activePanel = rootEl.querySelector(`[data-panel="${target}"]`);
      if (activePanel) {
        activePanel.classList.add("detail__tab-panel--active");
      }
    });
  });
}
