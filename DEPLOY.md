# Render.com'ga joylashtirish — qadam-baqadam

Bu qo'llanma dasturchi bo'lmagan odam uchun yozilgan. Terminal buyruqlari deyarli kerak emas.

## 1-qadam: GitHub'ga yuklash

Render Git repository orqali deploy qiladi, shuning uchun avval kodni GitHub'ga qo'yamiz.

1. https://github.com sahifasida bepul hisob oching (agar yo'q bo'lsa).
2. Yuqori o'ngdagi **"+"** tugmasi -> **"New repository"**.
3. Repository nomi: `premiercinema-uz`. **Private** yoki **Public** — ikkalasi ham bo'ladi. **Create repository** tugmasini bosing.
4. Ochilgan sahifada **"uploading an existing file"** havolasini bosing.
5. `2026-07-06-premiercinema-website` papkasi ICHIDAGI barcha fayl va papkalarni (papkaning o'zini emas — ichidagilarni) shu yerga tortib tashlang (drag & drop). `node_modules` va `data` papkalari yo'q — ularni yuklashning hojati yo'q.
6. Pastda **"Commit changes"** tugmasini bosing.

## 2-qadam: Render'da hisob ochish

1. https://render.com ga o'ting, **"Get Started"** orqali GitHub hisobingiz bilan ro'yxatdan o'ting (eng oson yo'li — "Sign up with GitHub").
2. Render GitHub bilan bog'langach, u repositorylaringizni ko'ra oladi.

## 3-qadam: Web Service yaratish

1. Render dashboardida **"New +"** -> **"Web Service"**.
2. `premiercinema-uz` repositoryni tanlang -> **Connect**.
3. Sozlamalar avtomatik to'ldiriladi, lekin tekshirib qo'ying:
   - **Name**: premiercinema-uz (yoki xohlagan nom)
   - **Region**: Frankfurt (Uzbekistonga eng yaqini)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (boshlash uchun)
4. **"Advanced"** bo'limida environment variable qo'shing: `NODE_VERSION` = `22.22.3`
5. **"Create Web Service"** tugmasini bosing.

3-5 daqiqada sayt tayyor bo'ladi va Render sizga link beradi, masalan:
`https://premiercinema-uz.onrender.com`

## 4-qadam: premiercinema.uz domenini ulash

1. Render'dagi loyihangiz sahifasida **Settings -> Custom Domains -> Add Custom Domain**.
2. `premiercinema.uz` deb kiriting. Render sizga qanday DNS yozuvi (CNAME yoki A record) qo'shish kerakligini ko'rsatadi.
3. Domeningizni sotib olgan joyda (masalan Whois.uz, Reg.uz yoki boshqa registrator) DNS sozlamalariga o'sha yozuvni qo'shing.
4. DNS tarqalishi odatda 15 daqiqadan bir necha soatgacha vaqt oladi.

## Muhim eslatmalar (Free tarif haqida)

- **Free tarif 15 daqiqa faolsiz qolsa "uxlab qoladi"** — keyingi tashrifchi ochganda sayt 20-30 soniya kutadi (birinchi so'rov). Bu narsa haqiqiy mijozlar uchun noqulay bo'lishi mumkin.
- **Free tarifda disk vaqtinchalik** — har safar server qayta ishga tushganda (deploy, uxlab-uyg'onish) bron ma'lumotlari **o'chib ketishi mumkin**. Demo/namuna uchun bu muammo emas, lekin haqiqiy mijozlar bron qila boshlasa, bu jiddiy kamchilik.
- Bu ikkala muammoni yechish uchun **Starter tarif** (~$7/oy, kartangiz kerak) ga o'tish tavsiya etiladi — u doim ishlaydi va `render.yaml`da ko'rsatilgan persistent disk (`/data`) doimiy saqlanadi.
- `render.yaml` fayli allaqachon tayyor — agar Render'da "Blueprint" usulidan foydalansangiz (New + -> Blueprint), yuqoridagi barcha sozlamalar avtomatik o'rnatiladi, faqat repo tanlash kifoya.
