const Topic = require('../../models/topic.model');

module.exports = async (req, res) => {
    const topics = await Topic.find({});
    topics !== null ? res.json(topics) : res.sendStatus(500);
}
