const { getPesananByStatus } = require('../models/pesananModel');
console.log('getPesananByStatus:', getPesananByStatus); // Cek apakah fungsi diimpor dengan benar


const getPesanan = async (req, res) => {
    try {
        const status = req.query.status;
        console.log('Status yang diterima:', status); // Log status untuk debugging

        const statusIdMapping = {
            'PesananBaru': 1,
            'Dikemas': 2,
            'Dikirim': 3,
            'Selesai': 4,
            'Ditolak': 5,
            'Dibatalkan': 6,
        };

        const statusId = statusIdMapping[status];
        console.log('Status ID yang diterjemahkan:', statusId); // Log ID status

        if (!statusId) {
            return res.status(400).json({ message: 'Status tidak valid' });
        }

        const pesanan = await getPesananByStatus(statusId);
        console.log('Pesanan yang ditemukan:', pesanan); // Log hasil query
        res.json(pesanan);
    } catch (error) {
        console.error('Error di controller:', error); // Log error yang terjadi
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};

module.exports = { getPesanan }; // Pastikan diekspor dengan benar
