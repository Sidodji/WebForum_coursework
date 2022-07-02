const Post = require('../../models/post.model');

module.exports = async (req, res) => {
    const { header, createBy, topic, description } = req.body;
    const post = new Post({
        header,
        createBy,
        topic,
        description
    })
    await post.save()
        .then(() => res.json({ message: 'Post was created successfully' }))
        .catch(e => res.json({ message: e.message }));
}
