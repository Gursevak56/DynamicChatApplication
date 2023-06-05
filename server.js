const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const ejs = require('ejs')
const googlestretage = require('passport-google-oauth20');
const app = express();
const server = http.createServer(app);
const userroute = require('./routes/userRoutes');
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,enableUtf8Validation:true}).then((conn)=>{
    console.log(conn+"Database connected successfully");
}).catch(err=>{
    console.log(err.message);
})
app.use(express.static('public'))
app.use('/',userroute);
app.use(bodyparser.urlencoded({extended:true,limit:'50mb'}))
app.use(bodyparser.json());
app.set('view engine','ejs')
app.set('views','./views')
const port = process.env.PORT;
 app.listen(port,()=>{
    console.log(`server runs on ${port} with very beautiful way`);
})