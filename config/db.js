const Sequelize = require('sequelize');

// Sequelize('dataBaseName', 'user', 'password', 
module.exports = new Sequelize('encartgo', '', '', {
  host: '127.0.0.1',
  port: '5432',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false // don't show the querys in the console
});