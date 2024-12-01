const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    showtime: String, // e.g., "03:10 PM"
    seatNumber: String, // e.g., "A5"
    category: String, // e.g., "VIP", "Premium", "Executive"
    isSold: { type: Boolean, default: false }, // Seat availability
});

module.exports = mongoose.model('Seat', seatSchema);
