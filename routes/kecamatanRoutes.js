const express = require('express');
const router = express.Router();
const kecamatanController = require('../controllers/kecamatanController');

router.get('/', kecamatanController.getAllKecamatan);

module.exports = router;
