'use strict'

const jwt = require('jsonwebtoken');

exports.crearToken = async(user)=>{
    try{
        let payload ={
            sub: user._id,
            name: user.name,
            surname: user.surname,
            username: user.username,
            password: user.password,
            phone: user.phone,
            gmail: user.gmail,
            role: user.role,
            iat: Math.floor(Date.now() / 1000),
            axp: Math.floor(Date.now() / 1000) + (60 * 120)
        }
        return jwt.sign(payload, `${process.env.LLAVE_SECRETA}`)
    }catch(e){
        console.error(e);
        return e;
    }
}