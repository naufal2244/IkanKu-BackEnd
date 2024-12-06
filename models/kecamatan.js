const db = require('../config/db');

class Kecamatan {
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM kecamatan');
        return rows;
    }
}

module.exports = Kecamatan;
