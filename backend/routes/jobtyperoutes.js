const express=require('express');
const router=express.Router();
const { createJobtype, allJobtype, UpdateJobtype } = require('../controller/Jobtypecontroller');
const { isAuthenticate, isadmin } = require('../middelware/auth');


//Job type router
router.post('/type/create',isAuthenticate,createJobtype);
//All job types
router.get('/type/jobs',allJobtype)
//Updatejob types
router.put('/type/update/:type_id',isAuthenticate,isadmin,UpdateJobtype)
//Delete job types
router.delete('/type/delete/:delete_id',isAuthenticate,isadmin,UpdateJobtype)

module.exports=router