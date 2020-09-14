var Blog = require('../models/blogs');
var Comment = require('../models/comments');
var User = require('../models/user');


exports.newReply = (req,res)=>{
  let post;
  Post.findById(req.params.postId)
    .then(p => {
      post = p;
      return Comment.findById(req.params.commentId);
    })
    .then(comment => {
      res.render("replies-new", { post, comment });
    })
    .catch(err => {
      console.log(err.message);
    });
}

exports.createReply = (req,res) =>{
   // TURN REPLY INTO A COMMENT OBJECT
   const reply = new Comment(req.body);
   reply.author = req.user.id
   // LOOKUP THE PARENT POST
   Blog.findById(req.params.id)
       .then(post => {
           // FIND THE CHILD COMMENT
           Promise.all([
               reply.save(),
               Comment.findById(req.params.commentId),
           ])
               .then(([reply, comment]) => {
                   // ADD THE REPLY
                   comment.comments.unshift(reply.id);
                  res.status(200).send(comment)
                   return Promise.all([
                       comment.save()
                   ]);
               })
               .catch(console.error);
           // SAVE THE CHANGE TO THE PARENT DOCUMENT
           return post.save();
       })
}

