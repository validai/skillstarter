// ./models/user.js

const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/db'); // Ensure this points to your DB connection

// Define the User model
const User = sequelize.define(
  "Users", 
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY, // Stores date without time (YYYY-MM-DD)
      allowNull: true,
    },
    residence: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    selectedSkills: {
      type: DataTypes.JSON, // Allows storing of JSON data
      allowNull: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
    tableName: 'Users', // Ensure the table name is exactly "Users"
  }
);

// Sync the model with the database (development only)
(async () => {
  try {
    await sequelize.sync({ alter: true }); // Safely update the schema in development
    console.log("User table synced successfully!");
  } catch (error) {
    console.error("Error syncing User table:", error.message);
  }
})();

// Export the model for use in other parts of the application
module.exports = User;
