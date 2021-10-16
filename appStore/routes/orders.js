const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order = require('../models/order.model');
const Product = require('../models/product.model');

router.get("/", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    
    Order.find({}, (err, orders) => {
        if(orders.length === 0) {
            res.status(200).send('Good request, but don`t have data to show');
        } else if(err) {
            res.status(404).send(err);
        } else {
            res.status(200).send(orders);
        }
    })
});

router.post("/", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const {_id, rating, insertTime, name, brand, quantity, price, picture, description, category} = req.body.product[0];
    const { userId, qty, total } = req.body;

    try{
        let order = new Order({
            userId,
            products: {
                _id,
                name,
                price,
                qty,
                total,
            }
        });
        order.save();  
        
        Product.findByIdAndUpdate(_id, {quantity: -qty}, {new: true});
    } catch(err) {
        return res.status(400).json(err);
    }
});

router.get("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {

    const id = req.params.id;
    try{
        Order.find({userId: id}, (err, order) => {
        if(err) {
            return next(err);
        } else if(!order) {
            return res.status(500).send('order não encontrado');
        } else {
            return res.status(200).json({success: true, order: order });
        }
    })} catch(err) {
        return res.status(400).json(err);
    }
});

router.put("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const userId = req.params.id;
    
    try{
        req.body.forEach(orderUpdate => {
            Product.findByIdAndUpdate(orderUpdate.products._id, {quantity: -orderUpdate.products.qty}, {new: true});
            Order.findByIdAndUpdate(orderUpdate._id, {
                userId: orderUpdate.userId,
                modifiedOn: orderUpdate.modifiedOn,
                products: {
                    _id: orderUpdate.products._id,
                    name: orderUpdate.products.name,
                    price: orderUpdate.products.price,
                    qty: orderUpdate.products.qty,
                    total: orderUpdate.products.total
                }
            }, (err, order) => {
                if(err) {
                    return res.status(404).send(`Error: ${err}`);
                } else if(!order) {
                    return res.status(404).send('order não encontrado')
                } else {
                        order.save();
                }});
               
        });
    } catch(err) {
        next(err);
    } 
});

router.delete("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const userId = req.params.id;

    try{
        Order.findByIdAndRemove(req.body.id, (err, order) => {
        if(err) {
            return next(err);
        } else {
            Product.findByIdAndUpdate(req.body.productId, {quantity: +req.body.qty}, {new: true});
            return res.status(200).send(`${order._id} : deleted sucessfully!'`);
        }
        });
    } catch(err) {
        return res.status(400).json(err);
    }
});

module.exports = router;