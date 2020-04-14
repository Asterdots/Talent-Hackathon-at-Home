const Sequelize = require('sequelize');

module.exports = new Sequelize('encartgo', 'postgres', 'GaZavG98', {
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