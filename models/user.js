// /models/user.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming db.js handles your DB connection

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
