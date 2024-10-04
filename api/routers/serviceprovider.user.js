const express = require('express');
const router = express.Router();
const { signup, signin, gardnerList, clearnerList, electricianList } = require('../controllers/serviceProvider.controller');


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/gardners', gardnerList)
router.get('/clearners', clearnerList)
router.get('/electricians', electricianList)


module.exports = router;