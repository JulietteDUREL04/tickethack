var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');

//GET all trips from departure, arrival and date
router.get('/:departure&:arrival&:date', (req, res) => {
    
    const { departure, arrival, date } = req.params
    
    let dateInf = new Date(date)
    dateInf = dateInf.setHours(00, 00, 00)

    let dateSup = new Date(date)
    dateSup = dateSup.setHours(23, 59, 59)

    Trip.find({
        departure: departure,
        arrival: arrival,
        date: {$gte: dateInf, $lt: dateSup}
    })
        .then(trips => {
            if (trips.length === 0) {
                res.json({ result: false, error: "no trips found" })
            }
            else {
                res.json({ result: true, trips: trips })
            }
        })
}
)

module.exports = router;