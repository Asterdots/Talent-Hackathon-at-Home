exports.home = (req, res) => {
  const userID = req.user.id;
  res.render('home', {
    userID
  });
};

exports.showStore = (req, res) => {
  res.render('show-store');
};

exports.showStoreOrdersList = (req, res) => {
  res.render('store-orders-list');
};