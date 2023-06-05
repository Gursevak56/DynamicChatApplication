const User = require('./../models/userModel');
const securepass = require('./../middlewares/securepassword');
module.exports={
    registerload: async (req,res)=>{
        try {
            res.render('register',{message:''})
        } catch (error) {
            console.log(error.message)
        }
    },
    register: async (req,res)=>{
        try {
            const password = await securepass.hashpassword(req.body.password);
            const checkuser = await User.findOne({email:req.body.email});
            if(!checkuser){
                const newuser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    image:req.file.filename,
                    password:password
                })
                const saveduser = await newuser.save().then(()=>{
                    res.render('register',{message:'user registered successfully'})
                 }).catch(err=>{
                     console.log(err.message)
                 })
            }
            
        } catch (error) {
            console.log(error.message)
        }
        
    }
}