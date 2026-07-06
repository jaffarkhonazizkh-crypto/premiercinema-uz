const params = new URLSearchParams(location.search);
const slug = params.get('slug');
let DATA = null;
let selectedDate = null;

const DOW_UZ = ['Yak','Dush','Sesh','Chor','Pay','Jum','Shan'];
const DOW_RU = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'];

async function load() {
  if (!slug) { location.href = '/index.html'; return; }
  const res = await fetch(`/api/movies/${slug}`);
  if (!res.ok) { location.href = '/index.html'; return; }
  DATA = await res.json();
  render();
}

function title(m) { return getLang() === 'ru' ? m.title_ru : m.title_uz; }
function genre(m) { return getLang() === 'ru' ? m.genre_ru : m.genre_uz; }
function synopsis(m) { return getLang() === 'ru' ? m.synopsis_ru : m.synopsis_uz; }
function hallName(s) { return getLang() === 'ru' ? s.hall_name_ru : s.hall_name_uz; }

function render() {
  const { movie, showtimes } = DATA;
  document.title = `${title(movie)} — Premier Cinema`;
  document.getElementById('movie-poster').src = movie.poster;
  document.getElementById('movie-poster').alt = title(movie);
  document.getElementById('movie-title').textContent = title(movie);
  document.getElementById('movie-tags').innerHTML = `
    <span class="chip">${genre(movie)}</span>
    <span class="chip">${movie.country}</span>
    <span class="chip">${movie.year}</span>
    <span class="chip">${movie.duration_min} ${t('minutes')}</span>
    <span class="chip">${movie.age_rating}</span>
  `;
  document.getElementById('movie-synopsis').textContent = synopsis(movie);

  const dates = [...new Set(showtimes.map(s => s.date))].sort();
  if (!selectedDate || !dates.includes(selectedDate)) selectedDate = dates[0];

  const dp = document.getElementById('date-picker');
  dp.innerHTML = dates.map(d => {
    const dateObj = new Date(d + 'T00:00:00');
    const dow = getLang() === 'ru' ? DOW_RU[dateObj.getDay()] : DOW_UZ[dateObj.getDay()];
    return `<button class="date-pill ${d === selectedDate ? 'active' : ''}" data-date="${d}">
      <span class="dow">${dow}</span><span class="dnum">${dateObj.getDate()}</span>
    </button>`;
  }).join('');
  dp.querySelectorAll('.date-pill').forEach(btn => {
    btn.addEventListener('click', () => { selectedDate = btn.dataset.date; render(); });
  });

  const sessionsForDate = showtimes.filter(s => s.date === selectedDate);
  const byHall = {};
  for (const s of sessionsForDate) {
    if (!byHall[s.hall_slug]) byHall[s.hall_slug] = [];
    byHall[s.hall_slug].push(s);
  }

  const container = document.getElementById('sessions-container');
  const hallKeys = Object.keys(byHall);
  if (hallKeys.length === 0) {
    container.innerHTML = `<p style="color:var(--muted)">${t('no_sessions')}</p>`;
    return;
  }
  container.innerHTML = hallKeys.map(hk => {
    const sessions = byHall[hk];
    const isVip = sessions[0].hall_type === 'vip';
    return `
      <div class="hall-session-group">
        <h4>${hallName(sessions[0])} ${isVip ? '<span class="hall-tag vip">VIP</span>' : ''}</h4>
        <p class="hall-meta">${isVip ? t('hall_vip') : t('hall_standard')}</p>
        <div class="session-times">
          ${sessions.map(s => `
            <a class="session-time" href="/booking.html?showtime=${s.id}">
              ${s.time}
              <span class="price">${Number(s.price).toLocaleString('ru-RU')} so'm</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('langchange', () => { if (DATA) render(); });
load();
