const express = require('express');
const { signup, login } = require('../Controllers/AuthControll');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const router = express.Router();

// Signup route
router.post('/signup', signupValidation, signup);

// Login route
router.post('/login', loginValidation, login);

module.exports = router;
