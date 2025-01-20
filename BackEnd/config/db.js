const mongoose = require('mongoose');
const config = require("config");

const dbgr = require("debug")("development:mongoose");

// Connect to MongoDB
mongoose
.connect(`${config.get("MONGODB_URI")}/bagzz`)
.then(function () {
    // console.log('Connected to MongoDB');
    dbgr("Connected to MongoDB");
 
})
 .catch(function (err) {
    // console.log('Could not connect to MongoDB:', err);
    dbgr("Could not connect to MongoDB:", err);
 
});

module.exports = mongoose.connection; 