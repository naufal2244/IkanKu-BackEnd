const express = require('express');
const router = express.Router();
const alamatController = require('../controllers/alamatController');

router.get('/', alamatController.getAllAddresses);
router.get('/kecamatan', alamatController.getAllKecamatan);
router.get('/kodepos/:id_kecamatan', alamatController.getKodePosByKecamatan);

module.exports = router;
