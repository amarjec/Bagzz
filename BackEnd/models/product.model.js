const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    discout: { type: Number, default: 0,},

    bgColor: { type: String, required: true},
    textColor: { type: String, required: true},
    panelColor: { type: String, required: true},  
}, {timestamp: true})

module.exports = mongoose.model("product", productSchema);