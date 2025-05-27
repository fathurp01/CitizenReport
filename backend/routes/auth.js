const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Register route with validation
router.post(
  '/register',
  [
    check('fullName', 'Full name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    check('address', 'Address is required').not().isEmpty(),
    check('rt', 'RT is required').not().isEmpty(),
    check('rw', 'RW is required').not().isEmpty(),
  ],
  register
);

// Login route with validation
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

// Get current user route
router.get('/me', protect, getCurrentUser);

module.exports = router;