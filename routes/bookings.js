var express = require('express');
var router = express.Router();
const Booking = require('../models/bookings');

//GET bookings
router.get('/', (req, res) => {
    Booking.find({ isPaid: true })
        .populate('trip')
        .then(bookings => {
            console.log(bookings)

            if (bookings === []) {
                res.json({ result: false, error: "no bookings found" })
            }
            else {
                res.json({ result: true, bookings: bookings })
            }
        })
})

//GET bookings/cart
router.get('/cart', (req, res) => {
    Booking.find({ isPaid: false })
        .populate('trip')
        .then(bookings => {
            console.log(bookings)
            if (bookings === []) {
                res.json({ result: false, error: "no tickets found in cart" })
            }
            else {
                res.json({ result: true, bookings: bookings })
            }
        })
})


//POST bookings

router.post('/', (req, res) => {
    const { tripId } = req.body

    const newBooking = new Booking({
        trip: tripId,
        isPaid: false
    });

    newBooking.save().then(() => {
        console.log('Booking saved!');
        Booking.find()
            .populate('trip')
            .then(allbookings => {
                res.json({ result: true, bookings: allbookings })
            })
    });
})

//PUT booking/:bookingId
// update isPaid from false to true
router.put('/', (req, res) => {
    const { bookingId } = req.body
    Booking.updateOne({ _id: bookingId },
        { isPaid: true })
        .populate('trip')
        .then(() => {
            Booking.findById(bookingId).then(booking => {
                res.json({ result: true, booking: booking })
            });
        });
})

//DELETE bookings/:bookingId
router.delete('/:bookingId', (req, res) => {
    const { bookingId } = req.params

    Booking.deleteOne({ _id: bookingId }).then(() => {

        Booking.find()
            .populate('trip')
            .then(allbookings => {
                res.json({ result: true, bookings: allbookings })
            });
    })
})

module.exports = router;