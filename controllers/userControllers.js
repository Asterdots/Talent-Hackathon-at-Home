const multer = require('multer');
const fs = require('fs');
const multerConfig = require('../config/multer');
const Users = require('../models/Users');

// upload image implementation
const upload = multer(multerConfig).single('image'); // name in the form
exports.uploadProfileImage = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      if (error instanceof multer.MulterError) { // multers errors
        if (error.code === 'LIMIT_FILE_SIZE') {
          req.flash('errors', 'La imagen debe de tener un tamaña menor a un megabyte');
          res.redirect('back');
        } else {
          req.flash('errors', error.message);
        }
      } else if (error.hasOwnProperty('message')) { // errors of config/multer 
        req.flash('errors', error.message);
      }
      res.redirect('back');
    } else {
      return next(); // pass to the next middleware
    }
  });
};

exports.showCreateAccount = (req, res) => {
  res.render('create-account');
};

exports.createAccount = async (req, res) => {
  const user = req.body;

  // Express validator to confirm the passwords
  req.checkBody('confirmPass', 'Las contraseñas con coinciden').equals(req.body.password);
  const expressErrorsList = req.validationErrors();

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

exports.editProfile = async (req, res, next) => {
  const {name, lastName, bussiness, address} = req.body;
  const user = await Users.findOne({where: {id: req.user.id}});
  user.name = name;
  user.lastName = lastName;
  user.bussiness = bussiness;
  user.address = address;

  // if there is a previous image we have to delete it
  if (user.image && req.file) {
    const prevImagePath = `${__dirname}/../public/uploads/profiles/${user.image}`;
    fs.unlink(prevImagePath, err => {console.log(err);})
  }
  if (req.file) user.image = req.file.filename;  

  try {
    await user.save();
    req.flash('success', 'Información Actualizada correctamente');
    res.redirect('/');
  } catch (error) {
    const errors = error.errors.map(err => err.message);
    req.flash('errors', errors);
    res.redirect('/');
  }
};

exports.showProfile = async (req, res) => {
  const userDB = await Users.findOne({where: {id: req.params.userID}});

  res.render('show-profile', {
    userDB
  });
};