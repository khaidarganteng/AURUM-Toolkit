# AURUM Toolkit — Perangkat IT Premium (Next.js + Tailwind)

Kumpulan 8 alat IT yang berjalan sepenuhnya di browser (tanpa backend, tanpa database):
kalkulator subnet (CIDR), generator + pengecek password, Base64/URL encoder, JSON formatter,
hash generator (SHA), UUID & token, kalkulator waktu unduh, dan konverter Unix timestamp.

## Menjalankan
```bash
npm install
npm run dev     # http://localhost:3000
```

## Deploy gratis
Push ke GitHub lalu import repo di https://vercel.com.

## Menambah alat baru
1. Buat komponen di `components/tools/NamaAlat.js`
2. Daftarkan di array `TOOLS` pada `components/Toolkit.js`

Tema warna ada di `tailwind.config.js` (palet `gold` dan `ink`).
