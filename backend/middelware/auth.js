const ErrorResponse=require('../utilits/errorResponse');
const jwt=require('jsonwebtoken');
const User=require('../models/usermodel');
require('dotenv').config()

//check is user is authenticated
exports.isAuthenticate=async(req,res,next)=>{
    const {token}=req.cookies;


    //make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route',401));
    }
    try {
        //verfiy token 
        const decoded = jwt.verify(token,process.env.jwt_token);
        req.user=await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new ErrorResponse('Not authorization to access this route',401))
    }
};

//middelware for admin

exports.isadmin=(req,res,next)=>{
        if(req.user.role===0){
            return next(new ErrorResponse("Access denied,you must an admin",401))
        }
        next();
};

