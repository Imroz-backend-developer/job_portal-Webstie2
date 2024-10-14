const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyparser=require('body-parser');
require('dotenv').config();
let cors=require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorhandler=require('./middelware/error')

//import routes
const authroutes=require('./routes/authroutes')
const userroutes=require('./routes/userroutes')
const createJobtype=require('./routes/jobtyperoutes')
const createJobs=require('./routes/Jobsroutes')
const adminRoutes = require('./routes/adminroutes');

//database connection
mongoose.connect(process.env.MongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=> console.log('Db connected'))
    .catch((err)=> console.log(err));

//Middelware
app.use(morgan('dev'));
app.use(bodyparser.json({limit:'5mb'}));
app.use(bodyparser.urlencoded({
    limit:'5mb',
    extended:true
}));
app.use(cookieParser());
app.use(cors());

app.use('/api',authroutes);
app.use('/api',userroutes);
app.use('/api',createJobtype);
app.use('/api',createJobs);
app.use('/api', adminRoutes);

//error middelware

app.use(errorhandler);


//Server port
const port=process.env.Port;

app.listen(port,()=>{
    console.log(`Server run : ${port}`)
});