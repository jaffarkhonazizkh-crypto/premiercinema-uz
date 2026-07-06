const sParams = new URLSearchParams(location.search);
const code = sParams.get('code');

function sTitle(s) { return getLang() === 'ru' ? s.title_ru : s.title_uz; }
function sHallName(s) { return getLang() === 'ru' ? s.hall_name_ru : s.hall_name_uz; }

async function load() {
  if (!code) { location.href = '/index.html'; return; }
  const res = await fetch(`/api/bookings/${code}`);
  if (!res.ok) { location.href = '/index.html'; return; }
  const { booking, showtime } = await res.json();
  document.getElementById('t-poster').src = showtime.poster;
  document.getElementById('t-title').textContent = sTitle(showtime);
  document.getElementById('t-hall').textContent = sHallName(showtime);
  document.getElementById('t-datetime').textContent = `${showtime.date} · ${showtime.time}`;
  document.getElementById('t-code').textContent = booking.code;
  document.getElementById('t-seats').textContent = booking.seats.sort().join(', ');
  document.getElementById('t-total').textContent = `${Number(booking.total_price).toLocaleString('ru-RU')} so'm`;
}
load();
