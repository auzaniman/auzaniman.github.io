import type { L10n } from "@/lib/i18n";

/** Personal data. Placeholders in [BRACKETS] wait for Auzan's confirmation. */
export const site = {
  url: "https://auzaniman.github.io",
  name: "Auzan",
  fullName: "Auzan",
  city: "Yogyakarta",
  github: "https://github.com/auzaniman",
  email: "", // [EMAIL] — empty hides the button
  linkedin: "", // [LINKEDIN URL] — empty hides the button
  cv: "", // [/cv-auzan.pdf] — empty hides the button
  since: 2020,
};

type Copy = Record<string, L10n>;

export const copy = {
  meta: {
    title: {
      id: "Auzan — Full-Stack Engineer & Tech Lead di Yogyakarta",
      en: "Auzan — Full-Stack Engineer & Tech Lead in Yogyakarta",
    },
    description: {
      id: "Portofolio Auzan, full-stack engineer Laravel, Vue, dan React. Membangun sistem operasional bisnis: pemesanan & pengiriman, layanan pelanggan, produksi konten, dan ketertelusuran produk organik.",
      en: "Portfolio of Auzan, a Laravel, Vue and React full-stack engineer building business operations software: ordering & shipping, customer service, content production and organic product traceability.",
    },
  },
  nav: {
    highlights: { id: "Sorotan", en: "Highlights" },
    gallery: { id: "Galeri karya", en: "Work" },
    build: { id: "Cara dibangun", en: "How it's built" },
    journey: { id: "Perjalanan", en: "Journey" },
    contact: { id: "Kontak", en: "Contact" },
    skip: { id: "Langsung ke isi", en: "Skip to content" },
    menu: { id: "Menu", en: "Menu" },
    close: { id: "Tutup", en: "Close" },
    theme: { id: "Ganti tema", en: "Toggle theme" },
    language: { id: "Bahasa", en: "Language" },
  },
  hero: {
    badge: { id: "Full-Stack Engineer & Tech Lead · Yogyakarta", en: "Full-Stack Engineer & Tech Lead · Yogyakarta" },
    titleA: { id: "Saya membangun sistem yang mengubah ", en: "I build systems that turn " },
    titleB: { id: "proses bisnis", en: "business processes" },
    titleC: { id: " jadi ", en: " into " },
    titleD: { id: "pertumbuhan.", en: "growth." },
    lead: {
      id: "Sejak 2020 saya merancang aplikasi web untuk kerja harian perusahaan: pemesanan dan pengiriman, layanan pelanggan, produksi konten, sampai ketertelusuran hasil tani. Saya memegang semuanya, dari memahami proses bisnis sampai sistem berjalan di server.",
      en: "Since 2020 I have built web applications for everyday company work: ordering and shipping, customer service, content production and farm-to-buyer traceability. I own the whole path, from understanding the business process to running the system in production.",
    },
    ctaWork: { id: "Lihat galeri karya", en: "Browse my work" },
    ctaCv: { id: "Unduh CV", en: "Download CV" },
    panel: { id: "Panel sistem", en: "System panel" },
    running: { id: "berjalan", en: "running" },
    panelHint: { id: "klik nama sistem untuk melihat layarnya", en: "click a system to see its screens" },
  },
  stats: {
    projects: { id: "proyek terdokumentasi", en: "documented projects" },
    internal: { id: "aplikasi internal perusahaan", en: "internal company apps" },
    portals: { id: "portal sekolah, madrasah & daerah", en: "school & regional portals" },
    years: { id: "tahun berkarya sejak 2020", en: "years building since 2020" },
  },
  highlights: {
    kicker: { id: "01 — Sorotan", en: "01 — Highlights" },
    title: { id: "Tiga sistem dengan dampak bisnis terbesar.", en: "Three systems with the biggest business impact." },
    lead: {
      id: "Dipilih karena langsung menyentuh pendapatan, kecepatan tim, atau kepercayaan pembeli.",
      en: "Chosen because they touch revenue, team speed or buyer trust directly.",
    },
    impact: { id: "Dampak", en: "Impact" },
    read: { id: "Baca studi kasus", en: "Read the case study" },
    screens: { id: "Lihat layar", en: "View screens" },
  },
  gallery: {
    kicker: { id: "02 — Galeri karya", en: "02 — Work" },
    title: { id: "Semua yang pernah saya bangun.", en: "Everything I have built." },
    lead: {
      id: "Klik kartu untuk melihat layar aplikasinya. Data di semua gambar adalah data contoh.",
      en: "Click a card to see the app's screens. All data in the images is sample data.",
    },
    all: { id: "Semua", en: "All" },
    search: { id: "Cari proyek, stack, atau fungsi", en: "Search projects, stack or purpose" },
    searchLabel: { id: "Cari karya", en: "Search work" },
    more: { id: "Tampilkan karya lainnya", en: "Show more work" },
    empty: { id: "Tidak ada karya yang cocok.", en: "No matching work." },
    reset: { id: "Tampilkan semua", en: "Show all" },
    screensN: { id: "layar", en: "screens" },
    reposN: { id: "repo", en: "repos" },
    role: { id: "Peran", en: "Role" },
    users: { id: "Pengguna", en: "Users" },
    features: { id: "Fitur utama", en: "Key features" },
    stack: { id: "Stack", en: "Stack" },
    prev: { id: "Layar sebelumnya", en: "Previous screen" },
    next: { id: "Layar berikutnya", en: "Next screen" },
    detail: { id: "Halaman detail", en: "Full page" },
    visit: { id: "Kunjungi situs", en: "Visit site" },
    sample: { id: "Data pada gambar adalah data contoh.", en: "Data shown is sample data." },
  },
  build: {
    kicker: { id: "03 — Cara sistemnya dibangun", en: "03 — How the systems are built" },
    title: { id: "Satu kerangka, dipakai ulang oleh puluhan aplikasi.", en: "One framework, reused by dozens of apps." },
    lead: {
      id: "Alih-alih membangun dari nol setiap kali, saya menyusun satu kerangka aplikasi berisi bagian yang selalu dibutuhkan. Aplikasi baru tinggal fokus pada proses bisnisnya, sehingga rilis lebih cepat dan tampilannya seragam.",
      en: "Instead of starting from scratch each time, I built one application framework with the parts every app needs. A new app only has to model its business process, so releases are faster and the interface stays consistent.",
    },
    l3: { id: "Lapis 3 — Aplikasi per proses bisnis", en: "Layer 3 — An app per business process" },
    l2: { id: "Lapis 2 — Kerangka aplikasi bersama", en: "Layer 2 — Shared application framework" },
    l1: { id: "Lapis 1 — Layanan pendukung & server", en: "Layer 1 — Supporting services & servers" },
  },
  journey: {
    kicker: { id: "04 — Perjalanan", en: "04 — Journey" },
    title: { id: "Dari landing page pertama sampai sistem perusahaan.", en: "From a first landing page to company-wide systems." },
  },
  approach: {
    kicker: { id: "05 — Cara kerja", en: "05 — How I work" },
    title: { id: "Mulai dari masalah, bukan dari kode.", en: "Start from the problem, not the code." },
  },
  contact: {
    kicker: { id: "06 — Kontak", en: "06 — Contact" },
    title: { id: "Punya proses bisnis yang perlu dibenahi?", en: "Got a business process that needs fixing?" },
    lead: {
      id: "Ceritakan alur kerjanya. Saya bantu memetakan masalah dan merancang sistem yang tepat.",
      en: "Tell me how the work flows today. I will help map the problem and design the right system.",
    },
  },
  work: {
    back: { id: "Kembali ke galeri", en: "Back to work" },
    problem: { id: "Masalah", en: "Problem" },
    solution: { id: "Apa yang dibangun", en: "What I built" },
    screens: { id: "Layar aplikasi", en: "Screens" },
    prevNext: { id: "Karya lain", en: "More work" },
    year: { id: "Tahun", en: "Year" },
    category: { id: "Kategori", en: "Category" },
  },
  footer: {
    built: { id: "Dibangun dengan Next.js, Tailwind CSS, GSAP, dan Motion.", en: "Built with Next.js, Tailwind CSS, GSAP and Motion." },
  },
} satisfies Record<string, Copy>;

