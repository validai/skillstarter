const { Sequelize } = require('sequelize'); // Import Sequelize
require('dotenv').config(); // Load environment variables from .env file

// Check if the DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the environment variables.');
  process.exit(1); // Exit the process if no DATABASE_URL is provided
}

// Initialize Sequelize with connection options
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Specify the database dialect
  protocol: 'postgres', // Specify the protocol
  dialectOptions: {
    ssl: {
      require: true, // Enforce SSL for secure connections
      rejectUnauthorized: false, // Allow self-signed certificates (Render-specific)
    },
  },
});

// Function to authenticate and test the database connection
const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate(); // Authenticate the Sequelize instance
    console.log('Database connection successful'); // Log success
  } catch (err) {
    console.error('Error connecting to the database:', err.message); // Log error
    process.exit(1); // Exit the process if the connection fails
  }
};

// Test the connection
testDatabaseConnection();

// Alias `sequelize` to `db` for clarity
const db = sequelize;

// Export the configured Sequelize instance (as `db`)
module.exports = db;
