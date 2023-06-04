const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const googlestretage = require('passport-google-oauth20');
const app = express();
// mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,enableUtf8Validation:true}).then((conn)=>{
//     console.log(conn+"Database connected successfully");
// }).catch(err=>{
//     console.log(err.message);
// })
app.get('/',(req,res)=>{
    res.send(process.env.DB_URL)
})
const port = 3000;
// const host = "65.1.73.93"
app.listen(port,()=>{
    console.log(`server runs on ${port} with very beautiful way`);
})