const express = require('express')
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const { validateReview,isLoggedIn } = require('../middleware');


router.post('/products/:id/review',isLoggedIn,validateReview,async(req, res) => {

    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        const { rating,comment } = req.body;
        const review = new Review({ rating,comment }); 

        // Average rating logic
        const newRating = ((product.avgRating*product.reviews.length)+parseInt(rating))/(product.reviews.length+1);
        product.avgRating = parseFloat(newRating.toFixed(1));


        product.reviews.push(review);
        await review.save(); 
        await product.save();

        req.flash('success','Review added successfully!');
        res.redirect(`/products/${id}`)
    }
    catch(err){
        res.status(500).render('error',{err:e.message})
    }
})


module.exports = router;