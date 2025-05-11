const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    passengerName: String,
    seats: Number,
    date: String,
    from: String,
    to: String,
    busName: String,
    price: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
