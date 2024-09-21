const express = require('express');
const router = express.Router();
const { createSubscription } = require('../controllers/subscription.controller')

router.post("/plan", createSubscription);

module.exports = router;