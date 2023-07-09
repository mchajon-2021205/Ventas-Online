'use strict'

const express = require('express');
const api = express.Router();
const productController = require('./product.controller');

api.get('/test', productController.test);
api.post('/add', productController.addProduct);
api.get('/get', productController.getProducts);
api.get('/get/:id', productController.getProduct);
api.put('/update/:id', productController.updateProduct);
api.delete('/delete/:id', productController.deleteProduct);

module.exports = api;