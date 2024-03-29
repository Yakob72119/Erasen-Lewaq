const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  collage: String,
  residence:String,
  bank: String,
  bankAcc: Number,
  password: String,
  gender: String
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
