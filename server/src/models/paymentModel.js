const mongoose = require('mongoose');

const paymentHistorySchema = new mongoose.Schema({
    educatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Educator',
        required: true
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
        required: true
    },
    verificationResponse: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('PaymentHistory', paymentHistorySchema);
