const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/register', cvController.register); 

module.exports = router;