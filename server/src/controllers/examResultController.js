// controllers/examSubmissionController.js

const ExamSubmission = require('./../models/examResultModel');
const Question  = require('./../models/questionModel');
const calculateExamStatus = (resultString) => {
  const result = resultString.split(" ")[1]; // Get the part after "Result"
  const [numerator, denominator] = result.split("/").map(Number);
  const percentage = (numerator / denominator) * 100;
  const status = percentage > 50 ? "Passed" : "Failed";
  return status;
};



const saveExamSubmission = async (req, res) => {
  try {
    const { examId, userId, correctAnswers, examResult, timeUsed, allAnswers } = req.body;

    // Calculate exam status based on examResult
    const examStatus = calculateExamStatus(examResult);

    // Create a new exam submission instance
    const newSubmission = new ExamSubmission({
      examId,
      userId,
      correctAnswers,
      examResult,
      timeUsed,
      allAnswers,
      status: examStatus // Include exam status in the submission
    });

    // Save the exam submission to the database
    await newSubmission.save();

    res.status(201).json({ message: 'Exam submission saved successfully' });
  } catch (error) {
    console.error('Error saving exam submission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getExamSubmissionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const examSubmissions = await ExamSubmission.find({ userId }).populate('examId', 'department time');

    // Calculate exam status for each submission
    const examSubmissionsWithStatus = examSubmissions.map(submission => ({
      ...submission.toObject(),
      status: calculateExamStatus(submission.examResult)
    }));

    res.status(200).json(examSubmissionsWithStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam submissions', error: error.message });
  }
};


const getExamSubmissionById = async (req, res) => {
  try {
    const { examId, userId } = req.params;
    const examSubmission = await ExamSubmission.findOne({ examId, userId }).populate('examId', 'department time');

    if (!examSubmission) {
      return res.status(404).json({ message: 'Exam submission not found' });
    }

    res.status(200).json(examSubmission);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam submission', error: error.message });
  }
};


const getQuestionsByExamId = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.find({ examId });

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error: error.message });
  }
};

module.exports = { saveExamSubmission, getExamSubmissionsByUserId, getExamSubmissionById,getQuestionsByExamId };
