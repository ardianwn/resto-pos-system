# RestoPOS - Modern Restaurant POS System

![RestoPOS Banner](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop)

## 🍽️ Tentang RestoPOS

RestoPOS adalah sistem kasir (Point of Sale) modern untuk restoran yang dilengkapi dengan kitchen display system terintegrasi. Dibangun dengan teknologi terkini untuk memberikan pengalaman manajemen restoran yang efisien dan menyenangkan.

## ✨ Fitur Utama

### 📊 Dashboard Interaktif
- Statistik penjualan real-time
- Grafik pendapatan harian/mingguan/bulanan
- Overview meja dan pesanan aktif
- Menu terlaris hari ini

### 🛒 Sistem Kasir (POS)
- Interface kasir yang intuitif
- Pencarian menu cepat
- Keranjang belanja dinamis
- Multiple payment methods (Cash, Card, QRIS, E-Wallet)
- Cetak struk otomatis

### 👨‍🍳 Kitchen Display System
- Tampilan pesanan real-time untuk dapur
- Status item (Pending → Cooking → Ready)
- Prioritas pesanan
- Notifikasi waktu tunggu

### 🪑 Manajemen Meja
- Status meja visual (Available, Occupied, Reserved, Cleaning)
- Pembagian section (Indoor, Outdoor, VIP)
- Kapasitas kursi per meja
- Quick status update

### 📋 Manajemen Menu
- CRUD menu lengkap
- Kategorisasi menu
- Toggle ketersediaan
- Harga dan waktu persiapan

### 📦 Manajemen Pesanan
- Riwayat pesanan lengkap
- Filter berdasarkan status
- Detail pesanan
- Status tracking

### 📈 Laporan & Analitik
- Laporan pendapatan komprehensif
- Analisis tren penjualan
- Distribusi kategori
- Jam sibuk
- Export data

## 🛠️ Teknologi

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animation**: Framer Motion

## 🚀 Instalasi

```bash
# Clone repository
git clone https://github.com/yourusername/restaurant-pos-system.git

# Masuk ke direktori
cd restaurant-pos-system

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 📁 Struktur Project

```
restaurant-pos-system/
├── app/
│   ├── page.tsx           # Dashboard
│   ├── pos/               # Kasir
│   ├── kitchen/           # Kitchen Display
│   ├── tables/            # Manajemen Meja
│   ├── menu/              # Manajemen Menu
│   ├── orders/            # Pesanan
│   └── reports/           # Laporan
├── components/
│   ├── dashboard/         # Komponen Dashboard
│   ├── pos/               # Komponen POS
│   ├── kitchen/           # Komponen Kitchen
│   ├── tables/            # Komponen Meja
│   ├── menu/              # Komponen Menu
│   ├── orders/            # Komponen Orders
│   ├── reports/           # Komponen Reports
│   └── layout/            # Layout (Sidebar, Header)
├── data/                  # Dummy data
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## 🎨 Screenshots

### Dashboard
![Dashboard](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop)

### POS Interface
![POS](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=450&fit=crop)

### Kitchen Display
![Kitchen](https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop)

## 📝 License

MIT License - Silakan gunakan untuk keperluan komersial maupun personal.

## 👨‍💻 Developer

Dibuat dengan ❤️ untuk portfolio jasa pembuatan website.

---

**RestoPOS** - Solusi POS Modern untuk Restoran Anda
