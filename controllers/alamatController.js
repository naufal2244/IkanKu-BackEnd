const Alamat = require('../models/alamat');
const Kecamatan = require('../models/kecamatan');
const KodePos = require('../models/kodePos');

// Mendapatkan semua alamat
async function getAllAddresses(req, res) {
    try {
        const addresses = await Alamat.findAll();
        res.status(200).json(addresses);
    } catch (err) {
        console.error('Error fetching addresses:', err);
        res.status(500).json({ message: 'Terjadi kesalahan pada server' });
    }
}

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

module.exports = { getAllAddresses, getAllKecamatan, getKodePosByKecamatan };
