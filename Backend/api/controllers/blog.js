const Blog = require('../models/blogs');
const mongoose = require('mongoose');


exports.writeBlog = async (req,res)=>{
    
    const blog = new Blog({
        ...req.body,
        owner : req.user._id
    })

    try{
        await blog.save()
        res.status(201).send(blog)
    }
    catch(e){
        res.status(500).send(e)
    }
    
}

//Get All Blogs
exports.getBlogs = async (req,res)=>{
    
    try{
        const blogs = await Blog.find({owner : req.user._id})  //owner : req.user._id

        if(!blogs){
            res.status(404).send("No blogs created by this user")
        }

        res.status(200).json({
            blogs : blogs
        })
    }
    catch(e){
        res.status(500).send(e)
    }
}

//Get All Blogs for a Particular user 
exports.getUserBlogs = async(req,res)=>{
    try{
        const blogs = await Blog.find({owner : req.user._id})  //owner : req.user._id

        if(!blogs){
            res.status(404).send("No blogs created by this user")
        }

        res.status(200).json({
            blogs : blogs
        })
    }
    catch(e){
        res.status(500).send(e)
    }
}



exports.BlogByID = async (req,res)=>{
    const _id = req.params.id

    try{
        const blog = await Blog.findOne({_id}).populate('comments').lean()

        if(!blog){
            return res.status(404).send("Blog not found") 
        }
    
        res.send(blog)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
}


exports.BlogcheckForComments = (req,res)=>{
    const blog = Blog.find({approved : "true"})
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.send(err)
    })
}

//PATCH
exports.updateBlogs = async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowUpdates = ['title' , 'content']
    // const isValidOp = updates.every((update)=>allowUpdates.includes(update))

    // if(!isValidOp)
    // {
    //     return res.status(400).send({error : 'Invalid Updates'})
    // }

    try{
        const blog = await Blog.findOne({_id : req.params.id , owner : req.user._id}) 
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

//DELETE 
exports.deleteBlog = async(req,res)=>{
    try{
    const blog = await Blog.findOneAndDelete({ _id : req.params.id , owner : req.user._id})

    if(!blog){
        res.status(404).send()
    }

    res.status(200).send(blog)
    }
    catch(e){
        res.send(e)
    }

}

//Get blogs which are approved

exports.getApprovedBlogs = (req,res)=>{
    Blog.find({approved : "true"})
    .then(blog=>{
        res.status(200).json({
            blogs : blog
        })
    })
    .catch(e=>{
        res.send(e)
    })
}


//DELETE WITHOUT AUTH
exports.deleteB = (req,res)=>{
    Blog.findById(req.params.id)
    .then(data=>{
        res.status(200).send(data)
    })
    .catch(err=>{
        res.send(err)
    })
}