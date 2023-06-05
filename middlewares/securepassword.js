const bcrypt = require('bcrypt');
const passport = require('passport');
module.exports={
    hashpassword: async (password)=>{
     const securedpassword = await bcrypt.hash(password,10);
     return securedpassword
    },
    comparepass: async (password,savepass)=>{
        const comparepassword = await bcrypt.compare(password,savepass)
        return comparepassword;
    }
}