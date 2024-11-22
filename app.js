const express = require('express');
const app = express();
const pesananRoutes = require('./routes/pesananRoutes');

// Middleware
app.use(express.json());
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Terjadi kesalahan di server' });
});


// Routes
app.use('/api', pesananRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
