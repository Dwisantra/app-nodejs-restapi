'use strict';

var response = require('./rest');
var connection  = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi RestApi berjalan!", res);
};

// menampilkan semua data
exports.tampilSemuaData  = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    });
};