export const categories: { key: string; label: L10n }[] = [
  { key: "Operasional", label: { id: "Operasional", en: "Operations" } },
  { key: "Produk", label: { id: "Produk", en: "Product" } },
  { key: "Pendidikan", label: { id: "Pendidikan", en: "Education" } },
  { key: "Website", label: { id: "Website", en: "Website" } },
  { key: "Infrastruktur", label: { id: "Infrastruktur", en: "Infrastructure" } },
  { key: "Latihan", label: { id: "Latihan", en: "Practice" } },
];

export const buildLayers = {
  apps: [
    {
      group: { id: "Penjualan & order", en: "Sales & orders" },
      items: [
        { slug: "arkana", name: "Arkana", desc: { id: "data sales & mitra", en: "sales & partner data" } },
        { slug: "arunika", name: "Arunika", desc: { id: "order & pengiriman", en: "orders & shipping" } },
        { slug: "qontak-api", name: "Qontak", desc: { id: "kampanye WhatsApp", en: "WhatsApp campaigns" } },
      ],
    },
    {
      group: { id: "Orang & layanan", en: "People & service" },
      items: [
        { slug: "santika", name: "Santika", desc: { id: "kinerja CS & karyawan", en: "CS & staff performance" } },
        { slug: "aksara", name: "Aksara", desc: { id: "kompetensi & karier", en: "skills & careers" } },
        { slug: "naraya", name: "Naraya", desc: { id: "helpdesk & urusan kantor", en: "helpdesk & office affairs" } },
      ],
    },
    {
      group: { id: "Konten & live", en: "Content & live" },
      items: [
        { slug: "nirmana", name: "Nirmana", desc: { id: "alur produksi konten", en: "content production flow" } },
        { slug: "clipper", name: "Clipper", desc: { id: "rakit video otomatis", en: "automatic video assembly" } },
        { slug: "posting-station", name: "Posting Station", desc: { id: "unggah massal", en: "bulk publishing" } },
        { slug: "sakta", name: "Sakta", desc: { id: "jadwal host live", en: "live host scheduling" } },
      ],
    },
    {
      group: { id: "Data & keputusan", en: "Data & decisions" },
      items: [
        { slug: "executive-dashboard", name: "Dashboard eksekutif", desc: { id: "angka bisnis harian", en: "daily business numbers" } },
        { slug: "gandewa", name: "Gandewa", desc: { id: "kelola basis data", en: "database management" } },
        { slug: "nataya", name: "Nataya", desc: { id: "inventaris aset", en: "asset inventory" } },
      ],
    },
  ],
  framework: [
    { name: { id: "Login & akun", en: "Sign-in & accounts" }, desc: { id: "Satu pola masuk untuk semua app", en: "One sign-in pattern for every app" } },
    { name: { id: "Peran & hak akses", en: "Roles & permissions" }, desc: { id: "Siapa boleh melihat dan mengubah apa", en: "Who can see and change what" } },
    { name: { id: "Modul & menu", en: "Modules & menus" }, desc: { id: "Fitur bisa dinyalakan per app", en: "Features switch on per app" } },
    { name: { id: "Komponen UI", en: "UI components" }, desc: { id: "Tabel, form, grafik yang seragam", en: "Consistent tables, forms, charts" } },
    { name: { id: "Tema & pengaturan", en: "Themes & settings" }, desc: { id: "Mode gelap, logo, warna per app", en: "Dark mode, logo, colors per app" } },
  ],
  services: [
    { slug: "waapi", name: { id: "Layanan WhatsApp", en: "WhatsApp service" }, desc: { id: "Service Go untuk kirim & terima pesan", en: "Go service to send & receive messages" } },
    { slug: "airflow", name: { id: "Penjadwal data", en: "Data scheduler" }, desc: { id: "Airflow menyalin & merangkum data tiap hari", en: "Airflow copies & summarises data daily" } },
    { slug: "config-traefik-dynamic", name: { id: "Gerbang & domain", en: "Gateway & domains" }, desc: { id: "Traefik mengarahkan tiap domain ke app-nya", en: "Traefik routes each domain to its app" } },
    { slug: "config-prometheus", name: { id: "Pemantauan", en: "Monitoring" }, desc: { id: "Prometheus mengawasi kesehatan server", en: "Prometheus watches server health" } },
  ],
};

