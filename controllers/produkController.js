const produkModel = require('../models/produkModel');

// Controller untuk mengambil semua produk
const getAllProducts = async (req, res) => {
    try {
        const products = await produkModel.getAllProducts();
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message,
        });
    }
};

// Controller untuk mengambil produk berdasarkan id
const getProductById = async (req, res) => {
    const { id } = req.params; // Ambil id dari parameter URL
    try {
        const product = await produkModel.getProductById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message,
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
};
