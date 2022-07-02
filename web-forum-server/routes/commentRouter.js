const {Router} = require('express');
const CommentController = require('../controllers/commentController');
const passport = require('passport');
const router = Router();

router.get('/comments/:postId', passport.authenticate('jwt', {session: false}), CommentController.getCommentsByPostId)
router.post('/comment', passport.authenticate('jwt', {session: false}), CommentController.createComment);
router.get('/comment/:commentId', passport.authenticate('jwt', {session: false}), CommentController.getCommentByCommentId);
router.put('/comment/:commentId', passport.authenticate('jwt', {session: false}), CommentController.editCommentByCommentId);
router.delete('/comment/:commentId', passport.authenticate('jwt', {session: false}), CommentController.deleteCommentByCommentId);

module.exports = router;
