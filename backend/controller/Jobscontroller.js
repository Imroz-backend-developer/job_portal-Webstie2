const Job=require('../models/JobModel');
const Jobtype = require('../models/JobtypeModel');
const jobtype=require('../models/JobtypeModel');
const User = require('../models/usermodel');
const ErrorResponse=require('../utilits/errorResponse');
const mongoose=require('mongoose')

exports.createJobs=async(req,res,next)=>{
    try {
        const job=await Job.create({
            Title:req.body.Title,
            Description:req.body.Description,
            Salary:req.body.Salary,
            location:req.body.location,
            Jobtype:req.body.Jobtype,
            user:req.user.id
        });
        res.status(201).json({
            success:true,
            job
        })
    } catch (error) {
        next(error)
    }
};

//find single job
exports.Singlejob=async(req,res,next)=>{
    try {
        const job=await Job.findById(req.params.id);
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error);
    }
};

//update jobs by id
exports.Updatejob=async(req,res,next)=>{
    try {
        const job=await Job.findByIdAndUpdate(req.params.job_id,req.body,{new:true}).populate('Jobtype','JobTypeName').populate('User','Firstname Lastname');
        res.status(200).json({
            success:true,
            job
        })
    } catch (error) {
        next(error);
    }
};

//delete jobs
exports.deleteJob = async (req, res, next) => {
  try {
      const job = await Job.findByIdAndRemove(req.params.job_id);
      res.status(200).json({
          success: true,
          message: "job deleted."
      })
  } catch (error) {
      next(error);
  }
}

//Show all jobs

exports.showJobs = async (req, res, next) => {

  // Enable Search by keyword
  const keyword = req.query.keyword ? {
    Title: {
      $regex: req.query.keyword,
      $options: 'i'
    }
  } : {};

  // Filter jobs by category id
  let ids = [];
  const jobTypeCategory = await Jobtype.find({}, { _id: 1 });
  jobTypeCategory.forEach(cat => {
    ids.push(cat._id);
  });
  let cat = req.query.cat;
  let categ = cat !== '' && cat ? cat : {$in:ids};

  // Job by location
  let locations = [];
  const jobByLocation = await Job.find({}, { location: 1 });
  jobByLocation.forEach(val => {
    locations.push(val.location);
  });
  let setUniqueLocation = [...new Set(locations)];

  // Use req.query.location for filtering
  let location = req.query.location;
  let locationFilter = location && location !== '' ? location : setUniqueLocation;

  // Enable pagination
  const pageSize = 5;
  const page = Number(req.query.pageNumber) || 1;

  try {
    const count = await Job.find({
      ...keyword,
      Jobtype: categ,
      location: location ? location : { $in: setUniqueLocation } // Use user-provided location or all locations
    }).countDocuments();

    const jobs = await Job.find({
      ...keyword,
      Jobtype: categ,
      location: location ? location : { $in: setUniqueLocation } // Use user-provided location or all locations
    })
      .sort({createdAt:-1})
      .populate('Jobtype','JobTypeName')
      .populate('user','Firstname Lastname')
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.status(200).json({
      success: true,
      jobs,
      page,
      pages: Math.ceil(count / pageSize),
      count,
      setUniqueLocation // Return all available unique locations
    });
  } catch (error) {
    next(error);
  }
};
