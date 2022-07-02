const {Router} = require('express');
const PostController = require('../controllers/postController')
const passport = require('passport');
const router = Router();

router.get('/posts/:topicId', passport.authenticate('jwt', {session: false}), PostController.getPostsByTopicId);
router.get('/posts/:userId/user', passport.authenticate('jwt', {session: false}), PostController.getPostsByUserId);
router.get('/post/:postId', passport.authenticate('jwt', {session: false}), PostController.getPostByPostId);
router.post('/post', passport.authenticate('jwt', {session: false}), PostController.createPostForTopicId);
router.put('/post/:postId', passport.authenticate('jwt', {session: false}), PostController.editPostByPostId);
router.delete('/post/:postId', passport.authenticate('jwt', {session: false}), PostController.deletePostByPostId);

module.exports = router;
