const express=require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoconnect = require('mongoose');
require('dotenv/config');
const cors = require('cors');

//Package middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cors());

port = process.env.PORT || 80

//Routes imports
const registerRoute = require('./Routes/Auth/registration');
const loginRoute = require('./Routes/Auth/login');
const adminRoute = require('./Routes/Admin/admin');
const userRoute = require('./Routes/User/user');

//Route middleware
app.use('/auth',registerRoute)
app.use('/login',loginRoute)
app.use('/admin',adminRoute)
app.use('/user',userRoute)

//Db connection
mongoconnect.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Mongodb Connected');
})

//Server poor
app.listen(port,()=>{
    console.log(port);
})
