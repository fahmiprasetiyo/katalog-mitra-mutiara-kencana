// Daftar gambar untuk slider hero - tambah/kurangi/ganti path di sini.
// Simpan foto asli di folder assets/images/hero/ lalu ganti URL placeholder di bawah
// menjadi path lokal, contoh: "assets/images/hero/hero-1.jpg"
const HERO_IMAGES = [
  "assets/images/hero/hero-acara.jpg",
  "assets/images/hero/hero-katering.jpg",
  "assets/images/hero/hero-acara.jpg",
];

const HERO_SLIDE_INTERVAL = 5000;

const setupHeroSlider = () => {
  const slider = document.getElementById("hero-slider");
  if (!slider || HERO_IMAGES.length === 0) {
    return;
  }

  HERO_IMAGES.forEach((src, index) => {
    const image = document.createElement("img");
    image.className = index === 0 ? "hero__slide is-active" : "hero__slide";
    image.src = src;
    image.alt = "";
    image.decoding = "async";

    if (index === 0) {
      image.loading = "eager";
      image.fetchPriority = "high";
    } else {
      image.loading = "lazy";
    }

    // Kalau gambar gagal, sembunyikan supaya background biru tua tetap terlihat
    image.addEventListener("error", () => {
      image.style.display = "none";
      image.classList.remove("is-active");
    });

    slider.appendChild(image);

    // Preload gambar berikutnya di background
    if (index > 0) {
      const preload = new Image();
      preload.src = src;
    }
  });

  const slides = slider.querySelectorAll(".hero__slide");
  if (slides.length < 2) {
    return;
  }

  let currentIndex = 0;

  window.setInterval(() => {
    slides[currentIndex].classList.remove("is-active");
    currentIndex = (currentIndex + 1) % slides.length;
    const nextSlide = slides[currentIndex];

    // Restart efek Ken Burns setiap kali slide menjadi aktif
    nextSlide.style.animation = "none";
    void nextSlide.offsetWidth;
    nextSlide.style.animation = "";
    nextSlide.classList.add("is-active");
  }, HERO_SLIDE_INTERVAL);
};

setupHeroSlider();
