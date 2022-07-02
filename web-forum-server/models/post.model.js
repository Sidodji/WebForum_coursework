const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');
const Comment = require('./comment.model');

const postSchema = new Schema({
        header: {
            type: String,
            required: true
        },

        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: true
        },
        topic: {
            type: Schema.Types.ObjectId,
            ref: 'Topic',
            required: true,
            autopopulate: true
        },
        description: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    })

postSchema.pre('remove', async function(next) {
    await Comment.remove({post: {
        $in: this._id
        }});
    next();
});

postSchema.plugin(autopopulate);

module.exports = mongoose.model('Post', postSchema);

