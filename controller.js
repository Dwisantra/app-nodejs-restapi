'use strict';

var response = require('./rest');
var connection  = require('./koneksi');

exports.index = function(req,res){
    response.ok("Aplikasi RestApi berjalan!", res);
};