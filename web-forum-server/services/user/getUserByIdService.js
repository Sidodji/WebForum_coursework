const User = require('../../models/user.model');

module.exports = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    if (user !== null) {
        const {firstName, lastName, email, github, twitter, instagram, facebook} = user;
        const data = {
            firstName,
            lastName,
            email,
            github,
            twitter,
            instagram,
            facebook
        }
        return res.json(data);
    } else {
        return res.json({message: 'This user does not exist'});
    }

}
