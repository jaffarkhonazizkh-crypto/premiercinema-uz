const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, 'cinema.db');

const db = new DatabaseSync(DB_PATH);
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS halls (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_uz TEXT NOT NULL,
  name_ru TEXT NOT NULL,
  type TEXT NOT NULL,
  layout TEXT NOT NULL,
  photo TEXT NOT NULL,
  base_price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS movies (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_uz TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  genre_uz TEXT NOT NULL,
  genre_ru TEXT NOT NULL,
  country TEXT NOT NULL,
  year INTEGER NOT NULL,
  duration_min INTEGER NOT NULL,
  synopsis_uz TEXT NOT NULL,
  synopsis_ru TEXT NOT NULL,
  poster TEXT NOT NULL,
  age_rating TEXT NOT NULL,
  is_premiere INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS showtimes (
  id INTEGER PRIMARY KEY,
  movie_id INTEGER NOT NULL REFERENCES movies(id),
  hall_id INTEGER NOT NULL REFERENCES halls(id),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  showtime_id INTEGER NOT NULL REFERENCES showtimes(id),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'paid',
  total_price INTEGER NOT NULL,
  seats TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
`);

module.exports = db;
