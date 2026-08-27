// Data dummy produk — nanti bisa diganti harga, deskripsi, dan gambar asli

const COMPANY = {
  name: "CV Mitra Mutiara Kencana",
  tagline: "Pengadaan Barang & Jasa Acara",
  phone: "0812-3456-7890",
  whatsapp: "6281234567890",
  email: "info@primakatalog.id",
  address: "Jl. Pengadaan Raya No. 12, Jakarta Selatan",
};

const CATEGORIES = [
  {
    slug: "souvenir-atk",
    name: "Souvenir & ATK",
    shortName: "Souvenir & ATK",
    description: "Souvenir custom dan alat tulis kantor untuk keperluan kantor, event, dan gift.",
    image: "https://placehold.co/600x400/0A2A5E/ffffff?text=Souvenir+%26+ATK",
  },
  {
    slug: "sewa-perlengkapan",
    name: "Sewa Perlengkapan Acara",
    shortName: "Perlengkapan",
    description: "Sewa meja, kursi, dan perlengkapan pendukung acara.",
    image: "https://placehold.co/600x400/4A90D9/ffffff?text=Perlengkapan+Acara",
  },
  {
    slug: "sewa-tenda",
    name: "Sewa Tenda Acara",
    shortName: "Tenda",
    description: "Sewa tenda dekorasi, roder, kerucut, bazar, dan jenis tenda lainnya.",
    image: "https://placehold.co/600x400/0A2A5E/ffffff?text=Sewa+Tenda",
  },
  {
    slug: "catering",
    name: "Catering",
    shortName: "Catering",
    description: "Paket catering untuk rapat, gathering, dan acara resmi.",
    image: "https://placehold.co/600x400/4A90D9/ffffff?text=Catering",
  },
];

