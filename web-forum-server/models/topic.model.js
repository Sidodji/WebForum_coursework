const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Post = require('./post.model');

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    })
topicSchema.pre('remove', async function(next) {
    await Post.remove({topic: {
            $in: this._id
        }});
    next();
})

module.exports = mongoose.model('Topic', topicSchema);

