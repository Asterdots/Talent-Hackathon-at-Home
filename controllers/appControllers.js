const { Op } = require('sequelize');
const Users = require('../models/Users');

exports.home = async (req, res) => {
  const userDB = await Users.findOne({where: {id: req.user.id}});
  const stores = await Users.findAll({where: {bussiness: {
    [Op.not]: ''
  }}});
  res.render('home', {
    user: userDB,
    stores
  });
};

exports.showStore = async (req, res) => {
  const store = await Users.findOne({where: {id: req.params.storeID}});
  res.render('show-store', {
    store
  });
};

exports.showStoreOrdersList = (req, res) => {
  res.render('store-orders-list');
};

exports.showDealersOrdersList = (req, res) => {
  res.render('dealers-orders-list');
};