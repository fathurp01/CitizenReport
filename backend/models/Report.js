const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Report = sequelize.define('Report', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('road_damage', 'garbage', 'flood', 'street_light', 'other'),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rw: {
    type: DataTypes.STRING,
    allowNull: false
  },
  images: {
    type: DataTypes.TEXT,
    get() {
      const rawValue = this.getDataValue('images');
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue('images', JSON.stringify(value));
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'received', 'in_progress', 'completed', 'rejected'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

// Define relationships
Report.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Report;