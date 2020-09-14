const mongoose = require('mongoose')
const Comment = require('../models/comments')
const Blog = require('../models/blogs')


//CREATE COMMENT
exports.createComment = (req,res)=>{
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  comment
      .save()
      .then(comment => { 
          return Promise.all([
              Blog.findById(req.params.id)
          ]);
      })
      .then(([blog, user]) => {
          blog.comments.unshift(comment);
          res.status(200).send(comment)
          return Promise.all([
              blog.save()
          ]);
      })
      .catch(err => {
          console.log(err);
      });
}

//delete comment
exports.deleteComment = (req,res)=>{
    Comment.findByIdAndDelete(req.params.id)
    .then(data=>{
        res.send(200)
    })
    .catch(err=>{
        res.send(err)
    })
}
