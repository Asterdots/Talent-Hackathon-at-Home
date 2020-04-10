const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config({path: 'variables.env'});
const routes = require('./routes/routes');

// Create the express app
const app = express();

// bodyparser config to read the data from the forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes config
app.use('/', routes());

// app listening
app.listen(process.env.PORT);