var mysql = require('mysql');

// Buat koneksi database
const conn = mysql.createConnection({
    host: "localhost", // Isi dengan alamat IP server MySQL Anda
    user: "root",
    password: "", // Isikan dengan password jika memiliki, atau dik
    database: "db_rest_api"
});

conn.connect((err)=>{
    if(err) throw err;
    console.log("Terkoneksi");
});

module.exports = conn;