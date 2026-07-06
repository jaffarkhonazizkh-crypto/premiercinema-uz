const db = require('./db');

function count(table) {
  return db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get().c;
}

if (count('halls') === 0) {
  console.log('Seeding halls...');
  const insertHall = db.prepare(`INSERT INTO halls (slug, name_uz, name_ru, type, layout, photo, base_price) VALUES (?,?,?,?,?,?,?)`);

  // Real capacities from Premier Cinema listing: Zal1=183, Zal2=77, VIP1=49, VIP2=49
  const zal1Layout = Array(14).fill(12).concat([15]); // 14*12=168 + 15 = 183
  const zal2Layout = Array(7).fill(11); // 7*11=77
  const vipLayout = Array(7).fill(7); // 7*7=49

  insertHall.run('zal-1', 'Oddiy zal №1', 'Обычный зал №1', 'standard', JSON.stringify(zal1Layout), '/images/halls/oddiy-zal.jpg', 35000);
  insertHall.run('zal-2', 'Oddiy zal №2', 'Обычный зал №2', 'standard', JSON.stringify(zal2Layout), '/images/halls/oddiy-zal.jpg', 35000);
  insertHall.run('vip-1', 'VIP zal №1', 'VIP зал №1', 'vip', JSON.stringify(vipLayout), '/images/halls/vip-zal-1.jpg', 85000);
  insertHall.run('vip-2', 'VIP zal №2', 'VIP зал №2', 'vip', JSON.stringify(vipLayout), '/images/halls/vip-zal-2.jpg', 85000);
}

