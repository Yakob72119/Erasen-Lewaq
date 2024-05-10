const Exam = require('./../models/examModel');


const addExam = async (req, res) => {
    const { time, link, educatorId, department } = req.body;

    try {
        const newExam = new Exam({
            time: time,
            link: link,
            educatorId: educatorId,
            status: "Pending",
            department: department,
            payment_status:"Not payed"
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

const declineExam = async (req, res) => {
    const { id } = req.params;
    try {
        const exam = await Exam.findByIdAndUpdate(id, { status: 'Declined' }, { new: true });
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam status updated to Declined', exam });
    } catch (error) {
        console.error('Error declining exam:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { payment_status } = req.body;
        
        // Update payment status
        const updatedExam = await Exam.findByIdAndUpdate(id, { payment_status }, { new: true });
        
        if (!updatedExam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        
        res.json(updatedExam);
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getExamsByPaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.params;
        const exams = await Exam.find({ payment_status: paymentStatus });
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams by payment status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
module.exports={
    addExam,
    getExamsByEducatorId,
    deleteExam,
    getExamsByEducatorIdAndStatus,
    getAllExams,
    declineExam,
    updatePaymentStatus,
    getExamsByPaymentStatus
}