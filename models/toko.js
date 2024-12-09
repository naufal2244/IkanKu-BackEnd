const db = require('../config/db');

const Toko = {
    // Fungsi untuk mencari toko berdasarkan nomor ponsel
    findByNoPonsel: async (no_ponsel) => {
        const query = 'SELECT * FROM toko WHERE no_ponsel = ?';
        const [rows] = await db.execute(query, [no_ponsel]);
        return rows[0]; // Mengembalikan objek toko atau undefined jika tidak ditemukan
    }
};

module.exports = Toko;
