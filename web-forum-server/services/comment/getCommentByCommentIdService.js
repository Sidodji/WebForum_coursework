const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId);
    if (comment === null) {
        res.json({message: 'Comment not found'});
    }
    res.json(comment);
}
