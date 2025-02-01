const {default: mongoose} = require('mongoose');

const ChatSchema = mongoose.Schema({
    date: String,
    userId: {type: String, required: true},
    chats:[{
        title: {type: String, required: true},
        query: {type: String, required: true},
        answer: {type: String, required: true},
    }]
});

const Chat = mongoose.model('chat', ChatSchema);

module.exports = {Chat};