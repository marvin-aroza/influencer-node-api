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
//Db connection
mongoconnect.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Mongodb Connected');
})

//Routes imports
const registerRoute = require('./Routes/Auth/registration');
const loginRoute = require('./Routes/Auth/login');

//Route middleware
app.use('/auth',registerRoute)
app.use('/login',loginRoute)

//Server poor
app.listen(process.env.PORT,()=>{
    console.log('Port running at 3000');
})
