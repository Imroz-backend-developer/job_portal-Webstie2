const jobtype=require('../models/JobtypeModel');
const ErrorResponse=require('../utilits/errorResponse');

exports.createJobtype=async(req,res,next)=>{
    try {
        const jobt=await jobtype.create({
            JobTypeName:req.body.JobTypeName,
            user:req.user.id
        });
        res.status(201).json({
            success:true,
            jobt
        })
    } catch (error) {
        next(error)
    }
};
exports.allJobtype=async(req,res,next)=>{
    try {
        const jobt=await jobtype.find();
        res.status(201).json({
            success:true,
            jobt
        })
    } catch (error) {
        next(error)
    }
};

//update jobtype
exports.UpdateJobtype=async(req,res,next)=>{
    try {
        const jobt=await jobtype.findByIdAndUpdate(req.params.type_id,req.body,{new:true});
        res.status(201).json({
            success:true,
            jobt
        })
    } catch (error) {
        next(error)
    }
};
//Delete jobtype
exports.DeleteJobtype=async(req,res,next)=>{
    try {
        const jobt=await jobtype.findByIdAndRemove(req.params.delete_id);
        res.status(201).json({
            success:true,
            message:'Job type deleted'
        })
    } catch (error) {
        next(new ErrorResponse('server error',500))
    }
};