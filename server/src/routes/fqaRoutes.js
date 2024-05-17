const express = require('express');
const router = express.Router();
const faqController  = require('../controllers/fqaController');

// POST request to add FAQ
router.post('/post', faqController.postFAQ);

router.get('/getFqas', faqController.getAllFAQs);

module.exports = router;