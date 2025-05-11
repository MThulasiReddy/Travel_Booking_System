const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name: String,
    from: String,
    to: String,
    price: Number,
    seats: Number,
});

module.exports = mongoose.model('Bus', busSchema);
