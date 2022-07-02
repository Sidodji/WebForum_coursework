const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const {postId} = req.params;
    const post = await Post.findById(postId);
    if (post !== null) {
        res.json(post);
    } else {
        res.json({message: `The post doesn't exist`});
    }
}
