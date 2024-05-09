
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// POST request to save exam questions
router.post('/add', questionController.addQuestions);

module.exports = router;
