const mongoose = require('mongoose');
const Review = require('./review');
const User = require('./user');

const productSchema = new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : true
    },
    img: {
        type: String,
        trim: true,
        default: './images/product.png'
    },
    price: {
        type: Number,
        min: 0,
        default: 0
    },
    desc: {
        type: String,
        trim: true,
        default: 'No description available'
    },
    avgRating:{
        type: Number,
        default: 0
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]
})


// mongoose middleware to delete reviews assosciated with any object --- post middleware used as information of product is returned after being deleted

productSchema.post('findOneAndDelete',async function(product) {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } });
    }
});



const Product = mongoose.model('Product',productSchema);

module.exports = Product;