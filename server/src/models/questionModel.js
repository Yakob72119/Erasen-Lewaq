const mongoose = require('mongoose');

const examQuestionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    answer: String,
    question: String,
    choiceA: String,
    choiceB: String,
    choiceC: String,
    choiceD: String,
});

const ExamQuestion = mongoose.model('ExamQuestion', examQuestionSchema);

module.exports = ExamQuestion;
