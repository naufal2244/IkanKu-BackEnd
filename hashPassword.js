const bcrypt = require('bcryptjs');

const plainPassword = 'toko123'; // Kata sandi yang ingin di-hash

// Hashing kata sandi dengan bcrypt
bcrypt.hash(plainPassword, 10, (err, hashedPassword) => {
    if (err) {
        console.log('Error hashing password:', err);
        return;
    }
    console.log('Hashed password:', hashedPassword); // Ini adalah hasil hashed password

});

