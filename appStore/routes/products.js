const express = require('express');
const router = express.Router();
const passport = require('passport');
const Product = require('../models/product.model');
const { response } = require('express');

router.get("/", (req,res, next) => {
    
    try {
        const products = Product.find({}, (err, products) => {
        if(products.length === 0) {
            return res.status(301).json({success: false, msg: 'Good request, but don`t have data to show'});
        } else if(err) {
            return res.status(403).json({success: false, msg: 'Not possible to access your data in the database, verify the request! ' + err});
        } else {
            return res.status(200).json({success: true, product: products, msg: 'List of products'});
        }
    })} catch(err) {
        return next(err);
    }
});

router.post("/", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    const { name, brand, quantity, price, description, picture, category  } = req.body;
    
        let newProduct = Product.findOne({name: name}, (err, prdMatch) => {
            if (prdMatch) {
                return res.json({
                    error: "Product already registered!"
                });
            }
        })
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
            return res.status(200).json({success: true, product: newProduct, msg: 'New product created'});

});

router.get("/:id", passport.authenticate('jwt', {session: false}), (req,res, next) => {
    try {
        Product.findById(req.params.id, (err, product) => {
            if(err) {
            return next(err);
            } else if(!product) {
                res.status(400).json({success: false, msg:'Not possible to access your data in the database, verify the request! '});
        } else {
            return res.status(200).json({success: true, product: product, msg: 'Get the product by Id'});
        }
    })} catch(err) {
        return next(err);
    }
});

router.put('/:id', passport.authenticate('jwt', {session: false}), (req,res, next) => {

    try {
        Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        if(err) {
            return res.status(301).json({success: false, msg: 'Product not found in Database'});
        } else if(!product) {
            return res.status(403).json({success: false, msg: 'Producto não encontrado'});
        }else {
            product.save()
                    .then(prod => {
                        return res.status(200).json({success: true, product: prod, msg: 'Product updated!'});
                    })
                    .catch(err => {
                        next(err);
                    }) 
    }}) } catch(err) {
        return res.json('Not possible to access the database ' + err);
    }
});

router.delete('/:id', passport.authenticate('jwt', {session: false}),  (req,res) => {
   
    try {
        Product.findByIdAndRemove(req.params.id, req.body, (err, product) => {
        if(err) {
            return res.status(301).json({success: false, msg: 'Product not found in Database'});
        } else {
            return res.status(200).json({success: true, product: product, msg: 'Product deleted'});
        }
    })} catch(err)  {
        return res.json('Not possible to access the database ' + err);
    }
});

router.post('/photo', passport.authenticate('jwt', {session: false}), (req,res) => {
    console.log('photo upload');
    
    var newItem = new Item();
    newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
    newItem.img.contentType = 'image/png';
    newItem.save();
   });

module.exports = router;