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
}
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
