const express = require('express');
const router = express.Router();
const { getPesanan } = require('../controllers/pesananController');

router.get('/pesanan', getPesanan);

module.exports = router;
