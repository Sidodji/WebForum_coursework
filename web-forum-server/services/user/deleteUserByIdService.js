const User = require('../../models/user.model');

module.exports = async (req, res) => {
    const {id} = req.params;

    try {
        await User.deleteOne({_id: id}).then(result => {
            res.json({message: `User was deleted successfully, deleted count: ${result.deletedCount}`});
        })
    } catch (e) {
        res.json({message: e.message});
    }
}
