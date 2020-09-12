const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    body: {
        type: String,
        required: true
    },
    like:{
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    dislike: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Posts', postSchema);