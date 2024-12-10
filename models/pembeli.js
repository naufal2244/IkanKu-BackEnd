const db = require('../config/db');

// Model untuk menangani pembeli
const Pembeli = {
    // Fungsi untuk mencari pembeli berdasarkan email
    findByEmail: async (email) => {
        const query = 'SELECT * FROM pembeli WHERE email = ?';
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    },

    // Fungsi untuk mencari pembeli berdasarkan nomor telepon
    findByNoPonsel: async (no_ponsel) => {
        try{const query = 'SELECT * FROM pembeli WHERE no_ponsel = ?';
        console.log('Executing query:', query); // Tambahkan log untuk debug
        const [rows] = await db.execute(query, [no_ponsel]);
        return rows[0];
        } catch(error){
            console.error('Error in findByNoPonsel:', error.message);
            throw error; // Lempar error ke controller
        }
    },

    // Fungsi untuk mencari pembeli berdasarkan ID Firebase
    findByFirebaseId: async (id_firebase) => {
        const query = 'SELECT * FROM pembeli WHERE id_firebase = ?';
        const [rows] = await db.execute(query, [id_firebase]);
        return rows[0];
    },

    // Fungsi untuk membuat pengguna baru
    create: async (data) => {
        const { id_firebase, nama_lengkap, no_ponsel, email, kata_sandi } = data;

        if (!id_firebase || !nama_lengkap || !no_ponsel || !email || !kata_sandi) {
            throw new Error('Semua field wajib diisi');
        }

        const query = `
            INSERT INTO pembeli (id_firebase, nama_lengkap, no_ponsel, email, kata_sandi)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.execute(query, [id_firebase, nama_lengkap, no_ponsel, email, kata_sandi]);

        return { id_pembeli: result.insertId };
    }
};

module.exports = Pembeli;
