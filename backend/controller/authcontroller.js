const User = require('../models/usermodel');
const ErrorResponse=require('../utilits/errorResponse');

exports.singup=async(req,res,next)=>{
    const {Email}=req.body;
    const userExists=await User.findOne({Email});
    if(userExists){
        return next(new ErrorResponse('Email Is already regester',400))
    };
    try {
        const user=await User.create(req.body);
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        next(error)
    }
    
};

exports.signin = async (req, res, next) => {
    const { Email, password } = req.body;

    // Validate email and password
    if (!Email || !password) {
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ Email }).select('+password');

    if (!user) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    // If everything is correct, send the token response
    sendTokenResponse(user, res, next);
};
const sendTokenResponse = async (user, res, next) => {
    const token = await user.getJwttoken();  // Call the method to generate the JWT

    res.status(200).cookie('token',token,{maxAge:60*60*1000,httpOnly:true}).json({
        success: true,
        role:user.role
        
    });
};

//Logout

exports.logout=(req,res,next)=>{
    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:'logged out'
    })
};

//user profile
exports.userprofile=async(req,res,next)=>{
    const user=await User.findById(req.user.id).select('-password')
    res.status(200).json({
        success:true,
        user
    })
};