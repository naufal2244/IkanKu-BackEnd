const db = require('../config/db'); // Pastikan ini sesuai dengan file konfigurasi Anda

const getPesananByStatus = async (statusId) => {
    try {
        console.log('Model pesanan di-load');
        console.log('Menjalankan query dengan Status ID:', statusId); // Log status ID sebelum query

        const query = `
            SELECT 
                pesanan.id_pesanan,
                produk.nama_produk,
                produk.harga_produk,
                produk.dekripsi_produk,
                produk.foto_produk,
                item_pesanan.kuantitas_pembelian
            FROM 
                pesanan
            JOIN 
                item_pesanan ON pesanan.id_pesanan = item_pesanan.id_pesanan
            JOIN 
                produk ON item_pesanan.id_produk = produk.id_produk
            WHERE 
                pesanan.id_status_pesanan = ?;
        `;
        console.log('Query yang dijalankan:', query, 'dengan parameter:', [statusId]); // Log query

        const [rows] = await db.query(query, [statusId]); // Gunakan await dengan query
        console.log('Hasil query:', rows); // Log hasil query
        return rows;
    } catch (error) {
        console.error('Error di model:', error); // Log error di model
        throw error; // Lempar error ke controller
    }
};

module.exports = { getPesananByStatus };
