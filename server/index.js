const express = require('express');
const path = require('node:path');
const crypto = require('node:crypto');
const db = require('./db');
require('./seed');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

function parseLayout(hall) {
  return JSON.parse(hall.layout);
}

function rowLetter(i) {
  return String.fromCharCode(65 + i); // A, B, C ...
}

// GET /api/movies -> now showing + premieres
app.get('/api/movies', (req, res) => {
  const movies = db.prepare('SELECT * FROM movies ORDER BY is_premiere DESC, id ASC').all();
  const withDates = movies.map(m => {
    const dates = db.prepare('SELECT DISTINCT date FROM showtimes WHERE movie_id=? ORDER BY date').all(m.id).map(r => r.date);
    return { ...m, dates };
  });
  res.json(withDates);
});

// GET /api/movies/:slug
app.get('/api/movies/:slug', (req, res) => {
  const movie = db.prepare('SELECT * FROM movies WHERE slug=?').get(req.params.slug);
  if (!movie) return res.status(404).json({ error: 'not_found' });
  const showtimes = db.prepare(`
    SELECT s.id, s.date, s.time, s.price, h.slug as hall_slug, h.name_uz as hall_name_uz, h.name_ru as hall_name_ru, h.type as hall_type
    FROM showtimes s JOIN halls h ON h.id = s.hall_id
    WHERE s.movie_id = ?
    ORDER BY s.date, s.time
  `).all(movie.id);
  res.json({ movie, showtimes });
});

// GET /api/halls
app.get('/api/halls', (req, res) => {
  const halls = db.prepare('SELECT * FROM halls').all();
  res.json(halls.map(h => ({ ...h, layout: parseLayout(h) })));
});

// GET /api/showtimes/:id/seats -> full seat map + booked seats
app.get('/api/showtimes/:id/seats', (req, res) => {
  const showtime = db.prepare(`
    SELECT s.*, h.layout, h.type as hall_type, h.name_uz as hall_name_uz, h.name_ru as hall_name_ru, h.photo as hall_photo,
           m.title_uz, m.title_ru, m.poster
    FROM showtimes s JOIN halls h ON h.id = s.hall_id JOIN movies m ON m.id = s.movie_id
    WHERE s.id = ?
  `).get(req.params.id);
  if (!showtime) return res.status(404).json({ error: 'not_found' });

  const layout = JSON.parse(showtime.layout);
  const bookings = db.prepare('SELECT seats FROM bookings WHERE showtime_id = ?').all(showtime.id);
  const bookedSet = new Set();
  for (const b of bookings) {
    for (const seat of JSON.parse(b.seats)) bookedSet.add(seat);
  }

  const rows = layout.map((count, i) => {
    const letter = rowLetter(i);
    const seats = [];
    for (let n = 1; n <= count; n++) {
      const seatKey = `${letter}${n}`;
      seats.push({ row: letter, number: n, key: seatKey, booked: bookedSet.has(seatKey) });
    }
    return { row: letter, seats };
  });

  res.json({
    showtime: {
      id: showtime.id, date: showtime.date, time: showtime.time, price: showtime.price,
      hall_type: showtime.hall_type, hall_name_uz: showtime.hall_name_uz, hall_name_ru: showtime.hall_name_ru,
      hall_photo: showtime.hall_photo, title_uz: showtime.title_uz, title_ru: showtime.title_ru, poster: showtime.poster
    },
    rows
  });
});

function genCode() {
  return 'PC-' + crypto.randomBytes(4).toString('hex').toUpperCase();
}

// POST /api/bookings  { showtimeId, seats: ["A1","A2"], name, phone, paymentMethod }
app.post('/api/bookings', (req, res) => {
  const { showtimeId, seats, name, phone, paymentMethod } = req.body || {};
  if (!showtimeId || !Array.isArray(seats) || seats.length === 0 || !name || !phone || !paymentMethod) {
    return res.status(400).json({ error: 'invalid_input' });
  }
  if (!['payme', 'click', 'uzum'].includes(paymentMethod)) {
    return res.status(400).json({ error: 'invalid_payment_method' });
  }

  const showtime = db.prepare('SELECT * FROM showtimes WHERE id = ?').get(showtimeId);
  if (!showtime) return res.status(404).json({ error: 'showtime_not_found' });

  try {
    db.exec('BEGIN IMMEDIATE');

    const existing = db.prepare('SELECT seats FROM bookings WHERE showtime_id = ?').all(showtimeId);
    const takenSet = new Set();
    for (const b of existing) for (const s of JSON.parse(b.seats)) takenSet.add(s);

    const conflict = seats.find(s => takenSet.has(s));
    if (conflict) {
      db.exec('ROLLBACK');
      return res.status(409).json({ error: 'seat_taken', seat: conflict });
    }

    const total = showtime.price * seats.length;
    const code = genCode();
    db.prepare(`INSERT INTO bookings (code, showtime_id, customer_name, customer_phone, payment_method, payment_status, total_price, seats)
      VALUES (?,?,?,?,?, 'paid', ?, ?)`)
      .run(code, showtimeId, name, phone, paymentMethod, total, JSON.stringify(seats));

    db.exec('COMMIT');
    res.json({ code, total, seats, paymentMethod });
  } catch (err) {
    try { db.exec('ROLLBACK'); } catch (_) {}
    console.error(err);
    res.status(500).json({ error: 'server_error' });
  }
});

// GET /api/bookings/:code -> e-ticket
app.get('/api/bookings/:code', (req, res) => {
  const booking = db.prepare('SELECT * FROM bookings WHERE code = ?').get(req.params.code);
  if (!booking) return res.status(404).json({ error: 'not_found' });
  const showtime = db.prepare(`
    SELECT s.*, h.name_uz as hall_name_uz, h.name_ru as hall_name_ru, h.type as hall_type,
           m.title_uz, m.title_ru, m.poster
    FROM showtimes s JOIN halls h ON h.id = s.hall_id JOIN movies m ON m.id = s.movie_id
    WHERE s.id = ?
  `).get(booking.showtime_id);
  res.json({ booking: { ...booking, seats: JSON.parse(booking.seats) }, showtime });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Premier Cinema server ishlamoqda: http://localhost:${PORT}`));
