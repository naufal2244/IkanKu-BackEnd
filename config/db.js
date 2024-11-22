const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ikanku_db',
});

console.log('Congrats Chigga! you have Connected to MySQL!');

module.exports = db;
