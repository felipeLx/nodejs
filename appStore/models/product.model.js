const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const findOrCreate = require("mongoose-findorcreate");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    brand: {type: String, require: true},
    category: {type: String, require: true},
    picture: {type: String, require: true},
    price: {type: Number, require: true},
    quantity: {type: Number, require: true},
    rating: {type: Number, require: true, default: 5},
    insertTime: {type: Date, required: true, default: Date.now()}
  });

productSchema.plugin(findOrCreate);
// taking off the warnings
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const Product = new mongoose.model("Product", productSchema);
  
module.exports = Product;