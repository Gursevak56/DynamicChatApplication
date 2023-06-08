const express = require('express');
const session = require('express-session')
const http = require('http');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('passport');
const bodyparser = require('body-parser');
const User = require('./models/userModel')
const Chat = require('./models/chatModel');
const ejs = require('ejs')
const googlestretage = require('passport-google-oauth20');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server)
const sesion_secret  = process.env.SESSION_SECRET
const userroute = require('./routes/userRoutes');
const { send } = require('process');
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
const usb = io.of('/user-namespace')
usb.on('connection',async function(socket){
    console.log('user connected')
    const sender_id = socket.handshake.auth.token;
    const useronline = await User.findByIdAndUpdate({_id:sender_id},{$set:{isonline:1}});
    socket.broadcast.emit('onlineuser',{userid:useronline._id});
    //chating 
    socket.on('newchat',function(data){
        socket.broadcast.emit('loadnewchat',data)
    })
    socket.on('existchat',async function(data){
        var chats = await Chat.find({$or:[
            {sender_id:data.sender_id,reciever_id:data.recieverid},
            {sender_id:data.recieverid,reciever_id:data.sender_id}
        ]})
        socket.emit('chats',{chats:chats});
    })
    socket.on('disconnect',async function(){
        console.log('user disconnected')
        const onlineuserid = socket.handshake.auth.token;
        const oflineuser = await User.findByIdAndUpdate({_id:onlineuserid},{$set:{isonline:0}})
        socket.broadcast.emit('offlineuser',{userid:onlineuserid});
    })
})
 server.listen(port,()=>{
    console.log(`server runs on ${port} with very beautiful way`);
})