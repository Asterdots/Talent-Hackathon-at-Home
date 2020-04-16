const {v4: uuid} = require('uuid');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');
const db = require('../config/alfonsoDB');
//Modificar a config/alfonsoDB

const Users = db.define('Users', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: true,
  },
  name: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Tienes que agregar un nombre'}
    }
  },
  lastName: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {msg: 'Tienes que agregar un apellido'}
    }
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {msg: 'Agrega un correo válido'},
      notEmpty: {msg: 'Tienes que agregar un correo'}
    },
    unique: {
      args: true,
      msg: 'El correo ya está registrado'
    },
  },
  password: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: {msg: 'La contraseña no puede ir vacía'}
    }
  },
  bussiness: Sequelize.STRING,
  address: Sequelize.TEXT,
  description: Sequelize.TEXT,
  image: Sequelize.TEXT,
  tokenPass: Sequelize.STRING,
  tokenDate: Sequelize.DATE
}, {
  hooks: {
    beforeCreate(user) {
      user.id = uuid(),
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10, null));
    }
  }
});

// Compare the password of the form with the one in the DB
Users.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}; 

module.exports = Users;