const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
    educatorId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
      },
    fullName: String,
    eduStatus: String,
    experience: Number,
    department: String,
    gLink: String,
    submissionDate: { type: Date, default: Date.now },
    status: String
});

const Cv = mongoose.model('Cv', cvSchema);

module.exports = Cv;