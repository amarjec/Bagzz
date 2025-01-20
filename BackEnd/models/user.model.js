const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,

    },
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    contact: {
        type: Number,
    },
    profile: {
        type: String,
    },

}, {timestamp: true})

module.exports = mongoose.model("user", userSchema);
