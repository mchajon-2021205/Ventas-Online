'use strict'

const express = require('express');
const api = express.Router();
const categoryController = require('./category.controller');

//
api.get('/test', categoryController.test);
api.post('/add', categoryController.addCategory);
api.get('/get', categoryController.getCategories);
api.get('/get/:id', categoryController.getCategory);
api.put('/update/:id', categoryController.updateCategory);
api.delete('/delete/:id', categoryController.deleteCategory);

module.exports = api;