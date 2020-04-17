const Sequelize = require('sequelize');
const {v4: uuid} = require('uuid');
const db = require('../config/db.js');
const Users = require('./Users');

const Orders = db.define('Orders', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: uuid()
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Debes agregar una descripción para enviar tu pedido'}
    }
  },
  client: Sequelize.STRING
});

Orders.belongsTo(Users);

module.exports = Orders;