const AuthAccountService = require('../services/auth/authAccountService');
const SignUpAccountService = require('../services/auth/signUpAccountService');


exports.signUpUser = (req, res) => SignUpAccountService(req, res);
exports.getAccount = (req) => AuthAccountService(req.user);

exports.logout = (req, res) => {
    req.logout();
    res.json({message: 'log out success'});
}
