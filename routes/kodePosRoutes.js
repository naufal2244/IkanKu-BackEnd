const express = require('express');
const { getKodePosByKecamatan } = require('../controllers/kodePosController');
const router = express.Router();

// Rute untuk mendapatkan kode pos berdasarkan ID kecamatan
router.get('/:id_kecamatan', getKodePosByKecamatan);

module.exports = router;
