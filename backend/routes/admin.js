const express = require('express');
const router = express.Router();
const {
  getUsers,
  updateUser,
  deleteUser,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// Get all users route
router.get('/users', protect, authorize('admin'), getUsers);

// Update user route
router.put('/users/:id', protect, authorize('admin'), updateUser);

// Delete user route
router.delete('/users/:id', protect, authorize('admin'), deleteUser);

// Get dashboard stats
router.get('/stats', protect, authorize('admin'), getDashboardStats);

module.exports = router;