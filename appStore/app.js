require("dotenv").config();
const express = require('express');
const router = require('express').Router();
const path = require('path');
const cors = require('cors');
const passport = require("passport");

const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require('./config/database');

// Models
require('./models/user.model');
require('./models/order.model');
require('./models/product.model');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Allows application to make HTTP requests to Express application
app.use(cors());

// build folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('client/build')); 
  
//Routes
app.use('/api', require('./routes/products'));
app.use('/users', require('./routes/users'));
app.use('/orders', require('./routes/orders'));
app.use('/checkout', require('./routes/checkout'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(PORT, console.log(`Server start on port: ${PORT}`)); 