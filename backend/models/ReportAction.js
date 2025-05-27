const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Report = require('./Report');

const ReportAction = sequelize.define('ReportAction', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true
});

// Define relationships
ReportAction.belongsTo(Report, { foreignKey: 'reportId' });
ReportAction.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Add association to Report model
Report.hasMany(ReportAction, { foreignKey: 'reportId', as: 'actions' });

module.exports = ReportAction;