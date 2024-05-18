const Complaint = require('./../models/complaintModel');

const createComplaint = async (req, res) => {
    try {
      const { email, userId, examDepart, examId, complainBox } = req.body;
      const complaint = new Complaint({
        email,
        userId,
        examDepart,
        examId,
        complainBox
      });
      await complaint.save();
      res.status(201).json({ message: 'Complaint submitted successfully' });
    } catch (error) {
      console.error('Error submitting complaint:', error);
      res.status(500).json({ error: 'An error occurred while submitting the complaint' });
    }
  };


 const  getAllComplaints = async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.status(200).json(complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'An error occurred while fetching complaints' });
    }
  };
  module.exports={
    createComplaint,
    getAllComplaints
  }