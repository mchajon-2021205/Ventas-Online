'use strict'

const express = require('express');
const api = express.Router();
const userController = require('./user.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

api.get('/test', userController.test);

api.post('/registerAdmin',[ensureAuth, isAdmin],userController.registerAdmin);
api.post('/addCart', userController.addCart);


api.post('/register', userController.registerUser);
api.post('/login', userController.login);

module.exports = api;