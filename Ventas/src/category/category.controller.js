'use strcit'

const Category = require('./category.model');
const Product = require('../product/product.model');

//TESTEO
exports.test = async(req, res)=>{
    return res.send({message: 'Test function'});
}

//Categoria default
exports.defautl = async(req, res)=>{
    try{
        let data = {
            name: 'Default',
            description: 'Categria default'
        }
        let existDefaul = await Category.findOne({name: data.name});
        if(existDefaul) return console.log('La categoria default ya existe');
        let defCategory = new Category(data)
        await defCategory.save();
        console.log('Categoria default creada');
    }catch(e){
        console.error(e);
        return res. send({message: 'Error'})
    }
}


//Agregar categoria
exports.addCategory = async(req, res)=>{
    try{
        //Obtener los datos
        let data = req.body;
        //Verificar si ya existe
        let existCategory = await Category.findOne({name: data.name});
        if(existCategory) return res.send({message: `Cateogry ${data.name} ya existe`});
        //Guardar los datos
        let category = new Category(data);
        await category.save();
        return res.status(500).send({message: 'Category Created'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error saving category'})
    }
}


//Obtener las categorias
exports.getCategories = async(req, res)=>{
    try{
        //Buscar los datos
        let categories = await Category.find()//BUscar todas las cateogiras
        return res.send({message: 'Cateogrias', categories});
  
        //Mostrar los datos
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error obteniendo las categorias'});
    }
}



//Obtener una sola cateogia
exports.getCategory = async(req, res)=>{
    try{
        //Obtener el id de la categoria a buscar
        let categoryId = req.params.id;
        //Verificar si existe la categoria
        let existCategory = await Category.findOne({_id: categoryId});
        if(!existCategory) return res.status(404).send({message: 'La categoria no funciona'});

        console.log(existCategory);
        let sendProduct = await Product.find({category: existCategory});
        
        console.log(sendProduct);
        //Mostrar los datos
        return res.send({message: 'La categoria', existCategory})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error obteniendo la categoria'});
    }
}


//Editar la categoria
exports.updateCategory = async(req, res)=>{
    try{
         //Obtener el id
    let categoryId = req.params.id;
    //Obtener lod daot s del formulario
    let data = req.body;
    //BUscar si existe
    let existCategory = await Category.findOne({name: data.name}).lean();
    if(existCategory) {
      
         //Validar que el id que le llega tenga el mismo nombre del que va a actualizar
      if(existCategory._id != categoryId) return res.send({message: 'La categoria ya esta creada'});
      let updatedCategory = await Category.findByIdAndUpdate(
        {_id: categoryId},
        data,
        {new: true}
      )
      if(!updatedCategory) return res.status(404).send({message: 'Category not found and not updated'});
      return res.send({message: 'Category updated', updatedCategory})
      
      
    }
    
    
    //actualizar categoria
    let updatedCategory = await Category.findByIdAndUpdate(
      {_id: categoryId},
      data,
      {new: true}
    )
    if(!updatedCategory) return res.status(404).send({message: 'Category not found and not updated'});
    return res.send({message: 'Category updated', updatedCategory})

    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error editando la categoria'});
    }
}



//Eliminar categoria
exports.deleteCategory = async(req, res)=>{
    try{
        //Obtener id
        let categoryId = req.params.id;
        //Verificar que exista
        let defaultCategory = await Category.findOne({name: 'Default'});
        if(defaultCategory._id == categoryId) return res.send({message: 'Default category cannot delete'});
        await Product.updateMany(
            {category: categoryId},
            {category: defaultCategory._id}
        )
        let existCategory = await Category.findOneAndDelete({_id: categoryId});
        if(!existCategory) return res.status(404).send({message: 'La categorria no existe'});
        return res.send({message: 'La categoria se elimino'})

    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error eliminando categoria'})
    

    }
}