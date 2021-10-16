const router = require('express').Router();
const Product = require('../models/product.model');


router.get('/', (req, res, next) => {
    try {
        const products = Product.find({}, (err, products) => {
        if(products.length === 0) {
            return res.status(301).json({success: false, msg: 'Good request, but don`t have data to show'});
        } else if(err) {
            res.status(403).json({success: false, msg: 'Not possible to access your data in the database, verify the request! ' + err});
        } else {
            return res.status(200).json({success: true, product: products, msg: 'List of products'});
        }
    })} catch(err) {
        return next(err);
    }
});

module.exports = router;