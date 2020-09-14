const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next)=>{
try{
       const token = req.header('Authorization')
       const decoded = jwt.verify(token , 'thisisecret')
      // console.log(decoded)
       const user = await User.findOne({_id : decoded.id , 'tokens.token' : token})
      // console.log(user)
       if(!user){
           throw new Error()
       } 
       req.token = token
       req.user = user
       next()
    }
    catch(err){
        res.status(401).json({
            Err : "Please Authenticate"
        })
    }
      // res.status(401).send("Not authenticated");
   

//    const token = req.header('Authorization')
//        const decoded = jwt.verify(token , 'thisisecret')
//        console.log(decoded)
//        const user = await User.findOne({_id : decoded.id , 'tokens.token' : token})
//     // const user = await User.findById({_id : decoded})
//     console.log(user)
       
   }


module.exports =auth 