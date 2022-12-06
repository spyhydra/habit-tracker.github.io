const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');



const session = require('express-session');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/habit', require('./habit'))

// for any further routes, access from here
// router.use('/post',require('./post'));
// router.use('/comments',require('./comment'))

module.exports = router;