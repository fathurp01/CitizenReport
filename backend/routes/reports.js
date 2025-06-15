const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const {
  createReport,
  getReports,
  getMyReports,
  getReportById,
  updateReport,
  deleteReport,
  updateReportStatus,
  addReportAction,
  upload,
} = require('../controllers/reportController');

const { protect, authorize } = require('../middleware/auth');

// Create report route with validation
router.post('/', protect, authorize('citizen'), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
   
    // Add validation checks after upload
    const validations = [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Valid category is required').isIn([
        'road_damage', 'garbage', 'flood', 'street_light', 'other'
      ]),
      check('address', 'Address is required').not().isEmpty(),
      check('rt', 'RT is required').not().isEmpty(),
      check('rw', 'RW is required').not().isEmpty(),
    ];
   
    // Run validations manually
    Promise.all(validations.map(validation => validation.run(req)))
      .then(() => createReport(req, res))
      .catch(error => {
        console.error('Validation error:', error);
        return res.status(500).json({ message: 'Server error during validation' });
      });
  });
});

// Get all reports route
router.get('/', protect, getReports);

// Get user's reports route
router.get('/my-reports', protect, authorize('citizen'), getMyReports);

// Get report by ID route
router.get('/:id', protect, getReportById);

// Update report route with validation and file upload
router.put('/:id', protect, authorize('citizen'), (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    // Optional validation for update (fields are optional)
    const validations = [
      check('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
      check('description').optional().not().isEmpty().withMessage('Description cannot be empty'),
      check('category').optional().isIn([
        'road_damage', 'garbage', 'flood', 'street_light', 'other'
      ]).withMessage('Invalid category'),
      check('address').optional().not().isEmpty().withMessage('Address cannot be empty'),
      check('rt').optional().not().isEmpty().withMessage('RT cannot be empty'),
      check('rw').optional().not().isEmpty().withMessage('RW cannot be empty'),
    ];
    
    // Run validations manually
    Promise.all(validations.map(validation => validation.run(req)))
      .then(() => updateReport(req, res))
      .catch(error => {
        console.error('Validation error:', error);
        return res.status(500).json({ message: 'Server error during validation' });
      });
  });
});

// Delete report route
router.delete('/:id', protect, authorize('citizen'), deleteReport);

// Update report status route with validation
router.put(
  '/:id/status',
  [
    protect,
    authorize('village_staff', 'admin'),
    check('status', 'Valid status is required').isIn([
      'pending', 'received', 'in_progress', 'completed', 'rejected'
    ]),
    check('actionDescription', 'Action description is required').not().isEmpty(),
  ],
  updateReportStatus  // Added the missing controller function
);

// Add action to report route with validation
router.post(
  '/:id/actions',
  [
    protect,
    authorize('village_staff', 'admin'),
    check('description', 'Description is required').not().isEmpty(),
  ],
  addReportAction
);

module.exports = router;