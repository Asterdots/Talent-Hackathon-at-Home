const Sequelize = require('sequelize');
const {v4: uuid} = require('uuid');
const db = require('../config/db.js');
//Modificar a config/alfonsoDB
const Users = require('./Users');

const Products = db.define('Products', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: uuid()
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Debes agregar un nombre al producto'}
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Debes agregar una descripción del producto'}
    }
  },
  price: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Debes agregar un precio al producto'}
    }
  }
});

Products.belongsTo(Users);

module.exports = Products;