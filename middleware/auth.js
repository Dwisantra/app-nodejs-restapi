var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

// controller untuk register
exports.registerUser = function(req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows) {
        if (error) {
            console.log(error);
        }else{
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function(error, rows){
                    if (error) {
                        console.log(error);
                    }else{
                        response.ok("Berhasil menambahkan data user baru", res)
                    }
                });
            }else{
                response.ok("Email sudah terdaftar!", res);
            }
        }
    });
}

// controller untuk login
exports.loginUser = function(req, res) {
    var post = {
        email: req.body.email,
        password: req.body.password
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "email", post.email, "password", md5(post.password)];

    query = mysql.format(query,table);

    // console.log(query);

    connection.query(query, function(error, rows) {
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                });

                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);

                connection.query(query, data, function(error, rows) {
                    if (error) {
                        console.log(error);
                    }else{
                        res.json(
                            {
                                success: true,
                                code: 200,
                                message: 'Generate Token Berhasil!',
                                token: token,
                                currUser: data.id_user
                            }
                        );
                    }
                });
            }else{
                res.json({'Error': true, 'Message':'Email atau Password salah!'});
            }
        }
    });
}

// controller tes verifikasi
exports.halamanRahasia = function(req, res){
    response.ok('Halaman ini hanya untuk user dengan role = 2!', res);
}
