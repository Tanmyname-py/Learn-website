# Materi Lengkap: Position, Z-Index, Table, List, Image, dan Filter

## 1. `position`

Menentukan cara elemen ditempatkan — ikut alur dokumen normal, atau dikeluarkan dan diposisikan manual pakai `top`/`right`/`bottom`/`left`.

### `static` — default
```css
div { position: static; }
```
Mengikuti alur normal HTML. `top`/`left`/dst **tidak berfungsi** di sini.

### `relative` — geser dari posisi asli
```css
div {
    position: relative;
    top: 10px;
    left: 20px;
}
```
Ruang aslinya di alur dokumen **tetap ada** (elemen lain gak ikut geser), tapi tampilan visualnya bergeser dari posisi itu. Kegunaan utama: jadi **titik acuan** untuk anak yang `absolute`.

### `absolute` — keluar dari alur, acuan ke parent
```css
.parent { position: relative; }
.child {
    position: absolute;
    top: 0;
    right: 0;
}
```
Dikeluarkan total dari alur dokumen (ruang aslinya hilang). Posisi dihitung dari **parent terdekat yang `position`-nya bukan `static`**. Kalau gak ada, acuan naik sampai `<html>` (viewport).

### `fixed` — mengacu ke viewport
```css
.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
```
Selalu nempel di posisi yang sama relatif ke layar, **tidak ikut scroll** sama sekali.

### `sticky` — hybrid relative + fixed
```css
.header {
    position: sticky;
    top: 0;
}
```
Berperilaku seperti `relative` sampai scroll mencapai titik tertentu (`top: 0`), lalu jadi seperti `fixed` — nempel selama masih di dalam area parent-nya, lalu ikut lewat begitu parent-nya habis discroll.

**Tabel ringkas:**

| Nilai | Ikut alur? | Acuan posisi | Ikut scroll? |
|---|---|---|---|
| `static` | ya | — | ya |
| `relative` | ya | posisi asli sendiri | ya |
| `absolute` | tidak | parent ber-`position` terdekat | ikut parent |
| `fixed` | tidak | viewport | tidak |
| `sticky` | ya (sampai titik tertentu) | viewport, dibatasi parent | sebagian |

---

## 2. `z-index` — urutan tumpukan

```css
.modal {
    position: fixed;   /* WAJIB — z-index gak jalan kalau position: static */
    z-index: 100;
}
.overlay {
    position: fixed;
    z-index: 50;        /* angka lebih kecil = tampil di bawah yang angkanya lebih besar */
}
```

**Aturan penting:**
- Hanya berfungsi kalau `position` elemen bukan `static`.
- **Stacking context**: kalau parent punya `z-index` tertentu, semua `z-index` anaknya dihitung relatif terhadap parent itu — anak dengan `z-index: 9999` tetap gak bisa "menembus" keluar dari stacking context parent yang lebih rendah.

---

## 3. CSS Spesifik untuk Table

```css
table {
    border-collapse: collapse;   /* border antar sel menyatu jadi 1 garis (default: separate, ada celah) */
    border-spacing: 8px;         /* jarak antar sel, hanya berlaku saat separate */
    table-layout: fixed;         /* lebar kolom dari CSS, bukan otomatis dari isi — render lebih cepat */
    width: 100%;
    caption-side: bottom;        /* posisi <caption>: top (default) atau bottom */
}

th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
    empty-cells: hide;           /* sembunyikan border sel kosong, hanya saat separate */
}

tr:nth-child(even) {
    background: #f5f5f5;         /* zebra stripe */
}
```

`border-collapse: collapse` paling umum dipakai supaya tampilan rapi (satu garis, gak dobel antar sel).

---

## 4. CSS Spesifik untuk List

```css
ul {
    list-style-type: disc;        /* disc, circle, square, decimal, none, dst */
    list-style-position: outside; /* outside (default): bullet di luar teks | inside: bullet ikut jadi bagian teks */
    list-style-image: url("bullet.png");
    list-style: square inside url("bullet.png");  /* shorthand */
}

li::marker {
    color: #b3541e;               /* styling langsung ke bullet/nomor */
    font-weight: bold;
}
```

`list-style-type: none` sering dipakai kalau `<ul>` dipakai untuk navigasi/menu, bukan daftar biasa — bullet dihilangkan lalu di-styling manual pakai flexbox.

---

## 5. CSS Spesifik untuk Image

```css
img {
    width: 100%;
    height: 300px;
    object-fit: cover;       /* isi penuh area tanpa gepeng, bagian luar terpotong */
    /* object-fit: contain;  → gambar utuh terlihat semua, mungkin ada ruang kosong */
    /* object-fit: fill;     → dipaksa gepeng ikut width/height (default, sering jelek) */
    object-position: center top;  /* fokus crop, dipakai bareng object-fit */
    aspect-ratio: 16 / 9;    /* jaga rasio otomatis meski cuma set 1 dimensi */
    border-radius: 12px;
}
```

`object-fit: cover` paling penting untuk kartu/thumbnail — cegah gambar distorsi saat rasio container beda dari rasio gambar asli.

---

## 6. `filter` — efek visual

```css
img {
    filter: blur(4px);
    filter: brightness(1.2);      /* 1 = normal, >1 lebih terang */
    filter: contrast(150%);
    filter: grayscale(100%);      /* 0–100% */
    filter: sepia(60%);
    filter: saturate(200%);
    filter: hue-rotate(90deg);
    filter: invert(100%);
    filter: drop-shadow(4px 4px 6px rgba(0,0,0,0.4));  /* ikut bentuk transparansi PNG, beda dari box-shadow */

    filter: grayscale(80%) contrast(120%) brightness(0.9);  /* bisa digabung, dipisah spasi */
}
```

Kegunaan umum: efek hover galeri gambar (`grayscale(100%)` → `none` saat hover), state disabled, atau `drop-shadow` untuk logo PNG transparan.

---

## Ringkasan Cepat

| Topik | Properti kunci |
|---|---|
| Position | `static`, `relative`, `absolute`, `fixed`, `sticky` |
| Z-index | `z-index` (butuh `position` aktif) |
| Table | `border-collapse`, `table-layout`, `empty-cells` |
| List | `list-style-type`, `list-style-position`, `::marker` |
| Image | `object-fit`, `object-position`, `aspect-ratio` |
| Filter | `blur`, `grayscale`, `brightness`, `drop-shadow`, dll |


