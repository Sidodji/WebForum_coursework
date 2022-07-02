const { Router } = require('express');
const passport = require('passport');
const AuthController = require('../controllers/authController');
const router = Router();


router.post('/auth/login', passport.authenticate('local', { session: false }), (req, res, next) => {
    const user = AuthController.getAccount(req);
    if (user) {
        res.json(user);
    } else {
        res.status(401).send({ success: false });
    }
});
router.get('/init', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    console.log(req.user);
    res.status(200).json(req.user);
});
router.post('/auth/signup', AuthController.signUpUser);
router.post('/logout', AuthController.logout);

module.exports = router;
