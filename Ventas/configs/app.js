'use strict'

//Configuracion de express
const express = require('express');
//Solicitudes recibidas por el servidor
const morgan = require('morgan');
//Aplica seguridad basica para el servidor
const helmet = require('helmet');
//Aceptacion de solicitudes desde otro sistema
const cors = require('cors')

//Instacia de express
const app = express();
const port = process.env.PORT || 3000 //puerto que se usara

/* IMPORTACION DE LAS RUTAS */
const categoryRoutes = require('../src/category/category.routes');
const productRoutes = require('../src/product/product.routes');
const userRoutes = require('../src/user/user.routes');
const billController = require('../src/bill/bill.routes');

//Configuracion del servidor http de express
app.use(express.urlencoded({extends:false}));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

/* RUTAS A USAR */
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/bill', billController);

//FUNCION PARA LEVANTAR EL SERVIDOR
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}
