// models/ExamSubmission.js

const mongoose = require('mongoose');

const ExamSubmissionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam', // Reference to the Exam model if you have one
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  correctAnswers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question', // Reference to the Question model if you have one
      required: true
    },
    question: String,
    correctAnswer: String,
    studentAnswer: String,
    isCorrect: Boolean
  }],
  examResult: String,
  timeUsed: Number,
  allAnswers: Object
});

const ExamSubmission = mongoose.model('ExamSubmission', ExamSubmissionSchema);

module.exports = ExamSubmission;
