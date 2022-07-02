const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const {postId} = req.params;

    try {
        await Post.findById(postId, (err, post) => {
            post.remove();
            res.json({message: `Post was deleted successfully`});
        });
    } catch (e) {
        res.json({message: e.message});
    }
}
