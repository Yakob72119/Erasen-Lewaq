const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

router.post('/postComplaint', complaintController.createComplaint);

router.get('/getAllComplaints', complaintController.getAllComplaints);

module.exports = router;