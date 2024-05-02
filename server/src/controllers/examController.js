const Exam = require('./../models/examModel');


const addExam = async (req, res) => {
    const { time, link, educatorId, department } = req.body;

    try {
        const newExam = new Exam({
            time: time,
            link: link,
            educatorId: educatorId,
            status: "Pending",
            department: department
        });

        await newExam.save();
        res.status(201).json({ success: true, message: 'Exam added successfully' });
    } catch (error) {
        console.error('Error adding exam:', error.message);
        res.status(500).json({ success: false, message: 'Failed to add exam' });
    }
};

const getExamsByEducatorId = async (req, res) => {
    const { educatorId } = req.params;

    try {
        const exams = await Exam.find({ educatorId: educatorId });
        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Failed to fetch exams' });
    }
};

const deleteExam = async (req, res) => {
    const { examId } = req.params;
    try {
      await Exam.findByIdAndDelete(examId);
      res.status(204).end(); // No content response
    } catch (error) {
      console.error('Error deleting exam:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

 const getExamsByEducatorIdAndStatus = async (req, res) => {

   const { educatorId, status } = req.params;

    try {
        // Query exams based on educator ID and status
        const exams = await Exam.find({ educatorId, status });

        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.status(200).json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports={
    addExam,
    getExamsByEducatorId,
    deleteExam,
    getExamsByEducatorIdAndStatus,
    getAllExams
}