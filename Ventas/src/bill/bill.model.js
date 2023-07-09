'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({    
    numero: {
        type: Number
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    },
     products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
     }
})

module.exports = mongoose.model('Bill', billSchema);