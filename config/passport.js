const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const Users = require('../models/Users');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  async (email, password, next) => {
    const user = await Users.findOne({where: {email}});

    // Check if the user exists
    if (!user) return next(null, false, {message: 'El email no existe'});

    // Check if the password is correct
    const passValidation = user.validatePassword(password);

    // If the pass is not correct
    if (!passValidation) return next(null, false, {message: 'Contraseña incorrecta'});

    // It's all right
    return next(null, user);
  }
));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(user, callback) {
  callback(null, user);
});

 module.exports = passport;