const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autopopulate = require('mongoose-autopopulate');

const commentSchema = new Schema({
        text: {
            type: String,
            required: true
        },
        img: {
            type: String
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        createBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: true
        }
    },
    {
        timestamps: true
    })

commentSchema.plugin(autopopulate);

module.exports = mongoose.model('Comment', commentSchema);
