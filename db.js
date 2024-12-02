const mysql = require('mysql2');
const dotenv = require('dotenv');

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Membuat koneksi ke database
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

// Menghubungkan ke database dan menampilkan pesan jika sukses
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Keluar jika tidak bisa menghubungkan ke database
  }
  console.log('Connected to the database');
});

module.exports = db; // Mengekspor koneksi database untuk digunakan di file lain
