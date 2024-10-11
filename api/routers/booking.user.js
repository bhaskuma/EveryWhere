const express = require('express');
const { createBooking, myBooking } = require('../controllers/Booking.controller');
const router = express.Router();



router.post('/createbooking', createBooking);
router.post('/mybooking', myBooking);


module.exports = router;