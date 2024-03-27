const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatoController');

router.post('/register', educatorController.register); 

module.exports = router;

