const db = require('./config/db');

async function testConnection() {
  try {
    // Jalankan query sederhana untuk menguji koneksi
    const [rows] = await db.execute('SELECT 1 + 1 AS result');
    console.log('Connection successful:', rows);
  } catch (err) {
    // Jika terjadi error, log detail errornya
    console.error('Connection failed:', err.message);
  } finally {
    // Tutup koneksi setelah testing selesai
    db.end();
  }
}

testConnection();
