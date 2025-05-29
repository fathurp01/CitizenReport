const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Article = sequelize.define('Article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true // Menyimpan nama file gambar
  },
  status: {
  type: DataTypes.ENUM('pending', 'approved', 'rejected'),
  defaultValue: 'pending'
}
});

module.exports = Article;
