'use strict'

const jwt = require('jsonwebtoken');

exports.ensureAuth = async(req, res, next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Dosent contin header "AUTHIRIZATION"'});
    }else{
            try{
                let token = req.headers.authorization.replace(/['"]+/g, '');
                //Decodificacion del token
                var payload = jwt.decode(token, `${process.env.LLAVE_SECRETA}`);
                //No ha expirado el token?
                if(Math.floor(Date.now() / 1000) >= payload.exp){
                    return res.status(401).send({message: 'Expired token'});
                }
            }catch(e){
                console.error(e);
                return res.status(400).send({message: 'invalid token'});
            }
            req.user = payload
            next()
        }

}


exports.isAdmin = async(req, res, next)=>{
    try{
        let user = req.user;
        if(user.role !== 'ADMIN') return res.status(403).send({message: 'Unauthorized user'});//
        next();
    }catch(e){
            console.error(e);
            return res.status(403).send({message: 'Error Unauthorized user'});
        }
       
}