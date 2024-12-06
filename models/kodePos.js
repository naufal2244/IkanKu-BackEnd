const db = require('../config/db');

class KodePos {
    static async findByKecamatan(id_kecamatan) {
        const [rows] = await db.query('SELECT * FROM kode_pos WHERE id_kecamatan = ?', [id_kecamatan]);
        return rows;
    }
}

module.exports = KodePos;
