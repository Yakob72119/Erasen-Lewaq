const mongoose = require('mongoose');

const educatorSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  collage: String,
  residence:String,
  bank: String,
  bankAcc: Number,
  password: String,
  gender: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
});

const Educator = mongoose.model('Educator', educatorSchema);

module.exports = Educator;
