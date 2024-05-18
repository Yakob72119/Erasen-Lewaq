// controllers/examSubmissionController.js

const ExamSubmission = require('./../models/examResultModel');

const saveExamSubmission = async (req, res) => {
  try {
    const { examId, userId, correctAnswers, examResult, timeUsed, allAnswers } = req.body;

    // Create a new exam submission instance
    const newSubmission = new ExamSubmission({
      examId,
      userId,
      correctAnswers,
      examResult,
      timeUsed,
      allAnswers
    });

    // Save the exam submission to the database
    await newSubmission.save();

    res.status(201).json({ message: 'Exam submission saved successfully' });
  } catch (error) {
    console.error('Error saving exam submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports={
  saveExamSubmission
}