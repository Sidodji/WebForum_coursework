const Topic = require('../../models/topic.model')

module.exports = async (req, res) => {
    const {topicName} = req.params;

    try {
        await Topic.findOne({name: topicName}, (err, topic) => {
            topic.remove();
            res.json({message: `Topic was deleted successfully`});
        });
    } catch (e) {
        res.json({message: e.message});
    }
}
