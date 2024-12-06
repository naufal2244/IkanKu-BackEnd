const admin = require('firebase-admin');
const fs = require('fs');


// Ambil path file kredensial dari environment variable
const path = process.env.FIREBASE_CREDENTIALS_PATH;

// Periksa apakah path valid
if (!path || !fs.existsSync(path)) {
    throw new Error(`File kredensial Firebase tidak ditemukan atau path tidak valid: ${path}`);
} else {
    console.log(`File kredensial ditemukan di: ${path}`);
}

// Inisialisasi Firebase Admin SDK jika belum diinisialisasi
if (!admin.apps.length) {
    const serviceAccount = require(path); // Muat kredensial dari file JSON

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    console.log('Firebase Admin SDK berhasil diinisialisasi.');
} else {
    console.log('Firebase Admin SDK sudah diinisialisasi sebelumnya.');
}

module.exports = admin;
