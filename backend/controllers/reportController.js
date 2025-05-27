const { Report, User, ReportAction } = require('../models');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

// Pastikan folder uploads ada
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    );
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Initialize upload
exports.upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter,
}).array('images', 5); // Max 5 images

// @desc    Get report by ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReportById = async (req, res) => {
  try {
    console.log('Getting report with ID:', req.params.id);
    
    const report = await Report.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['fullName']
        },
        {
          model: ReportAction,
          as: 'actions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['fullName']
            }
          ]
        }
      ]
    });

    if (!report) {
      console.log('Report not found');
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user is authorized to view this report
    if (
      req.user.role === 'citizen' &&
      report.userId !== req.user.id
    ) {
      console.log('User not authorized');
      return res.status(403).json({ message: 'Not authorized' });
    }

    console.log('Report found, sending response');
    res.json(report);
  } catch (error) {
    console.error('Get report by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new report
// @route   POST /api/reports
// @access  Private (Citizen)
exports.createReport = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category, address, rt, rw } = req.body;

    // Process uploaded images
    const images = req.files ? req.files.map(
      (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
    ) : [];

    // Create report
    const report = await Report.create({
      title,
      description,
      category,
      address,
      rt,
      rw,
      images,
      userId: req.user.id,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error('Create report error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all reports
// @route   GET /api/reports
// @access  Private (Staff, Admin)
exports.getReports = async (req, res) => {
  try {
    let reports;

    if (req.user.role === 'citizen') {
      // Citizens can only see their own reports
      reports = await Report.findAll({
        where: { userId: req.user.id },
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['fullName']
          }
        ]
      });
    } else {
      // Staff and admin can see all reports
      reports = await Report.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['fullName']
          }
        ]
      });
    }

    res.json(reports);
  } catch (error) {
    console.error('Get reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's reports
// @route   GET /api/reports/my-reports
// @access  Private (Citizen)
exports.getMyReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(reports);
  } catch (error) {
    console.error('Get my reports error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get report by ID
// @route   GET /api/reports/:id
// @access  Private
exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['fullName']
        },
        {
          model: ReportAction,
          as: 'actions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['fullName']
            }
          ]
        }
      ]
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user is authorized to view this report
    if (
      req.user.role === 'citizen' &&
      report.userId !== req.user.id
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(report);
  } catch (error) {
    console.error('Get report by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update report status
// @route   PUT /api/reports/:id/status
// @access  Private (Staff, Admin)
exports.updateReportStatus = async (req, res) => {
  try {
    console.log('Update status request body:', req.body);
    
    const { status, actionDescription } = req.body;

    // Validasi input
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    if (!actionDescription) {
      return res.status(400).json({ message: 'Action description is required' });
    }

    // Validasi status yang valid
    const validStatuses = ['pending', 'received', 'in_progress', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Update status report
    report.status = status;
    await report.save();

    // Tambahkan action ke report
    await ReportAction.create({
      reportId: report.id,
      userId: req.user.id,
      description: actionDescription
    });

    // Ambil report yang sudah diupdate dengan actions
    const updatedReport = await Report.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['fullName']
        },
        {
          model: ReportAction,
          as: 'actions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['fullName']
            }
          ]
        }
      ]
    });

    res.json(updatedReport);
  } catch (error) {
    console.error('Update report status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add action to report
// @route   POST /api/reports/:id/actions
// @access  Private (Staff, Admin)
exports.addReportAction = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description } = req.body;

    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Add action
    await ReportAction.create({
      description,
      reportId: report.id,
      userId: req.user.id
    });

    // Get updated report with actions
    const updatedReport = await Report.findByPk(req.params.id, {
      include: [
        {
          model: ReportAction,
          as: 'actions',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['fullName']
            }
          ]
        }
      ]
    });

    res.json(updatedReport);
  } catch (error) {
    console.error('Add report action error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};