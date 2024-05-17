const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/register', studentController.register); 


router.get('/profile/:id', studentController.getStudentProfile);
router.put('/profile/:id', studentController.updateStudentProfile);

module.exports = router;

