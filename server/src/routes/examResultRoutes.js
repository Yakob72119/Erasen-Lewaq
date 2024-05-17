// routes/examResults.js

const express = require('express');
const router = express.Router();
const ExamResult = require('../controllers/examResultController');

router.post('/save-results', ExamResult.saveExamResult);

module.exports = router;
