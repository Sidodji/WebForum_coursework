const Topic = require('../../models/topic.model');

module.exports = async (req, res) => {
    const topicExists = await Topic.findOne({
        name: req.body.name
    })
    if (topicExists !== null) {
        return res.status(409).json({ message: 'This topic already exists' });
    }
    const topic = new Topic({
        name: req.body.name,
        createBy: req.body.userId
    })
    topic.save().catch(e => {
        res.json({ message: e.message });
    })
    res.json({ message: 'Topic was created successfully' });
}
