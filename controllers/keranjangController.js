const keranjangModel = require('../models/keranjangModel');
const admin = require('../config/firebase');

const normalizeData = (data) => {
    return {
        id_produk: data?.id_produk ?? null, // Gunakan optional chaining
        id_pilihan_variasi_satu: data?.id_pilihan_variasi_satu ?? null,
        id_pilihan_variasi_dua: data?.id_pilihan_variasi_dua ?? null,
        id_pilihan_variasi_tiga: data?.id_pilihan_variasi_tiga ?? null,
        id_pilihan_variasi_empat: data?.id_pilihan_variasi_empat ?? null,
        kuantitas: data?.kuantitas ?? null,
    };
};


const addToCart = async (req, res) => {
    try {
        // Periksa apakah req.body kosong
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Request body kosong. Data tidak valid.",
            });
        }

        const data = normalizeData(req.body);
        console.log("Data setelah normalisasi:", data); // Log untuk debugging

        const result = await keranjangModel.addToCart(data);
        res.status(201).json({
            success: true,
            message: "Item berhasil ditambahkan ke keranjang",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Gagal menambahkan item ke keranjang",
            error: error.message,
        });
    }
};


// Controller untuk mendapatkan semua item di keranjang
const getCartItems = async (req, res) => {
    console.log('Controller addToCart called');

    try {
        const items = await keranjangModel.getCartItems();
        res.status(200).json({
            success: true,
            data: items,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mendapatkan item dari keranjang',
            error: error.message,
        });
    }
}

// Controller untuk menghapus item dari keranjang
const deleteFromCart = async (req, res) => {
    console.log('Controller deleteFromCart called');

    try {
        const { id } = req.params; // Ambil id_keranjang dari URL
        const result = await keranjangModel.deleteFromCart(id);
        res.status(200).json({
            success: true,
            message: 'Item berhasil dihapus dari keranjang',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal menghapus item dari keranjang',
            error: error.message,
        });
    }
};

// Controller untuk mengupdate item di keranjang
const updateCart = async (req, res) => {
    console.log('Controller updateCart called');

    try {
        const { id } = req.params; // Ambil id_keranjang dari URL
        const data = req.body; // Data kuantitas baru dari client
        const result = await keranjangModel.updateCart(id, data);
        res.status(200).json({
            success: true,
            message: 'Item berhasil diupdate di keranjang',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Gagal mengupdate item di keranjang',
            error: error.message,
        });
    }
};

module.exports = {
    addToCart,
    deleteFromCart,
    updateCart,
    getCartItems
};
