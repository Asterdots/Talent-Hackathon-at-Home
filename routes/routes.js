const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');
const userControllers = require('../controllers/userControllers');

module.exports = () => {
  // Users controllers
  router.get('/create-account', userControllers.showCreateAccount);
  router.post('/create-account', userControllers.createAccount);
  router.get('/log-in', userControllers.showLogIn);

  return router;
};