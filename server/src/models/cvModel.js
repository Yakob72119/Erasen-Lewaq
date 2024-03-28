const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  fullName: String,
  education_status: String,
  experience: String,
  department:String,
  link: String
});

const Cv = mongoose.model('Cv', cvSchema);

module.exports = Cv;