const http = require('http');
const express = require('express');
const app =express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/user');
const blogRoutes = require('./api/routes/blog');
const adminRoutes = require('./api/routes/admin');
const Admin = require('./api/models/admin')
const commentRoutes = require('./api/routes/comments')	
const replyRoutes = require('./api/routes/replies')


//connecting mongodb
mongoose.connect('mongodb://localhost:27017/FinalBlogWebsite', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(data=>{
    console.log("Database connected successfully");
}).catch(err=>{
    console.log("Error occured");
})

//enabling body parser
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended : true
}));

//setting up cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,DELETE,PUT,PATCH");
    res.header("Access-Control-Allow-Headers","*")
    next();
  });



app.use('/',userRoutes);
app.use('/blog',blogRoutes);
app.use('/admin', adminRoutes);
app.use('/comments',commentRoutes);
app.use('/reply' ,replyRoutes);

app.get('/Admin' , (req,res)=>{
    Admin.find({})
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.send(err)
    })

})



module.exports =app;    