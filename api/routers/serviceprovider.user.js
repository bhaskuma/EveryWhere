const express = require('express');
const router = express.Router();
const { signup, signin, gardnerList } = require('../controllers/serviceProvider.controller');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/gardners', gardnerList)


module.exports = router;