const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post("/pay", paymentController.initiatePaymentAndTransfer);

module.exports = router;