export const journey = [
  { years: "2020 — 2021", title: { id: "Belajar & freelance", en: "Learning & freelance" }, body: { id: "Slicing desain jadi website, lalu sistem informasi klinik dan organisasi.", en: "Turning designs into websites, then information systems for a clinic and organisations." } },
  { years: "2022", title: { id: "Sekolah & pemerintah daerah", en: "Schools & local government" }, body: { id: "Pendaftaran siswa online untuk 6 sekolah dan 27 portal madrasah & daerah.", en: "Online student admission for 6 schools and 27 madrasah & regional portals." } },
  { years: "2023 — 2025", title: { id: "Tech lead perusahaan D2C", en: "Tech lead at a D2C company" }, body: { id: "Membangun kerangka aplikasi dan sistem operasional untuk brand herbal.", en: "Built the application framework and operations systems for an herbal brand." } },
  { years: "2026 — sekarang", yearsEn: "2026 — now", current: true, title: { id: "Startup & otomasi", en: "Startups & automation" }, body: { id: "Pengembang NiraTrace, otomasi konten, dan pengembangan dibantu AI.", en: "Developer of NiraTrace, content automation and AI-assisted development." } },
];

export const approach = [
  { title: { id: "Pahami prosesnya", en: "Understand the process" }, body: { id: "Duduk bersama tim yang memakai, petakan alur kerja nyata sebelum menulis spesifikasi.", en: "Sit with the people who will use it and map the real workflow before writing a spec." } },
  { title: { id: "Cari akar masalah", en: "Find the root cause" }, body: { id: "Tidak semua masalah butuh fitur baru. Kadang jawabannya ada di proses atau orang.", en: "Not every problem needs a new feature. Sometimes the answer is the process or the people." } },
  { title: { id: "Ukur dampaknya", en: "Measure the impact" }, body: { id: "Rilis kecil, lihat angkanya, perbaiki. Dampak lebih penting dari kecanggihan.", en: "Ship small, read the numbers, improve. Impact beats sophistication." } },
];
