const mongoose = require('mongoose')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')

//CREATE ADMIN
exports.createAdmin = (req,res,next)=>{
    Admin.findOne({name : req.body.name},(err,user)=>{
        if(err){
            console.log(err);
        }
        else if(user){
            return res.status(200).json({
                msg : "Admin already Exists"
            });
        }
        else
        {
            const admin =  new Admin({
                _id : mongoose.Types.ObjectId(),
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password,10)
            });
            admin.save()
            .then(data=>{
                console.log(data);
                // let token =jwt.sign({id : user._id},'thisisecret',{expiresIn:'7 days'});
                // user.tokens = user.tokens.concat({token});
                res.status(201).json({
                    status : 1,
                    message : "Admin created",
                    admin : admin,
                });
            })
            .catch(err=>{
                res.send(err); 
            })
        }
    })
}


//LOGIN 
exports.loginAdmin = (req,res) =>{
    Admin.findOne({email : req.body.email})    
        .then(admin=>{
        if(admin){
            if(bcrypt.compareSync(req.body.password,admin.password)){
                let token = jwt.sign({
                    id : admin._id.toString()
                },'AdminSecretKey',{expiresIn :'7 days'});
                admin.tokens = admin.tokens.concat({token})
                admin.save()

                res.status(200).json({
                    
                    token : token
                })
            }
            else{
                res.status(200).json({
                    status : "failed",
                    message : "Invalid Password"
                })
            }
        }
        else{
            res.status(500).json({
                status : "failed",
                message : "Admin with this credentials does not exist"
            })
        }
    })
}


//get PROFILE
exports.getAdmin = (req,res)=>{
    res.send(req.admin)
}


//LOGOUT 
exports.logoutAdmin = (req,res)=>{
    req.admin.tokens = req.admin.tokens.filter((token)=>{
        return token.token !== req.token
    })
    
    req.admin.save()
    try{
        res.status(200).send()
    }
    catch(e){
        res.send(e)
    }
}

//LOGOUT FROM ALL
exports.logoutAll = (req,res)=>{
    req.admin.tokens = []
    req.admin.save()
    
    try{
        res.status(200).send()
    }
    catch(e){
        res.send(e)
    }
}


//PATCH BLOG
exports.updateBlogs = async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['approved']
    const isValidOp = updates.every((update)=>allowUpdates.includes(update))

    if(!isValidOp)
    {
        return res.status(400).send({error : 'Invalid Updates'})
    }

    try{
        const blog = await Blog.findOne({_id : req.params.id})
        if(!blog){
            res.status(404).send()
        }
        updates.forEach((update)=> blog[update] =req.body[update])
        
        await blog.save()

        res.send(blog)
    }
    catch(e){
        res.send(e)
    }
}


//Get All blogs 

exports.getAllBlogs = (req,res) =>{
    Blog.find({approved : "true"}).populate('comments').lean()
    .then(blogs=>{
        res.status(200).json({
            All_Blogs : blogs
        })
    })
    .catch(e=>{
        res.send(e)
    })
}

//Get Unapproved Blogs
exports.getUnapprovedBlogs = (req,res)=>{
    Blog.find({approved : "false"})
    .then(blog=>{
        res.status(200).json({
            blogs : blog
        })
    })
    .catch(e=>{
        res.send(e)
    })
}

//Approve blog SErvice

exports.approveBlog = async(req,res)=>{
    try {
        const blog = await Blog.findOne({ _id: req.params.id})
        blog.approved=true;
        await blog.save()
        res.send(blog)
    } catch (error) {
        res.status(400).send(e)
    }
}