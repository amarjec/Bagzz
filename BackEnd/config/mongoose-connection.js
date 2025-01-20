const mongoose = require('mongoose');

// Connect to MongoDB
mongoose
.connect("mongodb://127.0.0.1:27017/bagzz")
.then(function () {
    console.log('Connected to MongoDB');
})
 .catch(function (err) {
    console.log('Could not connect to MongoDB:', err);
});

module.exports = mongoose.connection; 