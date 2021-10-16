const express = require('express');
const router = express.Router();
const passport = require('passport');

const Order = require('../models/order.model');

router.get("/", passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const id = req.body;
    console.log(id);
    // try{
    //     Order.find({userId: id}, (err, order) => {
    //     if(err) {
    //         return next(err);
    //     } else if(!order) {
    //         return res.status(500).send('order não encontrado');
    //     } else {
    //         return res.status(200).json({success: true, order: order });
    //     }
    // })} catch(err) {
    //     return res.status(400).json(err);
    // }
});

module.exports = router;
