const admin = require('../config/firebase');

const authenticateFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token tidak ditemukan' });
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.firebaseUid = decodedToken.uid;
        req.phoneNumber = decodedToken.phone_number; // Nomor telepon dari token Firebase
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        return res.status(401).json({ message: 'Token tidak valid' });
    }
};

module.exports = authenticateFirebaseToken;
