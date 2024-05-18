const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  email: { type: String, required: true },
  userId: { type: String, required: true },
  examDepart: { type: String, required: true },
  examId: { type: String, required: true },
  complainBox: { type: String, required: true }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
