const express = require('express');
const router = express.Router();
const { forgetPassword } = require('../controllers/emailController');

router.post('/forget-password', forgetPassword);

module.exports = router;
