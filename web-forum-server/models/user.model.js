const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    github: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    }
},
    {
        timestamps: true,

    })
userSchema.pre('save', async function (next) {
    const user = this;
    if(!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);
