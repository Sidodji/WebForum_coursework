const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const {userId} = req.params;
    const posts = await Post.find({createBy: userId});
    res.json(posts);
}
