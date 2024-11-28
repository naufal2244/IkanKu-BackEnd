const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjangController');

router.post('/keranjang', (req, res, next) => {
    console.log('POST /keranjang triggered');
    next();
}, keranjangController.addToCart);

router.get('/keranjang', (req, res, next) => {
    console.log('GET /keranjang triggered');
    next();
}, keranjangController.getCartItems);

router.delete('/keranjang/:id', (req, res, next) => {
    console.log(`DELETE /keranjang/${req.params.id} triggered`);
    next();
}, keranjangController.deleteFromCart);

router.put('/keranjang/:id', (req, res, next) => {
    console.log(`PUT /keranjang/${req.params.id} triggered`);
    next();
}, keranjangController.updateCart);


module.exports = router;
