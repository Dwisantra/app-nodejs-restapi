"use strict";

var response = require("./res");
var connection = require("./koneksi");
const conn = require("./koneksi");

exports.index = function (req, res) {
    response.ok("Aplikasi RestApi berjalan!", res);
};

// menampilkan semua data
exports.tampilSemuaData = function (req, res) {
    connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
        if (error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// menampilkan data berdasarkan id
exports.showById = function (req, res) {
    let id = req.params.id;
    connection.query(
        "SELECT * FROM mahasiswa WHERE id_mahasiswa = ?",
        [id],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};

// menampilkan data berdasarkan nim
exports.showByNim = function (req, res) {
    let nim = req.params.nim;
    connection.query(
        "SELECT id_mahasiswa, nim, nama FROM mahasiswa WHERE nim = ?",
        [nim],
        function (error, rows, fields) {
            if (error) {
                connection.log(error);
            } else {
                response.ok(rows, res);
            }
        }
    );
};

// menampahkan data
exports.tambahData = function (req, res) {
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query(
        "INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)",
        [nim, nama, jurusan],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data!", res);
            }
        }
    );
};

// mengupdate data
exports.updateData = function (req, res) {
    var id = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query(
        "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?", [nim,nama,jurusan, id],
        function (error, rows, fields) {
            if(error) {
                console.log(error);
            }else{
                response.ok("Berhasil ubah data", res);
            }
        }        
    );
};

// menghapus data
exports.deleteData = function (req, res) {
    var id = req.body.id_mahasiswa;
    
    connection.query("DELETE FROM mahasiswa WHERE id_mahasiswa=?", [id],
        function (error, rows, fields) {
            if(error) {
                console.log(error);
            }else{
                response.ok("Berhasil hapus data", res);
            }
        }  
    );
};

// menampilkan group
exports.showGroup = function (req, res) {
    connection.query("SELECT mahasiswa.id_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matakuliah, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.id_matakuliah = matakuliah.id_matakuliah AND krs.id_mahasiswa = mahasiswa.id_mahasiswa ORDER BY mahasiswa.id_mahasiswa",
        function (error, rows, fields) {
            if(error) {
                console.log(error);
            }else{
                response.nestedOk(rows, res);
            }
        } 
    )
}
