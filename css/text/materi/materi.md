## 1. Font — bentuk huruf

| Properti | Fungsi | Contoh |
|---|---|---|
| `font-family` | jenis huruf + fallback | `"Poppins", sans-serif` |
| `font-size` | ukuran huruf | `16px`, `1.2rem` |
| `font-weight` | ketebalan (100–900) | `bold`, `700` |
| `font-style` | miring atau tidak | `italic`, `normal` |
| `font-variant` | small-caps (huruf kecil jadi kapital-kecil) | `small-caps` |
| `font-stretch` | lebar huruf (condensed/expanded) | `condensed` — jarang dipakai, tergantung font support |
| `font` | shorthand gabungan semua di atas | `italic bold 16px/1.5 Arial` |

## 2. Warna & tampilan dasar

| Properti | Fungsi |
|---|---|
| `color` | warna teks |
| `text-align` | perataan horizontal: left/center/right/justify |
| `text-align-last` | perataan baris **terakhir** khusus saat `text-align: justify` |
| `direction` | arah teks: `ltr` / `rtl` (untuk bahasa Arab, Ibrani) |
| `vertical-align` | perataan vertikal teks/elemen inline (`top`, `middle`, `baseline`) |

## 3. Dekorasi teks

| Properti | Fungsi |
|---|---|
| `text-decoration` | garis: underline/line-through/overline/none |
| `text-decoration-color` | warna garis dekorasi, terpisah dari warna teks |
| `text-decoration-style` | bentuk garis: solid/wavy/dotted/dashed |
| `text-decoration-thickness` | ketebalan garis |
| `text-transform` | kapitalisasi tampilan: uppercase/lowercase/capitalize |
| `text-shadow` | bayangan teks: `offset-x offset-y blur warna` |

## 4. Jarak & baris

| Properti | Fungsi |
|---|---|
| `line-height` | jarak antar baris (tulis tanpa satuan, mis. `1.6`) |
| `letter-spacing` | jarak antar huruf |
| `word-spacing` | jarak antar kata |
| `text-indent` | indentasi baris pertama paragraf |

## 5. Wrapping & overflow (teks panjang)

| Properti | Fungsi |
|---|---|
| `white-space` | atur wrap: `normal`, `nowrap`, `pre` |
| `text-overflow` | teks kepotong jadi `...` (butuh `overflow:hidden` + `white-space:nowrap`) |
| `word-break` | pecah kata panjang: `normal`, `break-all`, `keep-all` |
| `overflow-wrap` | izinkan kata panjang dipotong biar gak overflow container |
| `hyphens` | tanda hubung otomatis di akhir baris: `auto`/`none` |
| `tab-size` | lebar karakter tab |
| `writing-mode` | arah penulisan (horizontal/vertikal) |
