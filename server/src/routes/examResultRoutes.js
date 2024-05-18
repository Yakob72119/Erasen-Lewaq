// routes/examRoutes.js

const express = require('express');
const router = express.Router();
const examSubmissionController = require('../controllers/examResultController');


// POST request to save exam submission
router.post('/save-exam', examSubmissionController.saveExamSubmission);
router.get('/exam-submissions/:userId', examSubmissionController.getExamSubmissionsByUserId);

module.exports = router;
