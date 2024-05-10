const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    educatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Exam', examSchema);
