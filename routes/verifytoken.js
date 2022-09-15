const { request } = require('express');
const jwt = require('jsonwebtoken');


const verifytoken = (req,res,next)=>{

    const authHeader = req.headers.token;


    if (authHeader){
        const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.jwt_sec, (err,user)=>{
                    if (err)res.sendStatus(403).json("token is not valid")
                    
                    req.user = user;
                    next();
            })
            
    }
    else {
        return res.sendStatus(401).json("you are not authenticated")
    }

}

const verifytokenauth = (req,res,next) =>{
    verifytoken(req,res, ()=>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}

const verifytokenauthadmin = (req,res,next) =>{
    verifytoken(req,res, ()=>{
        if (req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("you are not allowed to do that")
        }
    })
}


module.exports = {verifytoken,verifytokenauth,verifytokenauthadmin}