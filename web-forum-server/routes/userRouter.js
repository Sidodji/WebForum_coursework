const {Router} = require('express');
const UserController = require('../controllers/userController');
const router = Router();
const passport = require('passport');

router.get('/user', passport.authenticate('jwt', {session: false}), UserController.getUsers);
router.get('/user/:id', passport.authenticate('jwt', {session: false}), UserController.getUserById);
router.put('/user/:id', passport.authenticate('jwt', {session: false}), UserController.editUserById);
router.delete('/user/:id', passport.authenticate('jwt', {session: false}), UserController.deleteUserById);

module.exports = router;
