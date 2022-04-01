const express = require('express');
const app = express();

const dotenv = require('dotenv');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const hostname = '127.0.0.1';
const port = 3000;


const connectDB = require('./config/db');
const { Employee } = require('./models/employee');
dotenv.config({path:'./config/config.env'});
connectDB();

app.use('/',require('./routes/index'));

app.listen(port,hostname,(req,res)=>{
    console.log(`server is running at http://${hostname}:${port}`)
});
