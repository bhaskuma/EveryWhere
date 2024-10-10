const express = require('express');
const { createBooking } = require('../controllers/Booking.controller');
const router = express.Router();



router.post('/createbooking', createBooking);


module.exports = router