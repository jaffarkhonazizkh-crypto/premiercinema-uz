let MOVIES = [];
let HALLS = [];

async function loadMovies() {
  const res = await fetch('/api/movies');
  MOVIES = await res.json();
  renderMovies();
}

function movieTitle(m) { return getLang() === 'ru' ? m.title_ru : m.title_uz; }
function movieGenre(m) { return getLang() === 'ru' ? m.genre_ru : m.genre_uz; }

function renderMovies() {
  const grid = document.getElementById('movie-grid');
  if (!grid) return;
  grid.innerHTML = MOVIES.map(m => `
    <div class="movie-card">
      <div class="movie-poster">
        <img src="${m.poster}" alt="${movieTitle(m)}" loading="lazy">
        ${m.is_premiere ? `<span class="badge" data-i18n="premiere_badge">${t('premiere_badge')}</span>` : ''}
        <span class="badge age">${m.age_rating}</span>
      </div>
      <div class="movie-info">
        <h3>${movieTitle(m)}</h3>
        <p class="meta">${movieGenre(m)} · ${m.year} · ${m.duration_min} ${t('minutes')}</p>
        <a href="/movie.html?slug=${m.slug}" class="btn btn-primary">${t('view_details')}</a>
      </div>
    </div>
  `).join('');
}

const HALL_DESC_KEY = { 'zal-1': 'hall1_desc', 'zal-2': 'hall2_desc', 'vip-1': 'vip1_desc', 'vip-2': 'vip2_desc' };

async function loadHalls() {
  const res = await fetch('/api/halls');
  HALLS = await res.json();
  renderHalls();
}

function renderHalls() {
  const grid = document.getElementById('hall-grid');
  if (!grid) return;
  grid.innerHTML = HALLS.map(h => {
    const seatCount = h.layout.reduce((a,b) => a+b, 0);
    const name = getLang() === 'ru' ? h.name_ru : h.name_uz;
    return `
    <div class="hall-card">
      <div class="hall-photo"><img src="${h.photo}" alt="${name}" loading="lazy"></div>
      <div class="hall-body">
        <span class="hall-tag ${h.type}">${h.type === 'vip' ? t('hall_vip') : t('hall_standard')}</span>
        <h3>${name}</h3>
        <ul>
          <li>${seatCount} ${t('seats_label')}</li>
          <li>${Number(h.base_price).toLocaleString('ru-RU')} so'm / сум</li>
        </ul>
        <p style="color:var(--muted);font-size:.85rem;margin-top:10px;">${t(HALL_DESC_KEY[h.slug])}</p>
      </div>
    </div>
  `;
  }).join('');
}

document.addEventListener('langchange', () => {
  renderMovies();
  renderHalls();
});

loadMovies();
loadHalls();
