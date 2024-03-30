const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/submitCV ', cvController.submitCV); 

module.exports = router;