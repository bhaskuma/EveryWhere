const express = require('express');
const { createBooking } = require('../controllers/Booking.controller');
const router = express.Router();



router('/', createBooking);


module.exports = router