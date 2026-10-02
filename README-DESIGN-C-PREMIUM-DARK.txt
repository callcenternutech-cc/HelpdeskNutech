HELPDESK CENTER — DESIGN C PREMIUM DARK

Perubahan pada paket ini:
- Mode Premium Dark menjadi mode awal pada instalasi/penyimpanan tema versi baru.
- Gaya gelap diseragamkan untuk area aplikasi, kartu, form, tabel, header, navigasi bawah, sidebar, login, dan pengaturan.
- Fungsi React/API tidak diubah.

Cara menerapkan:
1. Cadangkan folder proyek lama.
2. Ekstrak ZIP ini ke folder proyek (atau gunakan sebagai folder proyek baru).
3. Buat kembali .env.production dari .env.production.example dan isi URL backend yang benar. Jangan membagikan kredensial.
4. Jalankan: npm install
5. Jalankan: npm run build
6. Jalankan: npx cap sync android
7. Build APK dari Android Studio atau `cd android` lalu `gradlew.bat assembleDebug`.

Catatan: folder hasil build, cache Gradle, local.properties, dan file .env tidak disertakan. Tema dapat diganti melalui kontrol tema yang sudah ada.
