// Halaman detail: baca ID dari URL, lalu tampilkan data produk

// Ambil angka dari string harga, misalnya "Rp 48.000" menjadi 48000.
// Kalau tidak ada angka yang valid, hasilnya null.
const parsePrice = (priceText) => {
  const digits = String(priceText || "").replace(/[^\d]/g, "");
  const value = Number(digits);

  if (!digits || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value;
};

const formatRupiah = (value) => `Rp ${value.toLocaleString("id-ID")}`;


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

  const waLink = getWhatsAppUrl(
    `Halo ${COMPANY.name}, saya ingin memesan produk: ${product.nama}`
  );

  // Pecah deskripsi per paragraf (dipisah baris kosong)
  const descriptionHtml = String(product.deskripsi)
    .split(/\n\s*\n/)
    .map((paragraph) => `<p class="detail__desc">${paragraph.trim()}</p>`)
    .join("");

  // Label tab spesifikasi diambil dari kategori (catering memakai "Menu")
  const specLabel = category && category.specLabel ? category.specLabel : "Spesifikasi";

  const hasSpec =
    Array.isArray(product.spesifikasi) && product.spesifikasi.length > 0;
  const specListHtml = hasSpec
    ? `<h2 class="detail__spec-title">${specLabel}</h2>
      <ul class="detail__spec-list">
        ${product.spesifikasi.map((item) => `<li>${item}</li>`).join("")}
      </ul>`
    : `<p class="detail__desc">${specLabel} belum tersedia.</p>`;

  const satuanHtml =
    product.satuan && !String(product.satuan).startsWith("[")
      ? `<span class="product-card__unit"> / ${product.satuan}</span>`
      : "";

  // Tab estimasi hanya untuk catering yang harganya berupa angka pasti
  const unitPrice = product.kategori === "catering" ? parsePrice(product.harga) : null;
  const showEstimateTab = unitPrice !== null;

  // Gambar bisa berupa array (beberapa foto) atau string tunggal
  const images = getProductImages(product);
  const hasSlider = images.length > 1;

  // Kalau cuma 1 gambar, tampilkan gambar biasa tanpa slider
  const galleryHtml = hasSlider
    ? `
      <div class="detail__gallery">
        <div class="detail__slider" id="detail-slider">
          <img class="detail__image" id="slider-image" src="${images[0]}" alt="${product.nama}" />
          <button class="detail__slider-btn detail__slider-btn--prev" type="button" data-slide="prev" aria-label="Gambar sebelumnya">&lsaquo;</button>
          <button class="detail__slider-btn detail__slider-btn--next" type="button" data-slide="next" aria-label="Gambar berikutnya">&rsaquo;</button>
        </div>
        <div class="detail__dots" id="detail-dots">
          ${images
            .map(
              (image, index) => `
            <button
              class="detail__dot ${index === 0 ? "detail__dot--active" : ""}"
              type="button"
              data-index="${index}"
              aria-label="Lihat gambar ${index + 1}"
            ></button>
          `
            )
            .join("")}
        </div>
      </div>
    `
    : `<img class="detail__image" src="${images[0] || ""}" alt="${product.nama}" />`;

  rootEl.innerHTML = `
    <p class="breadcrumb">
      <a href="index.html">Beranda</a> /
      <a href="kategori.html?kategori=${product.kategori}">${category ? category.name : "Kategori"}</a> /
      ${product.nama}
    </p>
    <article class="detail">
      ${galleryHtml}
      <div class="detail__body">
        <p class="detail__tag">${product.subKategori}</p>
        <h1 class="detail__title">${product.nama}</h1>
        <p class="detail__price">${product.harga}${satuanHtml}</p>
        <div class="detail__tabs">
          <div class="detail__tab-list" role="tablist">
            <button class="detail__tab detail__tab--active" type="button" data-tab="deskripsi">Deskripsi</button>
            <button class="detail__tab" type="button" data-tab="spesifikasi">${specLabel}</button>
            ${
              showEstimateTab
                ? `<button class="detail__tab" type="button" data-tab="estimasi">Estimasi Biaya</button>`
                : ""
            }
          </div>
          <div class="detail__tab-panel detail__tab-panel--active" data-panel="deskripsi">
            ${descriptionHtml}
          </div>
          <div class="detail__tab-panel" data-panel="spesifikasi">
            ${specListHtml}
          </div>
          ${
            showEstimateTab
              ? `
            <div class="detail__tab-panel" data-panel="estimasi">
              <h2 class="detail__spec-title">Estimasi Biaya</h2>
              <p class="estimate__hint">Harga satuan: ${formatRupiah(unitPrice)}${satuanHtml}</p>
              <div class="estimate">
                <div class="qty-control">
                  <button class="qty-control__btn" id="qty-minus" type="button" aria-label="Kurangi jumlah">−</button>
                  <span class="qty-control__value" id="qty-value">1</span>
                  <button class="qty-control__btn" id="qty-plus" type="button" aria-label="Tambah jumlah">+</button>
                </div>
                <p class="estimate__total">
                  Estimasi Total
                  <strong id="estimate-total">${formatRupiah(unitPrice)}</strong>
                </p>
              </div>
              <a class="btn btn--cta" id="estimate-wa" href="${waLink}" target="_blank" rel="noopener noreferrer">Pesan via WhatsApp</a>
            </div>
          `
              : ""
          }
        </div>
        <a class="btn btn--cta" id="default-wa" href="${waLink}" target="_blank" rel="noopener noreferrer">Pesan via WhatsApp</a>
      </div>
    </article>
  `;

  const tabButtons = rootEl.querySelectorAll(".detail__tab");
  const tabPanels = rootEl.querySelectorAll(".detail__tab-panel");
  const defaultWaEl = document.getElementById("default-wa");

  // Produk yang punya tab Estimasi Biaya: tombol WhatsApp utama disembunyikan.
  // Tombol WhatsApp hanya muncul di dalam tab Estimasi Biaya.
  if (showEstimateTab && defaultWaEl) {
    defaultWaEl.classList.add("is-hidden");
  }

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

  if (showEstimateTab) {
    const minusBtn = document.getElementById("qty-minus");
    const plusBtn = document.getElementById("qty-plus");
    const qtyValueEl = document.getElementById("qty-value");
    const totalEl = document.getElementById("estimate-total");
    const estimateWaEl = document.getElementById("estimate-wa");
    let quantity = 1;

    const buildEstimateMessage = () => {
      const total = unitPrice * quantity;
      return `Halo ${COMPANY.name}, saya ingin memesan ${product.nama} sebanyak ${quantity} box, estimasi total ${formatRupiah(total)}`;
    };

    const updateEstimate = () => {
      const total = unitPrice * quantity;
      qtyValueEl.textContent = quantity;
      totalEl.textContent = formatRupiah(total);
      minusBtn.disabled = quantity <= 1;
      estimateWaEl.href = getWhatsAppUrl(buildEstimateMessage());
    };

    minusBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity -= 1;
        updateEstimate();
      }
    });

    plusBtn.addEventListener("click", () => {
      quantity += 1;
      updateEstimate();
    });

    // Pastikan href selalu sesuai jumlah terkini saat tombol diklik
    estimateWaEl.addEventListener("click", () => {
      estimateWaEl.href = getWhatsAppUrl(buildEstimateMessage());
    });

    updateEstimate();
  }

  // Logic slider gambar, hanya aktif kalau produk punya lebih dari 1 gambar
  if (hasSlider) {
    const sliderEl = document.getElementById("detail-slider");
    const sliderImageEl = document.getElementById("slider-image");
    const dotEls = document.querySelectorAll(".detail__dot");

    createImageSlider({
      images,
      showImage: (index, src) => {
        sliderImageEl.src = src;
        dotEls.forEach((dot, dotIndex) => {
          dot.classList.toggle("detail__dot--active", dotIndex === index);
        });
      },
      prevButtons: [...sliderEl.querySelectorAll('[data-slide="prev"]')],
      nextButtons: [...sliderEl.querySelectorAll('[data-slide="next"]')],
      dots: [...dotEls],
      swipeEl: sliderEl,
    });
  }
}
