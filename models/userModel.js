const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isonline:{
        type:String,
        default:'0'
    }
},{
    timestamps:true
})
const User = mongoose.model('user',userSchema);
module.exports = User;