const express= require('express')
const router = express.Router();
const replyController = require('../controllers/replies')
const auth = require('../middlewear/auth')


router.get('/:postId/comments/:commentId/replies/new' , replyController.newReply);
router.post('/:id/:commentId' ,auth, replyController.createReply);

module.exports = router 