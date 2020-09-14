const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comments')
const auth = require('../middlewear/auth')


router.post('/:id' , auth , commentController.createComment);
router.delete('/:id' , auth,commentController.deleteComment);

 module.exports = router  