// models/ExamResult.js

const mongoose = require('mongoose');

const examResultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  studentAnswer: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  // Add any other fields you need
}, { timestamps: true });

module.exports = mongoose.model('ExamResult', examResultSchema);

