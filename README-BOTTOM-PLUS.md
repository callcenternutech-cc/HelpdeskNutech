PERBAIKAN TOMBOL + BAWAH

Ganti file:
src/components/layout/DashboardLayout.jsx

Perubahan:
- Menambahkan bottom navigation mobile.
- Tombol + "Buat Tiket" sekarang membuka TicketModal secara langsung.
- Dashboard/Tiket/User/Master Data/Profil/Menu menggunakan navigasi aktif.
- Konten diberi ruang bawah agar tidak tertutup navigasi.

Build setelah mengganti file:
cd /d D:\project\helpdesk-nutech-android
npm run build
npx cap sync android
cd android
gradlew.bat clean assembleDebug
copy /Y app\build\outputs\apk\debug\app-debug.apk ..\ccit.apk
