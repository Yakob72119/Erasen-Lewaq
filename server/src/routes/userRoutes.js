const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/getUsers', userController.getUsers);

router.post('/registerAdmin', userController.registerAdmin);

router.delete('/:userId', userController.deleteUser);

router.put('/updatePassword', userController.updatePassword);

module.exports = router;