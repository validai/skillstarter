const { Sequelize } = require('sequelize');
require('dotenv').config(); // Ensure .env variables are loaded

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres', // Postgres dialect
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Enable SSL for secure connections
      rejectUnauthorized: false, // Important for managed databases (like Render)
    },
  },
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });

module.exports = sequelize; // Export sequelize instance for use in models and other parts of the app
