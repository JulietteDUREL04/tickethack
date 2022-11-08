// editor: { type: mongoose.Schema.Types.ObjectId, ref: 'editors' }, });

const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
	trips:[{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' }],
    paid:Boolean
});

const Booking = mongoose.model('bookings', bookingsSchema);

module.exports = Booking;