# NusaRasa - Aplikasi Kuliner Indonesia

## Deskripsi Proyek
NusaRasa adalah aplikasi web yang menyajikan berbagai kuliner khas Indonesia. Aplikasi ini memungkinkan pengguna untuk menjelajahi, memesan, dan menikmati beragam makanan tradisional Indonesia dari berbagai daerah.

## Teknologi yang Digunakan
- **React** (v19.1.1) - Library JavaScript untuk membangun antarmuka pengguna
- **Vite** (v7.1.7) - Build tool dan development server
- **React Router DOM** (v7.9.2) - Navigasi dan routing
- **Tailwind CSS** (v4.1.13) - Framework CSS untuk styling
- **Clerk** (v5.49.0) - Autentikasi pengguna
- **React Hot Toast** (v2.6.0) - Notifikasi toast
- **Swiper** (v12.0.2) - Slider/carousel untuk tampilan produk

## Struktur Proyek
```
frontend/
├── public/              # Aset publik statis
├── src/                 # Kode sumber utama
│   ├── assets/          # Gambar, ikon, dan aset lainnya
│   ├── components/      # Komponen React yang dapat digunakan kembali
│   │   ├── Cart/        # Komponen terkait keranjang belanja
│   │   ├── homepage/    # Komponen untuk halaman utama
│   │   ├── navigation/  # Komponen navigasi
│   │   ├── owner/       # Komponen untuk pemilik/admin
│   │   └── ui/          # Komponen UI umum
│   ├── context/         # Context API untuk state management
│   ├── pages/           # Halaman-halaman aplikasi
│   │   └── admin/       # Halaman khusus admin
│   ├── App.jsx          # Komponen utama aplikasi
│   ├── main.jsx         # Entry point aplikasi
│   └── index.css        # Stylesheet global
└── vite.config.js       # Konfigurasi Vite
```

## Fitur Utama
- Katalog produk makanan khas Indonesia
- Keranjang belanja
- Sistem pemesanan
- Halaman blog
- Halaman kontak
- Sistem autentikasi pengguna
- Panel admin untuk pengelolaan produk

## Cara Menjalankan Proyek

### Prasyarat
- Node.js (versi terbaru direkomendasikan)
- npm atau yarn

### Langkah-langkah Instalasi
1. Clone repositori ini
2. Buka terminal dan navigasi ke direktori proyek
3. Install dependensi:
   ```
   npm install
   ```
   atau
   ```
   yarn
   ```
4. Jalankan server pengembangan:
   ```
   npm run dev
   ```
   atau
   ```
   yarn dev
   ```
5. Buka browser dan akses `http://localhost:5173`

### Skrip yang Tersedia
- `npm run dev` - Menjalankan server pengembangan
- `npm run build` - Membangun aplikasi untuk produksi
- `npm run lint` - Menjalankan ESLint untuk memeriksa kode
- `npm run preview` - Pratinjau build produksi secara lokal

## Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan ikuti langkah-langkah berikut:
1. Fork repositori
2. Buat branch fitur baru (`git checkout -b fitur-baru`)
3. Commit perubahan Anda (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi
Hak Cipta © 2025 NusaRasa. Seluruh hak dilindungi.
