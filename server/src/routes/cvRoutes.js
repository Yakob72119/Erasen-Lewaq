const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/submitCV', cvController.submitCV); 
router.get('/getCVs', cvController.getCVs); 


module.exports = router;