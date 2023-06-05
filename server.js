const express = require('express');
const session = require('express-session')
const http = require('http');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const ejs = require('ejs')
const googlestretage = require('passport-google-oauth20');
const app = express();
const server = http.createServer(app);
const sesion_secret  = process.env.SESSION_SECRET
const userroute = require('./routes/userRoutes');
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,enableUtf8Validation:true}).then((conn)=>{
    console.log(conn+"Database connected successfully");
}).catch(err=>{
    console.log(err.message);
})
app.use(session({
    secret:sesion_secret,
    resave:false,
    saveUninitializedL:false
}))
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended:false,limit:'50mb'}))
app.use(bodyparser.json());
app.use('/',userroute);
app.set('view engine','ejs')
app.set('views','./views')
const port = process.env.PORT;
 app.listen(port,()=>{
    console.log(`server runs on ${port} with very beautiful way`);
})