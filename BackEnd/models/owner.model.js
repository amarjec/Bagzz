const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
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
    products: {
        type: Array,
        default: []
    },
    gstin: {
        type: String,
        unique: true,
        trim: true,
    },
    profile: {
        type: String,
    },
})

module.exports = mongoose.model("Owner", ownerSchema);
