// controllers/examResultController.js

const ExamResult = require('./../models/examResultModel');

const saveExamResult = async (req, res) => {
  try {
    const { examId, studentId, answers } = req.body;

    const results = [];

    // Iterate over answers and save each exam result
    for (const questionId in answers) {
      const studentAnswer = answers[questionId];

      // Retrieve the correct answer for this question (You might have to fetch the question data from your database)
      const correctAnswer = ''; // Fetch correct answer logic

      const isCorrect = studentAnswer === correctAnswer;

      const examResult = await ExamResult.create({
        examId,
        studentId,
        questionId,
        studentAnswer,
        isCorrect
      });

      results.push(examResult);
    }

    res.status(201).json({ success: true, data: results });
  } catch (error) {
    console.error('Error saving exam results:', error);
    res.status(500).json({ success: false, error: 'Error saving exam results' });
  }
};

module.exports={
    saveExamResult
};