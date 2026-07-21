# `background-image` dan Property Terkait di CSS

## 1. `background-image` — Dasar

Property ini dipakai untuk menampilkan gambar sebagai latar belakang sebuah elemen.

```css
.hero {
  background-image: url("gambar.jpg");
}
```

**Poin penting yang sering bikin bingung pemula:** `background-image` **tidak otomatis** membuat gambar tampil bagus/pas — defaultnya gambar akan tampil dalam **ukuran asli** dan **diulang (repeat)** memenuhi elemen kalau elemennya lebih besar dari gambar. Makanya `background-image` hampir selalu dipakai **bareng** beberapa property lain di bawah ini.

## 2. `background-size` — Mengatur ukuran gambar

```css
.hero {
  background-image: url("gambar.jpg");
  background-size: cover;
}
```

| Nilai | Perilaku |
|---|---|
| `cover` | Gambar diperbesar/diperkecil supaya **menutupi seluruh area** elemen, walaupun sebagian gambar terpotong. Paling sering dipakai untuk hero image/banner. |
| `contain` | Gambar diperbesar/diperkecil supaya **seluruh gambar terlihat utuh** di dalam elemen, bisa jadi ada ruang kosong di sisi-sisinya. |
| `auto` (default) | Ukuran asli gambar, tidak diubah sama sekali. |
| `100px 200px` | Ukuran spesifik (lebar x tinggi) dalam angka pasti. |
| `50%` | Ukuran relatif terhadap elemen. |

**Perbandingan `cover` vs `contain` secara konsep:**
- `cover` → seperti foto yang di-*crop* biar penuh, kadang ada bagian gambar yang "terpotong"
- `contain` → seperti foto yang di-*resize* biar muat semua, kadang ada ruang kosong (letterbox)

## 3. `background-repeat` — Mengatur pengulangan

```css
.hero {
  background-image: url("gambar.jpg");
  background-repeat: no-repeat;
}
```

| Nilai | Perilaku |
|---|---|
| `repeat` (default) | Gambar diulang ke kanan dan ke bawah sampai memenuhi elemen |
| `no-repeat` | Gambar hanya tampil **sekali**, tidak diulang |
| `repeat-x` | Hanya diulang secara horizontal |
| `repeat-y` | Hanya diulang secara vertikal |
| `space` | Diulang, tapi jarak antar pengulangan diatur otomatis biar rata tanpa terpotong |
| `round` | Diulang, ukuran gambar disesuaikan otomatis biar pas tanpa terpotong |

Kegunaan `repeat` yang paling umum: bikin pola/motif (pattern) latar belakang, misalnya tekstur kertas atau motif titik-titik kecil.

## 4. `background-position` — Mengatur posisi gambar

```css
.hero {
  background-image: url("gambar.jpg");
  background-position: center;
}
```

Bisa pakai kata kunci:
```css
background-position: center;        /* tengah-tengah */
background-position: top;           /* rata atas, tengah horizontal */
background-position: left top;      /* pojok kiri atas */
background-position: right bottom;  /* pojok kanan bawah */
```

Atau pakai angka/persen (format: `horizontal vertikal`):
```css
background-position: 50% 50%;   /* sama seperti center */
background-position: 20px 40px; /* geser 20px dari kiri, 40px dari atas */
```

## 5. `background-attachment` — Mengatur perilaku saat scroll

```css
.hero {
  background-image: url("gambar.jpg");
  background-attachment: fixed;
}
```

| Nilai | Perilaku |
|---|---|
| `scroll` (default) | Gambar ikut bergerak/scroll bersama kontennya |
| `fixed` | Gambar **diam di tempat** relatif terhadap viewport, walaupun halaman di-scroll — efek ini sering disebut **parallax sederhana** |
| `local` | Gambar ikut scroll bersama isi elemen itu sendiri (kalau elemennya punya scroll internal) |

## 6. Contoh gabungan lengkap — cara paling umum dipakai

```css
.hero {
  background-image: url("banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
```

Ini kombinasi yang **paling sering dipakai** untuk section hero/banner — gambar menutupi seluruh area, terpusat, tidak diulang.

## 7. Shorthand `background`

Semua property di atas bisa digabung jadi satu baris pakai shorthand:

```css
.hero {
  background: url("banner.jpg") center / cover no-repeat;
}
```

Formatnya: `background: [image] [position] / [size] [repeat] [attachment];`

Perhatikan ada tanda **`/`** (garis miring) yang memisahkan `position` dan `size` — ini wajib kalau Anda mau tulis keduanya dalam shorthand.

## 8. Multiple background images (menumpuk beberapa gambar)

CSS mendukung lebih dari satu gambar sebagai background, dipisahkan koma — gambar pertama ada **di atas** (paling depan), gambar berikutnya di belakangnya:

```css
.card {
  background-image: 
    url("overlay-pattern.png"),
    url("photo.jpg");
  background-size: 
    200px,    /* ukuran untuk overlay-pattern.png */
    cover;    /* ukuran untuk photo.jpg */
  background-repeat: 
    repeat,
    no-repeat;
}
```

## 9. Gradient sebagai "gambar" background

Menariknya, `linear-gradient()` dan `radial-gradient()` juga dianggap sebagai "image" oleh CSS, jadi bisa dipakai di `background-image` — bahkan bisa digabung dengan gambar asli:

```css
.hero {
  background-image: 
    linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url("banner.jpg");
  background-size: cover;
  background-position: center;
}
```

Ini trik populer untuk bikin **overlay gelap di atas foto** supaya teks putih di atasnya tetap terbaca jelas — gradient hitam transparan ditumpuk di atas foto.

## 10. Fallback warna kalau gambar gagal dimuat

Selalu praktik yang baik untuk menambahkan `background-color` sebagai cadangan, kalau-kalau gambar gagal load (koneksi lambat, URL salah, dll):

```css
.hero {
  background-color: #333; /* tampil dulu sebelum gambar termuat, atau kalau gambar gagal load */
  background-image: url("banner.jpg");
  background-size: cover;
  background-position: center;
}
```

---
