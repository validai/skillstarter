
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/db'); // Ensure this points to your Sequelize instance

const Profile = sequelize.define('Profile', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
    bio: {
        type: DataTypes.TEXT,
    },
    profileImage: {
        type: DataTypes.STRING, // Store Cloudinary URLs here
    },
});

module.exports = Profile;
