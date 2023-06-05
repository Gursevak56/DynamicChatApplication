const bcrypt = require('bcrypt');
module.exports={
    hashpassword: async (password)=>{
     const securedpassword = await bcrypt.hash(password,10);
     return securedpassword
    }
}