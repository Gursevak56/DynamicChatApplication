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
            console.log(req.body)
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
        
    },
    loadlogin: async (req,res)=>{
        try {
            res.render('login',{message:''})
        } catch (error) {
            console.log(error.message)
        }
    },
    login:async (req,res)=>{
      try {
        console.log(req.body)
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.render('login',{message:"user and password are incorrect"});
        }
        const passwordcheck = await securepass.comparepass(req.body.password,user.password);
        if(!passwordcheck){
            res.render('login',{message:"password and email are incorrect"});
        }
        req.session.user = user;
        res.redirect('/dashboard');
      } catch (error) {
        console.log(error);
      }
    },
    logout: async (req,res)=>{
        try {
            req.session.destroy();
            res.redirect('/');
        } catch (error) {
            console.log(error.message)
        }
    },
    dashboard: async (req,res)=>{
        try {
            res.render('dasboard',{user:req.session.user})
        } catch (error) {
            console.log(error.message)
        }
    }
}