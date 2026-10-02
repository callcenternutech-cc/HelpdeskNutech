PERBAIKAN RESPONSIVE HALAMAN MANAJEMEN TIKET

Perubahan:
- Tampilan tabel desktop sekarang baru aktif pada layar >= 1024px (lg).
- Kartu tiket mobile tetap aktif pada layar di bawah 1024px.
- Logika tiket, tombol aksi, API, dan backend tidak diubah.

Cara menerapkan:
1. Ekstrak ZIP ini ke folder sementara.
2. Salin folder src/components/ticket/ dari hasil ekstrak ke proyek frontend Anda,
   dengan menimpa file yang sama.
3. Di folder frontend, jalankan:
   npm run build
4. Jika build berhasil, salin hasil dist ke proyek Android melalui:
   npx cap sync android
5. Build ulang APK dari Android Studio atau:
   cd android
   gradlew.bat assembleDebug

Catatan:
- ZIP ini tidak menyertakan .env, .git, node_modules, atau kredensial.
- Pastikan file .env.production milik proyek Anda tetap dipertahankan.
