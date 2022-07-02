const {Router} = require('express');
const TopicController = require('../controllers/topicController');
const router = Router();
const passport = require('passport');

router.get('/topic', passport.authenticate('jwt', {session: false}), TopicController.getTopics);
router.get('/topic/:name', passport.authenticate('jwt', {session: false}), TopicController.getTopicByName);
router.post('/topic', passport.authenticate('jwt', {session: false}), TopicController.createTopic);
router.put('/topic/:topicId', passport.authenticate('jwt', {session: false}), TopicController.editTopicById);
router.delete('/topic/:topicName', passport.authenticate('jwt', {session: false}), TopicController.deleteTopicByName);

module.exports = router;
