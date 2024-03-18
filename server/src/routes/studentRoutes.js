const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');


router.post('/register', StudentController.register);

module.exports = router;
