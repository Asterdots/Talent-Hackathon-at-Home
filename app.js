const express = require('express');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config({path: 'variables.env'});
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');

// DB config
const db = require('./config/db');
require('./models/Users');
db.sync()
  .then(() => console.log('DB conected'))
  .catch((err) => console.log(err));

// Create the express app
const app = express();

// bodyparser config to read the data from the forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// express validator config 
app.use(expressValidator());

// ejs config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// static files
app.use(express.static('public'));

// Flash needs session, we create the sessions with their signs
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false
}));

// flash config
app.use(flash());

// own middlewares
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});
// routes config
app.use('/', routes());

// app listening
app.listen(process.env.PORT);