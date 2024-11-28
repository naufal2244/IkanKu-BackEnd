const db = require('../config/db'); // Pastikan file db.js sudah benar

const addToCart = async (data) => {
    

    const query = `
        INSERT INTO keranjang 
        (id_produk, id_pilihan_variasi_satu, id_pilihan_variasi_dua, id_pilihan_variasi_tiga, id_pilihan_variasi_empat, kuantitas) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.id_produk,
        data.id_pilihan_variasi_satu ?? null, // Tetap gunakan nullish coalescing
        data.id_pilihan_variasi_dua ?? null,
        data.id_pilihan_variasi_tiga ?? null,
        data.id_pilihan_variasi_empat ?? null,
        data.kuantitas,
    ];

    // Log values untuk debugging
    console.log("Values untuk query:", values);

    const [result] = await db.execute(query, values);
    return result;
};

const getCartItems = async () => {
    const query = `
        SELECT 
            k.id_keranjang,
            p.nama_produk,
            p.harga_produk,
            k.kuantitas,
            CONCAT(
                COALESCE(pv1.pilihan_variasi, ''),
                CASE WHEN pv1.pilihan_variasi IS NOT NULL AND pv2.pilihan_variasi IS NOT NULL THEN ', ' ELSE '' END,
                COALESCE(pv2.pilihan_variasi, ''),
                CASE WHEN (pv1.pilihan_variasi IS NOT NULL OR pv2.pilihan_variasi IS NOT NULL) 
                     AND pv3.pilihan_variasi IS NOT NULL THEN ', ' ELSE '' END,
                COALESCE(pv3.pilihan_variasi, ''),
                CASE WHEN (pv1.pilihan_variasi IS NOT NULL OR pv2.pilihan_variasi IS NOT NULL OR pv3.pilihan_variasi IS NOT NULL)
                     AND pv4.pilihan_variasi IS NOT NULL THEN ', ' ELSE '' END,
                COALESCE(pv4.pilihan_variasi, '')
            ) AS variasi,
            (p.harga_produk * k.kuantitas) AS subtotal
        FROM keranjang k
        JOIN produk p ON k.id_produk = p.id_produk
        LEFT JOIN pilihan_variasi pv1 ON k.id_pilihan_variasi_satu = pv1.id_pilihan_variasi
        LEFT JOIN pilihan_variasi pv2 ON k.id_pilihan_variasi_dua = pv2.id_pilihan_variasi
        LEFT JOIN pilihan_variasi pv3 ON k.id_pilihan_variasi_tiga = pv3.id_pilihan_variasi
        LEFT JOIN pilihan_variasi pv4 ON k.id_pilihan_variasi_empat = pv4.id_pilihan_variasi
        ORDER BY k.id_keranjang DESC
    `;
    const [rows] = await db.execute(query);
    return rows;
};


// Menghapus item dari keranjang berdasarkan id_keranjang
const deleteFromCart = async (id_keranjang) => {
    const query = `DELETE FROM keranjang WHERE id_keranjang = ?`;
    const [result] = await db.execute(query, [id_keranjang]);
    return result;
};

// Mengupdate item di keranjang
const updateCart = async (id_keranjang, data) => {
    const query = `
        UPDATE keranjang 
        SET kuantitas = ?
        WHERE id_keranjang = ?`;
    const values = [data.kuantitas, id_keranjang];
    const [result] = await db.execute(query, values);
    return result;
};

module.exports = {
    addToCart,
    deleteFromCart,
    updateCart,
    getCartItems,
};
