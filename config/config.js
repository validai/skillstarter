require('dotenv').config();  // Load environment variables from .env

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',  // Use DATABASE_URL from .env
    dialect: 'postgres', // Ensure you're using PostgreSQL
  },
  test: {
    use_env_variable: 'DATABASE_URL',  // Use DATABASE_URL for testing environment
    dialect: 'postgres', // PostgreSQL for testing
  },
  production: {
    use_env_variable: 'DATABASE_URL',  // Use DATABASE_URL for production
    dialect: 'postgres', // PostgreSQL for production
  },
};
