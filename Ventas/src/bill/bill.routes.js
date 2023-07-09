'use strict'

const express = require('express');
const api = express.Router();
const billController = require('./bill.controller');

api.get('/test', billController.test);

module.exports = api;