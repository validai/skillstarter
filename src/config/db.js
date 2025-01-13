// ./src/config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Fetch environment variables with fallback
const password = process.env.DB_PASSWORD || ''; // Default empty string if password is missing
const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;

console.log("DB_DATABASE:", database);
console.log("DB_USERNAME:", username);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? '***' : 'Not Set');  // Mask password
console.log("DB_HOST:", host);
console.log("Type of DB_PASSWORD:", typeof password);

// Check if necessary environment variables are set
if (!database || !username || !password || !host) {
  console.error("Missing required environment variables for DB connection.");
  process.exit(1); // Exit if any required variable is missing
}

// Initialize Sequelize instance with environment variables
const sequelize = new Sequelize(database, username, password, {
  host: host,
  port: 5432,  // Default PostgreSQL port, modify if necessary
  dialect: 'postgres',
  logging: console.log,  // Optional logging to console (for debugging)
});

(async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
    process.exit(1); // Exit if the connection fails
  }
})();

// Export the sequelize instance for usage in other files
module.exports = sequelize;