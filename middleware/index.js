var express = require('express');
var auth = require('./auth');
var router = express.Router();

// menambahkan route registrasi
router.post('/api/v1/register', auth.registerUser);

module.exports = router;