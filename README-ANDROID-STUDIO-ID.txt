HELPDESK NUTECH — ANDROID BUILD READY

Tujuan:
Project frontend + Android Capacitor untuk dibuka di Android Studio dan dibuat menjadi APK.

Konfigurasi API yang diisi:
VITE_API_URL=https://log.ccit.my.id
VITE_WS_URL=wss://log.ccit.my.id/ws

CATATAN PENTING:
- Ini menyiapkan source agar dapat dibangun. Keberhasilan login tetap bergantung pada backend di log.ccit.my.id aktif dan endpoint/CORS sesuai.
- Jangan gunakan lagi URL Cloudflare trycloudflare lama.
- File signing keystore tidak disertakan. Untuk uji coba, Android Studio dapat membuat APK debug.
- Project ini tidak menyertakan node_modules atau hasil build lama. Jalankan proses build/sync sebelum membuka Android Studio.

CARA BUILD:
1. Extract ZIP ke folder sederhana, misalnya D:\project\helpdesk-nutech-android.
2. Buka CMD pada folder tersebut.
3. Jalankan:
   npm ci
   npm run android:sync
4. Jika selesai tanpa error, buka folder android dengan Android Studio:
   File > Open > pilih D:\project\helpdesk-nutech-android\android
5. Tunggu Gradle Sync selesai.
6. Untuk APK debug: Build > Build Bundle(s) / APK(s) > Build APK(s).
7. APK biasanya berada di:
   android\app\build\outputs\apk\debug\app-debug.apk

JIKA INGIN RELEASE:
Build > Generate Signed Bundle / APK. Buat dan simpan keystore sendiri secara aman.
Jangan mengirimkan keystore atau password signing ke siapa pun.

Jika `npm ci` gagal:
- Pastikan Node.js LTS dan internet tersedia.
- Kirim screenshot error lengkap; jangan lanjut ke Gradle sebelum tahap ini berhasil.

Jika login tetap gagal setelah APK terpasang:
- Uji API `https://log.ccit.my.id/v1/users/login` dan CORS.
- Pastikan backend production sudah dideploy dengan konfigurasi terbaru.
