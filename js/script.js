// Untuk mengaktifkan kembali autoplay, ubah AUTOPLAY_ENABLED menjadi true di baris bawah ini.
const AUTOPLAY_ENABLED = false;

// Fungsi bersama: menu mobile, tahun footer, highlight menu aktif, dan helper gambar produk

// Field "gambar" bisa berupa array (produk dengan beberapa foto) atau string tunggal.
// Fungsi ini selalu mengembalikan array, supaya kode pemakainya tidak perlu cek tipe lagi.
const getProductImages = (product) => {
  if (Array.isArray(product.gambar)) {
    return product.gambar.filter((image) => typeof image === "string" && image !== "");
  }

  return product.gambar ? [product.gambar] : [];
};

// Ubah nomor lokal (08...) menjadi format internasional untuk wa.me
const getWhatsAppNumber = () => {
  const digits = String(COMPANY.whatsapp || COMPANY.phone || "").replace(/\D/g, "");

  if (digits.startsWith("62")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
};

const getWhatsAppUrl = (message) => {
  const text = encodeURIComponent(
    message || `Halo ${COMPANY.name}, saya ingin bertanya tentang pengadaan.`
  );
  return `https://wa.me/${getWhatsAppNumber()}?text=${text}`;
};

// Isi semua elemen kontak dari COMPANY, supaya tidak hardcode di HTML
const fillCompanyContact = () => {
  document.querySelectorAll("[data-company]").forEach((node) => {
    const key = node.dataset.company;
    if (COMPANY[key]) {
      node.textContent = COMPANY[key];
    }
  });

  document.querySelectorAll("[data-company-wa]").forEach((link) => {
    const customMessage = link.getAttribute("data-company-wa");
    link.href = getWhatsAppUrl(customMessage || undefined);
  });

  document.querySelectorAll("[data-company-email]").forEach((link) => {
    link.href = `mailto:${COMPANY.email}`;
  });
};

// Logic slider bersama (dipakai di detail.html dan card kategori di beranda)
const createImageSlider = ({
  images,
  showImage,
  interval = 0,
  startDelay = 0,
  pauseOnHoverEl = null,
  prevButtons = [],
  nextButtons = [],
  dots = [],
  swipeEl = null,
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  let activeIndex = 0;
  let timer = null;

  const goTo = (index) => {
    // Modulo supaya perpindahan gambar berputar (dari terakhir kembali ke awal)
    activeIndex = (index + images.length) % images.length;
    showImage(activeIndex, images[activeIndex]);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  const stopAutoplay = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (interval > 0 && images.length > 1) {
      timer = setInterval(next, interval);
    }
  };

  prevButtons.forEach((button) => {
    button.addEventListener("click", prev);
  });

  nextButtons.forEach((button) => {
    button.addEventListener("click", next);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => goTo(Number(dot.dataset.index)));
  });

  if (swipeEl && images.length > 1) {
    let touchStartX = 0;

    swipeEl.addEventListener("touchstart", (event) => {
      touchStartX = event.changedTouches[0].screenX;
    });

    swipeEl.addEventListener("touchend", (event) => {
      const distance = event.changedTouches[0].screenX - touchStartX;
      const minSwipe = 50;

      if (Math.abs(distance) < minSwipe) {
        return;
      }

      if (distance < 0) {
        next();
      } else {
        prev();
      }
    });
  }

  if (pauseOnHoverEl && interval > 0) {
    pauseOnHoverEl.addEventListener("mouseenter", stopAutoplay);
    pauseOnHoverEl.addEventListener("mouseleave", startAutoplay);
  }

  if (startDelay > 0) {
    setTimeout(startAutoplay, startDelay);
  } else {
    startAutoplay();
  }

  return { goTo, next, prev, startAutoplay, stopAutoplay };
};

// Ambil gambar pertama tiap produk di kategori, tanpa duplikat
const getCategoryPreviewImages = (slug, limit = 4) => {
  const uniqueImages = [];

  PRODUCTS.filter((product) => product.kategori === slug).forEach((product) => {
    const firstImage = getProductImages(product)[0];
    if (firstImage && !uniqueImages.includes(firstImage) && uniqueImages.length < limit) {
      uniqueImages.push(firstImage);
    }
  });

  return uniqueImages;
};

const setupCategoryCards = () => {
  const grid = document.getElementById("category-grid");
  if (!grid) {
    return;
  }

  grid.innerHTML = CATEGORIES.map((category) => {
    const previewImages = getCategoryPreviewImages(category.slug, 4);
    const slidesHtml = previewImages
      .map(
        (image, index) => `
        <img
          class="category-card__image ${index === 0 ? "is-active" : ""}"
          src="${image}"
          alt="${category.name}"
        />
      `
      )
      .join("");

    return `
      <article class="category-card">
        <div class="category-card__slider detail__slider">
          ${slidesHtml}
          <button class="detail__slider-btn detail__slider-btn--prev" type="button" data-slide="prev" aria-label="Gambar sebelumnya">&lsaquo;</button>
          <button class="detail__slider-btn detail__slider-btn--next" type="button" data-slide="next" aria-label="Gambar berikutnya">&rsaquo;</button>
        </div>
        <div class="category-card__body">
          <h3 class="category-card__title">${category.name}</h3>
          <p class="category-card__desc">${category.description}</p>
          <a class="btn btn--primary" href="kategori.html?kategori=${category.slug}">Lihat Semua</a>
        </div>
      </article>
    `;
  }).join("");

  const cards = grid.querySelectorAll(".category-card");
  cards.forEach((card, cardIndex) => {
    const sliderEl = card.querySelector(".category-card__slider");
    const images = Array.from(card.querySelectorAll(".category-card__image"));
    if (images.length < 2) {
      return;
    }

    // Autoplay card kategori: kode tetap di sini, tapi hanya jalan jika AUTOPLAY_ENABLED = true.
    // Untuk mengaktifkan kembali autoplay, ubah AUTOPLAY_ENABLED menjadi true di baris atas file ini.
    createImageSlider({
      images: images.map((image) => image.src),
      showImage: (index) => {
        images.forEach((image, imageIndex) => {
          image.classList.toggle("is-active", imageIndex === index);
        });
      },
      interval: AUTOPLAY_ENABLED ? 3500 : 0,
      startDelay: AUTOPLAY_ENABLED ? cardIndex * 450 : 0,
      pauseOnHoverEl: card,
      prevButtons: [...sliderEl.querySelectorAll('[data-slide="prev"]')],
      nextButtons: [...sliderEl.querySelectorAll('[data-slide="next"]')],
      swipeEl: sliderEl,
    });
  });
};

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
fillCompanyContact();
setupCategoryCards();
