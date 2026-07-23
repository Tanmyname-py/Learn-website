# `display` pada CSS

`display` menentukan **bagaimana sebuah elemen ditampilkan dan berperilaku** dalam alur halaman — apakah dia mengambil satu baris penuh, sejajar dengan elemen lain, atau jadi kontainer untuk sistem layout tertentu (flex/grid). Ini salah satu properti paling fundamental karena mempengaruhi cara box model elemen itu bekerja terhadap elemen di sekitarnya.

## 1. `block`

```css
div { display: block; }
```

- Selalu mengambil **satu baris penuh sendiri** — elemen setelahnya otomatis turun ke baris baru
- `width`, `height`, `margin`, `padding` semua berfungsi penuh di semua sisi
- Default untuk: `<div>`, `<p>`, `<h1>`–`<h6>`, `<ul>`, `<li>`, `<section>`, dll

## 2. `inline`

```css
span { display: inline; }
```

- Hanya mengambil ruang **sebesar kontennya**, sejajar dengan elemen/teks lain di baris yang sama
- `width` dan `height` **diabaikan** (gak berpengaruh)
- `margin-top`/`margin-bottom` **diabaikan**, tapi `margin-left`/`margin-right` tetap jalan
- `padding` atas-bawah secara visual "menabrak" konten baris atas/bawah, gak mendorong layout
- Default untuk: `<span>`, `<a>`, `<strong>`, `<em>`, `<img>` (sebenarnya `inline` tapi berperilaku sedikit beda karena replaced element)

## 3. `inline-block`

```css
button { display: inline-block; }
```

Gabungan keduanya — solusi paling sering dipakai untuk kasus "butuh sejajar tapi juga butuh atur ukuran":

- Sejajar dengan elemen lain di baris yang sama (seperti `inline`)
- Tapi `width`, `height`, dan **semua** sisi `margin`/`padding` berfungsi penuh (seperti `block`)
- Umum dipakai untuk: tombol, kartu/card kecil yang mau berjejer, navigasi horizontal

## 4. `none`

```css
.hidden { display: none; }
```

- Elemen **hilang total** dari layout — seolah-olah gak pernah ada di HTML
- Tidak memakan ruang sama sekali, elemen lain akan "mengisi" posisinya
- Beda dengan `visibility: hidden` (yang tetap memakan ruang, cuma gak kelihatan)

## 5. `flex`

```css
.container { display: flex; }
```

- Mengubah elemen jadi **flex container** — elemen anak langsungnya (flex items) otomatis tersusun sejajar (default: horizontal) dan bisa diatur dengan properti pasangan seperti `justify-content`, `align-items`, `gap`, `flex-wrap`
- Sangat umum dipakai untuk navbar, alignment tombol, layout satu dimensi (baris atau kolom)

## 6. `grid`

```css
.container { display: grid; }
```

- Mengubah elemen jadi **grid container** — anak langsungnya tersusun dalam sistem baris & kolom yang didefinisikan lewat `grid-template-columns`/`grid-template-rows`
- Cocok untuk layout dua dimensi (baris **dan** kolom sekaligus), seperti galeri foto atau dashboard

## 7. `inline-flex` & `inline-grid`

- Sama seperti `flex`/`grid`, tapi kontainernya sendiri berperilaku `inline` terhadap elemen di luarnya (bisa sejajar dengan teks/elemen lain), sementara isi di dalamnya tetap pakai aturan flex/grid

## 8. Nilai lain yang lebih jarang dipakai

```css
li { display: list-item; }     /* default <li>, tampil dengan bullet/nomor */
table { display: table; }      /* meniru perilaku layout tabel HTML */
div { display: contents; }     /* elemen "menghilang" secara struktural, tapi anaknya tetap render seolah langsung anak dari parent-nya */
```

---

## Ringkasan Perbandingan Cepat

| Nilai | Ambil 1 baris penuh? | `width`/`height` jalan? | `margin` semua sisi jalan? |
|---|---|---|---|
| `block` | ya | ya | ya |
| `inline` | tidak | tidak | hanya kiri-kanan |
| `inline-block` | tidak | ya | ya |
| `none` | elemen tidak ditampilkan sama sekali | — | — |
| `flex` / `grid` | ya (berperilaku block ke luar) | ya | ya |

**Aturan praktis milih:**
- Butuh section/container besar → `block` (biasanya sudah default)
- Butuh teks/ikon kecil sejajar dalam kalimat → `inline`
- Butuh elemen sejajar tapi bisa diatur ukurannya (tombol, badge) → `inline-block`
- Butuh susun banyak elemen sejajar dengan alignment fleksibel (navbar, card row) → `flex`
- Butuh layout kompleks baris+kolom (dashboard, galeri) → `grid`
- Butuh sembunyikan elemen total dari layout → `none`

Mau aku terapkan `flex`/`grid` ini langsung ke struktur todolist kamu (misal susunan task item, tombol edit/delete, atau progress bar)?


