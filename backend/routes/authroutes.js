const express=require('express');
const router=express.Router();
const { singup, signin, logout, userprofile } = require('../controller/authcontroller');
const { isAuthenticate } = require('../middelware/auth');

//Singup
router.post('/Singup',singup);
//singIn
router.post('/Singin',signin);
//Logout
router.get('/Logout',logout);
//Me
router.get('/me',isAuthenticate ,userprofile);

module.exports=router