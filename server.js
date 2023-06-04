const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
app.get('/',(req,res)=>[
   res.send('started with pm2')
])
const port = process.env.PORT;
app.listen(port,()=>{
    console.log('server runs on 3000 with very beautiful way');
})