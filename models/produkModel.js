const db = require('../config/db'); // Pastikan ada file koneksi database

// Function untuk mengambil semua produk
const getAllProducts = async () => {
    const query = 'SELECT * FROM produk'; // Query SQL untuk mengambil semua data
    const [rows] = await db.execute(query); // Eksekusi query
    return rows; // Return hasil
};

// Function untuk mengambil produk berdasarkan id
const getProductById = async (id) => {
    const query = 'SELECT * FROM produk WHERE id_produk = ?';
    const [rows] = await db.execute(query, [id]); // Eksekusi query dengan parameter
    return rows[0]; // Return satu data
};

module.exports = {
    getAllProducts,
    getProductById,
};
