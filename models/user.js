// src/models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../src/config/db'); // Adjust based on your actual file structure
const sequelize = require('../src/config/db'); // Ensure this points to your DB connection

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Add other fields as needed
});

module.exports = User;
