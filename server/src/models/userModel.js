const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  fname: String,
  password: String,
  role: String,
  department: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
