const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const {topicId} = req.params;
    const posts = await Post.find({
        topic: topicId
    })
    res.json(posts);
}
