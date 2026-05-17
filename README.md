# SAPA DESA 🌿
**Sistem Pengaduan Masyarakat Desa** — Platform digital untuk pengaduan warga ke pemerintah desa.

## Tech Stack
- **Vite** + **React 18**
- **React Router v6** — navigasi antar halaman
- **Lucide React** — icon library
- **localStorage** — persistent login session
- Mock data (siap diganti REST API)

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Jalankan dev server
npm run dev

# 3. Build production
npm run build
```

## Akun Demo

| Role | Email | Password |
|------|-------|----------|
| Warga | `warga@desa.id` | `password` |
| Admin | `admin@desa.id` | `password` |

Atau klik link "Demo" di halaman login.

## Struktur Project

```
src/
├── pages/
│   ├── Home.jsx           # Landing page / beranda
│   ├── Login.jsx          # Login & registrasi
│   ├── DashboardWarga.jsx # Dashboard warga (buat & pantau aduan)
│   └── DashboardAdmin.jsx # Dashboard admin/perangkat desa
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx     # Navbar global
│   │   └── Sidebar.jsx    # Sidebar dashboard
│   └── ui/
│       └── index.jsx      # Komponen UI reusable (Badge, Btn, Card, dll)
├── context/
│   └── AuthContext.jsx    # Auth state + localStorage
├── data/
│   └── mockData.js        # Mock data aduan & user
├── App.jsx                # Routing utama
├── main.jsx               # Entry point
└── index.css              # Global styles + CSS variables
```

## Fitur

### Warga
- Beranda dashboard dengan statistik aduan
- Form pengaduan baru (kategori, deskripsi, lokasi, urgensi, foto)
- Riwayat semua aduan dengan status
- Notifikasi pembaruan aduan
- Profil data diri lengkap

### Admin / Perangkat Desa
- Dashboard dengan statistik & grafik kategori
- Kelola semua aduan (filter per status)
- Terima, proses, selesaikan, atau tolak aduan
- Detail aduan + progress tracking
- Manajemen akun warga

## Integrasi API (Selanjutnya)
Ganti mock data di `src/data/mockData.js` dengan pemanggilan API menggunakan `axios` atau `fetch`. Endpoint yang dibutuhkan:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/aduan` (warga: milik sendiri; admin: semua)
- `POST /api/aduan`
- `PATCH /api/aduan/:id/status`
- `GET /api/users` (admin only)
