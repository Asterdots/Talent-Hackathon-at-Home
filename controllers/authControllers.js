const passport = require('passport');

exports.authUser = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
  failureFlash: true,
  badRequestMessage: 'Debes de llenar ambos campos para continuar'
});

exports.isAuthenticated = (req, res, next) => {
  // If the user is authenticated let's  get in
  if (req.isAuthenticated()) {
    return next(); // next middleware
  }

  // if it is not authenticated
  res.redirect('/log-in');
};