if (count('movies') === 0) {
  console.log('Seeding movies...');
  const insertMovie = db.prepare(`INSERT INTO movies
    (slug, title_uz, title_ru, genre_uz, genre_ru, country, year, duration_min, synopsis_uz, synopsis_ru, poster, age_rating, is_premiere)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`);

  const movies = [
    {
      slug: 'astral-ekzorsist-lanati',
      title_uz: "Astral: Ekzorsist la'nati", title_ru: 'Астрал. Проклятие экзорциста',
      genre_uz: "Qo'rqinchli", genre_ru: 'Ужасы', country: 'Tailand', year: 2025, duration_min: 100,
      synopsis_uz: "Oilaviy uyga qaytgan ruhiy tajovuz yana boshlanadi — ekzorsist so'nggi marta kurashga chorlanadi.",
      synopsis_ru: 'Тёмные силы возвращаются в старый дом, и экзорцисту предстоит последняя схватка со злом.',
      poster: '/images/posters/astral-ekzorsist-lanati.jpg', age_rating: '18+', is_premiere: 0
    },
    {
      slug: 'fosh-bolish-kuni',
      title_uz: "Fosh bo'lish kuni", title_ru: 'День разоблачения',
      genre_uz: 'Fantastika, drama, triller, boevik', genre_ru: 'Фантастика, драма, триллер, боевик',
      country: 'AQSH', year: 2026, duration_min: 118,
      synopsis_uz: "Butun dunyoni larzaga soladigan sir fosh bo'lishidan bir necha soat oldin voqealar avjiga chiqadi.",
      synopsis_ru: 'За несколько часов до того, как тайна, способная перевернуть мир, будет раскрыта, события достигают предела.',
      poster: '/images/posters/fosh-bolish-kuni.jpg', age_rating: '16+', is_premiere: 1
    },
    {
      slug: 'oyinchoqlar-tarixi-5',
      title_uz: "O'yinchoqlar tarixi 5", title_ru: 'История игрушек 5',
      genre_uz: "Multfilm, sarguzasht, komediya, oilaviy", genre_ru: 'Приключения, анимация, комедия, фэнтези, семейный',
      country: 'AQSH', year: 2026, duration_min: 105,
      synopsis_uz: "Vudi va do'stlarining yangi sarguzashti — bolalar va kattalar uchun issiq va kulgili hikoya.",
      synopsis_ru: 'Новое приключение Вуди и его друзей — тёплая и смешная история для детей и взрослых.',
      poster: '/images/posters/oyinchoqlar-tarixi-5.jpg', age_rating: '0+', is_premiere: 1
    },
    {
      slug: 'bola-va-tulki',
      title_uz: 'Bola va tulki', title_ru: 'Мальчик и лис',
      genre_uz: 'Oilaviy, sarguzasht', genre_ru: 'Семейный, приключения',
      country: 'Fransiya / Belgiya', year: 2026, duration_min: 95,
      synopsis_uz: "Yolg'iz bir bola va yovvoyi tulki o'rtasidagi kutilmagan do'stlik haqida iliq animatsion film.",
      synopsis_ru: 'Тёплый анимационный фильм о неожиданной дружбе одинокого мальчика и дикого лиса.',
      poster: '/images/posters/bola-va-tulki.jpg', age_rating: '0+', is_premiere: 0
    },
    {
      slug: 'u-pastdan-keladi',
      title_uz: 'U pastdan keladi', title_ru: 'Оно приходит снизу',
      genre_uz: "Qo'rqinchli", genre_ru: 'Ужасы', country: 'Argentina / Ispaniya', year: 2025, duration_min: 92,
      synopsis_uz: "Eski binoning zeriga yashiringan noma'lum kuch tunlari uyg'ona boshlaydi.",
      synopsis_ru: 'Неизвестная сила, скрытая в подвале старого здания, начинает пробуждаться по ночам.',
      poster: '/images/posters/u-pastdan-keladi.jpg', age_rating: '18+', is_premiere: 0
    },
    {
      slug: 'jag',
      title_uz: "Jag'", title_ru: 'Пасть',
      genre_uz: 'Triller', genre_ru: 'Триллер', country: 'Buyuk Britaniya', year: 2026, duration_min: 99,
      synopsis_uz: "Kichik qirg'oq shaharchasini larzaga solgan sirli xavf haqida asabiylashtiruvchi triller.",
      synopsis_ru: 'Напряжённый триллер о таинственной угрозе, всколыхнувшей маленький прибрежный городок.',
      poster: '/images/posters/jag.jpg', age_rating: '16+', is_premiere: 0
    },
    {
      slug: 'sehrli-olchamdan-qochish',
      title_uz: "Sehrli o'lchamdan qochish", title_ru: 'Побег из волшебного измерения',
      genre_uz: 'Multfilm, komediya, fentezi', genre_ru: 'Анимация, комедия, фэнтези',
      country: 'Xitoy', year: 2026, duration_min: 90,
      synopsis_uz: "Sehrli olamga tushib qolgan qahramonlar uyga qaytish uchun kulgili sarguzashtga otlanadi.",
      synopsis_ru: 'Герои, попавшие в волшебный мир, отправляются в смешное приключение, чтобы вернуться домой.',
      poster: '/images/posters/sehrli-olchamdan-qochish.jpg', age_rating: '6+', is_premiere: 0
    },
    {
      slug: 'taklifnoma',
      title_uz: 'Taklifnoma', title_ru: 'Приглашение',
      genre_uz: 'Komediya', genre_ru: 'Комедия', country: 'AQSH', year: 2026, duration_min: 97,
      synopsis_uz: "Kutilmagan to'yga taklif qilingan mehmonlar boshiga tushgan kulgili qiyinchiliklar.",
      synopsis_ru: 'Забавные злоключения гостей, неожиданно приглашённых на пышную свадьбу.',
      poster: '/images/posters/taklifnoma.jpg', age_rating: '16+', is_premiere: 0
    },
    {
      slug: '298-reys',
      title_uz: '298-reys', title_ru: 'Рейс 298',
      genre_uz: 'Triller', genre_ru: 'Триллер', country: 'AQSH', year: 2026, duration_min: 108,
      synopsis_uz: "Osmonda qolib ketgan parvoz - yo'lovchilar hayoti bir zumda xavf ostida qoladi.",
      synopsis_ru: 'Рейс, застрявший высоко в небе — жизни пассажиров внезапно оказываются под угрозой.',
      poster: '/images/posters/298-reys.jpg', age_rating: '16+', is_premiere: 0
    },
    {
      slug: 'supergerl',
      title_uz: 'Supergerl', title_ru: 'Супергёрл',
      genre_uz: 'Boevik, fantastika, fentezi', genre_ru: 'Приключения, фэнтези, боевик',
      country: 'AQSH', year: 2026, duration_min: 130,
      synopsis_uz: "Yangi qahramon osmon parvoziga chiqadi — kuch, mas'uliyat va katta jang haqida film.",
      synopsis_ru: 'Новая героиня взмывает в небо — фильм о силе, ответственности и большой битве.',
      poster: '/images/posters/supergerl.jpg', age_rating: '12+', is_premiere: 1
    }
  ];

  for (const m of movies) {
    insertMovie.run(m.slug, m.title_uz, m.title_ru, m.genre_uz, m.genre_ru, m.country, m.year, m.duration_min, m.synopsis_uz, m.synopsis_ru, m.poster, m.age_rating, m.is_premiere);
  }
}

