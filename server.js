const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const googlestretage = require('passport-google-oauth20');
const app = express();

const port = process.env.PORT
const host = process.env.HOST
app.listen(port,host,()=>{
    console.log('server runs on 3000 with very beautiful way');
})