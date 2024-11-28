const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');

// Route untuk mendapatkan semua produk
router.get('/produk', produkController.getAllProducts);

// Route untuk mendapatkan produk berdasarkan id
router.get('/produk/:id', produkController.getProductById);

module.exports = router;
