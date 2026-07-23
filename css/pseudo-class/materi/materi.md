# Materi Lengkap: CSS Pseudo-Classes

Pseudo-class adalah keyword tambahan di belakang selector (pakai satu titik dua `:`) yang memilih elemen berdasarkan **state/kondisi tertentu**, bukan berdasarkan struktur HTML atau class yang ditulis manual. Contoh: elemen yang sedang di-hover, input yang sedang fokus, elemen anak pertama, dll.

```css
selector:pseudo-class {
    /* style */
}
```

## 1. Interaksi Pengguna (User Action)

```css
a:hover {                /* saat kursor di atas elemen */
    color: #b3541e;
}
button:active {          /* saat elemen sedang diklik/ditekan */
    transform: scale(0.97);
}
input:focus {             /* saat elemen sedang aktif/dipilih (biasanya form) */
    outline: 2px solid blue;
}
a:visited {                /* link yang sudah pernah diklik/dikunjungi */
    color: purple;
}
button:focus-visible {     /* fokus HANYA saat dari keyboard (Tab), bukan klik mouse */
    outline: 2px solid orange;
}
```

**Urutan penulisan penting** untuk link (biar override-nya benar, dikenal sebagai "LVHA"):
```css
a:link { }      /* belum dikunjungi */
a:visited { }
a:hover { }
a:active { }
```

## 2. State Form / Input

```css
input:checked { }        /* checkbox/radio yang tercentang */
input:disabled { }       /* elemen yang dinonaktifkan */
input:enabled { }        /* kebalikan disabled */
input:required { }       /* input dengan atribut required */
input:optional { }       /* input tanpa required */
input:valid { }          /* input yang lolos validasi (misal type="email") */
input:invalid { }        /* input yang gagal validasi */
input:placeholder-shown { }  /* saat placeholder masih terlihat (input kosong) */
input:read-only { }
input:read-write { }
input:in-range { }       /* nilai number/range di dalam batas min-max */
input:out-of-range { }
```

Contoh praktis validasi form real-time tanpa JavaScript:
```css
input:invalid {
    border-color: red;
}
input:valid {
    border-color: green;
}
```

## 3. Posisi/Struktur di Antara Saudara (Child Selectors)

```css
li:first-child { }       /* elemen anak pertama dari parent-nya */
li:last-child { }        /* elemen anak terakhir */
li:nth-child(2) { }      /* anak urutan ke-2 */
li:nth-child(odd) { }    /* anak dengan urutan ganjil: 1, 3, 5... */
li:nth-child(even) { }   /* anak dengan urutan genap: 2, 4, 6... */
li:nth-child(3n) { }     /* kelipatan 3: 3, 6, 9... */
li:nth-child(3n+1) { }   /* mulai dari 1, lompat 3: 1, 4, 7... */
li:nth-last-child(2) { } /* hitung dari belakang */
li:only-child { }        /* elemen yang jadi satu-satunya anak di parent-nya */
```

**Beda `nth-child` dengan `nth-of-type`:**
```css
p:nth-child(2) { }    /* anak ke-2 dari SEMUA jenis elemen, harus <p> juga */
p:nth-of-type(2) { }  /* <p> ke-2, dihitung HANYA di antara elemen <p> saja, abaikan tag lain */
```

Ini sering jadi jebakan: kalau di dalam parent ada campuran `<h2>`, `<p>`, `<p>`, maka `p:nth-child(2)` **tidak match** apa pun (karena anak ke-2 adalah `<p>` tapi... sebenarnya perlu dicek urutan globalnya), sedangkan `p:nth-of-type(2)` pasti match `<p>` kedua di antara semua `<p>` yang ada.

## 4. Negasi & Kombinasi Logika

```css
li:not(.active) { }         /* semua <li> KECUALI yang punya class active */
li:not(:first-child) { }    /* semua <li> kecuali yang pertama */
p:is(.card, .banner) { }    /* match kalau salah satu selector di dalamnya cocok (shorthand) */
p:where(.card, .banner) { } /* sama seperti :is(), tapi specificity-nya selalu 0 (gak nambah bobot) */
```

`:not()` sangat berguna untuk kasus umum seperti kasih spacing antar elemen tapi bukan yang terakhir:
```css
li:not(:last-child) {
    margin-bottom: 12px;
}
```

## 5. Berdasarkan Konten/Kekosongan

```css
div:empty { }             /* elemen yang benar-benar kosong, tanpa teks/anak elemen sama sekali */
p:has(img) { }            /* parent yang punya anak tertentu (relatif baru, cek browser support) */
```

`:has()` ini powerful karena CSS akhirnya bisa "menyeleksi ke atas" (parent berdasarkan anaknya) — sebelumnya cuma bisa dari JS.

## 6. Root & Target

```css
:root { }              /* elemen paling atas (<html>), biasa dipakai untuk deklarasi CSS variable */
:target { }            /* elemen yang jadi tujuan anchor link (#section) di URL saat ini */
```

```css
:root {
    --accent: #b3541e;   /* CSS variable, dipakai lewat var(--accent) */
}
```

## 7. Bahasa & Arah

```css
p:lang(en) { }          /* elemen dengan atribut lang tertentu */
div:dir(rtl) { }        /* arah teks: ltr atau rtl */
```

---

## Perbedaan Penting: Pseudo-class vs Pseudo-element

Sering ketuker karena sama-sama pakai tanda titik dua, tapi konsepnya beda:

| | Pseudo-class | Pseudo-element |
|---|---|---|
| Simbol | satu titik dua `:hover` | dua titik dua `::before` |
| Fungsi | pilih elemen berdasarkan **state/posisi** | pilih/buat **bagian tertentu** dari elemen |
| Contoh | `:hover`, `:first-child`, `:checked` | `::before`, `::after`, `::first-line`, `::placeholder` |

```css
p::first-line {          /* pseudo-element: styling baris pertama paragraf */
    font-weight: bold;
}
button::before {         /* pseudo-element: sisip konten sebelum elemen */
    content: "→ ";
}
```

(Catatan: beberapa pseudo-element lama seperti `:before`/`:after` masih valid ditulis satu titik dua untuk kompatibilitas browser lawas, tapi standar modern pakai dua titik dua.)

---

## Tabel Ringkasan Kategori

| Kategori | Contoh |
|---|---|
| Interaksi | `:hover`, `:active`, `:focus`, `:visited`, `:focus-visible` |
| Form/Input | `:checked`, `:disabled`, `:required`, `:valid`, `:invalid` |
| Struktur/posisi | `:first-child`, `:last-child`, `:nth-child()`, `:only-child` |
| Negasi/logika | `:not()`, `:is()`, `:where()` |
| Konten | `:empty`, `:has()` |
| Root/target | `:root`, `:target` |
| Bahasa | `:lang()`, `:dir()` |

## Studi Kasus Ringan

Coba terapkan ke project todolist kamu: kasih spacing antar task **kecuali task terakhir**, kasih warna beda untuk task yang **checkbox-nya tercentang**, dan efek hover di tombol delete:

```css
.task-item:not(:last-child) {
    margin-bottom: 10px;
}
.task-item:has(input:checked) {
    opacity: 0.6;
    text-decoration: line-through;
}
.delete-btn:hover {
    background: crimson;
}
```

Ini bahkan bisa menggantikan sebagian logic JavaScript kamu yang manual nambah/hapus class `completed` — kalau browser target kamu support `:has()`, cukup `:has(input:checked)` aja tanpa perlu JS toggle class sama sekali untuk urusan styling-nya.