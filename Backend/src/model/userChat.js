const mongoose = require("mongoose");

const chat = new mongoose.Schema({
    message:{
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
}, {timestamps: true})

const userChat = mongoose.model("Chats", chat);

module.exports = userChat;