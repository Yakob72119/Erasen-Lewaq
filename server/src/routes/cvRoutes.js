const express = require('express');
const router = express.Router();
const cvController = require('../controllers/cvController');

router.post('/submitCV', cvController.submitCV); 
router.get('/getCVs', cvController.getCVs); 
router.delete('/deleteCV/:id', cvController.deleteCV);
router.post('/deleteMultipleCVs', cvController.deleteMultipleCVs);
router.get('/status/:userId', cvController.getCvStatus);

module.exports = router;