'use strict'

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    v: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie'
    }
});

module.exports = mongoose.model('Product', productSchema);