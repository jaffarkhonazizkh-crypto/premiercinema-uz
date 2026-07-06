const bParams = new URLSearchParams(location.search);
const showtimeId = bParams.get('showtime');
let SEATDATA = null;
let selectedSeats = [];
let selectedMethod = null;

function bTitle(s) { return getLang() === 'ru' ? s.title_ru : s.title_uz; }
function bHallName(s) { return getLang() === 'ru' ? s.hall_name_ru : s.hall_name_uz; }

async function load() {
  if (!showtimeId) { location.href = '/index.html'; return; }
  const res = await fetch(`/api/showtimes/${showtimeId}/seats`);
  if (!res.ok) { location.href = '/index.html'; return; }
  SEATDATA = await res.json();
  render();
}

function render() {
  const { showtime, rows } = SEATDATA;
  document.getElementById('ctx-poster').src = showtime.poster;
  document.getElementById('ctx-title').textContent = bTitle(showtime);
  document.getElementById('ctx-meta').textContent = `${bHallName(showtime)} · ${showtime.date} · ${showtime.time}`;
  document.getElementById('summary-sub').textContent = `${bHallName(showtime)} · ${showtime.date} ${showtime.time}`;

  const map = document.getElementById('seat-map');
  map.innerHTML = rows.map(r => `
    <div class="seat-row">
      <span class="row-label">${r.row}</span>
      ${r.seats.map(s => {
        const isSelected = selectedSeats.includes(s.key);
        const cls = s.booked ? 'booked' : (isSelected ? 'selected' : 'available');
        return `<div class="seat ${cls} ${showtime.hall_type === 'vip' ? 'vip' : ''}" data-key="${s.key}" title="${s.key}">${s.number}</div>`;
      }).join('')}
    </div>
  `).join('');

  map.querySelectorAll('.seat.available, .seat.selected').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.dataset.key;
      if (selectedSeats.includes(key)) {
        selectedSeats = selectedSeats.filter(k => k !== key);
      } else {
        selectedSeats.push(key);
      }
      render();
      updateSummary();
    });
  });

  updateSummary();
}

function updateSummary() {
  const { showtime } = SEATDATA;
  document.getElementById('sum-seats').textContent = selectedSeats.length ? selectedSeats.sort().join(', ') : '—';
  document.getElementById('sum-total').textContent = `${(selectedSeats.length * showtime.price).toLocaleString('ru-RU')} so'm`;
}

document.getElementById('pay-methods').addEventListener('click', (e) => {
  const el = e.target.closest('.pay-method');
  if (!el) return;
  selectedMethod = el.dataset.method;
  document.querySelectorAll('.pay-method').forEach(p => p.classList.toggle('active', p === el));
});

function showError(msg) {
  document.getElementById('error-box').innerHTML = `<div class="error-msg">${msg}</div>`;
}
function clearError() {
  document.getElementById('error-box').innerHTML = '';
}

document.getElementById('pay-btn').addEventListener('click', async () => {
  clearError();
  const name = document.getElementById('input-name').value.trim();
  const phone = document.getElementById('input-phone').value.trim();

  if (selectedSeats.length === 0) return showError(t('select_seats_first'));
  if (!name || !phone) return showError(t('fill_fields'));
  if (!selectedMethod) return showError(t('select_seats_first'));

  const btn = document.getElementById('pay-btn');
  btn.disabled = true;
  const originalText = btn.textContent;
  btn.textContent = t('pay_processing');

  await new Promise(r => setTimeout(r, 1100)); // simulate demo payment processing

  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        showtimeId: Number(showtimeId),
        seats: selectedSeats,
        name, phone,
        paymentMethod: selectedMethod
      })
    });
    const data = await res.json();
    if (!res.ok) {
      if (data.error === 'seat_taken') {
        showError(`${data.seat} ${t('seat_legend_booked')}`);
        selectedSeats = selectedSeats.filter(s => s !== data.seat);
        const refreshed = await fetch(`/api/showtimes/${showtimeId}/seats`);
        SEATDATA = await refreshed.json();
        render();
      } else {
        showError('Server error');
      }
      btn.disabled = false;
      btn.textContent = originalText;
      return;
    }
    location.href = `/success.html?code=${data.code}`;
  } catch (err) {
    showError('Network error');
    btn.disabled = false;
    btn.textContent = originalText;
  }
});

document.getElementById('back-link').addEventListener('click', (e) => { e.preventDefault(); history.back(); });

document.addEventListener('langchange', () => { if (SEATDATA) render(); });
load();
