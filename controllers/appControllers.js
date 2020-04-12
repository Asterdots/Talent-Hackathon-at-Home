exports.home = (req, res) => {
  const userID = req.user.id;
  res.render('home', {
    userID
  });
};