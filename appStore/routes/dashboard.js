const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/user.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

router.get('/user', passport.authenticate('jwt', {session: false}), async(req,res, next) => {
    
    await User.find({}, (err, users) => {
        if(users.length === 0) {
            res.status(200).json({success: false, msg:'Good request, but don`t have data to show'});
        } else if(err) {
            res.status(404).json({success: false, msg: err});
        } else {
            res.status(200).json({success: true, user: users, msg: 'Get all users!'});
        }
    })
});

router.get('/api', passport.authenticate('jwt', {session: false}), async(req,res, next) => {
    
    await Product.find({}, (err, products) => {
        if(products.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(products);
        }
    })
});

router.post('/api', passport.authenticate('jwt', {session: false}), async(req,res) => {
    const { name, brand, quantity, price, description, picture, category  } = req.body;
    
        let newProduct = await Product.findOne({name: name}, (err, prdMatch) => {
            if (prdMatch) {
                return res.json({
                    error: "Product already registered!"
                });
            }
        });

        newProduct = new Product({
            name: name,
            brand: brand,
            quantity: quantity,
            price: price,
            picture: picture,
            description: description, 
            category: category,
        });    
            newProduct.save()
            return res.status(200).send(newProduct);

});

router.get('/order', passport.authenticate('jwt', {session: false}), async(req,res) => {
    
    await Order.find({}, (err, orders) => {
        if(orders.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(orders);
        }
    })
});

module.exports = router;