# Premier Cinema — sayt namunasi (premiercinema.uz)

Bu — Tashkent City, Park in Mall (4-qavat) da joylashgan **Premier Cinema** kinoteatri uchun
tayyorlangan ishlaydigan sayt namunasi (demo). Afisha, o'rindiq bron qilish va Payme/Click/Uzum
orqali (demo rejimda) to'lov oqimini o'z ichiga oladi.

## Nima ishlaydi

- **Afisha**: 10 ta film (haqiqiy Premier Cinema jadvalidan olingan sarlavha/janr/davomiylik —
  afisha.uz va kinoafisha.info dan), plakatlar esa **original tarzda yaratilgan** (haqiqiy studiya
  plakatlari nusxalanmagan — mualliflik huquqi uchun).
- **4 ta zal**: Oddiy zal №1 (183 o'rindiq), Oddiy zal №2 (77), VIP zal №1 (49), VIP zal №2 (49) —
  haqiqiy Premier Cinema sig'imlari bo'yicha.
- **Haqiqiy backend**: Node.js + SQLite. Bron qilingan o'rindiqlar serverga saqlanadi, ikkita odam
  bir xil o'rindiqni bron qila olmaydi (tranzaksiya bilan himoyalangan).
- **UZ / RU tillari**: yuqori o'ng burchakdagi tugma orqali almashtiriladi.
- **To'lov**: Payme / Click / Uzum tugmalari **demo rejimda** ishlaydi — haqiqiy pul o'tkazilmaydi.

## Lokal ishga tushirish

```bash
cd site
npm install
npm start
```

So'ng brauzerda **http://localhost:3000** ni oching. Birinchi ishga tushirishda `data/cinema.db`
fayli avtomatik yaratiladi va namunaviy ma'lumotlar bilan to'ldiriladi.

> Eslatma: agar loyihani tarmoq orqali ulangan papka (masalan, Google Drive/OneDrive sinxronlanadigan
> papka) ichida ishga tushirsangiz, SQLite "disk I/O error" berishi mumkin — bunday papkalar fayl
> qulflashni to'liq qo'llab-quvvatlamaydi. Oddiy lokal diskda (masalan `C:\Projects\premiercinema`)
> yoki quyida ko'rsatilgan hosting xizmatlarida bu muammo bo'lmaydi.

## Haqiqiy saytga aylantirish uchun keyingi qadamlar

> **Render.com'ga joylashtirish bo'yicha to'liq, qadam-baqadam qo'llanma uchun `DEPLOY.md`
> faylini oching** — u yerda GitHub'ga yuklashdan tortib, domen ulashgacha bo'lgan barcha
> bosqichlar tushuntirilgan (terminal buyruqlarisiz, faqat sichqoncha bilan bajariladigan).
> `render.yaml` fayli esa Render uchun tayyor konfiguratsiya (Blueprint).

### 1. Domain va hosting
`premiercinema.uz` domenini haqiqiy serverga ulash uchun:

1. Render.com, Railway.app yoki Vercel kabi xizmatlardan birida hisob oching.
2. Ushbu `site` papkasini GitHub repositoryga yuklang (yoki to'g'ridan-to'g'ri papkani hosting
   xizmatiga yuklang).
3. Build buyrug'i kerak emas, start buyrug'i: `npm start`. Node versiyasi: **22.5+**.
4. Hosting xizmati sizga vaqtinchalik domen beradi (masalan `premiercinema.onrender.com`).
5. Domen registratoringizda (premiercinema.uz sotib olingan joyda) DNS sozlamalariga hosting
   ko'rsatgan CNAME/A yozuvini qo'shing.

### 2. Haqiqiy to'lov integratsiyasi (Payme / Click / Uzum)

Hozir to'lov tugmalari faqat **ko'rinish uchun** (demo). Haqiqiy to'lovni ulash uchun:

- **Payme**: business.payme.uz orqali merchant ro'yxatdan o'tkazing, Merchant ID va Kassa kalitini
  oling, Payme Checkout / Subscribe API hujjatlariga muvofiq `server/index.js` ichida yangi
  `/api/payme/*` webhook endpointlarini qo'shing.
- **Click**: my.click.uz orqali merchant hisobini oching, Service ID va Secret Key oling, Click
  Checkout/Invoice API integratsiyasini qo'shing.
- **Uzum Bank (Uzum Nasiya/to'lov)**: Uzum Bank biznes bo'limi orqali merchant sifatida
  ro'yxatdan o'ting va API kalitlarini so'rang.

Har uchala tizim ham: (a) merchant ro'yxatdan o'tish, (b) API kalitlari, (c) to'lov holatini
tasdiqlovchi webhook (server tomonidan qabul qilinadigan) talab qiladi — bularsiz haqiqiy pul
o'tkazish mumkin emas.

### 3. Afisha ma'lumotlarini yangilab turish

`server/seed.js` faylida filmlar va seanslar ro'yxati bor. Buni haftalik/kunlik yangilab turish uchun:
- Qo'lda tahrirlash (kichik kinoteatr uchun eng oddiy yo'l), yoki
- Kelajakda admin panel qo'shish (kinoteatr xodimlari o'zi film/seans qo'sha oladigan).

## Papka tuzilishi

```
site/
  server/
    index.js     — Express server va API endpointlar
    db.js        — SQLite ulanishi va jadval sxemasi
    seed.js       — Namunaviy filmlar/zallar/seanslar
  public/
    index.html    — Bosh sahifa (afisha, zallar, manzil)
    movie.html    — Film sahifasi (seans tanlash)
    booking.html  — O'rindiq tanlash va to'lov
    success.html  — E-chipta
    css/style.css
    js/           — i18n.js, layout.js, main.js, movie.js, booking.js, success.js
    images/       — logotip, zal fotosuratlari, plakatlar
  data/           — SQLite bazasi shu yerda avtomatik yaratiladi (git'ga qo'shilmasin)
```

## Cheklovlar (bu nima emas)

- Bu ishlab chiqarish (production) uchun to'liq tayyor tijorat tizimi emas — bu **ishlaydigan namuna**.
- Admin panel yo'q — filmlar/seanslar hozircha faqat kod orqali o'zgartiriladi.
- To'lov demo rejimda, real emas.
- Filmlar plakatlari original dizayn (haqiqiy studiya plakatlari emas) — mualliflik huquqi
  muammolaridan qochish uchun.
