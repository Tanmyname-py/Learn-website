## Konsep Dasar

Setiap elemen HTML dibungkus oleh 4 lapisan **box model**, dari dalam ke luar: **content → padding → border → margin**. Di luar keempat lapisan ini, ada 2 properti tambahan (`outline` dan `box-shadow`) yang murni visual — digambar setelah layout selesai dihitung, tidak ikut mempengaruhi ukuran atau posisi elemen lain.

```
┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  ← box-shadow (di luar segalanya, murni visual)
┊     ┌───────────────────────────────────┐     ┊  ← outline (di luar border, punya jarak via outline-offset)
┊     │            margin                  │     ┊
┊     │   ┌─────────────────────────────┐  │     ┊
┊     │   │           border            │  │     ┊  ← garis wajib punya width+style+color
┊     │   │   ┌─────────────────────┐   │  │     ┊
┊     │   │   │      padding         │   │  │     ┊
┊     │   │   │   ┌─────────────┐   │   │  │     ┊
┊     │   │   │   │   content    │   │   │  │     ┊
┊     │   │   │   └─────────────┘   │   │  │     ┊
┊     │   │   └─────────────────────┘   │  │     ┊
┊     │   └─────────────────────────────┘  │     ┊
┊     └───────────────────────────────────┘     ┊
└╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘
```

---

## 1. Content

Area tempat teks/gambar/elemen anak ditampilkan.

```css
div {
    width: 300px;
    height: 150px;
}
```

`width`/`height` secara default **hanya** mengatur area content — belum termasuk padding/border (lihat poin 5 soal `box-sizing`).

## 2. Padding — jarak dalam

Ruang kosong **di dalam** elemen, antara content dan border. Ikut warna background elemen.

```css
div {
    padding: 20px;                 /* semua sisi */
    padding: 10px 20px;            /* atas-bawah / kiri-kanan */
    padding: 10px 20px 15px 5px;   /* atas kanan bawah kiri (searah jarum jam) */
    padding-top: 10px;             /* per sisi */
}
```

## 3. Border — garis pembatas

Wajib punya 3 sub-nilai: **width, style, color**. Tanpa `style`, border gak akan muncul sama sekali.

```css
div {
    border: 2px solid #333;    /* shorthand */
    border-top: 1px dashed red;
    border-radius: 8px;        /* sudut membulat */
    border-radius: 50%;        /* jadi lingkaran */
}
```

Border **masuk hitungan box model** — punya lebar, mendorong elemen lain, dan bisa beda nilai tiap sisi.

## 4. Margin — jarak luar

Ruang kosong **di luar** elemen, transparan, memisahkan dari elemen tetangga.

```css
div {
    margin: 20px;
    margin: 0 auto;      /* center horizontal, elemen harus punya width tertentu */
}
```

**Margin collapsing**: dua elemen block bertumpuk vertikal — elemen atas `margin-bottom: 30px`, elemen bawah `margin-top: 20px` — jarak akhirnya **30px** (diambil yang terbesar, bukan dijumlah 50px). Ini perilaku unik yang cuma terjadi pada margin vertikal, tidak terjadi pada padding.

## 5. `box-sizing` — cara browser menghitung ukuran total

```css
* {
    box-sizing: content-box;  /* DEFAULT: width murni content, padding+border NAMBAH ukuran total */
    box-sizing: border-box;   /* width SUDAH TERMASUK padding+border → ukuran total = width */
}
```

Contoh nyata bedanya:
```css
div {
    width: 300px;
    padding: 20px;
    border: 2px solid black;
}
```
- `content-box` → lebar visual sebenarnya = 300 + 40 (padding kanan-kiri) + 4 (border kanan-kiri) = **344px**
- `border-box` → lebar visual sebenarnya tetap **300px**, padding & border "dimakan" dari dalam

Karena itu hampir semua project modern mulai dengan:
```css
* { box-sizing: border-box; }
```

---

## 6. `outline` — garis di luar box model

```css
button {
    outline: 2px solid blue;
    outline-offset: 4px;   /* jarak dari tepi elemen, boleh negatif */
}
```

**Beda dengan `border`:**

| | `border` | `outline` |
|---|---|---|
| Masuk hitungan box model / ukuran elemen | ya | **tidak** |
| Bisa beda nilai tiap sisi | ya | **tidak**, selalu satu garis utuh |
| Bisa dijauhkan dari elemen | tidak | ya, via `outline-offset` |

Kegunaan utama: **indikator focus keyboard** untuk accessibility.

```css
button:focus {
    outline: 2px solid #b3541e;
    outline-offset: 2px;
}
```

Jangan `outline: none` tanpa pengganti — user yang navigasi pakai Tab jadi gak tahu elemen mana yang lagi aktif.

## 7. `box-shadow` — bayangan di sekeliling elemen

```css
div {
    box-shadow: offset-x offset-y blur-radius spread-radius color;
    box-shadow: 4px 4px 10px rgba(0,0,0,0.3);   /* bayangan standar, jatuh ke kanan-bawah */
    box-shadow: inset 2px 2px 5px #000;         /* bayangan MASUK ke dalam elemen */
    box-shadow: 0 0 0 3px #b3541e;              /* spread tanpa blur → efek mirip border tambahan */
}
```

- `offset-x`/`offset-y` → posisi bayangan
- `blur-radius` → kekaburan (0 = tajam)
- `spread-radius` → opsional, perbesar/perkecil area bayangan
- `inset` → opsional, bikin bayangan ke dalam, bukan keluar
- Boleh lebih dari satu bayangan, dipisah koma: `box-shadow: 2px 2px red, -2px -2px blue;`

Sama seperti `outline`, **tidak mempengaruhi layout** — cocok untuk efek kedalaman/elevasi ("mengambang") tanpa mendorong elemen tetangga.

---

## Tabel Ringkasan Semua Properti

| Lapisan | Termasuk box model? | Punya warna/bg? | Mempengaruhi ukuran elemen? |
|---|---|---|---|
| `padding` | ya | ya (ikut bg elemen) | ya |
| `border` | ya | ya (warna sendiri) | ya |
| `margin` | ya | tidak, transparan | ya (tapi collapsing khusus vertikal) |
| `outline` | **tidak** | ya (warna sendiri) | tidak |
| `box-shadow` | **tidak** | ya (warna sendiri) | tidak |

**Kapan pakai yang mana:**
- `border` → garis yang harus mempengaruhi layout, bisa beda tiap sisi
- `outline` → indikator visual (terutama focus state) yang gak boleh ganggu layout
- `box-shadow` → efek kedalaman/elevasi, atau alternatif border yang lebih halus

---