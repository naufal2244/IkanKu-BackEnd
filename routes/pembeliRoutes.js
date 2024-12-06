const express = require('express');
const router = express.Router();
const pembeliController = require('../controllers/pembeliController');
const authenticateFirebaseToken = require('../middlewares/authenticateFirebaseToken');

// Rute untuk pendaftaran dan login
router.post('/register', authenticateFirebaseToken, pembeliController.register);  // Pendaftaran dengan autentikasi Firebase
router.post('/login', pembeliController.login);  // Login dengan nomor telepon dan kata sandi

module.exports = router;
