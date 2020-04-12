const Users = require('../models/Users');

exports.showCreateAccount = (req, res) => {
  res.render('create-account');
};

exports.createAccount = async (req, res) => {
  const user = req.body;

  // Express validator to confirm the passwords
  req.checkBody('confirmPass', 'Las contraseñas con coinciden').equals(req.body.password);
  const expressErrorsList = req.validationErrors();
  console.log(user);

  try {
    // Check if there are errors from express-validator
    if (expressErrorsList) throw 'OnlyExpressErrors'
    await Users.create(user); // this one validates using Sequelize

    // if everything is cool we send a message
    req.flash('success', 'Tu cuenta ha sido creada correctamente!');
    res.redirect('/log-in');
  } catch (error) {
    let sequelizeErrors;
    if (error === 'OnlyExpressErrors') sequelizeErrors = [];
    else sequelizeErrors = error.errors.map((err) => err.message);

    let expressErrors = [];
    if (expressErrorsList) expressErrors = expressErrorsList.map((err) => err.msg);

    const errors = [...expressErrors, ...sequelizeErrors];

    req.flash('errors', errors);
    res.redirect('/create-account');
  }
};

exports.showLogIn = (req, res) => {
  res.render('log-in');
};

exports.showEditProfile = async (req, res, next) => {
  if (req.user.id === req.params.userID) {
    const userDB = await Users.findOne({where: {id: req.user.id}});
    res.render('edit-profile', {
      userDB
    });
    return next();
  }
};