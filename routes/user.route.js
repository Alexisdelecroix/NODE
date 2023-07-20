const router = require('express').Router();
const userController = require('../controllers/user.controller');

// register a new user
router.post('/register', userController.createUser);

// Get all users
router.get('/all', userController.getAllUsers)

// Get Email Users
router.get('/email',userController.getEmailUser)

module.exports = router;



