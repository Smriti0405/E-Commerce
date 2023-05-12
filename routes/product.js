const express = require('express')
const router = express.Router();
const Product = require('../models/product');
const { validateProduct,isLoggedIn,isSeller, isValidAuthor } = require('../middleware')
const { showProducts,newProduct, displayProduct,createProduct,editProduct,updateProduct,deleteProduct } = require('../controllers/product');

router.get('/products', showProducts)

router.get('/products/new', isSeller, isLoggedIn, newProduct)

router.post('/products', isSeller, isLoggedIn, validateProduct, createProduct);

router.get('/products/:id', displayProduct)

router.get('/products/:id/edit', isValidAuthor, isLoggedIn, editProduct)

router.patch('/products/:id', isValidAuthor, isLoggedIn, validateProduct, updateProduct)

router.delete('/products/:id', isValidAuthor, isLoggedIn, deleteProduct)


module.exports = router;