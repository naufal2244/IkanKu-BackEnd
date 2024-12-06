const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


// Inisialisasi dotenv
dotenv.config();

// Membuat express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rute
const pembeliRoutes = require('./routes/pembeliRoutes');
const alamatRoutes = require('./routes/alamatRoutes');
const kecamatanRoutes = require('./routes/kecamatanRoutes');
const kodePosRoutes = require('./routes/kodePosRoutes');

// Gunakan routes
app.use('/api/pembeli', pembeliRoutes);
app.use('/api/alamat', alamatRoutes);
app.use('/api/kecamatan', kecamatanRoutes);
app.use('/api/kodepos', kodePosRoutes);

// Tentukan port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
