'use strict'

const Product = require('./product.model');
const Category = require('../category/category.model')

exports.test = async(req, res)=>{
    return res.send({message: 'Tes function'})
}


//agregar un producto
exports.addProduct = async(req, res)=>{
    try{
        //Obtener los datos a agregar del formulario
        let data = req.body;
        //Si existe la categoria que lo guarde
        let existCategory = await Category.findOne({_id: data.category});
        if(!existCategory)   return res.status(404).send({message: 'Category not found'})
        //Y si no existe, que devuelva un mensaje de que no existe la categoria
        //Guardar los datos
        let product = new Product(data);
        await product.save(); //Guardar nuestro producto
        return res.send({message: 'Prodcut saved sucessfully', product});
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'Error creating product'})
    }
}


//Obtener varios productos
exports.getProducts = async(req, res)=>{
    try{
        let product = await Product.find().populate('category');
        return res.send({message: 'Products found', product})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting products'});
    }
}

//Obtener 1 solo producto
exports.getProduct = async(req, res)=>{
    try{
        //Buscar por id
        let productId = req.params.id;
        //BUsca el producto en la base de datos
        let product = await Product.findOne({_id: productId}).populate('category');
        //Se comprueba de que exista el producto
        if(!product) return res.status(404).send({message: 'Product not found'});
        //Se devuelve el producto si este existe
        return res.send({message: 'Product found', product})
        
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting product'})
    }
}


//Editar producto
exports.updateProduct = async(req, res)=>{
    try{
        //Obtener el id del producto a editar
        let productId = req.params.id;
        //Obtener la data actualizada
        let data = req.body;
        //Verificar que exista la categoria
        let existCategory = await Category.findOne({_id: data.category});
        if(!existCategory) return res.status(404).send({message: 'Category no existe'});
        //Actualizar
        let updatedProduct = await Product.findOneAndUpdate(
            {_id: productId},
            data,
            {new: true}
        )
        if(!updatedProduct) return res.status(202).send({message: 'Producto no foung and updated'})
        return res.send({message:  'Product updated', updatedProduct})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Product not updated'});
    }
}



//Eliminar product
exports.deleteProduct = async(req, res)=>{
    try{
        //Buscar el id de la categoria
        let productId = req.params.id;
        let deleteProduct = await Product.findOneAndDelete({_id: productId});
        if(!deleteProduct) return res.status(404).send({message: 'Product not found'});
        return res.send({message: 'Product delete sucessfully'})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error delete category'});
    }
}