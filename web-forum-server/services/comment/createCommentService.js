const Comment = require('../../models/comment.model');

module.exports = async (req, res) => {
    const {text, img, post, createBy} = req.body;
    const comment = new Comment({
        text,
        img,
        post,
        createBy
    });
    await comment.save()
        .then(() => res.json({message: 'The comment was created successfully'}))
        .catch(e => res.json({message: e.message}));
}
