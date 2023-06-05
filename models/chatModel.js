const mongoose = require('mongoose');
const chatSchema = mongoose.Schema({
   sender_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   reciever_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   }
},{
    timestamps:true
})
const Chat = mongoose.model('chat',chatSchema);
module.exports = chat;