const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatorController');

router.post('/register', educatorController.register); 

module.exports = router;

