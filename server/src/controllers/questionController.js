const ExamQuestion = require('./../models/questionModel');
const Exam = require('./../models/examModel');

const addQuestions = async (req, res) => {
    try {
        const questions = req.body; // Access the array of questions directly from req.body

        // Iterate over each question object in the array
        const savedQuestions = await Promise.all(questions.map(async (question) => {
            // Extract the necessary fields from the question object
            const { id, answer, question: text, choiceA, choiceB, choiceC, choiceD } = question;

            // Create a new ExamQuestion document using the extracted fields
            const savedQuestion = await ExamQuestion.create({
                examId: id, 
                answer: answer,
                question: text, // Use 'text' to avoid conflict with reserved keyword 'question'
                choiceA: choiceA,
                choiceB: choiceB,
                choiceC: choiceC,
                choiceD: choiceD,
            });

            return savedQuestion; // Return the saved question
        }));

        for (const question of questions) {
            const examId = question.id; // Get the examId from the question
            await Exam.findByIdAndUpdate(examId, { status: "Accepted" });
        }

        res.status(201).json({ message: 'Exam questions saved successfully', data: savedQuestions });
    } catch (error) {
        console.error('Error saving exam questions:', error);
        res.status(500).json({ error: 'An error occurred while saving exam questions' });
    }
};

module.exports = { addQuestions };