if (count('showtimes') === 0) {
  console.log('Seeding showtimes...');
  const movies = db.prepare('SELECT id, slug FROM movies').all();
  const halls = db.prepare('SELECT id, slug, base_price FROM halls').all();
  const bySlugM = Object.fromEntries(movies.map(m => [m.slug, m.id]));
  const bySlugH = Object.fromEntries(halls.map(h => [h.slug, h]));

  const insertShowtime = db.prepare('INSERT INTO showtimes (movie_id, hall_id, date, time, price) VALUES (?,?,?,?,?)');

  // Based on real Premier Cinema schedule (afisha.uz / kinoafisha.info) for the current week.
  // hall assignment is a reasonable distribution across the 4 real halls (not published per-session by source sites)
  const today = new Date();
  function dateStr(offset) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  }

  // day 0,1,2 = real scraped schedule; days 3,4 = repeat day2 pattern (cinemas typically keep listings similar week to week)
  const schedule = {
    0: {
      'astral-ekzorsist-lanati': { hall: 'vip-1', times: ['13:40', '23:20'] },
      'fosh-bolish-kuni': { hall: 'zal-2', times: ['18:40', '23:50'] },
      'oyinchoqlar-tarixi-5': { hall: 'zal-1', times: ['11:00', '16:30', '18:20'] },
      'bola-va-tulki': { hall: 'zal-1', times: ['10:40', '15:20', '18:10'] },
      'u-pastdan-keladi': { hall: 'vip-2', times: ['19:15', '21:30', '23:10'] },
      jag: { hall: 'vip-1', times: ['22:00'] },
      'sehrli-olchamdan-qochish': { hall: 'zal-2', times: ['11:20', '13:00'] },
      taklifnoma: { hall: 'zal-2', times: ['12:30', '16:00'] },
      '298-reys': { hall: 'vip-2', times: ['12:40', '16:40', '20:20'] },
      supergerl: { hall: 'zal-1', times: ['10:20', '14:20', '20:00', '22:10'] }
    },
    1: {
      'astral-ekzorsist-lanati': { hall: 'vip-1', times: ['13:40', '23:20'] },
      'fosh-bolish-kuni': { hall: 'zal-2', times: ['18:40', '23:50'] },
      'oyinchoqlar-tarixi-5': { hall: 'zal-1', times: ['11:00', '16:30', '18:20'] },
      'bola-va-tulki': { hall: 'zal-1', times: ['10:40', '15:20', '18:10'] },
      'u-pastdan-keladi': { hall: 'vip-2', times: ['19:15', '21:30', '23:10'] }
    },
    2: {
      'astral-ekzorsist-lanati': { hall: 'vip-1', times: ['13:40', '23:20'] },
      'fosh-bolish-kuni': { hall: 'zal-2', times: ['18:40', '23:50'] },
      'oyinchoqlar-tarixi-5': { hall: 'zal-1', times: ['11:00', '16:30', '18:20'] }
    }
  };
  schedule[3] = schedule[2];
  schedule[4] = schedule[1];

  for (const [offsetStr, daySchedule] of Object.entries(schedule)) {
    const offset = Number(offsetStr);
    const date = dateStr(offset);
    for (const [slug, info] of Object.entries(daySchedule)) {
      const movieId = bySlugM[slug];
      const hall = bySlugH[info.hall];
      if (!movieId || !hall) continue;
      for (const time of info.times) {
        insertShowtime.run(movieId, hall.id, date, time, hall.base_price);
      }
    }
  }
}

console.log('Seed check complete. halls=%d movies=%d showtimes=%d bookings=%d',
  count('halls'), count('movies'), count('showtimes'), count('bookings'));
