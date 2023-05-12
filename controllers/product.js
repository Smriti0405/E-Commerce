const Product = require('../models/product');

module.exports.showProducts = async(req,res) => {
    
    try{
        const products = await Product.find({});
        res.render('products/index',{ products });
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
};

module.exports.newProduct = async(req,res) => {
    
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
    
};

module.exports.displayProduct = async(req,res) => {

    try{
        const { id } = req.params;
        const item = await Product.findById(id).populate('reviews');
        res.render('products/show',{ item })
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }

};

module.exports.createProduct = async(req,res) => {

    try{
        const { name,img,price,desc } = req.body;
        await Product.create({ name,img,price,desc,author:req.user._id });
        req.flash('success','Successfully added new product!')
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error',{err:e.message})
    }
};

module.exports.editProduct = async(req,res) => {

    const { id } = req.params;
    const item = await Product.findById(id);
    res.render('products/edit',{ item });
};

module.exports.updateProduct = async(req,res) => {
    
    try{
        const { id } = req.params;
        const { name,img,price,desc } = req.body;
        await Product.findByIdAndUpdate(id,{ name,img,price,desc });
        
        req.flash('success','Product details edited successfully!')
        res.redirect(`/products/${id}`);
    }
    catch{
        res.status(500).render('error',{err:e.message})
    }

};

module.exports.deleteProduct = async(req,res) => {

    try{
        const { id } = req.params;
        await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch{
        res.status(500).render('error',{err:e.message})
    }

};