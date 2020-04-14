const express = require('express');
const router = express.Router();
const appControllers = require('../controllers/appControllers');
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');
const productControllers = require('../controllers/productControllers');

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
  router.post('/edit-profile/:userID',
    authControllers.isAuthenticated,
    userControllers.uploadProfileImage,
    userControllers.editProfile
  );
  // show profile
  router.get('/show-profile/:userID',
    authControllers.isAuthenticated,
    userControllers.showProfile
  );

  // products
  router.get('/products-panel',
  authControllers.isAuthenticated,
    productControllers.productsPanel
  );

  // demo routes
  router.get('/show-store/:storeID', 
    appControllers.showStore
  ); 
  // send order
  router.post('/show-store/:storeID',
  authControllers.isAuthenticated,

    userControllers.orderToStore,
  );

  router.get('/store-orders-list',
  authControllers.isAuthenticated,

    appControllers.showStoreOrdersList
  );

  router.get('/dealers-orders-list',
  authControllers.isAuthenticated,

    appControllers.showDealersOrdersList
  );

  // edit store
  router.get('/edit-store/:storeID',
  authControllers.isAuthenticated,

    userControllers.showEditStore
  );
  router.post('/edit-store/:storeID',
  authControllers.isAuthenticated,

    userControllers.uploadProfileImage,
    userControllers.editStore
  );

  // orders
  router.get('/orders/:storeID',
    userControllers.showOrders
  );

  return router;
};