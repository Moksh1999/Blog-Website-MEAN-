const mongoose = require('mongoose');
const Comment = require('../models/comments')
const Populate = require('../util/autopopulate')


const blogSchema = mongoose.Schema({

    title : { type : String , required : true},
    content : { type : String, required : true},
    owner : { type : mongoose.Schema.Types.ObjectId , required : true , ref : 'User'  },
    approved : { type : Boolean , default : "false"},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

blogSchema
.pre('findOne', Populate('owner'))
.pre('find', Populate('owner'))



module.exports = mongoose.model('Blog',blogSchema)