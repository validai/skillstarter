// Load environment variables from the .env file
require('dotenv').config();

// Export the configuration for different environments
module.exports = {
  development: {
    username: process.env.DB_USERNAME,  // Use environment variable for username
    password: process.env.DB_PASSWORD,  // Use environment variable for password
    database: process.env.DB_DATABASE,  // Use environment variable for database name
    host: process.env.DB_HOST,          // Use environment variable for host
    dialect: process.env.DB_DIALECT     // Use environment variable for dialect
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
};
