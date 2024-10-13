const express = require('express');
const { allUsers, allBooking, allProvider, allSubscription } = require('../controllers/admin');
const router = express.Router();


router.get('/allusers', allUsers);
router.get('./allbookings', allBooking)
router.get('./allProvider', allProvider)
router.get('./allsubscriptions', allSubscription)

module.exports = router;
