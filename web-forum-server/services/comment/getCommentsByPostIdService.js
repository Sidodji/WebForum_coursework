const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const {postId} = req.params;
    const comments = await Comment.find({post: postId});
    if (comments === null) {
        res.json({message: 'No comments'});
    }
    res.json(comments);
}
