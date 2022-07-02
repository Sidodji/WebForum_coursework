const Topic = require('../../models/topic.model')

module.exports = async (req, res) => {
    const {topicId} = req.params;
    const {name, createBy} = req.body;

    await Topic.updateOne({_id: topicId}, {
        $set: {
            name,
            createBy
        }
    })
        .then(() => res.json({message: 'Topic updated successfully'}))
        .catch(err => res.json({message: err.message}));
}
