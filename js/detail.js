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
        <p class="detail__price">${product.harga} <span class="product-card__unit">/ ${product.satuan}</span></p>
        <p class="detail__desc">${product.deskripsi}</p>
        <a class="btn btn--cta" href="${waLink}" target="_blank" rel="noopener noreferrer">Pesan via WhatsApp</a>
      </div>
    </article>
  `;
}
