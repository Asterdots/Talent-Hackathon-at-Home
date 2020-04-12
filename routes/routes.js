const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');

module.exports = () => {
  // Users controllers
  router.get('/create-account', userControllers.showCreateAccount);
  router.post('/create-account', userControllers.createAccount);
  router.get('/log-in', userControllers.showLogIn);
  router.post('/log-in', authControllers.authUser);

  // app views
  router.get('/',
    authControllers.isAuthenticated,
    appControllers.home
  );

  // edit profile
  router.get('/edit-profile/:userID',
    authControllers.isAuthenticated,
    userControllers.showEditProfile
  );

  return router;
};