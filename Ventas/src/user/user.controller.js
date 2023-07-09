'use strict'

const User = require('./user.model');
const Product = require('../product/product.model')
const { validateDate, encrypt, checkPassword } = require('../utils/validate');
const { crearToken } = require('../services/jwt');



//Funcion test
exports.test = async(req, res)=>{
    return res.send({message: 'Test is running'})
}


//User admin por defecto
exports.defaultAdmin = async(req, res)=>{
    try{
        
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error'})
    }
}


//Funcion registrar usuario
 exports.registerUser = async(req, res)=>{
    try{
        //Obtener datos 
        let data = req.body;
        //verificar que venga la password
        let params = {
            password: data.password,
        }
        let validate = validateDate(params)
        if(validate) return res.status(400).send({validate});
        if(data.role) return res.send({message: 'No puedes agregar rol'})
        //encriptar password
        data.password = await encrypt(data.password)
        //Rol por defecto
        data.role = 'CLIENT'
        //Guardar los datos
        let user = new User(data);
        await user.save();
        return res.send({message: 'Account create sucessfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Register not found', error: e.message});
    }
} 



exports.registerAdmin = async(req, res)=>{
    try{
        //Obtener datos
        let data = req.body;
        //Datos obligatorios
        let params = {
            password: data.password
        }
        let validate = validateDate(params);
        if(validate) return res.status(400).send({validate});
        //Encriptar password
        data.password = await encrypt(data.password);
        //Guaradar
        let user = await User(data);
        await user.save();
        return res.send({message: 'Account created sucessfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error savinf user', error: e.message})
    }
}



//Login
exports.login = async(req, res)=>{
    try{
        //Obtener datos para logearse
        let data = req.body;
        let params = {
            username: data.username,
            password: data.password
        }
        let validate = await validateDate(params);
        if(validate) return res.status(400).send(validate);
        //Verificar que sean los datos correctos existentes en la db
        let user = await User.findOne({username: data.username});

        if(user && await checkPassword(data.password, user.password)){
            let token = await crearToken(user);
            return res.send({message: `User logged sucessfully`, token})
        }
        return res.status(401).send({message: 'Invalid credentials'})
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error, not logged'});
    }
}




//Atualizaz user
exports.updateUser = async(req, res)=>{
    try{
        
        //obetener id actualzar
        let userId = req.params.id;
        let data = req.body;
        let tok = req.user;

        //Validar que no se pueda editar a otro usuario
        if(userId != tok.sub) return res.status(500).send({message: 'No puedes actualizar otro usuario'})
            //Validar si existe el username
            let existUserName = await User.findOne({username: data.username}).lean();
            if(data.password != null) return res.send({message: 'No puedes actualizar la contraseña'})

                if(existUserName){
                    if(existUserName._id == userId) return res.send({message: 'El nombre de usuario ya existe'});
                    //Actualizar los datos
                    
                    
                        let updatedUser = await User.findByIdAndUpdate(
                            {_id: userId},
                            data,
                            {new: true}
                            
                    )
                if(!updatedUser) return res.status(200).send({message: 'User not updated'})
                    return res.send({message: 'User uptaded', updatedUser})
                }


                //Actualizar los datos
                    let updatedUser = await User.findByIdAndUpdate(
                        {_id: userId},
                        data,
                        {new: true}
        )
        if(!updatedUser) return res.status(200).send({message: 'User not updated'})
        return res.send({message: 'User uptaded', updatedUser});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: ''})
    }
}


//Actualiza Password
exports.updatePasswors = async(req, res)=> {
    try{
        //Id a editar
        let userId = req.params.id;
        //Datos a actualizar
        let data = req.body;
        //Validar que exista el usuraio
        let existUser = await User.findOne({_id: userId});
        if(!existUser) return res.status(400).send({message: 'User not found'});
        //Validar que la password exista en la base de datos
        let existPassword = await checkPassword(data.password, existUser.password);
        console.log(existPassword);
          if(!existPassword) return res.status(400).send({message: 'Password not exist'});
        //Obtener el valor de la nueva password
             let password = await encrypt(data.newPassword);
              data.password = password;
             let updatePassword = await User.findOneAndUpdate(
                {_id: userId},
                data,
                {new: true}
            )
             if(!updatePassword) return res.status(400).send({message: 'Update Password failed'});
             return res.send({message: 'Update', updatePassword});
        //Actualizar password


    }catch(e){
        console.error(e);
        return  res.status(500).send({message: 'No esta bien'});
    }
}


//Eliminar
exports.deleteUser = async(req, res)=>{
    try{
        let userId = req.params.id;
        let tok = req.user;
        if(userId != tok.sub) return res.status(500).send({message: 'No puedes modificar otro usuario usuario'})
        let deleteUser = await User.findByIdAndDelete({_id: userId});
        if(!deleteUser) return res.status(404).send({message: 'user no se pudo eliminar'});
        return res.send({message: 'user se elimino'}) 
        
        
    }catch(e){
        console.error(e);
        return  res.status(500).send({message: 'No esta bien'});
    }
}



exports.addCart = async(req, res)=>{
    try{
        //Obtenr el id del producto
        let data = req.body;
        data.user = req.user.sub;

        let existProduct = await Product.findOne({_id: data.product});
        if(!existProduct) return res.status(400).send({message: 'Product not exist'});
           if(existProduct.stock <= 0) return res.send({message: 'Stock vacio'})
            let addProduct = await User.findOneAndUpdate(
                {_id: data.user},
                /* {pu}) */

                /* Hace el push de el producto ingresado*/)
    }catch(e){  
        console.error(e);
        return res.status(500).send({message: 'Error add cart'})
    }
}