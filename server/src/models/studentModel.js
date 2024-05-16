const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  department: String,
  collage: String,
  password: String,
  gender: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
balance: {
  type: Number,
  default: 0
},
purchasedExams: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Exam'
}]
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
