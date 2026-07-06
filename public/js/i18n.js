// Simple UZ/RU dictionary + language switching helper used across all pages.
const DICT = {
  uz: {
    nav_home: "Bosh sahifa",
    nav_movies: "Afisha",
    nav_halls: "Zallar",
    nav_location: "Manzil",
    nav_book: "Bilet olish",
    hero_eyebrow: "Tashkent City • Park in Mall • 4-qavat",
    hero_title: "Premier Cinema — zamonaviy tomosha tajribasi",
    hero_desc: "Yangi premyeralarni qulay zallarda tomosha qiling, joyingizni onlayn bron qiling va Payme, Click yoki Uzum orqali bir necha soniyada to'lang.",
    hero_cta_book: "Bilet bron qilish",
    hero_cta_halls: "Zallarni ko'rish",
    hero_stat_halls: "4 zal",
    hero_stat_halls_sub: "2 oddiy + 2 VIP",
    hero_stat_seats: "358 o'rindiq",
    hero_stat_seats_sub: "Jami sig'im",
    hero_stat_pay: "3 usul",
    hero_stat_pay_sub: "Payme, Click, Uzum",
    now_showing: "Hozir namoyishda",
    now_showing_sub: "Eng so'nggi premyeralar va sevimli filmlar",
    premiere_badge: "Premyera",
    view_details: "Batafsil / bilet",
    halls_title: "Bizning zallarimiz",
    halls_sub: "2 ta oddiy zal va 2 ta VIP zal — har bir tomosha uchun qulay tanlov",
    hall_standard: "Oddiy zal",
    hall_vip: "VIP zal",
    seats_label: "o'rindiq",
    hall1_desc: "Katta ekran, sifatli tovush va qulay o'rindiqlar — kundalik tomosha uchun ideal.",
    hall2_desc: "Ixcham va shinam zal, kichik guruhlar uchun qulay muhit.",
    vip1_desc: "Keng recliner kreslolar, individual xizmat va yuqori darajadagi qulaylik.",
    vip2_desc: "Premium tajriba istagan tomoshabinlar uchun alohida VIP zal.",
    location_title: "Bizni qanday topasiz",
    location_addr_title: "Manzil",
    location_addr_body: "Botir Zakirov ko'chasi, Tashkent City Park, Park in Mall savdo markazi, 4-qavat, Toshkent",
    location_hours_title: "Ish vaqti",
    location_hours_body: "Har kuni 09:00 — 00:00",
    location_phone_title: "Telefon",
    location_pay_title: "To'lov usullari",
    footer_about_title: "Premier Cinema",
    footer_about_body: "Tashkent City, Park in Mall savdo markazi, 4-qavat. Zamonaviy kinoteatr — 2 oddiy va 2 VIP zal.",
    footer_nav_title: "Navigatsiya",
    footer_contact_title: "Aloqa",
    footer_rights: "Barcha huquqlar himoyalangan.",
    footer_demo_note: "Bu sayt namuna (demo) tariqasida tayyorlangan.",
    back: "Orqaga",
    select_date: "Sana tanlang",
    all_sessions: "Barcha seanslar",
    choose_seats: "O'rindiq tanlang",
    seat_legend_available: "Bo'sh",
    seat_legend_selected: "Tanlangan",
    seat_legend_booked: "Band",
    booking_summary: "Bron xulosasi",
    field_name: "Ism familiya",
    field_phone: "Telefon raqam",
    total_label: "Jami to'lov",
    seats_count: "o'rindiq",
    pay_button: "To'lovga o'tish",
    pay_processing: "To'lov amalga oshirilmoqda...",
    pay_demo_note: "Bu — namunaviy (demo) sayt. Payme / Click / Uzum orqali haqiqiy to'lov amalga oshmaydi; tugma bosilganda to'lov jarayoni simulyatsiya qilinadi.",
    select_seats_first: "Iltimos avval o'rindiq tanlang",
    fill_fields: "Iltimos ism va telefon raqamingizni kiriting",
    success_title: "Bron muvaffaqiyatli amalga oshirildi!",
    success_sub: "E-chipta pastda ko'rsatilgan. Chiptani kinoteatr kassasida yoki kirishda ko'rsating.",
    ticket_code_label: "Bron kodi",
    ticket_seats_label: "O'rindiqlar",
    ticket_hall_label: "Zal",
    ticket_datetime_label: "Sana / vaqt",
    ticket_total_label: "To'langan summa",
    back_home: "Bosh sahifaga qaytish",
    no_sessions: "Bu kun uchun seanslar yo'q",
    minutes: "daq",
  },
  ru: {
    nav_home: "Главная",
    nav_movies: "Афиша",
    nav_halls: "Залы",
    nav_location: "Адрес",
    nav_book: "Купить билет",
    hero_eyebrow: "Tashkent City • Park in Mall • 4 этаж",
    hero_title: "Premier Cinema — современный опыт просмотра",
    hero_desc: "Смотрите новые премьеры в комфортных залах, бронируйте места онлайн и оплачивайте через Payme, Click или Uzum за пару секунд.",
    hero_cta_book: "Забронировать билет",
    hero_cta_halls: "Смотреть залы",
    hero_stat_halls: "4 зала",
    hero_stat_halls_sub: "2 обычных + 2 VIP",
    hero_stat_seats: "358 мест",
    hero_stat_seats_sub: "Общая вместимость",
    hero_stat_pay: "3 способа",
    hero_stat_pay_sub: "Payme, Click, Uzum",
    now_showing: "Сейчас в прокате",
    now_showing_sub: "Последние премьеры и любимые фильмы",
    premiere_badge: "Премьера",
    view_details: "Подробнее / билет",
    halls_title: "Наши залы",
    halls_sub: "2 обычных и 2 VIP зала — удобный выбор для любого сеанса",
    hall_standard: "Обычный зал",
    hall_vip: "VIP зал",
    seats_label: "мест",
    hall1_desc: "Большой экран, качественный звук и удобные кресла — идеально для повседневного просмотра.",
    hall2_desc: "Компактный уютный зал, комфортная атмосфера для небольших групп.",
    vip1_desc: "Просторные кресла-реклайнеры, индивидуальный сервис и высокий уровень комфорта.",
    vip2_desc: "Отдельный VIP-зал для зрителей, ценящих премиальный опыт.",
    location_title: "Как нас найти",
    location_addr_title: "Адрес",
    location_addr_body: "Улица Ботира Закирова, Tashkent City Park, ТЦ Park in Mall, 4 этаж, Ташкент",
    location_hours_title: "Часы работы",
    location_hours_body: "Ежедневно 09:00 — 00:00",
    location_phone_title: "Телефон",
    location_pay_title: "Способы оплаты",
    footer_about_title: "Premier Cinema",
    footer_about_body: "Tashkent City, ТЦ Park in Mall, 4 этаж. Современный кинотеатр — 2 обычных и 2 VIP зала.",
    footer_nav_title: "Навигация",
    footer_contact_title: "Контакты",
    footer_rights: "Все права защищены.",
    footer_demo_note: "Этот сайт подготовлен как демонстрационный образец.",
    back: "Назад",
    select_date: "Выберите дату",
    all_sessions: "Все сеансы",
    choose_seats: "Выберите места",
    seat_legend_available: "Свободно",
    seat_legend_selected: "Выбрано",
    seat_legend_booked: "Занято",
    booking_summary: "Итог бронирования",
    field_name: "Имя и фамилия",
    field_phone: "Номер телефона",
    total_label: "Итого к оплате",
    seats_count: "мест",
    pay_button: "Перейти к оплате",
    pay_processing: "Обработка оплаты...",
    pay_demo_note: "Это демо-сайт. Реальная оплата через Payme / Click / Uzum не происходит — при нажатии кнопки процесс оплаты имитируется.",
    select_seats_first: "Пожалуйста, сначала выберите места",
    fill_fields: "Пожалуйста, укажите имя и номер телефона",
    success_title: "Бронирование прошло успешно!",
    success_sub: "Электронный билет показан ниже. Предъявите его на кассе или при входе в зал.",
    ticket_code_label: "Код брони",
    ticket_seats_label: "Места",
    ticket_hall_label: "Зал",
    ticket_datetime_label: "Дата / время",
    ticket_total_label: "Оплачено",
    back_home: "На главную",
    no_sessions: "На этот день сеансов нет",
    minutes: "мин",
  }
};

function getLang() {
  return localStorage.getItem('pc_lang') || 'uz';
}
function setLang(lang) {
  localStorage.setItem('pc_lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
}
function t(key) {
  const lang = getLang();
  return (DICT[lang] && DICT[lang][key]) || DICT.uz[key] || key;
}
function applyTranslations(root) {
  const scope = root || document;
  scope.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  scope.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === getLang());
  });
}

document.documentElement.lang = getLang();