const PRODUCTS = [
  // Souvenir & ATK
  {
    id: "sou-001",
    kategori: "souvenir-atk",
    subKategori: "ATK",
    nama: "Pengadaan ATK",
    deskripsi:
      "Layanan Pengadaan Barang ATK menyediakan berbagai kebutuhan alat tulis kantor (ATK) secara lengkap untuk mendukung operasional perusahaan, instansi pemerintah, sekolah, maupun organisasi. Produk yang disediakan meliputi kertas, pulpen, pensil, map, binder, tinta printer, stapler, amplop, buku, serta berbagai perlengkapan administrasi lainnya dengan kualitas terjamin, harga yang kompetitif, dan proses pengadaan yang cepat sesuai kebutuhan.\n\nKami melayani pengadaan ATK dalam jumlah kecil maupun besar dengan layanan yang profesional dan terpercaya. Konsultasikan kebutuhan pengadaan ATK Anda melalui WhatsApp kami untuk mendapatkan rekomendasi produk, penawaran terbaik, serta solusi pengadaan yang sesuai dengan kebutuhan dan anggaran Anda.",
    spesifikasi: [
      "Jenis Produk: Berbagai macam ATK dan perlengkapan perkantoran",
      "Merek: Menyesuaikan kebutuhan pemesan",
      "Ukuran: Menyesuaikan jenis produk",
      "Kondisi barang: Baru, Original, dan Berkualitas",
      "Melayani pengadaan dalam jumlah kecil maupun besar",
      "Pengadaan dapat disesuaikan dengan spesifikasi dan anggaran pelanggan",
      "Pengemasan rapi dan aman",
      "Pengiriman ke lokasi pelanggan sesuai kesepakatan",
    ],
    harga: "Harga menyesuaikan Jenis, Merek, Spesifikasi, dan Jumlah Pesanan",
    satuan: "",
    gambar: "assets/images/products/atk/pb1.png",
  },
  {
    id: "sou-002",
    kategori: "souvenir-atk",
    subKategori: "Percetakan",
    nama: "Pengadaan Percetakan",
    deskripsi: "[ISI DESKRIPSI PENGADAAN PERCETAKAN]",
    harga: "[ISI HARGA PENGADAAN PERCETAKAN]",
    satuan: "[ISI SATUAN PENGADAAN PERCETAKAN]",
    gambar: "assets/images/products/atk/pb2.png",
  },
  {
    id: "sou-003",
    kategori: "souvenir-atk",
    subKategori: "Souvenir",
    nama: "Pengadaan Souvenir",
    deskripsi: "[ISI DESKRIPSI PENGADAAN SOUVENIR]",
    harga: "[ISI HARGA PENGADAAN SOUVENIR]",
    satuan: "[ISI SATUAN PENGADAAN SOUVENIR]",
    gambar: "assets/images/products/atk/pb3.png",
  },

  // Sewa Perlengkapan Acara
  {
    id: "per-001",
    kategori: "sewa-perlengkapan",
    subKategori: "Meja",
    nama: "Meja Bulat Diameter 120cm",
    deskripsi:
      "Sewa meja bulat diameter 120 cm untuk jamuan, resepsi, dan gathering. Tersedia opsi taplak dan cover sesuai tema acara.",
    harga: "Rp 75.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Meja+Bulat",
  },
  {
    id: "per-002",
    kategori: "sewa-perlengkapan",
    subKategori: "Meja",
    nama: "Meja Kotak 120x60cm",
    deskripsi:
      "Sewa meja kotak 120 x 60 cm untuk registrasi, bazar, rapat, dan area konsumsi. Stabil dan mudah ditata.",
    harga: "Rp 50.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Meja+Kotak",
  },
  {
    id: "per-003",
    kategori: "sewa-perlengkapan",
    subKategori: "Kursi",
    nama: "Kursi Futura / Chitose",
    deskripsi:
      "Sewa kursi futura untuk rapat, seminar, dan acara indoor/outdoor. Jumlah unit menyesuaikan kebutuhan venue.",
    harga: "Rp 6.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Kursi+Futura",
  },
  {
    id: "per-004",
    kategori: "sewa-perlengkapan",
    subKategori: "Kursi",
    nama: "Kursi Tiffany / Chiavari",
    deskripsi:
      "Sewa kursi tiffany untuk acara formal, pernikahan, dan jamuan resmi. Tampilan elegan, bisa dikombinasikan dengan pita/sash.",
    harga: "Rp 15.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Kursi+Tiffany",
  },

  // Sewa Tenda Acara
  {
    id: "ten-001",
    kategori: "sewa-tenda",
    subKategori: "Tenda Dekorasi",
    nama: "Tenda Dekorasi 6x6m",
    deskripsi:
      "Sewa tenda dekorasi 6x6 meter dengan plafon dan rumbai. Cocok untuk resepsi, grand opening, dan acara formal.",
    harga: "Rp 1.500.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Tenda+Dekorasi",
  },
  {
    id: "ten-002",
    kategori: "sewa-tenda",
    subKategori: "Tenda Roder",
    nama: "Tenda Roder 10x20m",
    deskripsi:
      "Sewa tenda roder 10x20 meter, rangka kuat, atap PVC. Ideal untuk pameran, gathering besar, dan acara outdoor.",
    harga: "Rp 8.500.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Tenda+Roder",
  },
  {
    id: "ten-003",
    kategori: "sewa-tenda",
    subKategori: "Tenda Kerucut",
    nama: "Tenda Kerucut 3x3m",
    deskripsi:
      "Sewa tenda kerucut 3x3 meter untuk area registrasi, photo booth, atau titik informasi. Ringan dan cepat dipasang.",
    harga: "Rp 350.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Tenda+Kerucut",
  },
  {
    id: "ten-004",
    kategori: "sewa-tenda",
    subKategori: "Tenda Bazar",
    nama: "Tenda Bazar 3x3m",
    deskripsi:
      "Sewa tenda bazar 3x3 meter untuk bazaar, UMKM, dan stan pameran. Tersedia opsi dinding samping.",
    harga: "Rp 250.000",
    satuan: "per unit / hari",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Tenda+Bazar",
  },

  // Catering
  {
    id: "cat-001",
    kategori: "catering",
    subKategori: "Nasi Box",
    nama: "Paket Nasi Box Premium",
    deskripsi:
      "Paket nasi box berisi nasi, lauk utama, sayur, dan buah. Cocok untuk rapat, pelatihan, dan kunjungan lapangan.",
    harga: "Rp 35.000",
    satuan: "per porsi",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Nasi+Box",
  },
  {
    id: "cat-002",
    kategori: "catering",
    subKategori: "Prasmanan",
    nama: "Paket Prasmanan 50 Porsi",
    deskripsi:
      "Paket prasmanan untuk 50 porsi: nasi, 2 lauk, sayur, pelengkap, dan minuman. Termasuk peralatan saji dasar.",
    harga: "Rp 2.250.000",
    satuan: "per paket",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Prasmanan",
  },
  {
    id: "cat-003",
    kategori: "catering",
    subKategori: "Snack Box",
    nama: "Snack Box Meeting",
    deskripsi:
      "Snack box berisi 3 macam kue basah/kering plus air mineral. Praktis untuk coffee break rapat dan seminar.",
    harga: "Rp 18.000",
    satuan: "per box",
    gambar: "https://placehold.co/400x300/0A2A5E/ffffff?text=Snack+Box",
  },
  {
    id: "cat-004",
    kategori: "catering",
    subKategori: "Coffee Break",
    nama: "Paket Coffee Break",
    deskripsi:
      "Paket coffee break dengan kopi, teh, air mineral, dan 2 jenis snack. Bisa disajikan di meja atau via waiter.",
    harga: "Rp 22.000",
    satuan: "per porsi",
    gambar: "https://placehold.co/400x300/4A90D9/ffffff?text=Coffee+Break",
  },
];
