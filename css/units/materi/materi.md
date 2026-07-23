CSS units dibagi 2 kategori besar: **absolute** (ukuran tetap, gak berubah relatif ke apapun) dan **relative** (ukuran menyesuaikan sesuatu — parent, root, viewport, dst).

## 1. Absolute Units

| Unit | Fungsi | Catatan |
|---|---|---|
| `px` | pixel, 1px = 1/96 inch | paling umum dipakai di web |
| `pt` | point, biasa dipakai di print/dokumen | jarang dipakai di web |
| `cm`, `mm`, `in` | centimeter, milimeter, inch | jarang dipakai di web, lebih ke keperluan cetak |

Absolute units gak berubah meski parent atau ukuran layar berubah — cocok untuk hal yang memang harus fix (misal `border: 1px solid`), tapi kurang fleksibel untuk responsive design.

## 2. Relative Units — berbasis Font

| Unit | Relatif terhadap | Contoh |
|---|---|---|
| `em` | `font-size` elemen **induk terdekat** | kalau parent `font-size: 20px`, `1.5em` = 30px |
| `rem` | `font-size` elemen **root** (`<html>`, default 16px) | `1.5rem` = 24px, **konsisten** di manapun dipakai |
| `ch` | lebar karakter `"0"` pada font saat ini | cocok buat batasi lebar teks, mis. `max-width: 60ch` |
| `ex` | tinggi huruf kecil `"x"` pada font saat ini | jarang dipakai |

**Beda krusial `em` vs `rem`:** `em` bisa "menumpuk" — kalau nested beberapa level, ukurannya jadi gak terprediksi (efek compounding). `rem` selalu konsisten karena cuma merujuk ke satu sumber (`<html>`). Karena itu `rem` lebih disarankan untuk `font-size`, sementara `em` cocok untuk spacing yang memang harus proporsional ke ukuran font elemen itu sendiri (misal `padding` tombol yang harus ikut membesar kalau font tombol membesar).

## 3. Relative Units — berbasis Viewport

| Unit | Fungsi |
|---|---|
| `vw` | 1% dari lebar viewport (jendela browser) |
| `vh` | 1% dari tinggi viewport |
| `vmin` | 1% dari sisi viewport yang **lebih kecil** (lebar atau tinggi) |
| `vmax` | 1% dari sisi viewport yang **lebih besar** |

```css
h1 { font-size: 5vw; }       /* ukuran ikut lebar layar, otomatis responsive */
.hero { height: 100vh; }     /* tinggi penuh 1 layar */
```

Cocok untuk elemen yang memang harus menyesuaikan ukuran layar (hero section, heading besar), tapi hati-hati dipakai untuk `font-size` teks body — bisa jadi terlalu kecil/besar ekstrem di device tertentu tanpa batasan (biasanya dikombinasikan dengan `clamp()`, dibahas di bawah).

## 4. Relative Units — berbasis Parent

| Unit | Fungsi |
|---|---|
| `%` | persentase dari ukuran elemen induk |

```css
div {
    width: 50%;      /* setengah dari lebar parent */
    height: 100%;    /* height perlu parent punya height eksplisit, kalau tidak sering gak berfungsi */
}
```

`%` untuk `width` biasanya lancar karena parent block umumnya sudah punya lebar jelas. Tapi `%` untuk `height` sering gak jalan kalau parent-nya sendiri gak punya `height` eksplisit — ini jebakan umum pemula.

## 5. Unit tanpa satuan

```css
line-height: 1.5;   /* dikalikan terhadap font-size elemen itu sendiri */
```

Ditulis paling tanpa satuan khusus untuk `line-height` karena nilainya proporsional (multiplier), bukan ukuran fix — direkomendasikan dibanding `line-height: 24px` karena tetap proporsional walau `font-size` berubah.

## 6. Fungsi modern untuk unit dinamis

```css
width: calc(100% - 40px);        /* kombinasi 2 unit berbeda */
font-size: clamp(16px, 4vw, 32px); /* min, ideal (responsive), max */
width: min(90%, 500px);           /* ambil yang lebih kecil */
width: max(300px, 50%);           /* ambil yang lebih besar */
```

`clamp()` sangat berguna untuk typography responsive tanpa perlu banyak media query — nilai tengah (`4vw`) akan menyesuaikan ukuran layar, tapi dibatasi minimal `16px` dan maksimal `32px`.

---

## Ringkasan kapan pakai yang mana

| Kebutuhan | Unit yang disarankan |
|---|---|
| Font-size umum | `rem` |
| Spacing yang proporsional ke font elemen (padding tombol, dst) | `em` |
| Border, shadow offset (nilai kecil, harus presisi tetap) | `px` |
| Line-height | tanpa satuan (mis. `1.5`) |
| Lebar/tinggi elemen mengikuti parent | `%` |
| Lebar/tinggi mengikuti layar (hero, section besar) | `vw`/`vh` |
| Batasi lebar teks biar nyaman dibaca | `ch` (mis. `max-width: 65ch`) |
| Ukuran yang harus responsive tapi dibatasi rentang | `clamp()` |