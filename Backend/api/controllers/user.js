const mongoose = require('mongoose');
const User = require('../models/user');
const { countDocuments, update } = require('../models/user');
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('../routes/user');
const jwt = require('jsonwebtoken');
const auth = require('../middlewear/auth')


//CREATE USER
exports.create_user = (req,res,next)=>{
    User.findOne({name : req.body.name},(err,user)=>{
        if(err){
            console.log(err);
        }
        else if(user){
            return res.status(200).json({
                msg : "user already Exists"
            });
        }
        else
        {
            const user =  new User({
                _id : mongoose.Types.ObjectId(),
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password,10)
            });
        
            user.save()
            .then(data=>{
                console.log(data);
                let token =jwt.sign({id : user._id},'thisisecret',{expiresIn:'7 days'});
                user.tokens = user.tokens.concat({token});
                res.status(201).json({
                    status : 1,
                    message : "User created",
                    userdata : user,
                    token : token
                });
            })
            .catch(err=>{
                res.send(err); 
            })
        }
    })

}

//LOGIN 
exports.loginUser = (req,res,next)=>{
    User.findOne({email : req.body.email})
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                let token = jwt.sign({
                    id : user._id.toString()
                },'thisisecret',{expiresIn :'7 days'});
                user.tokens = user.tokens.concat({token})
                user.save();

                res.status(200).json({
                   /* status : 1,
                    message : "Login in successfull",
                    user  : user,*/
                    token : token
                });
            }
            else{
                res.status(404).json({
                    status : 0,
                    message : "Invalid password"
                })
            }
        }
        else{
            res.status(404).json({
                status : 0,
                message : "User does not exist"
            });
        }
    })
}



//GET ALL USERS
exports.getAllUsers = (req,res)=>{
    User.find({})
    .then(users=>{
        res.status(200).json({
            users : users
            //token : users.tokens
        })
    })
    .catch(err=>{
        console.log(err)
    })
}

//GET PROFILE
exports.getMe = (req,res)=>{
    console.log(req.user)
    res.send(req.user)
}

//GET BY ID
exports.getByID = (req,res)=>{
    const id = req.params.id

    User.findById({_id : id})
    .then(users=>{
        res.status(200).json({
            users : users
        })
    })
    .catch(err=>{
        res.send(err)
    })
}


//LOGOUT 
exports.logoutUser = (req,res)=>{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !== req.token
    })
    
    req.user.save()
    try{
        res.status(200).send()
    }
    catch(e){
        res.send(e)
    }
}

//LOGOUT FROM ALL
exports.logoutAll = (req,res)=>{
    req.user.tokens = []
    req.user.save()
    
    try{
        res.status(200).send()
    }
    catch(e){
        res.send(e)
    }
}


//PATCH
exports.updateUser = async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['name' , 'email' , 'password']
    const isValidOp = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidOp)
    {
        return res.status(400).send({error : 'Invalid Updates'})
    }

    try{

        updates.forEach((update)=> req.user[update] =req.body[update])
        req.user.password = bcrypt.hashSync(req.user.password,10)
        await req.user.save()

        res.send(req.user)
    }
    catch(e){
        res.status(400).send(e)
    }
}

//DELETE
exports.deleteUser = async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send()
    }
}