const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const {commentId} = req.params;

    try {
        await Comment.deleteOne({_id: commentId}).then(result => {
            res.json({message: `Comment was deleted successfully, deleted count: ${result.deletedCount}`});
        })
    } catch (e) {
        res.json({message: e.message});
    }
}
