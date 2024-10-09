const express = require('express');
const router = express.Router();
const { signup, signin, gardnerList, cookList, electricianList } = require('../controllers/serviceProvider.controller');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/gardners', gardnerList)
router.get('/cooks', cookList)
router.get('/electricians', electricianList)


module.exports = router;