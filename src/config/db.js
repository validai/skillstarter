const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Use DATABASE_URL if available
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: process.env.DATABASE_USE_SSL === 'true' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    } : {},
  });
} else {
  // Fall back to individual DB_* variables
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT || 'postgres',
    }
  );
}

module.exports = sequelize;
