const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const usercontroller = require('./../controller/usercontroller');
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
module.exports = router;