const express = require('express');
const router = express.Router();
const educatorController = require('../controllers/educatorController');

router.post('/register', educatorController.register); 

router.get('/profile/:id', educatorController.getEducatoProfile);

// Route for updating educator profile
router.put('/profile/:id', educatorController.updateEducatorProfile);


module.exports = router;

