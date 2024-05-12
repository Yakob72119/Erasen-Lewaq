const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post("/transfer", paymentController.initiateTransfer);

router.post("/transfer/verify", paymentController.verifyTransfer);


module.exports = router;