// editor: { type: mongoose.Schema.Types.ObjectId, ref: 'editors' }, });

const mongoose = require('mongoose');

const bookingsSchema = mongoose.Schema({
	trip:{ type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
    isPaid:Boolean
});

const Booking = mongoose.model('bookings', bookingsSchema);

module.exports = Booking;