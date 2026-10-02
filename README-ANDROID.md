# Helpdesk Nutech - Android

Project ini tetap menggunakan React + Vite. Android dibuat dengan Capacitor sehingga frontend dan backend yang sudah ada tetap menjadi basis aplikasi.

## 1. Prasyarat di Windows

- Node.js LTS
- Android Studio
- Android SDK + Android SDK Platform
- Android SDK Build-Tools
- JDK yang didukung versi Capacitor yang terpasang

## 2. Konfigurasi backend

Buat file `.env.production` dari `.env.production.example` lalu isi URL backend:

```env
VITE_API_URL=https://DOMAIN-BACKEND-ANDA
VITE_WS_URL=
```

Backend harus dapat diakses dari HP Android melalui HTTPS. WebSocket production harus menggunakan WSS.

## 3. Install dependency

```powershell
npm install
```

Jika folder `android/` belum ada:

```powershell
npx cap add android
```

## 4. Build dan sinkronisasi Android

```powershell
npm run android:sync
```

## 5. Buka Android Studio

```powershell
npm run android:open
```

Dari Android Studio pilih emulator/HP lalu Run.

## 6. Debug APK

Build melalui Android Studio: Build > Build APK(s).

## Catatan penting

- Jangan masukkan password PostgreSQL, JWT secret, Cloudinary secret, atau credential backend ke aplikasi Android.
- Android hanya memanggil REST API/WebSocket backend.
- Jika backend masih memakai HTTP lokal seperti `192.168.x.x`, HP dan PC harus berada di jaringan yang sama dan konfigurasi cleartext/mixed-content perlu ditangani khusus. Untuk production gunakan HTTPS + WSS.
- Push notification FCM, kamera native, file picker native, dan biometric login dapat ditambahkan setelah build dasar berhasil.
