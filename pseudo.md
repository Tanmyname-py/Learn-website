# CSS Pseudo-Class dan Pseudo-Element

Di CSS ada dua jenis "pseudo selector": **pseudo-class** (pakai satu titik dua `:`) dan **pseudo-element** (pakai dua titik dua `::`). Bedanya:

- **Pseudo-class** → menargetkan elemen berdasarkan **state/kondisi** tertentu (misal sedang di-hover, elemen pertama, dll)
- **Pseudo-element** → menargetkan **bagian tertentu** dari sebuah elemen (misal huruf pertama, atau konten yang disisipkan)

Saya bagi per kategori biar gampang dipahami.

## 1. Pseudo-class: Interaksi (state akibat aksi user)

| Selector | Perilaku |
|---|---|
| `:hover` | Aktif saat kursor mouse berada di atas elemen |
| `:active` | Aktif saat elemen sedang diklik (ditekan) |
| `:focus` | Aktif saat elemen menerima fokus (misal input yang sedang diketik) |
| `:focus-within` | Aktif pada elemen **induk** jika ada anak di dalamnya yang sedang fokus |
| `:focus-visible` | Mirip `:focus`, tapi hanya muncul saat browser menganggap fokus itu perlu ditampilkan visual (misal navigasi keyboard pakai Tab, bukan klik mouse) |
| `:visited` | Link yang sudah pernah dikunjungi |
| `:link` | Link yang belum dikunjungi |

Contoh:
```css
button:hover {
  background-color: orange;
}
```

## 2. Pseudo-class: Struktural (berdasarkan posisi di DOM)

| Selector | Perilaku |
|---|---|
| `:first-child` | Elemen yang merupakan anak **pertama** dari induknya |
| `:last-child` | Elemen yang merupakan anak **terakhir** dari induknya |
| `:only-child` | Elemen yang jadi **satu-satunya** anak dari induknya |
| `:nth-child(n)` | Elemen anak ke-n (bisa pakai rumus, misal `2n` untuk genap, `2n+1` untuk ganjil) |
| `:nth-last-child(n)` | Sama seperti `nth-child`, tapi dihitung dari **belakang** |
| `:first-of-type` | Elemen pertama dari **jenis tag** yang sama di antara saudara-saudaranya |
| `:last-of-type` | Elemen terakhir dari jenis tag yang sama |
| `:nth-of-type(n)` | Elemen ke-n dari jenis tag tertentu |
| `:only-of-type` | Satu-satunya elemen dari jenis tersebut di antara saudaranya |
| `:empty` | Elemen yang tidak punya anak sama sekali (termasuk teks kosong) |
| `:root` | Menargetkan elemen akar dokumen (biasanya `<html>`), sering dipakai untuk deklarasi CSS variable |

Contoh, bikin baris tabel selang-seling warna (zebra stripe):
```css
tr:nth-child(even) {
  background-color: #f2f2f2;
}
```

Penjelasan `nth-child(n)` karena ini yang paling sering bikin bingung:
- `nth-child(3)` → hanya anak ke-3
- `nth-child(2n)` → anak genap (2, 4, 6, ...)
- `nth-child(2n+1)` → anak ganjil (1, 3, 5, ...)
- `nth-child(-n+3)` → 3 anak pertama saja

## 3. Pseudo-class: Form/Input

| Selector | Perilaku |
|---|---|
| `:disabled` | Elemen form yang dinonaktifkan (`disabled` attribute) |
| `:enabled` | Elemen form yang aktif/bisa dipakai |
| `:checked` | Checkbox/radio yang sedang tercentang |
| `:required` | Input yang wajib diisi (`required` attribute) |
| `:optional` | Input yang tidak wajib diisi |
| `:valid` | Input yang isinya sesuai validasi (misal format email benar) |
| `:invalid` | Input yang isinya tidak valid |
| `:placeholder-shown` | Aktif saat input masih menampilkan placeholder (belum diisi) |
| `:read-only` | Elemen yang tidak bisa diedit |
| `:read-write` | Elemen yang bisa diedit user |

Contoh validasi form realtime:
```css
input:invalid {
  border: 2px solid red;
}
```

## 4. Pseudo-class: Logika (menggabungkan kondisi)

| Selector | Perilaku |
|---|---|
| `:not(selector)` | Elemen yang **tidak** cocok dengan selector di dalam kurung |
| `:is(selector-list)` | Cocok jika elemen sesuai dengan **salah satu** selector dalam daftar (mempersingkat penulisan) |
| `:where(selector-list)` | Sama seperti `:is()`, tapi **tidak menambah bobot spesifisitas** (specificity = 0) |
| `:has(selector)` | Cocok jika elemen **mengandung** elemen yang sesuai selector di dalamnya (baru, "parent selector") |

Contoh `:not()`:
```css
li:not(:last-child) {
  border-bottom: 1px solid #ccc; /* semua item kecuali yang terakhir dapat garis bawah */
}
```

Contoh `:has()` (sangat berguna, baru didukung browser modern):
```css
/* styling card jika di dalamnya ada gambar */
.card:has(img) {
  padding: 0;
}
```

## 5. Pseudo-element (pakai `::`)

| Selector | Perilaku |
|---|---|
| `::before` | Menyisipkan konten **sebelum** konten asli elemen (butuh properti `content`) |
| `::after` | Menyisipkan konten **setelah** konten asli elemen |
| `::first-letter` | Menargetkan **huruf pertama** dari teks dalam elemen |
| `::first-line` | Menargetkan **baris pertama** dari teks dalam elemen |
| `::selection` | Menargetkan teks yang sedang **di-select/blok** oleh user |
| `::placeholder` | Menargetkan teks placeholder pada input |
| `::marker` | Menargetkan penanda list (bullet point atau nomor) |

Contoh `::before` untuk bikin ikon dekoratif tanpa nambah HTML:
```css
.quote::before {
  content: "“";
  font-size: 2rem;
  color: gray;
}
```

Contoh mengubah warna teks yang di-blok:
```css
::selection {
  background-color: yellow;
  color: black;
}
```

---

Kalau mau, saya bisa buatkan **demo interaktif** (HTML+CSS) yang menampilkan semua pseudo selector ini secara visual biar lebih gampang lihat perbedaannya langsung — mau?