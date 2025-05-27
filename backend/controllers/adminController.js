const { User, Report } = require('../models');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Updating user with ID:', userId);
    
    const { fullName, email, phoneNumber, role, address, rt, rw } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.role = role || user.role;
    user.address = address || user.address;
    user.rt = rt || user.rt;
    user.rw = rw || user.rw;

    await user.save();

    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      address: user.address,
      rt: user.rt,
      rw: user.rw,
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log('Deleting user with ID:', userId);
    
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total users
    const totalUsers = await User.count();

    // Get total reports
    const totalReports = await Report.count();

    // Get completed reports
    const completedReports = await Report.count({
      where: { status: 'completed' }
    });

    // Get pending reports
    const pendingReports = await Report.count({
      where: {
        status: {
          [Op.in]: ['pending', 'received', 'in_progress']
        }
      }
    });

    // Get reports by category
    const reportsByCategory = await Report.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['category']
    });

    // Format reports by category
    const formattedReportsByCategory = {
      road_damage: 0,
      garbage: 0,
      flood: 0,
      street_light: 0,
      other: 0
    };
    
    reportsByCategory.forEach((item) => {
      formattedReportsByCategory[item.category] = parseInt(item.getDataValue('count'));
    });

    // Get recent reports
    const recentReports = await Report.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['fullName']
        }
      ]
    });

    res.json({
      totalUsers,
      totalReports,
      completedReports,
      pendingReports,
      reportsByCategory: formattedReportsByCategory,
      recentReports,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Sisanya tetap sama