const KodePos = require('../models/kodePos');

// Mendapatkan kode pos berdasarkan kecamatan
async function getKodePosByKecamatan(req, res) {
    const { id_kecamatan } = req.params;

    try {
        const kodePos = await KodePos.findByKecamatan(id_kecamatan);
        res.status(200).json(kodePos);
    } catch (err) {
        console.error('Error fetching kode pos:', err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

module.exports = { getKodePosByKecamatan };
