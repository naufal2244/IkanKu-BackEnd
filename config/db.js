const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

console.log('Database connection initialized:', {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
});


// Tes db.js
async function testDB() {
    try {
        const [rows] = await db.execute('SELECT DATABASE() AS db_name;');
        console.log('Connected to database:', rows[0].db_name);
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

testDB();


module.exports = db;
