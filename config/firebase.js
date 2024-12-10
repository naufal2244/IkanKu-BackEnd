const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Path relatif ke file kredensial dari file ini
const credentialsPath = path.join(__dirname, '', 'ikankuauth-firebase-adminsdk-ftja5-23a075a258.json');

// Periksa apakah file kredensial ada
if (!fs.existsSync(credentialsPath)) {
    throw new Error(`File kredensial Firebase tidak ditemukan: ${credentialsPath}`);
} else {
    console.log(`File kredensial ditemukan di: ${credentialsPath}`);
}

// Muat file kredensial dan inisialisasi Firebase Admin SDK
const serviceAccount = require(credentialsPath);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

console.log('Firebase Admin SDK berhasil diinisialisasi.');

module.exports = admin;
