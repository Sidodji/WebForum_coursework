const Topic = require('../../models/topic.model')
module.exports = async (req, res) => {
    const { name } = req.params;
    const topic = await Topic.findOne({
        name: name
    })
    if (topic === null) {
        return res.sendStatus(404);
    }
    res.json(topic);
}
