const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, getCurrentUser, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload'); // Perbaikan: hapus destructuring

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

// Update profile route
router.put('/profile', protect, upload.single('profilePicture'), [
  check('name').optional().not().isEmpty().withMessage('Name cannot be empty'),
  check('email').optional().isEmail().withMessage('Please include a valid email'),
  check('phone').optional().not().isEmpty().withMessage('Phone cannot be empty'),
  check('address').optional().not().isEmpty().withMessage('Address cannot be empty')
], updateProfile);

module.exports = router;