const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const jobsHistorySchema = new mongoose.Schema({

    Title: {
        type: String,
        trim: true,
        maxlength: 70,
    },

    Description: {
        type: String,
        trim: true
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true })

const Userschema=new mongoose.Schema({
    Firstname:{
        type:String,
        trim:true,
        required:[true,'Frist name is required'],
        maxlength:32
    },
    Lastname:{
        type:String,
        trim:true,
        required:[true,'Last name is required'],
        maxlength:32
    },
    Email:{
        type:String,
        trim:true,
        required:[true,'Frist name is required'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password:{
        type:String,
        trim:true,
        required:[true,'Frist name is required'],
        
    },
    jobsHistory: [jobsHistorySchema],

    role:{
        type:Number,
        default:0
    }
},{timestamps:true})


// Password hasing 
Userschema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
});

Userschema.methods.matchPassword=async function(enterdpassword){
    return await bcrypt.compare(enterdpassword,this.password)
};
//token genrate
Userschema.methods.getJwttoken = function() {
    return jwt.sign(
        { id: this._id },  // Payload with user ID
        process.env.jwt_token // Secret key from environment variables
           // Token expiration time
    );
};

const User=mongoose.model('User',Userschema);
module.exports=User;