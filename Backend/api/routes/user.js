const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');
const userController = require('../controllers/user');
const auth = require('../middlewear/auth');
const adminauth = require('../middlewear/adminauth')


//create user
router.post('/create',userController.create_user);
//login user
router.post('/login',userController.loginUser);
//get all users
router.get('/users',userController.getAllUsers);
//get me
router.get('/user/me',auth,userController.getMe);
//get user by id
router.get('/user/:id',userController.getByID);
//logout user
router.post('/user/logout',auth,userController.logoutUser);
//logout all
router.post('/users/logoutAll',auth,userController.logoutAll);
//update user
router.patch('/user/me',auth,userController.updateUser);
//delete user
router.delete('/user/me',auth,userController.deleteUser);



module.exports = router;







