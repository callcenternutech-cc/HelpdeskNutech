CCIT Helpdesk UI V5 - source update

Perubahan utama:
- Tampilan mobile mengikuti pola mockup biru/putih: bottom navigation + tombol Buat Tiket di tengah.
- Dashboard memiliki header biru khusus, KPI 2x2 di mobile, filter lebih rapi.
- Kartu tiket, user, dan master project dirapikan.
- Tidak mengubah service/API, kamera, kompresi foto, atau logika tombol Back.

Cara pasang:
1. Backup folder project.
2. Ekstrak ZIP ini.
3. Salin folder src ke D:\project\helpdesk-nutech-android dan replace.
4. Jalankan: npm run build
5. Jalankan: npx cap sync android
6. Build APK dari android\gradlew.bat assembleDebug
