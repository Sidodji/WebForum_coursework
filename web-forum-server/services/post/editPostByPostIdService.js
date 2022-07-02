const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const {postId} = req.params;
    const {header, description} = req.body;
    await Post.updateOne({_id: postId}, {
        $set: {
            header,
            description
        }
    })
        .then(() => res.json({message: 'Post updated successfully'}))
        .catch(err => res.json({message: err.message}));
}


