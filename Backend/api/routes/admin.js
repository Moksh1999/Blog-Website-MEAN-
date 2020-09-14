const adminController = require('../controllers/admin')
const express = require('express')
const router = express.Router()
const auth = require('../middlewear/adminauth')

router.post('/create',adminController.createAdmin);
//login
router.post('/login',adminController.loginAdmin);
//get Profile
router.get('/myprofile',auth,adminController.getAdmin);
//logout 
router.post('/logout', auth, adminController.logoutAdmin);
//logoutAll
router.post('/logoutAll' , auth , adminController.logoutAll);
//approve blog
router.get('/approve/:id' , auth , adminController.approveBlog);
//getAllBlogs
router.get('/allBlogs',adminController.getAllBlogs)
//get unapproved
router.get('/unapprovedBlogs', auth,adminController.getUnapprovedBlogs)

module.exports = router