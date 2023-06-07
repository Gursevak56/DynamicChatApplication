const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const usercontroller = require('./../controller/usercontroller');
const auth = require('./../middlewares/auth');
router.use(bodyparser.urlencoded({extended:true}))
router.use(bodyparser.json())
const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,path.join(__dirname,'../public/userimages'));
    },
    filename:function (req,file,cb)
    {
        const name = Date.now()+''+file.originalname;
        cb(null,name);
            }
})
const upload = multer({storage:storage})
router.get('/register',auth.isLogout,usercontroller.registerload)
router.post('/register',upload.single('image'),usercontroller.register)
router.get('/',auth.isLogout,usercontroller.loadlogin)
router.post('/login',usercontroller.login)
router.get('/logout',auth.isLogin,usercontroller.logout)
router.get('/dashboard',auth.isLogin,usercontroller.dashboard)
router.post('/savechat',auth.isLogin,usercontroller.savechat);
router.all('*',(req,res)=>{
res.redirect('/');    
})
module.exports = router;