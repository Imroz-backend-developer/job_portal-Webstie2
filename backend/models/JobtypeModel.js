const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const Jobtypeschema=new mongoose.Schema({
    JobTypeName:{
        type:String,
        trim:true,
        required:[true,'Title is required'],
    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})

const Jobtype=mongoose.model('Jobtype',Jobtypeschema);
module.exports=Jobtype;