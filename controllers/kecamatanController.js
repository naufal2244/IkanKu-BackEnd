const Kecamatan = require('../models/kecamatan');

// Mendapatkan semua kecamatan
async function getAllKecamatan(req, res) {
    try {
        const kecamatan = await Kecamatan.findAll();
        res.status(200).json(kecamatan);
    } catch (err) {
        console.error('Error fetching kecamatan:', err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports = { getAllKecamatan };
