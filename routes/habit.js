const express = require('express');
const router = express.Router();
const Post = require('../models/habit')

const habitController = require('../controller/habit_controller');

router.post('/create', habitController.create);
router.get('/destroy/:id', habitController.destroy);
router.get('/create', habitController.dashboard);


router.get('/status-update', habitController.update);
router.get('/status-update-week', habitController.updatecal);



module.exports = router