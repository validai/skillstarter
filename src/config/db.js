const { Sequelize } = require('sequelize');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined.');
  process.exit(1);
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: process.env.DATABASE_USE_SSL === 'true' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
});

module.exports = sequelize;
