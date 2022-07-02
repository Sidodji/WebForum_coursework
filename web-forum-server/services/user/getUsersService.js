const User = require('../../models/user.model');

module.exports = async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.json(users);
}
