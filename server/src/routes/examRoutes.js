const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/addExam', examController.addExam);

router.get('/getExamsByEducatorId/:educatorId', examController.getExamsByEducatorId);

router.delete('/deleteExam/:examId', examController.deleteExam);

router.get('/getExamsByEducatorIdAndStatus/:educatorId/:status', examController.getExamsByEducatorIdAndStatus);

router.get('/getAllExams', examController.getAllExams);

router.put('/:id', examController.declineExam);

router.put('/updatePaymentStatus/:id', examController.updatePaymentStatus);

router.get('/getExamsByPaymentStatus/:paymentStatus', examController.getExamsByPaymentStatus);

router.get('/:studentId/exams', examController.getStudentExams);

router.get('/suggested', examController.getSuggestedExams);

router.post('/buy', examController.buyExam);

// routes needed for taking exam


// Route to fetch exam details by ID
router.get('/:examId', examController.getExamById);

// Route to fetch questions for a specific exam
router.get('/:examId/questions', examController.getQuestionsForExam);



module.exports = router;
