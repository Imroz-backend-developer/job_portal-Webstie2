const express=require('express');
const router=express.Router();
const { isAuthenticate, isadmin } = require('../middelware/auth');
const { createJobs, Singlejob, Updatejob, showJobs, deleteJob } = require('../controller/Jobscontroller');


//Jobs router
//Job create
router.post('/jobs/create',isAuthenticate,isadmin,createJobs);
//Job find 
router.get('/jobs/:id',isAuthenticate,Singlejob);
//Show jobs
router.get('/jobs',showJobs);
// /api/job/delete/job_id
router.delete('/job/delete/:job_id', isAuthenticate, isadmin, deleteJob);
//Update job by id
router.put('/jobs/:job_id',isAuthenticate,isadmin,Updatejob);


module.exports=router