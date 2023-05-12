const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');


router.get('/user/cart', isLoggedIn, async(req,res) => {

    try{
        const user = await User.findById(req.user._id).populate('cart'); //populate is used to inflate the type field -- here in place of objectid through populate we will get actual products.
        const total = user.cart.reduce((sum,val)=>sum+val.price,0);
        res.render('cart/cart',{user,total});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})


router.post('/user/:id/cart', isLoggedIn, async(req,res) => {
    
    try{
        const { id } = req.params;
        const userid = req.user._id;
        const product = await Product.findById(id);
        const user = await User.findById(userid);

        user.cart.push(product);
        
        await user.save();
        
        res.redirect('/user/cart');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }

})






module.exports = router;





