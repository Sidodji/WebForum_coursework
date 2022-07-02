const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const {commentId} = req.params;
    const {text, img} = req.body;

    await Comment.updateOne({_id: commentId}, {
        $set: {
            text,
            img
        }
    })
        .then(result => res.json(result))
        .catch(e => res.json({message: e.message}))
}
