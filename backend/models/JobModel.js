const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const Jobschema=new mongoose.Schema({
    Title:{
        type:String,
        trim:true,
        required:[true,'Title is required'],
        maxlength:72
    },
    Description:{
        type:String,
        trim:true,
        required:[true,'Description is required']
    },
    Salary:{
        type:String,
    },
    location:{
        type:String
    },
    available:{
        type:Boolean,
        default:true
    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    Jobtype:{
        type:ObjectId,
        ref:"Jobtype",
        required:true
    }

},{timestamps:true})

const Job=mongoose.model('Job',Jobschema);
module.exports=Job;