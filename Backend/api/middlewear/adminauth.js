const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const auth = async (req,res,next)=>{
try{
       const token = req.header('Authorization')
       const decoded = jwt.verify(token , 'AdminSecretKey')
      // console.log(decoded)
       const admin = await Admin.findOne({_id : decoded.id , 'tokens.token' : token})
      // console.log(user)
       if(!admin){
           throw new Error()
       } 
       req.token = token
       req.admin = admin
       next()
    }
    catch(err){
        res.status(401).json({
            Err : "Please Authenticate"
        })
    }  
   }


module.exports =auth 