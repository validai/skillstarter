'use strict';

const express = require('express');  // Importing express
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config/config.json'))[env];
const db = {};
const cloudinary = require('cloudinary').v2;
require('dotenv').config();  // This loads environment variables from the .env file

// Ensure Cloudinary credentials are available
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("Cloudinary credentials are missing in the .env file.");
  process.exit(1);  // Exit the app if credentials are missing
}

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optional: Integrating SendGrid for email functionality
const sgMail = require('@sendgrid/mail');
if (!process.env.SENDGRID_API_KEY) {
  console.error("SendGrid API key is missing in the .env file.");
  process.exit(1);  // Exit the app if SendGrid API key is missing
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Initialize Sequelize instance based on environment variables
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);  // Exit the app if the database connection fails
  });

// Dynamically load models from the current directory
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&  // Skip hidden files
      file !== basename &&        // Skip this file (index.js)
      file.slice(-3) === '.js' &&  // Only include .js files
      file.indexOf('.test.js') === -1 // Exclude test files
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // Add model to db object
  });

// Set up associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach Sequelize instance and Sequelize class to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Express setup
const app = express();  // Initialize the express app

// Middleware to parse JSON requests
app.use(express.json());  // Body parser middleware to handle JSON data

// Define API routes here
const authRoutes = require('./routes/authRoutes');  // Import authentication routes
const userRoutes = require('./routes/userRoutes');  // Import user-related routes

// Use routes
app.use('/auth', authRoutes);  // Authentication routes (e.g., login, register)
app.use('/api', userRoutes);   // User-related routes (e.g., profile)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the db object, cloudinary, and sendgrid to use them in other parts of the app
db.cloudinary = cloudinary;
db.sgMail = sgMail;

module.exports = db;
