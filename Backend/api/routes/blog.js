const express= require('express')
const router = express.Router();
const blogController = require('../controllers/blog')
const auth = require('../middlewear/auth')
const Populate = require('../util/autopopulate')

router.post('/create',auth,blogController.writeBlog);
router.get('/Allblogs',auth,blogController.getBlogs);
router.get('/:id',auth,blogController.BlogByID);
router.patch('/:id',auth,blogController.updateBlogs);
router.delete('/:id',auth,blogController.deleteBlog);
router.get('/blogsOfUser' ,auth , blogController.getUserBlogs);
router.get('/approved' ,auth, blogController.getApprovedBlogs);
// router.delete('/delete/:id' , blogController.deleteB);
// router.get('/checkforcomment' , auth,blogController.BlogcheckForComments)

module.exports = router; 