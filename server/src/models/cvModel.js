const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    fullName: String,
    eduStatus: String,
    experience: Number,
    department: String,
    gLink: String,
    submissionDate: { type: Date, default: Date.now }
});

const Cv = mongoose.model('Cv', cvSchema);

module.exports = Cv;