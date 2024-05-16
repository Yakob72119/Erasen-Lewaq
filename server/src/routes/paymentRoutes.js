const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post("/transfer", paymentController.initiateTransfer);

router.post("/buycoin", paymentController.buyCoins);

router.get('/verify-payment/:TEXT_REF', paymentController.verifyPayment);

router.get('/:studentId/balance', paymentController.getStudentBalance);

module.exports = router;