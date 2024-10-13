const express = require('express');
const { createBooking, myBooking, deleteBooking, acceptBooking } = require('../controllers/Booking.controller');
const router = express.Router();



router.post('/createbooking', createBooking);
router.post('/mybooking', myBooking);
router.delete('/deletebooking/:id', deleteBooking)
router.put('/acceptbooking/:id', acceptBooking)


module.exports = router;