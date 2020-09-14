const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blogs')

const userSchema = mongoose.Schema({
    id : mongoose.Types.ObjectId,
    name : { type : String , required : true},
    email : { type : String , required : true},
    password : { type : String , required : true},
    tokens : [{
        token : { type : String , required : true}
    }],
    blogs : { type : Array , required : false}
});

userSchema.virtual('myblogs',{
    ref : 'Blog',
    localField : '_id',
    foreignField : 'owner'
})

userSchema.methods.toJSON = function(){
    const user = this
    const userObject =user.toObject()

    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.pre('remove',async (next)=>{
    const user = this
    await Blog.deleteMany({ owner : user._id})
    next()
})

module.exports = mongoose.model('User',userSchema);