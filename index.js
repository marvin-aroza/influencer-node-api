const express=require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoconnect = require('mongoose');
require('dotenv/config');
const cors = require('cors');

var allowlist = ['https://inlfuencer-user.herokuapp.com', 'https://influencer-angular.herokuapp.com', 'http://localhost:4201', 'http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//Package middleware
app.use(cors(corsOptionsDelegate));
app.use(bodyParser.json());
app.use(cors());

port = process.env.PORT || 80

//Routes imports
const registerRoute = require('./Routes/Auth/registration');
const loginRoute = require('./Routes/Auth/login');
const adminRoute = require('./Routes/Admin/admin');
const userRoute = require('./Routes/User/user');
const influencerRoute = require('./Routes/Influencer/influencer');
const commonRoute = require('./Routes/Common/common');
const collabRoute = require('./Routes/Collab/collab');

//Route middleware
app.use('/auth',registerRoute)
app.use('/login',loginRoute)
app.use('/admin',adminRoute)
app.use('/user',userRoute)
app.use('/influencer',influencerRoute)
app.use('/common',commonRoute)
app.use('/collab',collabRoute)

//Db connection
mongoconnect.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Mongodb Connected');
})

//Server poor
app.listen(port,()=>{
    console.log(port);
})
