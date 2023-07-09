'use strict'

const bcrypt = require('bcrypt');


exports.validateDate = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if(data[key] !== null &&
           data[key] !== undefined &&
           data[key] !== '')continue;
           msg += `Params ${key} is requiered\n`
    }
    return msg.trim();
}


//Funcion para encriptar la password
exports.encrypt = async(password)=>{
    try{
        return await bcrypt.hash(password, 10)
    }catch(e){
        console.error(e);
        return e;
    }
}


//Veridicar la password
exports.checkPassword = async(password, hash)=>{
    try{
        return await bcrypt.compare(password, hash);
    }catch(e){
        console.error(e);
        return false;
    }
}
