const db = require('../config/db');

// Model untuk tabel alamat
class Alamat {
    static async create(data) {
        const { id_pembeli, detail_alamat, id_kecamatan, id_kode_pos, nama_alamat, nomor_ponsel_alamat, alamat_utama = 0 } = data;

        try {
            // Validasi input data
            if (!id_pembeli || !detail_alamat || !id_kecamatan || !id_kode_pos || !nomor_ponsel_alamat) {
                throw new Error('Semua field harus diisi, kecuali nama alamat dan alamat utama');
            }

            const query = 
                `INSERT INTO alamat 
                (id_pembeli, detail_alamat, id_kecamatan, id_kode_pos, nama_alamat, nomor_ponsel_alamat, alamat_utama) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await db.query(query, [
                id_pembeli, 
                detail_alamat, 
                id_kecamatan, 
                id_kode_pos, 
                nama_alamat, 
                nomor_ponsel_alamat,
                alamat_utama  // Menyertakan alamat_utama dengan default 0
            ]);
            
            return result.insertId;  // Kembalikan ID alamat baru
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}

module.exports = Alamat;
