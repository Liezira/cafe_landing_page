# Panduan 10 Menit Membuat Barista 3D Semi-Realistik & Natural (Gratis)

Untuk mendapatkan kualitas karakter barista yang benar-benar natural dan mendekati realistik seperti foto referensi (kaos hitam, apron cokelat tua, rambut natural, gerakan menuang latte art luwes), gunakan alur gratis 3 langkah berikut dan langsung masukkan hasilnya ke proyek `smallgaps-webar`:

## Langkah 1: Buat Karakter Barista Gratis (Ready Player Me / VRoid Studio)
1. Buka **Ready Player Me** (gratis, berbasis web) atau **VRoid Studio** (gratis, cocok untuk gaya semi-realistik / Citampi-modern).
2. Pilih proporsi wajah hangat, rambut gelap natural, kaos hitam lengan pendek, dan apron cokelat tua (atau tambahkan mesh apron sederhana di Blender).
3. Ekspor sebagai `.glb` (sudah memiliki tulang humanoid standar).

## Langkah 2: Pasang Animasi Natural Motion-Capture di Adobe Mixamo (Gratis)
1. Unggah karakter ke [mixamo.com](https://www.mixamo.com) (gratis dengan akun Adobe).
2. Unduh 3 klip animasi (format FBX/GLB, `Without Skin` untuk klip ke-2 & ke-3):
   - **`Anim_Idle_Brewing`**: cari `"Standing Idle"` atau `"Bartending / Breathing Idle"` (gerakan bernapas natural, tidak kaku).
   - **`Anim_Greeting_Wave`**: cari `"Waving"` (melambai ramah saat pengunjung membuka pintu).
   - **`Anim_Pouring_Serving`**: cari `"Pouring"` atau `"Working on Counter"` (menuang kopi saat bar diklik).
3. Gabungkan ketiga klip ke dalam 1 file `barista_rig.glb` lewat **Blender NLA Editor** dengan nama klip persis seperti di atas.

## Langkah 3: Kompresi & Aktifkan 1-Klik di Kode
Kompresi file agar tetap ringan di HP (`<= 1.5 MB`):
```bash
npx @gltf-transform/cli optimize raw_barista.glb public/models/barista_rig.glb --compress draco --texture-compress webp --texture-size 512
```
Lalu ubah `useGlbAssets: true` di `src/lib/config/assetConfig.ts`. Komponen `GlbBaristaRig` di `src/components/scene/BaristaActor.tsx` sudah otomatis memuat file tersebut lengkap dengan transisi `fadeIn(0.4)` / `fadeOut(0.4)` yang mulus tanpa patah.
