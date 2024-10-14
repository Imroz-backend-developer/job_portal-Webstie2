const express=require('express');
const router=express.Router();
const { alluser, singleUser, edituser, Deleteuser, createUserJobsHistory } = require('../controller/usercontroller');
const { isAuthenticate, isadmin } = require('../middelware/auth');

//user routes
//alluser
router.get('/alluser',isAuthenticate ,isadmin,alluser);
//single user
router.get('/User/:id',isAuthenticate ,singleUser);
//Update user
router.put('/user/edit/:id',isAuthenticate ,edituser);
//delete the user
router.delete('/user/delete/:id',isAuthenticate ,isadmin,Deleteuser);
//jobhistory
router.post('/user/jobhistory', isAuthenticate, createUserJobsHistory);

module.exports=router