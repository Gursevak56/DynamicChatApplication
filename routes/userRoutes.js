const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const usercontroller = require('./../controller/usercontroller');
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
router.get('/register',usercontroller.registerload)
router.post('/register',upload.single('image'),usercontroller.register)
router.get('/',usercontroller.loadlogin)
router.post('/login',usercontroller.login)
router.get('/logout',usercontroller.logout)
router.get('/dashboard',usercontroller.dashboard)
router.all('*',(req,res)=>{
res.redirect('/');    
})
module.exports = router;