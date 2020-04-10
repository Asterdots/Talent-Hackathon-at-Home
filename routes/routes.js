const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers');

module.exports = () => {
  // Home
  router.get('/', homeControllers.home);

  return router;
};