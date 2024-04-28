const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.post('/addExam', examController.addExam);

router.get('/getExamsByEducatorId/:educatorId', examController.getExamsByEducatorId);

router.delete('/deleteExam/:examId', examController.deleteExam);

router.get('/getExamsByEducatorIdAndStatus/:educatorId/:status', examController.getExamsByEducatorIdAndStatus);


module.exports = router;
