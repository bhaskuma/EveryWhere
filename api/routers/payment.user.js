const express = require('express');
const router = express.Router()
const { checkout, paymentVerification, getkey } = require('../controllers/payment.controller')

router.post("/checkout", checkout);
router.post("/paymentverfication", paymentVerification)
router.post("/getkey", getkey)


module.exports = router;